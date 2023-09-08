import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/state/rest.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userForm!: FormGroup; // Using the non-null assertion operator (!)
message: string = '';
  tasks: any[] = [];
  _http: any;
  url!: string;
 


  constructor(private fb: FormBuilder , private restservice: RestService, private router: Router ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.restservice.regi_master(formData).subscribe(
        (response: any) => {
          console.log('User added successfully', response);
          this.message = 'User added successfully';
          // Optionally, you can redirect the user to another page after successful submission.
          // this.router.navigate(['/some-other-page']);
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





