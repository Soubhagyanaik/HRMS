import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class Api {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<any[]>(`${this.baseUrl}/employees/`);
  }

  addEmployee(employee: any) {
    return this.http.post(`${this.baseUrl}/employees/`, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/employees/${id}/`);
  }

  getAttendance() {
    return this.http.get<any[]>(`${this.baseUrl}/attendance/`);
  }

  addAttendance(attendance: any) {
    return this.http.post(`${this.baseUrl}/attendance/`, attendance);
  }
}
