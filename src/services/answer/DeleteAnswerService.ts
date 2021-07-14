import { Answers } from '@/entities/Answers'
import { UnauthorizedResource } from '@/types/Error/Common'
import { getRepository } from 'typeorm'

export const deleteAnswer = async (answerId: string, currentUID: string) => {
  const answerRepository = getRepository(Answers)
  const findAnswer = await answerRepository.findOne(answerId)

  // 자신이 작성하지 않은 답변을 삭제하려고 한 경우
  if (findAnswer.userId !== currentUID) {
    throw UnauthorizedResource
  }
  const deleted = await answerRepository.delete({
    id: answerId
  })

  return deleted
}
