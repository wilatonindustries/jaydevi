import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/state/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-trade-list',
  templateUrl: './trade-list.component.html',
  styleUrls: ['./trade-list.component.css']
})
export class TradeListComponent implements OnInit {
  trades: any[] = []; // Initialize with an empty array
  tasks: any;
  _rest: any;
  private _restservice: any;

  data:any = []
id: any;
trade: any;
  responses: any;

  

constructor(private restService: RestService, private snackBar: MatSnackBar ) {}


  // fetchTradeData() {
  //   this.restService.alltrader().subscribe(
  //     (response: any) => { // Specify the correct type for 'response' as an object
  //       if (response.data && Array.isArray(response.data)) { // Check if 'data' property is an array
  //         this.trades = response.data; // Assign the retrieved trade data to the component property
  //       } else {
  //         console.error('Invalid trade data format:', response);
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error fetching trade data', error);
  //     }
  //   );
  // }

  fetchTradeData() {
    this.restService.alltrader().subscribe(
      (response: any) => {
        if (response.success) {
          this.trades = response.data; // Make sure 'tradeId' is included in each trade object
        } else {
          console.error('Error fetching trade data:', response.message);
        }
      },
      (error: any) => {
        console.error('Error fetching trade data', error);
      }
    );
  }
  

  cancel(tradeId: number) {
    this.restService.cancel(tradeId).subscribe(
        (response: any) => {
            if (response.success) {
                // Show a success message here
                alert('Trade cancellation successful');
                // Optionally, update the trade list or perform other actions
                this.fetchTradeData();
            } else {
                console.error('Error cancelling trade:', response.msg);
                // Show an error message if desired
                alert('Error cancelling trade: ' + response.msg);
            }
        },
        (error: any) => {
            console.error('Error cancelling trade', error);
            // Show an error message if desired
            alert('Error cancelling trade: ' + error.message);
        }
    );
}



deleteSell(id: any): void {
  this.restService.deleteSell(id).subscribe(
    (data: any) => {
      console.log(data);
    
      this.snackBar.open('Trade deleted successfully', 'Close', {
        duration: 3000, 
      });

     
      this.fetchTradeData();
    },
    (error: any) => {
      console.error('Error deleting trade:', error);
 
    }
  );
}




ngOnInit(): void {
  this.fetchTradeData();
} 


// sellAll() {
//   this.restService.sellAll().subscribe(
//     (response) => {
//       console.log('Contracts sold successfully', response);
//       this.responses = response;
//       // Handle success, e.g., update UI with the responses
//     },
//     (error) => {
//       console.error('Error selling contracts', error);
//       // Handle error, e.g., show an error message to the user
//     }
//   );
// }
sellAll(): void {
  this.restService.sellAll().subscribe(
    (response) => {
      console.log('Contracts sold successfully', response);
      this.responses = response;
      
      
      this.snackBar.open('Contracts sold successfully', 'Close', {
        duration: 3000, 
      });
      
      
    },
    (error) => {
      console.error('Error selling contracts', error);

      this.snackBar.open('Error selling contracts', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'], 
      });
      
      
    }
  );
}
}