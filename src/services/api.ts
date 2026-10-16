import axios from 'axios'
import dayjs from 'dayjs'

import type { NewTransaction, SignInData, SignUpData, Transaction } from '@/types/model'

const dayInMs = 24 * 60 * 60 * 1000

const getStartParam = (start: string) => {
  return String(dayjs(start, 'YYYY-MM-DD').unix() * 1000)
}

const getEndParam = (end: string) => {
  return String(dayjs(end, 'YYYY-MM-DD').unix() * 1000 + dayInMs)
}

const instance = axios.create({
  baseURL: 'https://my-wallet-115120273090.southamerica-east1.run.app',
})

function createAuth(token: string) {
  return { headers: { Authorization: `Bearer ${token}` } }
}

function signUp(newUser: SignUpData) {
  return instance.post(`/sign-up`, newUser)
}

function login(user: SignInData) {
  return instance.post<string>(`/login`, user)
}

function logout(token: string) {
  return instance.post(`/logout`, {}, createAuth(token))
}

function getTransactions(token: string, description?: string, start?: string, end?: string) {
  const params = new URLSearchParams()
  if (description) {
    params.append('description', description)
  }
  if (start) {
    params.append('after', getStartParam(start))
  }
  if (end) {
    params.append('before', getEndParam(end))
  }

  return instance.get<{ user: string; list: Transaction[] }>(`/transactions`, {
    ...createAuth(token),
    params,
  })
}

function getTransactionById(token: string, id: string) {
  return instance.get<Transaction>(`/transactions/${id}`, createAuth(token))
}

function registerTransaction(token: string, newTransaction: NewTransaction) {
  return instance.post(`/transactions`, newTransaction, createAuth(token))
}

function deleteTransaction(token: string, id: string) {
  return instance.delete(`/transactions/${id}`, createAuth(token))
}

function updateTransaction(token: string, id: string, updatedTransaction: NewTransaction) {
  return instance.put(`/transactions/${id}`, updatedTransaction, createAuth(token))
}

function eraseAll(token: string) {
  return instance.delete(`/transactions/all`, createAuth(token))
}

const api = {
  signUp,
  login,
  logout,
  getTransactions,
  getTransactionById,
  registerTransaction,
  deleteTransaction,
  updateTransaction,
  eraseAll,
}

export default api
