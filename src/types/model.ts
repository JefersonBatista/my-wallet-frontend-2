import type { Ref } from 'vue'

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

export interface TransactionOperationData extends Omit<NewTransaction, 'value'> {
  amount: number
}

export interface Transaction extends NewTransaction {
  _id: string
  timestamp: number
  userId: string
}

export interface Auth {
  token: Ref<string>
  setAndPersistToken: (newToken: string) => void
}

export interface TransactionOperationParams {
  operation: 'register' | 'edit'
  type: 'incoming' | 'outgoing'
  id?: string
}
