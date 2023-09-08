import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/state/rest.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  message: string = '';
  tasks: any[] = [];
  _http: any;
  url!: string;

  constructor(private restService: RestService, private router: Router) {
    this.userForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', Validators.required),
      app_id: new FormControl('', Validators.required),
      token: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.restService.addUser(formData).subscribe(
        (response: any) => {
          console.log('User added successfully', response);
          this.message = 'User added successfully';
          // Optionally, you can redirect the user to another page after successful submission.
          this.router.navigate(['/user-view']);
        },
        (error: any) => {
          console.error('Error adding user', error);
          this.message = 'Error adding user';
          // Handle the error here, e.g., display a user-friendly error message.
        }
      );
    }
  }



}