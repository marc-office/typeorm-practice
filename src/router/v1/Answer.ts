import { Router } from 'express'
import RouterWrapper from 'src/utils/RouterWrapper'
import upload from '@/utils/s3/multer'
import { v4 as uuid } from 'uuid'
import { s3Client } from '@/utils/s3/S3Client'
import { PutObjectCommand } from '@aws-sdk/client-s3'

const answerRouter = Router()

/*
{
  body: {
    questionId: "12345678-1234-1234-1234-123456789012",
    contentUrl: "this is answer's content"
  }
}
*/

answerRouter.post(
  '/',
  upload.single('photo'),
  RouterWrapper(async (req, res, next) => {
    if (req.file !== undefined) {
      res.end()
      const ext = '.jpg'
      const key = req.file.originalname + uuid() + ext
      const params = {
        Bucket: 'webmodule-dungdung', // The name of the bucket. For example, 'sample_bucket_101'.
        Key: key, // The name of the object. For example, 'sample_upload.txt'.
        Body: req.file.buffer
      }

      try {
        const results = await s3Client.send(new PutObjectCommand(params))
        console.log(
          'Successfully created ' +
            params.Key +
            ' and uploaded it to ' +
            params.Bucket +
            '/' +
            params.Key
        )

        if (results) {
          console.log(results)
          // const answer = createAnswer(results)
        }
        return results // For unit tests.
      } catch (e) {
        console.log(e)
      }
    }
  })
)

answerRouter.get(
  '/',
  RouterWrapper(async (req, res, next) => {
    const { id } = req.body as {
      id: string
    }
    const answer = retrieveAnswer(id)
    return res.status(200).json(answer)
  })
)

answerRouter.get('/:id', (req, res) => {
  console.log(req.params)
})

answerRouter.put('/:id', (req, res) => {
  // 1. findAnswerById
  // 2. getImagePath from the answer object
  // 3. put image? or delete image and create image
  // 4. assign image path to the answer object to be updated
})

export default answerRouter
