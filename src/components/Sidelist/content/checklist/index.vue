<template>
  <div class="w-100 h-100">
    <v-tabs-items class="h-100" v-model="stage" v-if="data?.code === 1 || true">
      <v-tab-item class="h-100">
        <div class="v-panel d-flex flex-column pb-5">
          <SidelistHeader
            @closePanel="$emit('closePanel')"
            :data="$props.data"
          />
          <div class="overflow-auto flex-grow-1 pl-7 pr-7">
            <div
              class="v-panel-item"
              v-for="(item, i) in data.content.data"
              :key="i"
            >
              <div class="v-panel-item-container">
                <div class="v-panel-item-container_name">
                  {{ item.name }}
                  <v-btn icon x-small>
                    <v-icon
                      x-small
                      :color="
                        item.is_close === 2
                          ? 'warning'
                          : item.is_close === 1
                          ? 'success'
                          : 'disabled'
                      "
                      >$IconLock</v-icon
                    ></v-btn
                  >
                </div>
                <v-btn icon x-small @click="openDetail(item)">
                  <v-icon small color="disabled">$IconArrowRight</v-icon></v-btn
                >
              </div>
              <div class="v-panel-item-container">
                <div class="v-panel-item-container-info">
                  <div
                    class="v-panel-item-container-info_item"
                    v-for="(item, index) in item.types"
                    :key="index"
                  >
                    {{ types[item.type_id] }}:&nbsp;<v-icon
                      x-small
                      :color="item.is_load ? 'success' : 'error'"
                      >{{ item.is_load ? '$IconGalka' : '$IconClose' }}</v-icon
                    >
                  </div>
                </div>
                <div class="v-panel-item-container_sum">
                  Сумма: {{ item.total }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-tab-item>

      <v-tab-item class="h-100">
        <div class="v-panel d-flex flex-column">
          <SidelistHeader
            @changeStage="stageBack()"
            :data="$props.data"
            :date="$props.date"
            :lockColor="
              data.detail.is_close === 2
                ? 'warning'
                : data.detail.is_close === 1
                ? 'success'
                : 'disabled'
            "
            stage
          />
          <v-row v-if="data.detail.is_close === 2" class="justify-center mt-4">
            <v-btn
              @click="changePeriod({ type: 'object', object: data.detail })"
              color="success"
              >Начать период</v-btn
            >
          </v-row>
          <v-expansion-panels
            multiple
            v-else
            v-model="detailPanels"
            class="overflow-auto d-block flex-grow-1 pl-7 pr-7"
          >
            <v-expansion-panel
              :disabled="item.type_id === 5"
              v-for="(item, i) in data.detail.types"
              :key="i"
            >
              <v-expansion-panel-header>
                <v-btn @click.stop icon x-small class="mr-1 flex-grow-0">
                  <v-icon small :color="item.is_close ? 'success' : 'disabled'"
                    >$IconLock</v-icon
                  ></v-btn
                >
                <span
                  class="flex-grow-1 d-flex align-center v-panel-item_heading"
                >
                  {{ item.type_name }}
                  <v-icon v-if="false" x-small color="disabled" class="ml-1"
                    >$IconAttachMail</v-icon
                  >
                </span>
                <template v-slot:actions>
                  <v-progress-circular
                    v-if="item.loading"
                    color="primary"
                    :size="28"
                    indeterminate
                  />
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <template v-if="item.type_id === 4">
                  <v-col class="p-0" cols="12" sm="12">
                    <v-row>
                      <div class="v-panel-item_text">
                        Назначения: {{ item.content?.target_count }}
                      </div>
                    </v-row>
                    <v-row>
                      <div class="v-panel-item_text">
                        Оплачено: {{ item.content?.prepayment_count }}
                      </div>
                    </v-row>
                    <v-row>
                      <div class="v-panel-item_text v-panel-item_text__bold">
                        На сумму: {{ item.content?.sum }}р
                      </div>
                    </v-row>
                    <div class="v-panel-item-doc mt-4">
                      <template v-if="item.content?.account_name">
                        <v-row>
                          <div class="v-panel-item_text">
                            {{ item.content?.account_name }}
                          </div>
                        </v-row>
                        <v-row>
                          <div
                            class="v-panel-item_text v-panel-item_text__bold"
                          >
                            {{ item.content?.last_date }}р
                          </div>
                        </v-row>
                      </template>
                      <template v-else>
                        <v-row>
                          <div
                            class="v-panel-item_text v-panel-item_text__bold"
                          >
                            Аванс не начислен
                          </div>
                        </v-row>
                      </template>
                    </div>
                  </v-col>
                </template>

                <template v-else-if="item.type_id === 1 || item.type_id === 2">
                  <v-col class="p-0" cols="12" sm="12">
                    <template v-if="item.content?.code === 2">
                      <v-row class="justify-center">
                        <div class="v-panel-item_text v-panel-item_text__bold">
                          Документ не был загружен
                        </div>
                      </v-row>
                    </template>
                    <template v-else>
                      <v-row>
                        <div class="v-panel-item_text">
                          По файлу: {{ item.content?.count_file }}
                        </div>
                      </v-row>
                      <v-row>
                        <div class="v-panel-item_text">
                          Найдено: {{ item.content?.count_target }}
                        </div>
                      </v-row>
                      <v-row>
                        <div class="v-panel-item_text">
                          С ошибками: {{ item.content?.count_error }}
                        </div>
                      </v-row>
                      <v-row>
                        <div class="v-panel-item_text v-panel-item_text__bold">
                          На сумму: {{ item.content?.sum_parser }}р
                        </div>
                      </v-row>
                      <div class="v-panel-item-doc mt-4">
                        <v-row
                          class="d-flex align-center justify-space-between"
                        >
                          <div>
                            <v-icon x-small color="disabled"
                              >$IconAttachMail</v-icon
                            ><span
                              class="ml-1 text--text v-panel-item-doc_text font-weight-bold"
                              >{{ item.content?.filepath }}</span
                            >
                          </div>
                          <span class="ml-1 gray--text v-panel-item-doc_date">{{
                            item.content?.last_date
                          }}</span>
                        </v-row>
                        <v-row
                          ><span
                            class="ml-4 gray--text v-panel-item-doc_text"
                            >{{ item.content?.account_name }}</span
                          ></v-row
                        >
                        <v-divider class="mt-1 mb-1"></v-divider>
                        <v-row
                          ><span class="ml-4 text--text v-panel-item-doc_text"
                            >Остаток ошибок:
                            <span class="font-weight-bold">{{
                              item.content?.count_error
                            }}</span>
                            из {{ item.content?.count_file }}
                          </span></v-row
                        >
                      </div>
                      <v-row class="justify-end mt-4">
                        <div class="v-panel-item_text v-panel-item_text__bold">
                          Итого: {{ item.content?.total }}р
                        </div>
                      </v-row>
                    </template>
                  </v-col>
                </template>

                <template v-if="item.type_id === 3">
                  <v-col class="p-0" cols="12" sm="12">
                    <v-row class="mb-4">
                      <div class="v-panel-item_text v-panel-item_text__bold">
                        {{ item.content?.load }}/{{ item.content?.total }}
                      </div>
                      <!-- <template v-if="editedType.loading">
                        <v-progress-circular
                          color="primary"
                          class="ml-2"
                          :size="21"
                          indeterminate
                        />
                      </template>
                      <template v-else-if="!item.content?.edit">
                        <v-btn
                          @click="editTotalCount(item)"
                          class="ml-2"
                          icon
                          x-small
                        >
                          <v-icon small color="gray">$IconEdit</v-icon></v-btn
                        >
                      </template>
                      <template v-else-if="item.content?.edit">
                        <v-btn class="ml-2" icon x-small>
                          <v-icon small color="success"
                            >$IconGalka</v-icon
                          ></v-btn
                        >
                        <v-btn class="ml-2" icon x-small>
                          <v-icon small color="gray"
                            >$IconArrowCircleRight</v-icon
                          ></v-btn
                        >
                      </template> -->
                    </v-row>
                    <template v-if="item.content?.history.length">
                      <div
                        v-for="(history, i) in item.content?.history"
                        class="mb-4"
                        :key="i"
                      >
                        <v-divider></v-divider>
                        <v-row class="mt-4">
                          <div class="v-panel-item_text">
                            Бой/Порча: {{ history?.sum_damage }}
                          </div>
                        </v-row>
                        <v-row>
                          <div class="v-panel-item_text">
                            Ошибки: {{ history.sum_error }}
                          </div>
                        </v-row>
                        <v-row>
                          <div class="v-panel-item_text">
                            Прочие: {{ history.sum_cost }}
                          </div>
                        </v-row>
                        <v-row>
                          <div
                            class="v-panel-item_text v-panel-item_text__bold"
                          >
                            Итого: {{ history.sum }}р
                          </div>
                        </v-row>
                        <div class="v-panel-item-doc mt-4">
                          <v-row
                            class="d-flex align-center justify-space-between"
                          >
                            <div>
                              <v-icon x-small color="disabled"
                                >$IconAttachMail</v-icon
                              ><span
                                class="ml-1 text--text v-panel-item-doc_text font-weight-bold"
                                >{{ history.filepath }}</span
                              >
                            </div>
                            <span
                              class="ml-1 gray--text v-panel-item-doc_date"
                              >{{ history.date }}</span
                            >
                          </v-row>
                          <v-row
                            ><span
                              class="ml-4 gray--text v-panel-item-doc_text"
                              >{{ history.account_name }}</span
                            ></v-row
                          >
                          <v-divider class="mt-1 mb-1"></v-divider>
                          <v-row
                            ><span class="ml-4 text--text v-panel-item-doc_text"
                              >Остаток ошибок:
                              <span class="font-weight-bold">{{
                                history.remainder_error
                              }}</span>
                              из {{ history.file_count }}
                            </span></v-row
                          >
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <v-row class="justify-center">
                        <div class="v-panel-item_text v-panel-item_text__bold">
                          Бой/Порча не была загружена
                        </div>
                      </v-row>
                    </template>
                    <!-- <div class="v-panel-item-doc mt-4"></div> -->
                  </v-col>
                </template>

                <!-- <v-col class="p-0" cols="12" sm="12">
                  <v-row>
                    <div class="v-panel-item_text">Назначения: 100</div>
                  </v-row>
                  <v-row>
                    <div class="v-panel-item_text">Оплачено: 90</div>
                  </v-row>
                  <v-row>
                    <div class="v-panel-item_text v-panel-item_text__bold">
                      На сумму: 10 000 000р
                    </div>
                  </v-row>
                </v-col> -->
                <!-- <div class="v-panel-item_text mt-4 mb-2">Загруженный файл</div> -->
                <!-- <div class="v-panel-item-doc">
                  <v-row class="d-flex align-center justify-space-between">
                    <div>
                      <v-icon x-small color="disabled">$IconAttachMail</v-icon
                      ><span
                        class="ml-1 text--text v-panel-item-doc_text font-weight-bold"
                        >poopy.small.jpg.png</span
                      >
                    </div>
                    <span class="ml-1 gray--text v-panel-item-doc_date"
                      >02.02.2024</span
                    >
                  </v-row>
                  <v-row
                    ><span class="ml-4 gray--text v-panel-item-doc_text"
                      >Абдула Ахмед Мухали Пчих Ъ</span
                    ></v-row
                  >
                  <v-divider class="mt-1 mb-1"></v-divider>
                  <v-row
                    ><span class="ml-4 text--text v-panel-item-doc_text"
                      >Остаток ошибок:
                      <span class="font-weight-bold">9 000</span> из 1 000
                    </span></v-row
                  >
                </div> -->
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <div class="d-flex align-center justify-center h-100">
      <v-progress-circular
        v-if="loading"
        color="primary"
        :size="80"
        indeterminate
      />
      <v-app-bar-title class="text--text text-h5" v-else>{{
        data?.code === 2 ? 'Период не обрабатывался' : 'Lorem, ipsum dolor'
      }}</v-app-bar-title>
    </div>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
