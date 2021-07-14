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

  console.log(question)

  if (!question) {
    throw NoDataError
  }

  if (question && userId !== question.userId) {
    throw UnauthorizedResource
  }

  const result = await questionsRepository.remove(question)
  if (result.id === undefined) {
    return true
  }
}

export { deleteQuestion }
