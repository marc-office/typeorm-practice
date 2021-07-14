import {
  Connection,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
  ObjectType
} from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy'

import { Questions } from '@/entities/Questions'
import { Answers } from '@/entities/Answers'
import { Files } from '@/entities/Files'

const connectionManager = getConnectionManager()

let connection: Connection | undefined

/**
 * connection 객체 조회, 없으면 생성
 */
export const getConnection = async () => {
  const CONNECTION_NAME = 'default'

  if (connectionManager.has(CONNECTION_NAME)) {
    connection = connectionManager.get(CONNECTION_NAME)

    if (!connection.isConnected) {
      connection = await connection.connect()
    }
  } else {
    const connectionOptions: ConnectionOptions = {
      name: CONNECTION_NAME,
      type: 'mysql',
      port: parseInt(process.env.DB_PORT),
      logger: 'advanced-console',
      logging: ['error'],
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      bigNumberStrings: false,
      namingStrategy: new SnakeNamingStrategy(),
      charset: 'utf8mb4_unicode_ci',
      entities: [Questions, Answers, Files],
      synchronize: true
    }

    connection = await createConnection(connectionOptions)
    console.log('Database connected!')
    if (!connection.isConnected) {
      connection = await connection.connect()
    }
  }
}

/**
 * connection 객체에서 Custom Repository 반환
 * @param customRepository 대상 Custom Repository
 * @returns Custom Repository
 */
export const getCustomRepository = <T>(customRepository: ObjectType<T>) => {
  return connection.getCustomRepository(customRepository)
}
