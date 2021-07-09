import { EntityRepository, Repository } from 'typeorm'
import { Questions } from '@/entities/Questions'
// import { ICommonNumber } from '@/types/Common'
import { toSnake } from '@/utils/Common'

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {
  /**
   * 질문 리스트 조회
   * @param limit limit default to 3
   * @param sortBy 정렬 컬럼
   * @param sortDesc 정렬 방향
   */
  list (limit: number, sortBy = 'createdBy', sortDesc?: boolean) {
    const query = this.createQueryBuilder('q')

    return query.getRawMany()
  }
}
