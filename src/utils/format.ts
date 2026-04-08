import dayjs from 'dayjs'

export const formatBalance = (amount: number): string =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)

export const formatAmount = (amount: number): string =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

export const formatTransactionDate = (timestamp: number): string => dayjs(timestamp).format('DD/MM')
