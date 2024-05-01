const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

//I'll need to work with Axios
//I need to use a POST method with Axios & Auth0
//CLI for the Log-In
//https://auth0.com/docs/api/authentication#social <-- Documentation for Auth0

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.

async function loadInquirer() {
    const module = await import('inquirer');
    return module.default;  // Accessing the default export of the module
}

// Using the dynamically imported Inquirer
async function mainMenu() {
    const inquirer = await loadInquirer();
    
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: ['Create Account', 'Log In']
        }
    ]).then(answers => {
        if (answers.action === 'Create Account') {
            createAccount();
        } else {
            logIn();
        }
    });
}
function createAccount() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Choose a username:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address:'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Choose a password:',
            mask: '*'
        },
        {
            type: 'password',
            name: 'confirmPassword',
            message: 'Confirm your password:',
            mask: '*'
        }
    ]).then(answers => {
        console.log('Account Created Successfully!');
        // Implement account creation logic here
    });
}

function logIn() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Enter your username:'
        },
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password:',
            mask: '*'
        }
    ]).then(answers => {
        console.log('Login Successful!');
        // Implement login logic here
    });
}

mainMenu();
