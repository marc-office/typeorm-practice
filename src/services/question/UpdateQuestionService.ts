import { Questions } from '@/entities/Questions'
import { NoDataError, UnauthorizedResource } from '@/types/Error/Common'
// import { Users } from '@/entities/Users'
import { getRepository } from 'typeorm'

interface Request {
  id: string
  userId: string
  content: string
}

const updateQuestion = async ({
  id,
  userId,
  content
}: Request): Promise<Questions | void> => {
  const questionRepository = getRepository(Questions)
  const findQuestion = await questionRepository.findOne(id)
  if (!findQuestion) {
    throw NoDataError
  }
  console.log(userId)
  console.log(findQuestion.userId)
  if (findQuestion.userId !== userId) {
    throw UnauthorizedResource
  }
  const updateQuestion = await questionRepository.update(id, {
    content,
    updatedAt: new Date()
  })
  if (updateQuestion.affected === 1) {
    const questionUpdated = await questionRepository.findOne(id)
    return questionUpdated
  }

  // field validation error?
}

export default updateQuestion
