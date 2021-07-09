import { Questions } from '@/entities/Questions'
import { Users } from '@/entities/Users'
import { getRepository } from 'typeorm'

interface Request {
  userId: string
  questionId: string
}

class DeleteProductService {
  async execute ({ userId, questionId }: Request): Promise<void> {
    const userRepository = getRepository(Users)
    const questionsRepository = getRepository(Questions)

    const user = await userRepository.findOne(userId)
    const question = await questionsRepository.findOne({
      user: user,
      id: questionId
    })

    if (!user) {
      throw new Error('아이디에 해당하는 유저가 없습니다.')
    }

    if (!question) {
      throw new Error('아이디에 해당하는 질문이 없거나 권한이 없는 유저입니다')
      // 추후 에러 케이스 구분할 예정
    }

    await questionsRepository.delete(questionId)
  }
}

export default DeleteProductService
