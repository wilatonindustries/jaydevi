import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/state/rest.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  buyForm: FormGroup;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private router: Router
  ) {
    this.buyForm = this.formBuilder.group({
      contract_type: ['', Validators.required],
      currency: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      duration: ['', [Validators.required, Validators.min(0)]],
      duration_unit: ['', Validators.required],
      symbol: ['', Validators.required],
      basis: ['', Validators.required],
      // status: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.buyForm.valid) {
      const formData = this.buyForm.value;
      this.restService.buy(formData).subscribe(
        (response: any) => {
          console.log('Contract added successfully', response);
          this.message = 'Contract added successfully';
          this.router.navigate(['/trade-list']);
        },
        (error: any) => {
          console.error('Error adding contract', error);
          this.message = 'Error adding contract';
        }
      );
    }
  }

  onfall() {
    if (this.buyForm.valid) {
      const formData = this.buyForm.value;
      this.restService.fall(formData).subscribe(
        (response: any) => {
          console.log('Contract fell successfully', response);
          this.message = 'Contract fell successfully';
          this.router.navigate(['/trade-list']);
        },
        (error: any) => {
          console.error('Error falling contract', error);
          this.message = 'Error falling contract';
        }
      );
    }
  }
  
  
}
