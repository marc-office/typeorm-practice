import { Answers } from '@/entities/Answers'
import { Questions } from '@/entities/Questions'
import { Users } from '@/entities/Users'
import { getRepository } from 'typeorm'

interface Request {
  userId: string
  answers: Answers
  content: string
}

interface FormatData {
  user: Users
  question: Questions
}

class CreateQuestionService {
  async execute ({ userId, answers, content }: Request): Promise<FormatData> {
    const questionsRepository = getRepository(Questions)
    const userRepository = getRepository(Users)

    const user = await userRepository.findOne(userId)

    if (!user) {
      throw new Error('로그인 후에 질문을 올릴 수 있어요')
    }

    const question = questionsRepository.create({
      user: user,
      answers: answers,
      content: content
    })

    await questionsRepository.save(question)

    return {
      user,
      question
    }
  }
}

export default CreateQuestionService
