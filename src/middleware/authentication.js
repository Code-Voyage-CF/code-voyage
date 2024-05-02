const express = require('express');
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

//TODO:
//I'll need to work with Axios
//I need to use a POST method with Axios & Auth0
//CLI for the Log-In
//https://auth0.com/docs/api/authentication#social <-- Documentation for Auth0

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.

async function loadInquirer() {
    const module = await import('inquirer');
    return module.default;
}

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

async function createAccount() {
    const inquirer = await loadInquirer();

    const { email } = await inquirer.prompt([
        {
            type: 'input',
            name: 'email',
            message: 'Enter your email address:',
            validate: input => input ? true : "Email cannot be empty."
        }
    ]);

    const { password, confirmPassword } = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Choose a password:',
            mask: '*',
            validate: input => input.length >= 1 ? true : "Password cannot be empty."
        },
        {
            type: 'password',
            name: 'confirmPassword',
            message: 'Confirm your password:',
            mask: '*',
            validate: input => input === password ? true : "Passwords do not match."
        }
    ]);

    console.log(`Email: ${email}, Password: ${password} (confirmed: ${confirmPassword})`);
    console.log('Account Created Successfully!');
}

async function logIn() {
    const inquirer = await loadInquirer();

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
    });
}

mainMenu();