import * as express from 'express'

import auth from './Auth'
import answer from './Answer'
import question from './Question'

import { getConnection } from '@/utils/Database'
import { validateToken } from '@/utils/VerifyToken'
import RouterWrapper from '@/utils/RouterWrapper'
import { TokenNotExistsError, JWTInvalidError } from '@/types/Error/Auth'

const router = express.Router()

router.use(
  RouterWrapper(async (req, res, next) => {
    // if (!req.path.startsWith('/auth')) {
    //   const token = req.headers.authorization
    //   if (!token) throw TokenNotExistsError

    //   const verify = await validateToken(token)
    //   if (verify === false) throw JWTInvalidError

    //   await getConnection()
    // }
    if (!req.path.startsWith('/auth')) {
      await getConnection()
    }
    return next()
  })
)

router.use('/auth', auth)
router.use('/answers', answer)
router.use('/questions', question)

export default router
