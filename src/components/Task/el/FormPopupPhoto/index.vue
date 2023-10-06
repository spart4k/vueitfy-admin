<template>
  <div class="img-popup">
    <div class="img-popup__wrap">
      <img style="object-fit: cover; position: absolute" :src="src" />
      <div class="img-popup__close">
        <v-icon color="white">$IconClose</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: 'https://placehold.co/600x400/EEE/31343C',
    },
  },
}
</script>

<style lang="scss" scoped src="./style.scss"></style>
