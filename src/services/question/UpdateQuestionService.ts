import { Questions } from '@/entities/Questions'
import { Users } from '@/entities/Users'
import { getRepository } from 'typeorm'

interface Request {
  id: string
  userId: string
  content: string
}

class UpdateQuestionService {
  async execute ({ id, userId, content }: Request): Promise<Questions | void> {
    const questionRepository = getRepository(Questions)
    const userRepository = getRepository(Users)

    const findQuestion = await questionRepository.findOne(id)
    const userLogged = await userRepository.findOne(userId)

    if (!userLogged) {
      throw new Error('질문을 수정하려면 로그인을 해야 합니다')
    }

    if (!findQuestion) {
      throw new Error('아이디와 일치하는 질문이 존재하지 않습니다.')
    }

    const updateQuestion = await questionRepository.update(id, {
      content,
      updatedAt: new Date()
    })

    if (updateQuestion.affected === 1) {
      const questionUpdated = await questionRepository.findOne(id)
      return questionUpdated
    }

    throw new Error('업데이트 도중 오류가 발생하였습니다.')
  }
}

export default UpdateQuestionService
