export interface SignUpData {
  name: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

export interface NewTransaction {
  description: string
  value: number
  type: 'incoming' | 'outgoing'
}

export interface Transaction extends NewTransaction {
  _id: string
  timestamp: number
  userId: string
}

export interface Auth {
  token: string
  setAndPersistToken: (newToken: string) => void
}
