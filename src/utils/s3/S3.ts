// Import required AWS SDK clients and commands for Node.js.
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '@/utils/s3/S3Client'

import * as AWS from 'aws-sdk'

const createObject = async (key, body) => {
  try {
    const params = {
      Bucket: 'webmodule-dungdung',
      Key: key,
      Body: body
    }

    const results = await s3Client.send(new PutObjectCommand(params))
    console.log(
      'Successfully created ' +
        params.Key +
        ' and uploaded it to ' +
        params.Bucket +
        '/' +
        params.Key
    )
    return results // For unit tests.
  } catch (err) {
    console.log('Error', err)
  }
}

createObject('sample_upload.txt', 'update content')

const updateObject = async (key) => {
  try {
    const params = {
      Bucket: 'webmodule-dungdung', // The name of the bucket. For example, 'sample_bucket_101'.
      Key: key, // The name of the object. For example, 'sample_upload.txt'.
      Body: 'areate agaian :)' // The content of the object. For example, 'Hello world!".
    }

    const results = await s3Client.send(new PutObjectCommand(params))
    console.log(
      'Successfully created ' +
        params.Key +
        ' and uploaded it to ' +
        params.Bucket +
        '/' +
        params.Key
    )
    return results // For unit tests.
  } catch (err) {
    console.log('Error', err)
  }
}

const deleteObject = async (key) => {
  try {
    const params = {
      Bucket: 'webmodule-dungdung', // The name of the bucket. For example, 'sample_bucket_101'.
      Key: key, // The name of the object. For example, 'sample_upload.txt'.
      Body: 'areate agaian :)' // The content of the object. For example, 'Hello world!".
    }

    const results = await s3Client.send(new PutObjectCommand(params))
    console.log(
      'Successfully created ' +
        params.Key +
        ' and uploaded it to ' +
        params.Bucket +
        '/' +
        params.Key
    )
    return results // For unit tests.
  } catch (err) {
    console.log('Error', err)
  }
}
