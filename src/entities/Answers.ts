import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { Questions } from './Questions'
import { Users } from './Users'

@Entity('answers', { schema: 'typeorm-practice' })
export class Answers {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne((type) => Questions, (question) => question.answers)
  question: Questions

  @ManyToOne((type) => Users, (user) => user.answers)
  user: Users

  @Column('varchar', {
    name: 'content_url',
    nullable: false,
    comment: '답변 사진',
    length: 200
  })
  contentUrl: string

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    comment: '생성 날짜'
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    comment: '업데이트 날짜'
  })
  updatedAt: Date
}
