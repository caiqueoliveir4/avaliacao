import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

 title: string = "Detalhes do usuário"; 
 user!: User;

 constructor(private route: ActivatedRoute, private authService: AuthenticationService) { }

 ngOnInit(): void {
   const userId = this.route.snapshot.paramMap.get('id');
   if (userId) {
     this.authService.getUser(userId).subscribe((data: any) => {
       this.user = data;
     });
   }
 }
}
