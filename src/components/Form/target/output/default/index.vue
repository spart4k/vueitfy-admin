<template>
  <div class="output">
    <row
      v-for="(service, serviceKey) in services"
      :key="serviceKey"
      :serviceKey="serviceKey"
      :service="service"
    />
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
