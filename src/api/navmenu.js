import { get, post, put, del } from '@/api/axios'

export const getNavmenu = () => post('view/json/sys_navmenu')
