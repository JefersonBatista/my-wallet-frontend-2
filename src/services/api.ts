import axios from 'axios'

import type { NewTransaction, SignInData, SignUpData, Transaction } from '@/types/model'

const instance = axios.create({
  baseURL: 'https://my-wallet-26nd.onrender.com',
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

function getTransactions(token: string) {
  return instance.get<{ user: string; list: Transaction[] }>(`/transactions`, createAuth(token))
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

const api = {
  signUp,
  login,
  logout,
  getTransactions,
  getTransactionById,
  registerTransaction,
  deleteTransaction,
  updateTransaction,
}

export default api
