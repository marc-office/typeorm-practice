import { Questions } from '@/entities/Questions'
import { getRepository } from 'typeorm'

interface Request {
  questionsLength?: number
  id?: string
}

interface FormatData {
  questions: Questions[]
  questionsLength: number
}

class ListAllProductsService {
  async execute ({ questionsLength, id }: Request): Promise<FormatData> {
    const questionRepository = getRepository(Questions)

    const questions = await questionRepository.find()

    questionsLength = questions.length

    return {
      questions,
      questionsLength
    }
  }
}

export default ListAllProductsService
