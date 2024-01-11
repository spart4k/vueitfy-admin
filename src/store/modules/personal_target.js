//import
import { putForm } from '@/api/form'
import store from '@/store'
//import axios from 'axios'

const personal = {
  namespaced: true,
  actions: {
    async update(_, params) {
      const result = await putForm(params)
      console.log(result)
      if (result?.data?.length) {
        result.data.forEach((el) => {
          if (el.code === 1) {
            const error = `На объект и дату выбранная учётная запись уже назначена`
            store.commit(
              'notifies/showMessage',
              {
                color: 'error',
                content: error,
                timeout: 2500,
              },
              { root: true }
            )
          }
          if (el.code === 2) {
            const error = `На объект и на выбранную смену числа выбранный сотрудник уже назначен`
            store.commit(
              'notifies/showMessage',
              {
                color: 'error',
                content: error,
                timeout: 2500,
              },
              { root: true }
            )
          }
        })
      } else {
        store.commit(
          'notifies/showMessage',
          {
            color: 'success',
            content: 'Успешно сохранено',
            timeout: 2500,
          },
          { root: true }
        )
        return result
      }
    },
  },
}

export default personal
