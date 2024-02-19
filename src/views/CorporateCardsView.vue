<template>
  <div class="d-flex flex-column flex-grow-1 h-100">
    <CardsDefault />
  </div>
</template>

<script>
// import Vue from 'vue'
import CardsDefault from '@/components/Cards/default/index.vue'

export default {
  name: 'CorporateCards-View',
  components: {
    CardsDefault,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
