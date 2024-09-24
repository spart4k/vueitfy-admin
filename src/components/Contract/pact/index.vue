<template>
  <v-expansion-panels v-model="expansion" flat accordion multiple>
    <v-expansion-panel class="pactPanel" v-for="pact in proxyValue">
      <v-expansion-panel-header style="min-height: 56px" class="px-3 py-0">
        <v-row class="d-flex align-center justify-space-between">
          <span>
            <span class="text--text">{{ pact.name }} </span>
            <v-icon class="ml-3 mr-2" color="textGray" size="24"
              >mdi-account-check</v-icon
            >
            <span class="textGray--text">{{ pact.type_name }}</span>
          </span>
          <!-- <v-btn
            class="px-3 mr-3 text-none"
            @click.stop
            elevation="0"
            color="primary"
            text
            ><v-icon class="mr-2" size="24" color="primary"
              >mdi-file-document-outline</v-icon
            >Добавить версию</v-btn
          > -->
        </v-row>
        <template v-slot:actions>
          <v-progress-circular
            v-if="pact.loaded === false"
            color="primary"
            :size="22"
            indeterminate
          />
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-3">
        <v-divider class="mb-3"></v-divider>
        <v-btn
          @click="openDialog(pact)"
          color="#EDF5FD"
          class="mb-2"
          elevation="0"
          block
        >
          <v-icon class="mr-2" color="#4E9EEE">mdi-plus</v-icon>
          <span
            style="text-transform: none; color: #4e9eee"
            class="font-size-14 font-weight-400"
            >Добавить версию</span
          >
        </v-btn>
        <Version
          @openParser="(e) => $emit('openParser', e)"
          @refreshItem="refreshItem"
          :territory="territory"
          :pact="pact"
          :data="pact.items"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-dialog width="470" v-model="dialog.isShow"
      ><Dialog
        v-if="dialog.isShow"
        @close="dialog.isShow = false"
        @refreshItem="refreshItem(dialog.pact)"
        :version="dialog.pact"
        :territory="territory"
    /></v-dialog>
  </v-expansion-panels>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
