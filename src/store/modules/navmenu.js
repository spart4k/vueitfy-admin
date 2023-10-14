import { getNavmenu } from '@/api/navmenu'

const navmenu = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getNavmenu(_, data) {
      try {
        const response = await getNavmenu()
        return response.data
      } catch (e) {
        console.log(e)
      }
    },
  },
}

export default navmenu
