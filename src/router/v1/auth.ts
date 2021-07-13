import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'
import * as AwsConfig from '@/utils/AwsConfig'
import { getCognito } from 'src/utils/Cognito'
import { AWSonFailure } from '@/types/Error/Index'
import { ensureAuthenticated } from '@/middlewares/EnsureAuthenticated'

const authRouter = Router()

authRouter.post(
  '/signup',
  RouterWrapper(async (req, res, next) => {
    const { email, password } = req.body as unknown as {
      email: string
      password: string
    }
    AwsConfig.setCognitoAttributeList(email)
    AwsConfig.getUserPool().signUp(
      email,
      password,
      AwsConfig.getCognitoAttributeList(),
      [],
      function (err, result) {
        if (err) {
          return res.send({ statusCode: 422, response: err })
        }
        if (result) {
          const response = {
            username: result.user.getUsername(),
            userConfirmed: result.userConfirmed
          }
          res.send({ statusCode: 201, response: response })
        }
      }
    )
  })
)

authRouter.post(
  '/verify',
  RouterWrapper(async (req, res, next) => {
    const { email, code } = req.body as unknown as {
      email: string
      code: string
    }
    AwsConfig.getCognitoUser(email).confirmRegistration(
      code,
      true,
      (err: Error, result: any) => {
        if (err) {
          res.send({ statusCode: 422, response: err })
        }
        res.send({ statusCode: 200, response: result })
      }
    )
  })
)

authRouter.post(
  '/signin',
  RouterWrapper(async (req, res, next) => {
    let token = ''

    console.log(req.body)
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

authRouter.post('/ensureAuthenticated', ensureAuthenticated, (req, res) => {
  res.send('authenticated')
})

export default authRouter
