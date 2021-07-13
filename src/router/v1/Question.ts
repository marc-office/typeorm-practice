import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'
import { ensureAuthenticated } from '@/middlewares/EnsureAuthenticated'
import { questionSize } from '@/utils/Common'
import createQuestion from '@/services/question/CreateQuestionService'
import listQuestions from '@/services/question/ListQuestionsService'
import retrieveQuestion from '@/services/question/RetrieveQuestionService'
import updateQuestion from '@/services/question/UpdateQuestionService'
import { deleteQuestion } from '@/services/question/DeleteQuestionService'

// interface IDeleteQuestion {
//   id: string
//   userId: string
// }

const questionRouter = Router()

/*
Create, Delete, Update 작업에는 모두 cognito-user-token 필요하므로,
headers 의 Authorization 키 값에 실어 보내주셔야 합니다.
*/

/*
Create question
Request 포맷
  {
  headers: {
    Authorization: "cognito-token-string"
  }
  body: {
    userId: string
    content: string
  }
 }
 */
questionRouter.post(
  '/',
  ensureAuthenticated,
  RouterWrapper(async (req, res, next) => {
    const { content } = req.body as unknown as {
      content: string
    }
    // createQuestionService
    //   .execute({
    //     userId: user.id,
    //     content: content
    //   })
    //   .then((data) => (created = data))
    const question = await createQuestion({
      userId: res.locals.user.username,
      content: content
    })
    return res.status(201).json(question)
  })
)

/*
List 3 questions as default size
If there is query string 'req.params.size',
return as the size
 */
questionRouter.get(
  '/list',
  RouterWrapper(async (req, res) => {
    const size = req.params.size
      ? Number.parseInt(req.params.size)
      : questionSize

    const questions = await listQuestions(size)
    return res.status(200).json(questions)
  })
)

/*
Retrieve question
Request 포맷
 {
  body: {
    userId: string
    content: string
  }
 }
 */
questionRouter.get(
  '/',
  RouterWrapper(async (req, res) => {
    const { id } = req.body as {
      id: string
    }
    const findQuestion = await retrieveQuestion(id)
    return res.status(200).json(findQuestion)
  })
)

/*
Update question
Request 포맷
 {
  headers: {
    Authorization: "cognito-token-string"
  }
  body: {
    id: string
    userId: string
    content: string
  } // Question Entity 형태로 body object 에 전달
 }
 */
questionRouter.put(
  '/',
  ensureAuthenticated,
  RouterWrapper(async (req, res, next) => {
    const { id, userId, content } = req.body as {
      id: string
      userId: string
      content: string
    }
    const updatedQuestion = await updateQuestion({
      id: id,
      userId: userId,
      content: content
    })
    return res.status(200).json(updatedQuestion)
  })
)

/*
Delete question
Request 포맷
 {
  headers: {
    Authorization: "cognito-token-string"
  }
  body: {
    userId: string
    id: string
  } // Question Entity 형태로 body object 에 전달
 }
 */
questionRouter.delete(
  '/',
  ensureAuthenticated,
  RouterWrapper(async (req, res, next) => {
    const { id, userId } = req.body as {
      id: string
      userId: string
    }

    await deleteQuestion({
      id: id,
      userId: userId.toString()
    })
    return res.status(204).json({
      message: '질문이 삭제되었습니다.'
    })
  })
)

export default questionRouter
