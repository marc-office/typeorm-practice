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
import {
  ensureAuthenticated,
  ensureAuthenticated
} from '@/middlewares/EnsureAuthenticated'
import { deleteAnswer } from '@/services/answer/DeleteAnswerService'
import { updateAnswerFile } from '@/services/answer/UpdateAnswerService'
import { saveQuestionAnswer } from '@/services/question/UpdateQuestionService'
import { getRepository } from 'typeorm'
import { Answers } from '@/entities/Answers'
import { listAnswers } from '@/services/answer/ListAnswersService'
import { S3Error } from '@/types/Error/S3'

const answerRouter = Router()

// answerRouter.post('/answerTest', async (req, res) => {
//   const answerRepository = getRepository(Answers)
//   await answerRepository.create({
//     userId: res.locals.userId,
//     contentUrl: 'this is content url'
//   })

//   return res.send('hello')
// })

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
      Bucket: bucketName,
      Key: key,
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

    await saveQuestionAnswer({
      id: questionId,
      answer: answer
    })

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
    const { questionId } = req.body as {
      questionId: string
    }
    const answer = await listAnswers(questionId)
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
answerRouter.put(
  '/:id',
  ensureAuthenticated,
  upload.single('photo'),
  RouterWrapper(async (req, res) => {
    // 1. findAnswerById
    const answerId = req.params.id
    const findAnswer = await retrieveAnswer(req.params.id)
    // 2. getImagePath from the answer object
    const key = findAnswer.contentUrl
    // 3  delete image and create image
    const deleted = await deleteObject(deleteParams)
    if (!deleted) {
      throw S3Error
    }
    const uploaded = await putObject(uploadParams)
    if (!uploaded) {
      throw S3Error
    }

    // 4. assign image path to the answer object to be updated
    const file = await createFile(fileInfo)
    findAnswer.file = file
    updateAnswerFile(answerId, file)
  })
)

/*
  Delete answer
 */
answerRouter.delete(
  '/:id',
  ensureAuthenticated,
  RouterWrapper(async (req, res, next) => {
    const answerId = req.params.id
    console.log('current User ID is: ' + res.locals.userId)
    await deleteAnswer(answerId, res.locals.userId)

    return res.status(200).json({
      message: '????????? ??????????????? ?????????????????????'
    })
  })
)

export default answerRouter
