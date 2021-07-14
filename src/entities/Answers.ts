import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { Files } from './Files'
import { Questions } from './Questions'

@Entity('answer', { schema: 'typeorm-practice' })
export class Answers {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne((type) => Questions, (question) => question.answers)
  question: Questions

  @Column('varchar', {
    name: 'user_id',
    nullable: false,
    comment: '유저 아이디',
    length: 200,
    default: 'uuid-default-value'
  })
  userId: string

  @Column('varchar', {
    name: 'content_url',
    nullable: false,
    comment: '답변 사진',
    length: 200
  })
  contentUrl: string

  @OneToOne((type) => Files, (file) => file.answer, {
    cascade: true
  })
  @JoinColumn()
  file: Files

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
