<template>
  <div class="form">
    <div class="form-row">
      <v-form>
        <v-container>
          <Row
            v-for="row in tab.formData.date_target"
            :tab="tab"
            :tabs="tabs"
            :key="row + '_' + tab.formData.personal_id"
            :row="row"
            :formData="tab.formData"
            :formErrors="formErrors"
            :loading="loading"
            :activeTab="activeTab"
            ref="rows"
          >
          </Row>
          <v-row class="justify-end">
            <v-btn
              type="submit"
              :color="action.color"
              class="ml-2"
              :loading="loading"
              @click.prevent="clickHandler(action)"
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
