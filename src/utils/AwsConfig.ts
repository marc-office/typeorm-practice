// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
const cognitoAttributeList: any[] = []

const poolData: { UserPoolId: string; ClientId: string } = {
  UserPoolId: process.env.COGNITO_POOL_ID || 'pool id is empty',
  ClientId: process.env.COGNITO_CLIENT_ID || 'client id is empty'
}

// return key, value pair for cognitoAttributesList
const attributes = (key: string, value: string) => {
  return {
    Name: key,
    Value: value
  }
}

function setCognitoAttributeList (email: string) {
  const attributeList = []
  attributeList.push(attributes('email', email))
  attributeList.forEach((element) => {
    cognitoAttributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute(element)
    )
  })
}

function getCognitoAttributeList () {
  return cognitoAttributeList
}

function getCognitoUser (email: string) {
  const userData = {
    Username: email,
    Pool: getUserPool()
  }
  return new AmazonCognitoIdentity.CognitoUser(userData)
}

function getUserPool () {
  return new AmazonCognitoIdentity.CognitoUserPool(poolData)
}

function getAuthDetails (email: string, password: string) {
  const authenticationData = {
    Username: email,
    Password: password
  }
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)
}

interface DecodedToken {
  email: string
  exp: number
  // eslint-disable-next-line camelcase
  auth_time: number
  // eslint-disable-next-line camelcase
  token_use: string
  sub: string
}

function decodeJWTToken (token: { idToken: string }) {
  // eslint-disable-next-line camelcase
  const { email, exp, auth_time, token_use, sub } = jwt_decode(
    token.idToken
  ) as DecodedToken
  return { token, email, exp, uid: sub, auth_time, token_use }
}

export {
  getCognitoAttributeList,
  getUserPool,
  getCognitoUser,
  setCognitoAttributeList,
  getAuthDetails,
  decodeJWTToken
}
