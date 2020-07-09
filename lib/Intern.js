// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(empName, empId, empEmail, school){
        const name = empName;
        const id = empId;
        const email = empEmail;

        super(name, id, email);
        this.school = school
    }
    getRole(){
        return "Intern"
    }
    getSchool(){
        return this.school
    }
}

module.exports = Intern