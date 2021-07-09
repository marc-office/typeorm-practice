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
    if (!req.path.startsWith('/auth')) {
      const token = req.headers.token.toString()
      if (!token) throw TokenNotExistsError

      const verify = await validateToken(token)
      if (verify === false) throw JWTInvalidError

      if (Array.isArray(verify)) global.groups = verify
      await getConnection()
    }
    return next()
  })
)

router.use('/auth', auth)
router.use('/answer', answer)
router.use('/question', question)

export default router
