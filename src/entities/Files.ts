import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne
} from 'typeorm'
import { Answers } from './Answers'

@Entity('file', { schema: 'typeorm-practice' })
export class Files {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @OneToOne((type) => Answers, (answer) => answer.file)
  answer: Answers

  @Column('varchar', {
    name: 'userId',
    nullable: false,
    comment: '유저 아이디',
    length: 200,
    default: 'default'
  })
  userId: string

  @Column('varchar', {
    name: 'name',
    nullable: false,
    comment: '이미지 이름',
    length: 200
  })
  name: string

  @Column('int', {
    name: 'size',
    nullable: false,
    comment: '이미지 크기'
  })
  size: number

  @Column('varchar', {
    name: 'path',
    nullable: false,
    comment: '이미지 경로'
  })
  path: string

  @Column('varchar', {
    name: 'mine_type',
    nullable: false,
    comment: '데이터 타입',
    length: 200
  })
  mimeType: string

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
