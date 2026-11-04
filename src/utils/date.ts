import dayjs from 'dayjs'

export const thirtyDaysAgo = dayjs().subtract(30, 'day').format('YYYY-MM-DD')
