// service.service.ts
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

 
  constructor(private formBuilder: FormBuilder, private RestService: RestService) {
    

  // getTasks() {
  //   this._rest.getTasks().subscribe((resp: any) => {
  //     this.tasks = resp.data;
  //   }, (err: { message: any; }) => {
  //     alert(err.message);
  //   });
  // }

  
  // addTask(task: string) {
  //   this._rest.addTask({ task }).subscribe((resp: any) => {
  //     console.log(resp.data);
  //     this.getTasks();
  //   },
  //     (err: { message: any; }) => {
  //       alert(err.message);
  //     });
  // }


}
}