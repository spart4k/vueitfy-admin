<template>
  <div class="form">
    <div class="form-row">
      <v-form>
        <v-container>
          <!-- <DocForm :docsData="docsData"></DocForm> -->
          <template v-if="!loading">
            <Row
              v-for="document in docsData"
              :tab="tab"
              :key="document.id"
              :formData="formData"
              :formErrors="formErrors"
              :loading="loading"
              :personalId="personal_id"
              :document="document"
              ref="rows"
            >
            </Row>
          </template>
          <template v-else>
            <div v-for="loading in 10" :key="loading" class="form-row-loading">
              <div class="form-row-loading-wrap gradient"></div>
            </div>
          </template>
          <!-- <v-row class="justify-end mt-5"> -->
          <v-row class="mt-4 justify-end">
            <v-btn
              type="submit"
              class="ml-2"
              :loading="loading"
              @click.prevent="$emit('closePopup', 'personal')"
            >
              Назад
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              class="ml-2"
              :loading="loading"
              @click.prevent="sendDocuments"
              v-if="canEdit"
            >
              Сохранить
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
