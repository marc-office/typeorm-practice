import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable
} from 'typeorm'
import { Answers } from './Answers'

@Entity('question', { schema: 'typeorm-practice' })
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {
    name: 'user_id',
    nullable: false,
    comment: '유저 아이디',
    length: 200,
    default: 'uuid-default-value'
  })
  userId: string

  @OneToMany((type) => Answers, (answer) => answer.question, {
    cascade: true
  })
  @JoinTable()
  answers: Answers[]

  @Column('varchar', {
    name: 'content',
    nullable: false,
    comment: '질문 내용',
    length: 200
  })
  content: string

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
