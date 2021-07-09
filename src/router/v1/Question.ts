import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'

const questionRouter = Router()

questionRouter.post(
  '/question',
  RouterWrapper(async (req, res, next) => {})
)

export default questionRouter
