import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Answers } from './Answers'
import { Questions } from './Questions'

@Entity('users', { schema: 'typeorm-practice' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany((type) => Questions, (question) => question.user)
  questions: Questions

  @OneToMany((type) => Answers, (answer) => answer.user)
  answers: Answers

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '사용자 이름',
    length: 50
  })
  name: string | null

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '비밀번호',
    length: 200
  })
  password: string | null

  @Column('varchar', {
    name: 'email',
    nullable: true,
    comment: '이메일',
    length: 50
  })
  email: string | null

  @Column('tinyint', { name: 'gender', nullable: true, comment: '성별' })
  gender: number | null

  @Column('varchar', {
    name: 'status_msg',
    nullable: true,
    comment: '상태메세지',
    length: 100
  })
  statusMsg: string | null

  @Column('tinyint', {
    name: 'authorized',
    nullable: true,
    default: () => "'0'"
  })
  authorized: number | null

  @Column('datetime', {
    name: 'create_by',
    comment: '만든 날짜',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createBy: Date

  @Column('varchar', {
    name: 'url',
    nullable: true,
    comment: '썸네일',
    length: 500
  })
  url: string | null
}
