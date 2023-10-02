import { Component, OnInit  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  title: string  = "Criar Usuário";
  formTitle: string = "Formulário de Usuário";
  submitButtonLabel: string = 'Criar';

  constructor(
    private router: Router,
     private authService: AuthenticationService,
     private snackBar: MatSnackBar
     ) {
   
  }

  ngOnInit(): void {
   
   }

  createUser(userData: any) {
      this.authService.createUser(userData).subscribe(
      (data: any) => {
        this.router.navigate(['/users']);
        this.snackBar.open("Usuário criado com sucesso.", 'Fechar', {duration: 3000});
      },
      (erro: Error) => {
        this.snackBar.open(`Ocorreu um erro: ${erro.stack} ao tentar criar um novo usuário`, 'Fechar', {duration: 3000});
      });
    
  }
}
