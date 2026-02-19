from django.db import models
from employees.models import Employee

class Attendance(models.Model):
    STATUS_CHOICES = [('Present','Present'), ('Absent','Absent')]
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    def __str__(self):
        return f"{self.employee.full_name} - {self.date} - {self.status}"
