import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  title: string = "Lista de usuários";
  displayedColumns: string[] = ['picture', 'title', 'firstName', 'lastName', 'details', 'actions'];
  dataSource!: MatTableDataSource<User[]>;
  pageIndex = 1;
  pageSize = 10;
  totalItems = 0;
  
  
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    this.authService.getUsers(this.pageIndex, this.pageSize).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource<User[]>(data.data);
      this.totalItems = data.total;
    });
  }

  deleteUser(userId: string) {
    this.authService.deleteUser(userId).subscribe(
      () => {
        this.loadData();
        this.router.navigate(['/users']);
        this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {duration:3000}); 
      },
      (error: Error) => {
        this.snackBar.open(`Erro ao excluir o usuário ${error.stack}` , 'Fechar', {duration:3000}); 
      }
    );
  }
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }
  

}
