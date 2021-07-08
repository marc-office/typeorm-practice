'use strict';
global.fetch = require('node-fetch')
import 'dotenv/config';

import * as Cognito from './signup';

const body = {
   email: "onexlab.io@gmail.com",
   password: "Test123456!"
};

async function Signup() {
    const response = await Cognito.signUp(body.email,body.password);
    console.log(response);
}

async function Verify() {
    const response = await Cognito.verify(body.email,'654769');
    console.log(response);
}

async function SignIn() {
    const response = await Cognito.signIn(body.email,body.password);
    console.log(response);
}

// Signup();
// Verify();
SignIn();