<template>
  <div>
    <!--{{ tab.fields }}-->
    <Personal
      :account="account"
      v-for="account in personalsTarget"
      :key="account"
      :formatedRow="formatedRow"
      :lastFormData="tab.formData"
      ref="personalRef"
    />
    <v-divider class="mb-4" />
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
