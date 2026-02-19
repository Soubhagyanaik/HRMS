import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css']
})
export class AttendanceComponent implements OnInit {

  employees: any[] = [];
  attendanceRecords: any[] = [];
  newAttendance = { employee: 0, status: 'Present' };
  error = '';

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadAttendance();
  }

  loadEmployees() {
    this.api.getEmployees().subscribe({
      next: (data: any[]) => this.employees = data,
      error: () => this.error = 'Failed to load employees'
    });
  }

  loadAttendance() {
    this.api.getAttendance().subscribe({
      next: (data: any[]) => this.attendanceRecords = data,
      error: () => this.error = 'Failed to load attendance'
    });
  }

  addAttendance() {
    if (!this.newAttendance.employee) {
      this.error = 'Select employee';
      return;
    }

    this.api.addAttendance(this.newAttendance).subscribe({
      next: () => {
        this.newAttendance = { employee: 0, status: 'Present' };
        this.loadAttendance();
      },
      error: () => this.error = 'Failed to add attendance'
    });
  }
}
