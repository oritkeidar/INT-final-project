import { Request, Response, NextFunction } from 'express';
import { sessionAuthenticate } from './sessionAuthenticator';
import mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

export const VALID_TOKENS: { [key: string] : string } = {};
export const REFRESH_TOKENS: { [key: string] : string } = {};

export const getUsernameByReq = (req: Request & { user: { name: string }}) => {
  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
     console.log(req?.user?.name)
    // return req.user.name
    //  console.log(req)
    //  console.log(req.body)
  } else { // sessions authentication management
    return req?.cookies?.username;
  }
};

export async function authMiddleware(req: Request & { user: any }, res: Response, next: NextFunction) {
  let passedAuthorization = false;
  console.log(process.env.AUTHENTICATION_MGMT_METHOD)
  if (process.env.AUTHENTICATION_MGMT_METHOD == 'token') {
    const authorizationHeader = req.headers.authorization
    console.log('authorization:' + authorizationHeader);// 'Bearer <TOKEN>'
    const accessToken = authorizationHeader?.replace(/^Bearer\s+/, " ");//authorizationHeader?.split?(' ')[1] || ''
    if (accessToken == null) {
      return res.status(401).send('Unauthorized for action!');
    }
    jwt.verify(accessToken || '', process.env.ACCESS_TOKEN_SECRET || '', (err:any, payload: any) => {
      if(!err && VALID_TOKENS[payload?.username] == accessToken )
      req.user = payload;
    passedAuthorization = true
      return next();
    });

  } else { process.env.AUTHENTICATION_MGMT_METHOD == 'session'
    const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS) || 12;
    const username = req.cookies?.username;
    const sessionId = req.cookies?.sessionId;
    
    // Check if user is authenticated
    if (await sessionAuthenticate(sessionId, username, expirationTime, mongoose)) {
      passedAuthorization = true
      return next();
    }
  }
if (!passedAuthorization){
    return res.status(401).send('Unauthorized for action!');
}

 }