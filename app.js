const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const emplyArr = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addManager() {
    console.log("Let's first enter in the team manager's information.");
    inquirer.prompt([
    {
        type:"input",
        message:"What is the team manager's name?",
        name:"name"
    },
    {
        type:"input",
        message:"What is the team manager's id number?",
        name:"id"
    },
    {
        type:"input",
        message:"What is the team manager's email?",
        name:"email"
    },
    {
        type:"input",
        message:"What is the team manager's office number?",
        name:"officeNumber"
    }]).then(function(response){
        createManager(response);
        console.log("Now, let's enter your first employee.");
        addEmployee();
    })
}

addManager();

function addEmployee() {
    inquirer.prompt([{
        type:"list",
        message:"What is the job role of the employee you want to enter?",
        choices: ["Engineer","Intern"],
        name:"role"
    }]).then(function({role}){
        switch (role){
            case "Engineer":
                addEngineer();
                break
            case "Intern":
                addIntern();
                break
        }
    })
}

function addEngineer(){
    inquirer.prompt([{
        type:"input",
        message:"What is this engineer's name?",
        name:"name"
    },
    {
        type:"input",
        message:"What is this engineer's id number?",
        name:"id"
    },
    {
        type:"input",
        message:"What is this engineer's email?",
        name:"email"
    },
    {
        type:"input",
        message:"What is this Engineer's Github username?",
        name:"GitHubUser"
    }]).then (function(responses){
        createEngineer(responses);
        whatNext();
    })
}

function addIntern(){
    inquirer.prompt([{
        type:"input",
        message:"What is this intern's name?",
        name:"name"
    },
    {
        type:"input",
        message:"What is this intern's id number?",
        name:"id"
    },
    {
        type:"input",
        message:"What is this intern's email?",
        name:"email"
    },
    {
        type:"input",
        message:"What school does this intern attend?",
        name:"school"
    }]).then (function(responses){
        createIntern(responses);
        whatNext();
    })
}

function whatNext() {
    inquirer.prompt([{
        type:"list",
        message:"What would you like to do now?",
        choices: ["Enter in another employee", "Finish entering in employees and render the team page!"],
        name:"choice"
    }]).then (function({choice}){
        switch(choice){
            case "Enter in another employee":
                addEmployee();
                break
            case "Finish entering in employees and render the team page!":
                makeTeamHTML(emplyArr);
                break
        }
    })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function createManager (data){
    const theManager = new Manager (data.name,data.id,data.email,data.officeNumber)
    emplyArr.push(theManager)
}
function createEngineer (data){
    const theEngineer = new Engineer (data.name,data.id,data.email,data.GitHubUser)
    emplyArr.push(theEngineer)
}
function createIntern (data){
    const theIntern = new Intern (data.name,data.id,data.email,data.school)
    emplyArr.push(theIntern)
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function makeTeamHTML(emplyArr) {
    fs.writeFile(outputPath, render(emplyArr), function(err) {
        err?console.log(err):console.log("Team html rendered. Have a look!");
    })
}


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```