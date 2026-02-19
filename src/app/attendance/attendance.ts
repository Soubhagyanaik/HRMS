import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-attendance',
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
  standalone: true
})
export class Attendance {
     employees: any[] = [];
  attendanceRecords: any[] = [];
  loading = false;
  error = '';

  newAttendance = { employee:'', status:'Present' };

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAttendance();
  }

  loadEmployees() {
    this.api.getEmployees().subscribe({
      next: (data: any[]) => this.employees = data,
      error: (err: any) => this.error = "Failed to load employees"
    });
  }

  loadAttendance() {
    this.loading = true;
    this.api.getAttendance().subscribe({
      next: (data: any[]) => { this.attendanceRecords = data; this.loading = false; },
      error: (err: any) => { this.error = "Failed to load attendance"; this.loading = false; }
    });
  }

  addAttendance() {
    if (!this.newAttendance.employee) { this.error = "Select employee"; return; }
    this.api.addAttendance(this.newAttendance).subscribe({
      next: (res: any) => {
        alert("Attendance marked successfully!");
        this.newAttendance = { employee:'', status:'Present' };
        this.loadAttendance();
      },
      error: (err: any) => { this.error = "Failed to add attendance"; }
    });
  }
}
