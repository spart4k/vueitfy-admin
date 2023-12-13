import { post, get } from '@/api/axios'

export const login = (ctx) => post('auth/sign_in', ctx.data, ctx.params)

export const me = (data) => get('get/me', data)

export const refresh = () => get('auth/refresh')

export const register = (data) => post('v1/auth/register', data)

export const checkDomain = (data) => post('v1/auth/checkDomain', data)

export const recovery = (token) => post(`v1/auth/recovery/${token}`)
