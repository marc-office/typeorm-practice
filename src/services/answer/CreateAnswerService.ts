import { Answers } from '@/entities/Answers'
import { staticHostingURL } from '@/utils/s3/S3Client'
import { getRepository } from 'typeorm'

export const createAnswer = async (questionId, ImagePath) => {
  const answerRepository = getRepository(Answers)
  const createdAnswer = await answerRepository.create({
    question: questionId,
    contentUrl: staticHostingURL + ImagePath
  })

  return createdAnswer
}
