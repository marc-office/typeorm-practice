import { Answers } from '@/entities/Answers'
import { Files } from '@/entities/Files'
import { NoDataError } from '@/types/Error/Common'
import { getRepository } from 'typeorm'

const updateAnswer = async (answerId, imagePath) => {
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

const updateAnswerFile = async (answerId: string, file: Files) => {
  const answerRepository = getRepository(Answers)
  const findAnswer = await answerRepository.findOne({
    id: answerId
  })

  if (!findAnswer) {
    throw NoDataError
  }

  file.answer = findAnswer
  findAnswer.file = file
  answerRepository.save(findAnswer)
}

export { updateAnswer, updateAnswerFile }
