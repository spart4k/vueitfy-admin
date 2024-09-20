<template>
  <v-expansion-panels v-model="expansion" flat accordion multiple>
    <v-expansion-panel class="additionalPanel" v-for="version in proxyValue">
      <v-expansion-panel-header style="min-height: 56px" class="px-3 py-0">
        <v-row class="d-flex align-center justify-space-between">
          <span>
            <span class="primary--text mr-3">v {{ version.version }}</span>
            <span class="text--text">{{ version.name }} </span>
            <v-icon class="ml-3 mr-2" color="textGray" size="22"
              >mdi-calendar-clock-outline</v-icon
            >
            <span class="textGray--text"
              >{{ convertDate(version.date_from) }} -
              {{ convertDate(version.date_to) }}</span
            >
          </span>
          <span>
            <v-btn
              class="px-3 mx-1 text-none"
              @click.stop
              elevation="0"
              color="primary"
              text
              ><v-icon class="mr-2" size="24" color="primary"
                >mdi-file-document-outline</v-icon
              >Загрузить тарифы</v-btn
            >
            <v-btn
              class="mr-3 px-0"
              @click.stop="download(version.file)"
              elevation="0"
              min-width="40px"
              color="primary"
              text
              ><v-icon size="20" color="primary"
                >mdi-file-download-outline</v-icon
              ></v-btn
            >
          </span>
        </v-row>
        <template v-slot:actions>
          <v-progress-circular
            v-if="version.loaded === false"
            color="primary"
            :size="22"
            indeterminate
          />
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-3">
        <v-divider class="mb-3"></v-divider>
        <v-btn
          @click="dialog = true"
          color="#EDF5FD"
          class="mb-2"
          elevation="0"
          block
        >
          <v-icon class="mr-2" color="#4E9EEE">mdi-plus</v-icon>
          <span
            style="text-transform: none; color: #4e9eee"
            class="font-size-14 font-weight-400 text-none"
            >Дополнительное соглашение</span
          >
        </v-btn>
        <v-dialog width="470" v-model="dialog"
          ><Dialog
            v-if="dialog"
            @close="dialog = false"
            @refreshItem="refreshItem(version)"
            :version="version"
        /></v-dialog>
        <v-row
          v-for="subversion in version.items"
          :key="subversion.id"
          class="d-flex mx-3 align-center justify-space-between"
        >
          <span>
            <span class="primary--text mr-3">v {{ subversion.version }}</span>
            <span class="text--text">{{ subversion.name }} </span>
            <v-icon class="ml-3 mr-2" color="textGray" size="22"
              >mdi-calendar-clock-outline</v-icon
            >
            <span class="textGray--text"
              >{{ convertDate(subversion.date_from) }} -
              {{ convertDate(subversion.date_to) }}</span
            >
            <span
              v-if="subversion.with_prolongation"
              class="ml-3 px-1 py-1 font-size-14"
              style="background-color: #eaf8ef; color: #29b560"
              >Пролонгация</span
            >
          </span>
          <span>
            <v-btn
              class="px-3 mx-1 text-none"
              @click.stop
              v-if="!subversion.with_prolongation"
              elevation="0"
              color="primary"
              text
              ><v-icon class="mr-2" size="24" color="primary"
                >mdi-file-document-outline</v-icon
              >Загрузить тарифы</v-btn
            >
            <v-btn
              class="px-0"
              @click.stop="download(subversion.file)"
              elevation="0"
              min-width="40px"
              color="primary"
              text
              ><v-icon size="20" color="primary"
                >mdi-file-download-outline</v-icon
              ></v-btn
            >
          </span>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
