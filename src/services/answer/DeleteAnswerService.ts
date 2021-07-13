import { Answers } from '@/entities/Answers'
import { getRepository } from 'typeorm'

export const deleteAnswer = async (answerId) => {
  const answerRepository = getRepository(Answers)
  const deleted = await answerRepository.delete({
    id: answerId
  })

  return deleted
}
