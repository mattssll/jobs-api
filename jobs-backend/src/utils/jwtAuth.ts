//var token =require('crypto').randomBytes(64).toString('hex');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();


export const port = process.env.PORT

export function generateAccessToken(username: any) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}