<template>
  <div class="form">
    <div class="form-row">
      <v-form>
        <v-container>
          <!-- <DocForm :docsData="docsData"></DocForm> -->
          <template v-if="docsData">
            <Row
              v-for="document in docsData"
              :tab="tab"
              :key="document.title"
              :formData="formData"
              :formErrors="formErrors"
              :loading="loading"
              :document="document"
              ref="rows"
            >
            </Row>
          </template>
          <v-row class="justify-end">
            <v-btn
              type="submit"
              :color="action.color"
              class="ml-2"
              :loading="loading"
              @click.prevent="sendDocuments"
              v-for="action in tab.actions"
              :key="action.id"
            >
              {{ action.text }}
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </div>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
