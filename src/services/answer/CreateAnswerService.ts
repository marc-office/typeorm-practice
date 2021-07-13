import { Answers } from '@/entities/Answers'
import getRepository from 'typeorm'

export const createAnswer = async (questionId, ImageUUID) => {
  const answerRepository = getRepository(Answers)
  const createdAnswer = await answerRepository.create({
    questionId: questionId,
    ImageUUID: ImageUUID
  })

  return createdAnswer
}
