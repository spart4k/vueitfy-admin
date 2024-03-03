<template>
  <div>
    <div>
      <!-- {{ services }} -->
      <v-row>
        <Row
          v-for="service in services.services"
          :service="service"
          :key="service.id"
        ></Row>
      </v-row>
      <v-row class="justify-space-between">
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
        v-model="formComment"
        @input="formCommentError = ''"
        :error-messages="formCommentError"
        rows="2"
        clearable
        label="Комментарий"
      ></v-textarea>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
