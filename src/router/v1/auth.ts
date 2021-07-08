import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js'
import { AWSonFailure } from 'src/types/Error/index'

const authRouter = Router()

const getCognito = (id: string, password: string) => {
  const authenticationData = {
    Username: id,
    Password: password
  }
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  )
  const poolData: {UserPoolId: string, ClientId: string} = {
    UserPoolId: process.env.COGNITO_POOL_ID || "UserPoolId is null",
    ClientId: process.env.COGNITO_CLIENT_ID || "ClientId is null"
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

authRouter.post(
  '/signin',
  RouterWrapper(async (req, res, next) => {
    let token = ''
    const { id, password } = req.body as unknown as {
      id: string
      password: string
    }
    const { cognitoUser, authenticationDetails } = getCognito(id, password)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        token = result.getAccessToken().getJwtToken()
        return res.status(200).json({ token })
      },
      onFailure: AWSonFailure(res),
      newPasswordRequired: () => {
        return res.status(200).json({ token, newPasswordRequired: true })
      }
    })
  })
)

export default authRouter;