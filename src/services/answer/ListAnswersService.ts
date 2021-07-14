import { Answers } from '@/entities/Answers'
import { getRepository } from 'typeorm'

export const listAnswers = async (questionId) => {
  const answerRepository = getRepository(Answers)

  // 질문 아이디가 동일한 답변 객체들을 가져옴
  const answers = await answerRepository.find({
    relations: ['question'], // relation 객체를 가져와서
    where: {
      question: {
        id: questionId // question.id = questionId 인 answers 를 찾음
      }
    }
  })

  return answers
}
