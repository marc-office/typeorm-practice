import { Questions } from '@/entities/Questions'
import { APINotFoundError, NoDataError } from '@/types/Error/Common'
import { getRepository } from 'typeorm'

const retrieveQuestion = async (id: string): Promise<Questions> => {
  const questionRepository = getRepository(Questions)
  const findQuestion = await questionRepository.findOne(id)
  if (!findQuestion) {
    throw APINotFoundError
  }
  if (findQuestion.userId === null) {
    throw NoDataError
  }

  return findQuestion
}

export default retrieveQuestion
