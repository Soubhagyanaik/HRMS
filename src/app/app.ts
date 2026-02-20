import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee';
import { AttendanceComponent } from './attendance/attendance';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeComponent, AttendanceComponent,RouterOutlet],
  templateUrl: './app.html'
})
export class AppComponent {}
