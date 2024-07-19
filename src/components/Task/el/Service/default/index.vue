<template>
  <div>
    <FormError class="mb-4" v-if="rejectedPrices?.length">
      <div class="rate-error">
        <p>Отсутствует тариф:</p>
        <p v-for="(name, i) in rejectedPrices" :key="i">{{ name }}<br /></p>
      </div>
    </FormError>
    <ServiceRow
      v-for="(group, i) in services"
      :key="i"
      class="px-0"
      style="height: 50px"
      :group="group"
      :serviceDetail="serviceDetail"
      :task="task"
      @changeRejectedPrice="changeRejectedPrice"
      ref="serviceRows"
    />
    <v-row class="justify-space-between mt-8">
      <v-col style="padding: 0" cols="6">
        <v-btn
          @click="removeGroup"
          class="form-btn form-btn--remove"
          color="primary"
          block
          >-</v-btn
        >
      </v-col>
      <v-col style="padding: 0" cols="6">
        <v-btn
          @click="addGroup"
          class="form-btn form-btn--add"
          color="success"
          block
          >+</v-btn
        >
      </v-col>
    </v-row>
    <v-textarea
      v-if="comment"
      v-model="formComment"
      @input="formCommentError = ''"
      :error-messages="formCommentError"
      rows="2"
      clearable
      label="Комментарий"
    ></v-textarea>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
