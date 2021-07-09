import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'

const answerRouter = Router()

answerRouter.post(
  '/answer',
  RouterWrapper(async (req, res, next) => {})
)

export default answerRouter
