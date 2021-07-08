// import AWS from 'aws-sdk';
import jwt_decode from 'jwt-decode';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
let cognitoAttributeList: any[] = [];

const poolData: {UserPoolId: string, ClientId: string} = { 
    UserPoolId : process.env.COGNITO_POOL_ID || "pool id is empty",
    ClientId : process.env.COGNITO_CLIENT_ID || "client id is empty"
};

// return key, value pair for cognitoAttributesList
const attributes = (key: string, value: string) => { 
  return {
    Name : key,
    Value : value
  }
};

function setCognitoAttributeList(email: string) {
  let attributeList = [];
  attributeList.push(attributes('email',email));
  attributeList.forEach(element => {
    cognitoAttributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute(element));
  });
}

function getCognitoAttributeList() {
  return cognitoAttributeList;
}

function getCognitoUser(email: string) {
  const userData = {
    Username: email,
    Pool: getUserPool()
  };
  return new AmazonCognitoIdentity.CognitoUser(userData);
}

function getUserPool(){
  return new AmazonCognitoIdentity.CognitoUserPool(poolData);
}

function getAuthDetails(email: string, password: string) {
  var authenticationData = {
    Username: email,
    Password: password,
   };
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
}

// function initAWS (region = process.env.AWS_COGNITO_REGION, identityPoolId = process.env.AWS_COGNITO_IDENTITY_POOL_ID) {
//   AWS.config.region = region; // Region
//   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: identityPoolId,
//   });
// }

function initAWS() {
    return;
}

function decodeJWTToken(token: { idToken: string; }) {
  const { email, exp , auth_time , token_use, sub } = jwt_decode(token.idToken) as DecodedToken;
  return { token, email, exp, uid: sub, auth_time, token_use };
}

interface DecodedToken {
  email: string,
  exp: number,
  auth_time: number,
  token_use: string,
  sub: string
}


export {
  initAWS,
  getCognitoAttributeList,
  getUserPool,
  getCognitoUser,
  setCognitoAttributeList,
  getAuthDetails,
  decodeJWTToken,
}