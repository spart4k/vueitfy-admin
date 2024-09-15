import { post, get, del, put } from '@/api/axios'

export const login = (data) => post('v1/auth/sign_in', data)

export const me = (data) => get('v1/user/get/me', data)

export const refresh = (data) => put('v1/auth/refresh', data)

export const register = (data) => post('v1/auth/registration', data)

export const checkDomain = (data) => post('v1/auth/checkDomain', data)

export const recovery = (token) => post(`v1/auth/recovery/${token}`)

export const logout = () => del('v1/auth/sign_out')
