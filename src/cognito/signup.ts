
import * as AwsConfig from '../../AwsConfig'

function signUp(email: string, password: string, agent = 'none') {
  return new Promise((resolve) => {
    AwsConfig.initAWS ();
    AwsConfig.setCognitoAttributeList(email);
    AwsConfig.getUserPool().signUp(email, password, AwsConfig.getCognitoAttributeList(), [], function(err, result){
      if (err) {
        return resolve({ statusCode: 422, response: err });
      }

      if (result) {
        const response = {
          username: result.user.getUsername(),
          userConfirmed: result.userConfirmed,
        }
        resolve({ statusCode: 201, response: response });
        }
      });
    });
}

function verify(email: string, code: string) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).confirmRegistration(code, true, (err: Error, result: any) => {
      if (err) {
        return resolve({ statusCode: 422, response: err });
      }
      return resolve({ statusCode: 400, response: result });
    });
  });
}

function signIn(email: string, password: string) {
  return new Promise((resolve) => {
    AwsConfig.getCognitoUser(email).authenticateUser(AwsConfig.getAuthDetails(email, password), {
      onSuccess: (result: any) => {
        const token = {
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
        }  
        return resolve({ statusCode: 200, response: AwsConfig.decodeJWTToken(token) });
      },
      
      onFailure: (err: Error) => {
        return resolve({ statusCode: 400, response: err.message || JSON.stringify(err)});
      },
    });
  });
}

export {
    signUp,
    verify,
    signIn
}