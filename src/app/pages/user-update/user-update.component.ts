import { Component} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {
  title: string =  'Editar Usuário'
  formTitle: string = 'Formulário de Edição';
  submitButtonLabel: string = 'Atualizar';
  userToEdit: any; 

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.authService.getUser(userId!).subscribe(
    (data: any) => {
      this.userToEdit = data;      
    },
    (erro: Error) => {
      this.snackBar.open(`Erro ao tentar encontrar o usuário especifico, Erro: ${erro.stack}`, 'Fechar', {duration: 3000});
    })
  }

  updateUser(updateUserData: any) {
      this.authService.updateUser(this.userToEdit.id, updateUserData).subscribe(
        (data: any) => {
          this.router.navigate(['/users']);
          this.snackBar.open("Usuário atualizado com sucesso.", 'Fechar', {duration: 3000});
      },
      (erro: Error) => {
        this.snackBar.open(`Ocorreu um erro ao tentar atualizar o usuário, Erro: ${erro.stack}`, 'Fechar', {duration: 3000});
      });
  }
}
