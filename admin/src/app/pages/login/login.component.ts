import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/state/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  loginForm: FormGroup;
 

  constructor(private formBuilder: FormBuilder , private rest: RestService , private _router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.rest.login(this.loginForm.value).subscribe((result : any) => {
       localStorage.setItem('token', result['data']);
       this._router.navigate(['/user-form']);

      } , (err: any) => {
        console.log(err);
        alert('Invalid credentials');
      });
    }else{
      alert('invalid form');
    }
  }


  ngOnInit(): void {
    console.log('this is');
    
  }
  
}



