import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Employees
  getEmployees(): Observable<any> { return this.http.get(`${this.baseUrl}/employees/`); }
  addEmployee(emp: any): Observable<any> { return this.http.post(`${this.baseUrl}/employees/`, emp); }
  deleteEmployee(id: number): Observable<any> { return this.http.delete(`${this.baseUrl}/employees/${id}/`); }

  // Attendance
  getAttendance(): Observable<any> { return this.http.get(`${this.baseUrl}/attendance/`); }
  addAttendance(att: any): Observable<any> { return this.http.post(`${this.baseUrl}/attendance/`, att); }
  
}
