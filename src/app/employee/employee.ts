import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class EmployeeComponent implements OnInit {

  employees: any[] = [];
  newEmployee = { employee_id: '', full_name: '', email: '', department: '' };
  error = '';
  loading = false;

  constructor(private api: Api) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.api.getEmployees().subscribe({
      next: (data: any[]) => {
        this.employees = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  addEmployee() {
    if (!this.newEmployee.employee_id ||
        !this.newEmployee.full_name ||
        !this.newEmployee.email ||
        !this.newEmployee.department) {
      this.error = 'Fill all fields';
      return;
    }

    this.api.addEmployee(this.newEmployee).subscribe({
      next: () => {
        this.newEmployee = { employee_id: '', full_name: '', email: '', department: '' };
        this.loadEmployees();
      },
      error: () => this.error = 'Failed to add employee'
    });
  }

  deleteEmployee(id: number) {
    this.api.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees()
    });
  }
}
