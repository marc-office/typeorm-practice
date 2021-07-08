import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'

export const getCognito = (id: string, password: string) => {
  const authenticationData = {
    Username: id,
    Password: password
  }
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  )
  const poolData: { UserPoolId: string; ClientId: string } = {
    UserPoolId: process.env.COGNITO_POOL_ID || 'UserPoolId is null',
    ClientId: process.env.COGNITO_CLIENT_ID || 'ClientId is null'
  }
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  const userData = {
    Username: id,
    Pool: userPool
  }
  return {
    cognitoUser: new AmazonCognitoIdentity.CognitoUser(userData),
    authenticationDetails
  }
}
