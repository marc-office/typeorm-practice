import * as jwkToPem from 'jwk-to-pem'
import axios from 'axios'
const userPoolId = process.env.COGNITO_POOL_ID
const poolRegion = 'ap-northeast-2'
const jwt = require('jsonwebtoken')

/**
 * cognito token 검증
 * @param token 대상 토큰
 * @returns Cognito 그룹 또는 실패시 false
 */
export const validateToken = async (token: string) => {
  const response = await axios.get(
    `https://cognito-idp.${poolRegion}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
  )
  if (response.status === 200) {
    const pems: string[] = []
    const keys = response.data.keys
    for (let i = 0; i < keys.length; i++) {
      // Convert each key to PEM
      const keyId = keys[i].kid
      const modulus = keys[i].n
      const exponent = keys[i].e
      const keyType = keys[i].kty
      const jwk = { kty: keyType, n: modulus, e: exponent }
      const pem = jwkToPem(jwk)
      pems[keyId] = pem
    }
    // validate the token
    const decodedJwt = jwt.decode(token, { complete: true })
    if (!decodedJwt) {
      console.log('Not a valid JWT token')
      return false
    }

    const kid = decodedJwt.header.kid
    const pem1 = pems[kid]
    if (!pem1) {
      console.log('Invalid token')
      return false
    }

    return await new Promise<boolean | string[]>((resolve) =>
      jwt.verify(token, pem1, function (err: any, payload: any) {
        if (err) {
          console.log(err)
          resolve(false)
        }
        resolve(payload)
      })
    )
  } else {
    console.log('Error! Unable to download JWKs')
    return false
  }
}
