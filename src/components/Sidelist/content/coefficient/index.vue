<template>
  <div class="v-coefficient d-flex flex-column h-100 w-100 pb-5">
    <SidelistHeader @closePanel="$emit('closePanel')" :data="$props.data" />
    <div class="overflow-auto flex-grow-1 pl-7 pr-7">
      <SidelistSearch />
      <v-btn small block color="success">+</v-btn>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
