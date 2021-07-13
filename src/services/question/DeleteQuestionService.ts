import { Questions } from '@/entities/Questions'
import { NoDataError, UnauthorizedResource } from '@/types/Error/Common'
import { getRepository } from 'typeorm'

interface Request {
  userId: string
  id: string
}

const deleteQuestion = async ({ userId, id }: Request): Promise<Boolean> => {
  const questionsRepository = getRepository(Questions)
  const question = await questionsRepository.findOne({
    userId: userId,
    id: id
  })

  if (userId !== question.userId) {
    throw UnauthorizedResource
  }

  if (!question) {
    throw NoDataError
  }

  const result = await questionsRepository.remove(question)
  if (result.id === undefined) {
    return true
  }
}

export { deleteQuestion }
