import { Questions } from '@/entities/Questions'
import { Users } from '@/entities/Users'
import { getRepository } from 'typeorm'

// interface Request {
//   userId?: string
//   questionObj: Questions
// }

interface FormatData {
  question: Questions
}

class RetrieveQuestionService {
  async execute (questionObj: Questions): Promise<FormatData> {
    const userRepository = getRepository(Users)
    const questionRepository = getRepository(Questions)

    const question = await questionRepository.findOne(questionObj.id)

    if (!question) {
      throw new Error('해당하는 질문이 존재하지 않습니다')
    }

    const user = await userRepository.findOne({
      where: {
        id: questionObj.user.id
      }
    })

    if (!user) {
      throw new Error('탈퇴한 유저의 질문입니다.')
    }

    return {
      question
    }
  }
}

export default RetrieveQuestionService
