import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'
import CreateQuestionService from '@/services/question/CreateQuestionService'
import { Users } from '@/entities/Users'
import { Questions } from '@/entities/Questions'
import RetrieveQuestionService from '@/services/question/RetrieveQuestionService'
import UpdateQuestionService from '@/services/question/UpdateQuestionService'
import ensureAuthenticated from '@/middlewares/EnsureAuthenticated'
import DeleteQuestionService from '@/services/question/DeleteQuestionService'
import ListQuestionsService from '@/services/question/ListQuestionsService'
import { questionSize } from '@/utils/Common'

interface ICreateReturnType {
  user: Users
  question: Questions
}

const questionRouter = Router()

/*
Create, Delete, Update 작업에는 모두 cognito-user-token 필요하므로,
req.user 객체의 id property 에 실어 보내주셔야 합니다.
*/

/*
Create question
Request 포맷
 {
  body: {
    userId: string
    content: string
  }
 }
 */
questionRouter.post(
  '/questions',
  ensureAuthenticated,
  RouterWrapper(async (req, res, next) => {
    const { user, content } = req.body as unknown as {
      user: Users
      content: string
    }
    const createQuestionService = new CreateQuestionService()
    let created: ICreateReturnType
    try {
      createQuestionService
        .execute({
          userId: user.id,
          content: content
        })
        .then((data) => (created = data))
    } catch (e) {
      return res.status(404).json('아이디와 일치하는 유저가 존재하지 않습니다.')
    }
    return res.status(201).json(created)
  })
)

/*
List 3 questions as default size
If there is query string 'req.params.size',
return as the size
 */
questionRouter.get(
  '/questions/list',
  RouterWrapper(async (req, res) => {
    const listQuestionService = new ListQuestionsService()
    const size = req.params.size
      ? Number.parseInt(req.params.size)
      : questionSize

    try {
      const findQuestion = listQuestionService.execute(size)
      return res.status(200).json(findQuestion)
    } catch (e) {
      res.status(e.status).json(e)
    }
  })
)

/*
Retrieve question
Request 포맷
 {
  user: {
    id: cognito-token-string
  } => optional 로그인 하지 않아도 조회는 가능
  body: {
    userId: string
    content: string
  }
 }
 */
questionRouter.get(
  '/questions',
  RouterWrapper(async (req, res) => {
    const retrieveQuestionService = new RetrieveQuestionService()
    const { question } = req.body as {
      question: Questions
    }

    try {
      const findQuestion = retrieveQuestionService.execute(question)
      return res.status(200).json(findQuestion)
    } catch (e) {
      res.status(404).json(e)
    }
  })
)

/*
Update question
Request 포맷
 {
  user: {
    id: cognito-token-string
  }
  body: {
    id: string
    userId: string
    content: string
  } // Question Entity 형태로 body object 에 전달
 }
 */
questionRouter.put(
  '/questions',
  ensureAuthenticated,
  RouterWrapper(async (req, res, next) => {
    try {
      const updateQuestionService = new UpdateQuestionService()
      const { question } = req.body as {
        question: Questions
      }
      const updatedQuestion = updateQuestionService.execute({
        id: question.id,
        userId: req.user.id,
        content: question.content
      })
      return res.status(200).json(updatedQuestion)
    } catch (e) {
      return res.status(e.status).json(e)
    }
  })
)

/*
Delete question
Request 포맷
 {
  user: {
    id: cognito-token-string
  }
  body: {
    userId: string
    id: string
  } // Question Entity 형태로 body object 에 전달
 }
 */
questionRouter.delete(
  '/questions',
  ensureAuthenticated,
  RouterWrapper(async (req, res, next) => {
    try {
      const deleteQuestionService = new DeleteQuestionService()
      const userId = req.user.id
      const { question } = req.body as {
        question: Questions
      }
      deleteQuestionService.execute({
        userId: userId,
        id: question.id
      })
      return res.status(204).json({
        message: '질문이 삭제되었습니다.'
      })
    } catch (e) {
      return res.status(e.status).json(e)
    }
  })
)

export default questionRouter
