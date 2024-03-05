import { get } from '@/api/axios'

export const getOutput = (url) => get(`get/payment/target_service/${url}`)
