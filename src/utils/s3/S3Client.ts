import { S3Client } from '@aws-sdk/client-s3'

const { getDefaultRoleAssumerWithWebIdentity } = require('@aws-sdk/client-sts')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')

const provider = defaultProvider({
  roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity
})
// Set the AWS Region.
const REGION = 'ap-northeast-2'
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  credentialDefaultProvider: provider
})

export { s3Client }
