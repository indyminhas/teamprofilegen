// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(empName, empId, empEmail, GitHubUser){
        const name = empName;
        const id = empId;
        const email = empEmail;

        super(name, id, email);
        this.github = GitHubUser
    }
    getRole(){
        return "Engineer"
    }
    getGithub(){
        return this.github
    }
}

module.exports = Engineer