import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne
} from 'typeorm'
import { Answers } from './Answers'
import { Users } from './Users'

@Entity('questions', { schema: 'typeorm-practice' })
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne((type) => Users, (user) => user.questions)
  user: Users

  @OneToMany((type) => Answers, (answer) => answer.question)
  answers: Answers

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
