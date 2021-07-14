import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'
import upload from '@/utils/s3/multer'
import { v4 as uuid } from 'uuid'
import { s3Client } from '@/utils/s3/S3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { retrieveAnswer } from '@/services/answer/RetrieveAnswerService'
import { bucketName } from '@/utils/Common'
import { createAnswer } from '@/services/answer/CreateAnswerService'
import { FileValidationError } from '@/types/Error/Common'
import { createFile } from '@/services/FileService'
import { ensureAuthenticated } from '@/middlewares/EnsureAuthenticated'
import { deleteAnswer } from '@/services/answer/DeleteAnswerService'
import retrieveQuestion from '@/services/question/RetrieveQuestionService'
import { updateAnswerFile } from '@/services/answer/UpdateAnswerService'
import { saveQuestionAnswer } from '@/services/question/UpdateQuestionService'
import { getRepository } from 'typeorm'
import { Answers } from '@/entities/Answers'

const answerRouter = Router()

// answerRouter.post('/:id', upload.single('photo'), (req, res) => {
//   console.log(req.params)
//   console.log(req.file)
//   return res.send('hello')
// })

answerRouter.post('/answerTest', async (req, res) => {
  const answerRepository = getRepository(Answers)
  await answerRepository.create({
    userId: res.locals.userId,
    contentUrl: 'this is content url'
  })

  return res.send('hello')
})

/*
  Create answer
*/
answerRouter.post(
  '/:id',
  ensureAuthenticated,
  upload.single('photo'),
  RouterWrapper(async (req, res, next) => {
    const fileName = req.file.originalname
    const fileSize = req.file.size
    const sub = fileName.split('.')
    const ext = sub[sub.length - 1]
    const mimeType = req.file.mimetype
    const _uuid = uuid()
    const key = _uuid + '.' + ext
    const params = {
      Bucket: bucketName, // The name of the bucket. For example, 'sample_bucket_101'.
      Key: key, // The name of the object. For example, 'sample_upload.txt'.
      Body: req.file.buffer
    }

    const s3Completed = await s3Client.send(new PutObjectCommand(params))
    if (!s3Completed) {
      console.log(s3Completed)
      throw FileValidationError
    }

    const createdFile = await createFile({
      uuid: _uuid,
      userId: res.locals.userId,
      name: fileName,
      size: fileSize,
      path: _uuid,
      mimeType: mimeType
    })
    // typeorm error handling in RouterWrapper

    const questionId = req.params.id
    const answer = await createAnswer(
      res.locals.userId,
      questionId,
      createdFile.path
    ) // not saved yet

    const updatedQuestion = await saveQuestionAnswer({
      id: questionId,
      answer: answer
    })

    // const answerRepository = getRepository(Answers)
    // answerRepository.save(answer)

    // createdFile.answer = answer
    // answer.file = createdFile

    // const question = await retrieveQuestion(questionId)
    // question.answers = answer

    await updateAnswerFile(answer.id, createdFile)

    return res.status(201).json(answer)
  })
)

/*
  List answers
*/
answerRouter.get(
  '/',
  RouterWrapper(async (req, res, next) => {
    const { id } = req.body as {
      id: string
    }
    const answer = await retrieveAnswer(id)
    return res.status(200).json(answer)
  })
)

/*
  Retrieve answer
*/
answerRouter.get(
  '/:id',
  RouterWrapper(async (req, res, next) => {
    const id = req.params.id
    const findAnswer = await retrieveAnswer(id)

    return res.status(200).json(findAnswer)
  })
)

/*
  Update answer
*/
answerRouter.put('/:id', (req, res) => {
  // 1. findAnswerById
  // 2. getImagePath from the answer object
  // 3. put image? or delete image and create image
  // 4. assign image path to the answer object to be updated
})

/*
  Delete answer
 */
answerRouter.delete(
  '/:id',
  RouterWrapper(async (req, res, next) => {
    const answerId = req.params.id
    await deleteAnswer(answerId)

    return res.status(204).json({
      message: 'successfully deleted answer'
    })
  })
)

export default answerRouter
