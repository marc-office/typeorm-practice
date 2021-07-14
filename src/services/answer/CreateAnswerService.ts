import { Answers } from '@/entities/Answers'
// import { Questions } from '@/entities/Questions'
import { getRepository } from 'typeorm'

export const createAnswer = async (userId, questionId, ImagePath) => {
  const answerRepository = getRepository(Answers)
  // const questionRepository = getRepository(Questions)
  // const question = questionRepository.findOne({
  //   id: questionId
  // })
  const createdAnswer = await answerRepository.create({
    question: questionId,
    contentUrl: ImagePath,
    userId: userId
  })

  return createdAnswer
}
