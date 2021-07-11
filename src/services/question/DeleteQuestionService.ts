import { Questions } from '@/entities/Questions'
import { Users } from '@/entities/Users'
import { getRepository } from 'typeorm'

interface Request {
  userId: string
  id: string
}

class DeleteQuestionService {
  async execute ({ userId, id }: Request): Promise<void> {
    const userRepository = getRepository(Users)
    const questionsRepository = getRepository(Questions)

    const user = await userRepository.findOne(userId)
    const question = await questionsRepository.findOne({
      user: user,
      id: id
    })

    if (!user) {
      throw new Error('아이디에 해당하는 유저가 없습니다.')
    }

    if (user.id !== question.user.id) {
      throw new Error('자신의 질문 이외에는 삭제할 수 없습니다')
    }

    if (!question) {
      throw new Error('아이디에 해당하는 질문이 없거나 권한이 없는 유저입니다')
      // 추후 에러 케이스 구분할 예정
    }

    const result = await questionsRepository.remove(question)
    if (result.id !== undefined) {
      throw new Error('엔티티가 성공적으로 삭제되지 못했습니다.')
    }
  }
}

export default DeleteQuestionService
