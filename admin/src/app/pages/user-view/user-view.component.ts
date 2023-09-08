import { Component, Input } from '@angular/core';
import { RestService } from 'src/app/state/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent {

  users: any[] = []; 
  snackBar: any;



  updateUser() {
    // Update user logic
  }

  deleteUser() {
    // Delete user logic
  }


  constructor(private restService: RestService) { }

  ngOnInit(): void {
    this.fetchuserData();
  }

  fetchuserData() {
    this.restService.Alluser().subscribe(
      (response: any) => { // Specify the correct type for 'response' as an object
        if (response.data && Array.isArray(response.data)) { // Check if 'data' property is an array
          this.users = response.data; // Assign the retrieved trade data to the component property
        } else {
          console.error('Invalid trade data format:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching trade data', error);
      }
    );
  }


  deleteuser(id: any): void {
    this.restService.deleteuser(id).subscribe(
      (data: any) => {
        console.log(data);

        this.snackBar.open('User deleted successfully', 'Close', {
          duration: 3000,
        });

        this.fetchuserData();
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}



// Deriv@222
// fkwXoozsqkTZHlz
// 38784
// 0885606013
// mushkurderiv222@gmail.com
// mashkurmulla
// mashkur