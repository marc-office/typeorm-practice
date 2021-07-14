import { Answers } from '@/entities/Answers'
import { NoDataError } from '@/types/Error/Common'
import { getRepository } from 'typeorm'

export const retrieveAnswer = async (id: string): Promise<Answers> => {
  const answerRepository = getRepository(Answers)
  const findAnswer = await answerRepository.findOne(id)

  if (!findAnswer) {
    throw NoDataError
  }

  return findAnswer
}
