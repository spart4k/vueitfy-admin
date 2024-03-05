<template>
  <div>
    <v-container>
      <div>
        <!-- {{ services }} -->
        <v-row>
          <Row
            v-for="(service, serviceKey) in services.services"
            :service="service"
            :formDataParent="formDataParent"
            :key="service.id"
            ref="servicesRow"
            @removeService="removeService(serviceKey)"
          ></Row>
        </v-row>
        <v-row class="justify-space-between">
          <v-col style="padding: 0" cols="6">
            <v-btn
              @click="removeLast"
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
      </div>
      <v-row class="justify-end mt-5">
        <v-btn color="transparent" :text="false" class="ml-2"> Закрыть </v-btn>
        <v-btn
          color="primary"
          class="ml-2"
          @click.prevent="save"
          :text="false"
          type="submit"
        >
          Сохранить
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
