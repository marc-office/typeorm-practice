import { Files } from '@/entities/Files'
import { getRepository } from 'typeorm'

interface FileInfo {
  uuid: string
  userId: string
  name: string
  size: number
  path: string
  mimeType: string
}

export const createFile = async (fileInfo: FileInfo): Promise<Files> => {
  const fileRepository = getRepository(Files)
  const createdFile = await fileRepository.create({
    uuid: fileInfo.uuid,
    userId: fileInfo.userId,
    name: fileInfo.name,
    size: fileInfo.size,
    path: fileInfo.path,
    mimeType: fileInfo.mimeType
  })
  await fileRepository.save(createdFile)

  return createdFile
}
