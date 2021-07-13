import { Answers } from '@/entities/Answers'
import { NoDataError } from '@/types/Error/Common'
import { getRepository } from 'typeorm'

export const updateAnswer = async (answerId, imagePath) => {
  const answerRepository = getRepository(Answers)
  const findAnswer = await answerRepository.findOne({
    id: answerId
  })

  if (!findAnswer) {
    throw NoDataError
  }

  findAnswer.contentUrl = imagePath
  answerRepository.save(findAnswer)
}
