export interface IAuth {
  response: Response
  data: Data
}

export interface Response {
  succes: boolean
  msg: string
}

export interface Data {
  user: User
  token: string
  expireToken: number
  secure: boolean
}

export interface User {
  id: string
  email: string
  status: string
}
