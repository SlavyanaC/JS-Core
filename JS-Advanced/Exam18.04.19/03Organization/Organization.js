class Organization {
    constructor(name, budget) {
        this.name = name;
        this.budget = budget;
        this.employees = [];
        this._departmentsBurget = {
            'marketing': this.budget * 0.4,
            'finance': this.budget * 0.25,
            'production': this.budget * 0.35,
        }
    }

    get departmentsBudget() {
        return this._departmentsBurget;
    }

    add(employeeName, department, salary) {
        if (this.departmentsBudget[department] >= salary) {
            let employee = {employeeName, department, salary};
            this.employees.push(employee);
            this.departmentsBudget[department] -= salary;
            return `Welcome to the ${department} team Mr./Mrs. ${employeeName}.`;
        } else {
            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${this.departmentsBudget[department]}.`;
        }
    }

    employeeExists(employeeName) {
        if (this.employees.some(e => e.employeeName === employeeName)) {
            let employee = this.employees.find(e => e.employeeName === employeeName);
            return `Mr./Mrs. ${employee.employeeName} is part of the ${employee.department} department.`;
        } else {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }
    }

    leaveOrganization(employeeName) {
        if (this.employees.some(e => e.employeeName === employeeName)) {
            let employee = this.employees.find(e => e.employeeName === employeeName);
            this.departmentsBudget[employee.department] += employee.salary;
            this.employees = this.employees.filter(e => e.employeeName !== employee.employeeName);
            return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employee.employeeName}.`
        } else {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }
    }

    status() {
        let result = `${this.name.toUpperCase()} DEPARTMENTS:`;

        result += this._getDepartmentStatus('Marketing');
        result += this._getDepartmentStatus('Finance');
        result += this._getDepartmentStatus('Production');

        return result;
    }

    _getDepartmentStatus(department) {
        let result = '';

        let count = this.employees.filter(e => e.department === department.toLowerCase()).length;
        result += (`\n${department} | Employees: ${count}: `);
        let employees = [];
        this.employees.filter(e => e.department === department)
            .sort((a, b) => b.salary - a.salary)
            .forEach(e => employees.push(e.employeeName));
        if (employees.length > 0) {
            result += employees.join(', ') + ' ';
        }
        result += `| Remaining Budget: ${this.departmentsBudget[department]}`;

        return result;
    }
}

(() => {
    let organization = new Organization('SoftUni', 20000);
    console.log(organization.add('Peter', 'marketing', 1200));
    console.log(organization.add('John', 'marketing', 1201));
    console.log(organization.add('Max', 'finance', 1500));
    console.log(organization.add('Scot', 'finance', 1800));
    console.log(organization.add('Robert', 'production', 2000));
    console.log(organization.employeeExists('Peter'));
    console.log(organization.employeeExists('John'));
    console.log(organization.status());
    console.log(organization.leaveOrganization('Peter'));
    console.log(organization.leaveOrganization('John'));
    console.log(organization.leaveOrganization('Peter'));
})();