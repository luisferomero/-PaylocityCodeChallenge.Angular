import { Component } from '@angular/core';
import { dependent } from './models/dependent';
import { employee } from './models/employee';
import { deductionReport } from './models/deductionReport';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private httpClient: HttpClient) {
  }

  employee: employee = { name: "", salary: 52000, costOfBenefits: 1000, dependents: new Array<dependent>() };

  newDependent: dependent = { name: "", costOfBenefits: 500, dependentType: 1 };

  deductionReport: deductionReport = {
    totalPayCheckDeduction: 0,
    dependentsPayCheckDeduction: 0,
    employeePayCheckDeduction: 0,
    employeeAnnualDeduction: 0,
    dependentsAnnualDeduction: 0,
    totalAnnualDeduction: 0,
    employeePaycheckAfterDeductions: 0,
    employeeAnnualPayAfterDeductions: 0
  };

  dependentTypes = [{ value: 1, description: "Child" }, { value: 2, description: "Spouse" }];

  showTable = false;

  addDependent() {
    if (this.newDependent.name !== '') {
      this.employee.dependents.push(this.newDependent);
      this.newDependent = { name: "", costOfBenefits: 500, dependentType: 1 };
    }
  }

  removeDependent(index: number) {
    this.employee.dependents.splice(index, 1);
  }

  restartCalculation() {
    this.employee = { name: "", salary: 52000, costOfBenefits: 1000, dependents: new Array<dependent>() };
    this.showTable = false;
  }

  calculateDeductions() {

    this.httpClient.post("https://localhost:5001/api/Deductions", this.employee).subscribe(result => {
      console.log(result);
      this.deductionReport = result as deductionReport
      this.showTable = !this.showTable;

    }, err => {
      alert("Something got wrong");
      console.log(err);
    });
  }

}
