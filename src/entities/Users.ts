import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('인덱스 2', ['num'], { unique: true })
@Entity('users', { schema: 'rippler' })
export class Users {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: '유저의 ID',
    unsigned: true
  })
  id: string

  @Column('varchar', {
    name: 'name',
    nullable: true,
    comment: '사용자 이름',
    length: 50
  })
  name: string | null

  @Column('varchar', {
    name: 'birth',
    nullable: true,
    comment: '사용자 생일',
    length: 50
  })
  birth: string | null

  @Column('varchar', {
    name: 'num',
    nullable: true,
    unique: true,
    comment: '전화번호',
    length: 50
  })
  num: string | null

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

  @Column('bigint', { name: 'thumbnail', nullable: true, comment: '썸네일' })
  thumbnail: string | null

  @Column('varchar', {
    name: 'status_msg',
    nullable: true,
    comment: '상태메세지',
    length: 100
  })
  statusMsg: string | null

  @Column('varchar', { name: 'device_id', nullable: true, length: 50 })
  deviceId: string | null

  @Column('varchar', { name: 'device_token', nullable: true, length: 300 })
  deviceToken: string | null

  @Column('varchar', { name: 'device_platform', nullable: true, length: 50 })
  devicePlatform: string | null

  @Column('varchar', { name: 'device_brand', nullable: true, length: 100 })
  deviceBrand: string | null

  @Column('varchar', { name: 'device_model', nullable: true, length: 100 })
  deviceModel: string | null

  @Column('varchar', { name: 'device_version', nullable: true, length: 100 })
  deviceVersion: string | null

  @Column('tinyint', {
    name: 'blind',
    comment: '0 : 비활성화, 1: 활성화 / 새로운 친구를 블라인드 풀로 추가',
    width: 1,
    default: () => "'0'"
  })
  blind: boolean

  @Column('tinyint', {
    name: 'auto',
    comment: '0 : 비활성화, 1: 활성화 / 연락처 정보 자동 동기화 하기',
    width: 1,
    default: () => "'1'"
  })
  auto: boolean

  @Column('tinyint', {
    name: 'authorized',
    nullable: true,
    default: () => "'0'"
  })
  authorized: number | null

  @Column('tinyint', {
    name: 'report_cnt',
    nullable: true,
    default: () => "'0'"
  })
  reportCnt: number | null

  @Column('tinyint', {
    name: 'stop',
    nullable: true,
    comment: '0 : 사용계정, 1,2 : 정지계정, 100 : 어드민',
    default: () => "'0'"
  })
  stop: number | null

  @Column('tinyint', { name: 'tutorial', nullable: true, default: () => "'0'" })
  tutorial: number | null

  @Column('tinyint', { name: 'join_yn', width: 1, default: () => "'1'" })
  joinYn: boolean

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
