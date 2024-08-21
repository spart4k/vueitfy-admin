import Vue, { toRef, ref, onUnmounted } from 'vue'
import _ from 'lodash'

export const button = {
  label: 'Архив',
  class: ['v-table-button--custom'],
  url: '$IconEdit',
  backgroundColor: '#ffffff',
  customContent: {
    popupWidth: '550',
    component: Vue.component('component', {
      template: `<template>
            <v-card class="pl-0 pr-0 pt-0 pb-0">
                <v-card-title class="pl-3 pr-3 pt-2 pb-2">Архивация ЛУ</v-card-title>
                <v-divider></v-divider>
                <v-row class="justify-center pl-3 pr-3 pt-4 pb-4">
                  <template v-if="!archiveData">    
                    <v-btn
                      v-if="!loading"
                      type="submit"
                      color="primary"
                      @click="form"
                    >Сформировать</v-btn>
                    <v-progress-circular
                      v-if="loading"
                      color="primary"
                      :size="36"
                      indeterminate
                    />
                  </template>
                  <template v-if="archiveData">
                    <template v-if="archiveData">
                      <div v-for="(item, index) in archiveData" :key="index">
                        <v-btn
                          color="primary"
                          class="mr-3"
                          @click="download(item)"
                          v-if="!item.loaded"
                        >
                          <v-icon>
                            mdi-archive-arrow-down-outline
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="mr-3"
                          style="pointer-events: none"
                          v-if="item.loaded"
                          color="pageBackground"
                          depressed
                        >
                          <v-icon color="success">
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </div>
                    </template>
                    <v-list-item-title v-if="!archiveData.length" class="text-center">Среди выбранных записей не найдено листов учета</v-list-item-title>
                  </template>
                </v-row>
                <v-divider></v-divider>
                <v-row class="justify-end pl-3 pr-3 pt-2 pb-2">
                    <v-btn :disabled="loading" @click="closePopup" text color="textDefault">Закрыть</v-btn>
                </v-row>
            </v-card>
        </template>`,
      props: {
        data: {
          type: Object,
          default: () => {},
        },
      },
      setup(props, ctx) {
        const proxyValue = toRef(props, 'data')
        const loading = ref(false)
        const archiveData = ref(null)
        const closePopup = () => {
          proxyValue.value.customContent.popup.isShow = false
        }
        const download = (val) => {
          Vue.downloadFile(val.url)
          val.loaded = true
        }

        const form = async () => {
          loading.value = true
          const params = _.cloneDeep(proxyValue.value.paramsQuery)
          params.searchColumns = params.searchColumns.reduce((acc, item) => {
            if (item.value) acc.push(item)
            return acc
          }, [])
          params.sorts = params.sorts.reduce((acc, item) => {
            if (item.value) acc.push(item)
            return acc
          }, [])
          const data = await proxyValue.value.store.dispatch('form/update', {
            url: 'create/waybill_archive',
            body: {
              data: {
                ...params,
                filter: [
                  ...proxyValue.value.filtersColumns,
                  { type: 'checkbox', subtype: 'single', alias: 'is_waybill' },
                ],
              },
            },
          })
          archiveData.value = data.result.reduce((acc, item) => {
            acc.push({
              url: item,
              loaded: false,
            })
            return acc
          }, [])
          loading.value = false
        }
        return {
          loading,
          archiveData,

          closePopup,
          download,
          form,
        }
      },
    }),
  },
}

export default button
