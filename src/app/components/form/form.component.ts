import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  @Input() formTitle!: string;
  @Input() submitButtonLabel!: string;
  @Input() user: any; 
  @Output() formSubmit: EventEmitter<User> = new EventEmitter<User>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [this.user ? this.user.firstName : '', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      lastName: [this.user ? this.user.lastName : '', Validators.required, Validators.minLength(2), Validators.maxLength(50)],
      email: [this.user ? this.user.email : '', Validators.required],
      picture: [this.user ? this.user.picture : '']
    });
  }


  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      this.formSubmit.emit(userData);
    }
  }
}
