import { Questions } from '@/entities/Questions'
import { getRepository } from 'typeorm'

interface FormatData {
  questions: Questions[]
  questionsLength: number
}

class ListQuestionsService {
  async execute (questionsLength: number): Promise<FormatData> {
    const questionRepository = getRepository(Questions)

    const questions = await questionRepository.find()

    questionsLength = questions.length

    return {
      questions,
      questionsLength
    }
  }
}

export default ListQuestionsService
