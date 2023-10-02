<template>
  <div class="v-date">
    <div class="v-date_icon">
      <v-icon
        :color="$props?.data?.isfavorites ? 'warning' : ''"
        small
        @click.stop="
          $parent.$parent.$emit('changeMailKey', {
            id: $props?.data?.id,
            isfavorites: $props?.data?.isfavorites,
            box_id: $props?.data?.box_id,
            key: 'isfavorites',
          })
        "
        >$IconStar</v-icon
      >
    </div>
    <div class="v-date-container">
      <div class="v-date-container_day">
        {{ new Date($props?.data?.date).getDate() }}
        {{ month[new Date($props?.data?.date).getMonth()] }}
      </div>
      <div class="v-date-container_time">
        {{ new Date($props?.data?.date).toLocaleTimeString() }}
      </div>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
