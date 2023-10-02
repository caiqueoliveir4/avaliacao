import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private apiUrl = 'https://dummyapi.io/data/v1/user';
  private apiKey = '64ed062e4340d229095be2de'; 

  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'app-id': this.apiKey
    });
  }

  getUsers(pageSize: number, pageIndex: number): Observable<any> {
    const params = new HttpParams()
      .set('page', pageSize.toString())
      .set('limit', pageIndex.toString());

    return this.http.get<any>(`${this.apiUrl}`, { headers: this.getHeaders(), params });
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers: this.getHeaders() });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, userData, { headers: this.getHeaders() });
  }

  updateUser(userId: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, userData, { headers: this.getHeaders() });
  }
  
  deleteUser(userId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId.id}`, { headers: this.getHeaders() });
  }

}
