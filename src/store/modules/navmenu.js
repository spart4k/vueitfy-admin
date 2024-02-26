import { getNavmenu } from '@/api/navmenu'

const navmenu = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getNavmenu(_, data) {
      try {
        const response = await getNavmenu()
        return response
      } catch (e) {
        return e
      }
    },
  },
}

export default navmenu
