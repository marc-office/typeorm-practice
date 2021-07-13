import { Questions } from '@/entities/Questions'
import { getRepository } from 'typeorm'

interface Request {
  userId: string
  content: string
}

interface FormatData {
  userId: string
  question: Questions
}

const createQuestion = async ({
  userId,
  content
}: Request): Promise<FormatData> => {
  const questionsRepository = getRepository(Questions)
  const question = questionsRepository.create({
    userId: userId,
    content: content
  })
  await questionsRepository.save(question)
  return {
    userId,
    question
  }
}

export default createQuestion
