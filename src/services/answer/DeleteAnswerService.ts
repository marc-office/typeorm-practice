import { Answers } from '@/entities/Answers'
import getRepository from 'typeorm'

export const deleteAnswer = async (questionId) => {
  const answerRepository = getRepository(Answers)
  const deleted = await answerRepository.delete({
    questionId: questionId
  })

  return deleted
}
