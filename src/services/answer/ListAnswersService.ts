import { Answers } from '@/entities/Answers'
import getRepository from 'typeorm'

export const listAnswers = async (questionId) => {
  const answerRepository = getRepository(Answers)
  const createdAnswer = await answerRepository.find(questionId)

  return createdAnswer
}
