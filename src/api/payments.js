import { get, put } from '@/api/axios'

export const getOutput = (url) => get(`get/payment/target_service/${url}`)

export const updateOutput = (body) => put(`update/payment/target_service`, body)
