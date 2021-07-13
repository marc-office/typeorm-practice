import { Answers } from '@/entities/Answers'
import { getRepository } from 'typeorm'

export const listAnswers = async () => {
  const answerRepository = getRepository(Answers)
  const answers = await answerRepository.find()

  return answers
}
