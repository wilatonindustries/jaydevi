import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestService {
  tradedelete(tradeId: number) {
    throw new Error('Method not implemented.');
  }
  userId: any;
  exit(tradeId: number) {
    throw new Error('Method not implemented.');
  }
  url = 'https://globaltrading.wilatonprojects.com/';

  adduser: any;
  baseUrl: any;

  constructor(private _http: HttpClient) { }

  login(user: any) {
    return this._http.post(this.url + '/login', user);
  }

  Alluser() {
    return this._http.get(this.url + '/Alluser');
  }

  addUser(userData: any) {
    const url = `${this.url}/adduser`; // Construct the full URL
    return this._http.post(url, userData); // Send a

}

regi_master(userData: any) {
  const url = `${this.url}/regi_master`; // Construct the full URL
  return this._http.post(url, userData); // Send a

}

buy(userData: any) {
  const url = `${this.url}/buy`; // Construct the full URL
  return this._http.post(url, userData); // Send a

}


fall(userData: any) {
  // Construct the full URL and make a POST request
  const url = `${this.url}/fall`;
  return this._http.post(url, userData);
}


cancel(tradeId: number): Observable<any> {
  return this._http.post(`${this.url}/cancel`, { user_id: this.userId, contract_id: tradeId });
}



alltrader() {
  const url = `${this.url}/alltrader`; // Replace with your API endpoint
  return this._http.get(url);
}


deleteSell(id: any): Observable<any> {
  return this._http.delete(`${this.url}/deletesell/${id}`);
}

deleteuser(id: any): Observable<any>{
  return this._http.delete(`${this.url}/deleteuser/${id}`);
}

sellAll(): Observable<any>{
  return this._http.get(`${this.url}/sellAll`);
}

   // login(user : any) {
  //  return this._http.post(this.url + '/login', user);
  //     }


}