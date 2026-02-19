import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Employee } from './employee/employee';
import { Attendance } from './attendance/attendance';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule,Employee,Attendance],
  templateUrl: './app.html',
})
export class App {
  // app title signal
  protected readonly title = signal('HRMS Frontend');
}
