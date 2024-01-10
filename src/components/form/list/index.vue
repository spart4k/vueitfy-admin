<template>
  <div class="form">
    <div class="form-row">
      <v-form>
        <v-container>
          <Row
            v-for="row in targets"
            :tab="tab"
            :tabs="tabs"
            :key="
              row.date +
              '_' +
              tab.formData.personal_id +
              '_' +
              tab.formData.object_id +
              '_' +
              tab.formData.direction_id +
              '_' +
              tab.formData.doljnost_id +
              '_' +
              tab.formData.subtypr
            "
            :row="row.date"
            :error="row.error"
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
              @click.prevent="clickHandler({ action })"
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
