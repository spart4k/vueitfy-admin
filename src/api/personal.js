import { get } from '@/api/axios'

export const getCard = (id) => get(`get/personal_bank/${id}`)
