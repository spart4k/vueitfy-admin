import { onMounted, reactive } from 'vue'
import Row from './row/index.vue'
export default {
  name: 'form-output-correct',
  components: {
    Row,
  },
  setup() {
    const addGroup = async () => {
      // let qty
      // let serviceId
      // let dataForService
      // if (data.entity.direction_id === 6) {
      //   const dolToService = {
      //     24: 61,
      //     25: 62,
      //     26: 63,
      //     27: 64,
      //     49: 70,
      //     50: 77,
      //     55: 70,
      //     51: 78,
      //   }
      //   // qty = JSON.parse(data.entity.services)['3'][0].services[0].qty
      //   serviceId = dolToService[data.entity.doljnost_id]
      //   dataForService = await getServiceInfo(serviceId)
      // }
      // formGroup.value = [...formGroup.value]
      services.services.push({
        service_id: null,
        qty: 0,
        price: 0,
        sum: 0,
      })
      console.log(services.services)
    }
    const services = reactive({
      services: [
        {
          service_id: 9,
          qty: '161',
          price: 11,
          sum: 1771,
        },
        {
          service_id: 10,
          qty: '54',
          price: 3,
          sum: 162,
        },
      ],
      payment_id: 1,
      is_hold: false,
      is_pay: false,
      sum: 1933,
    })
    onMounted(() => {
      // addGroup()
    })
    return {
      services,
      addGroup,
    }
  },
}
