import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
  standalone: true
})
export class Employee {

  
  employees: any[] = [];
  loading = false;
  error = '';

  newEmployee = { employee_id: '', full_name: '', email: '', department: '' };

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;
    this.api.getEmployees().subscribe({
      next: (data: any) => { this.employees = data; this.loading = false; },
      error: () => { this.error = 'Failed to load employees'; this.loading = false; }
    });
  }

  addEmployee() {
    if (!this.newEmployee.employee_id || !this.newEmployee.full_name || !this.newEmployee.email || !this.newEmployee.department) {
      this.error = 'Please fill all fields';
      return;
    }

    this.api.addEmployee(this.newEmployee).subscribe({
      next: () => {
        alert('Employee added successfully!');
        this.newEmployee = { employee_id: '', full_name: '', email: '', department: '' };
        this.loadEmployees();
      },
      error: () => (this.error = 'Failed to add employee')
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.api.deleteEmployee(id).subscribe({
        next: () => { alert('Employee deleted successfully!'); this.loadEmployees(); },
        error: () => (this.error = 'Failed to delete employee')
      });
    }
  }

}
