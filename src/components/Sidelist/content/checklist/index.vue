<template>
  <div class="w-100 h-100">
    <v-tabs-items touchless class="h-100" v-model="stage">
      <v-tab-item class="h-100">
        <div class="v-panel d-flex flex-column pb-5">
          <SidelistHeader
            @closePanel="$emit('closePanel')"
            @changePeriod="
              changePeriod({ type: 'month', object: data.period.data })
            "
            :data="$props.data"
            :disabled="disabled"
            :lock="{
              color:
                data.period?.data?.id &&
                (data.period?.data?.is_close === 1 ? 'success' : 'disabled'),
              tooltip: 'Закрыть период',
            }"
          />
          <div
            class="overflow-auto flex-grow-1 pl-7 pr-7"
            v-if="data.content?.code === 1 && !loading"
          >
            <div
              class="v-panel-item"
              v-for="(item, i) in data.content.data"
              :key="i"
            >
              <div class="v-panel-item-container">
                <div class="v-panel-item-container_name">
                  {{ item.name }}
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        @click.stop="
                          changePeriod({ type: 'object', object: item })
                        "
                        icon
                        x-small
                        v-bind="attrs"
                        v-on="on"
                        :disabled="disabled"
                      >
                        <v-icon
                          x-small
                          :color="
                            item?.is_close === 2
                              ? 'warning'
                              : item?.is_close === 1
                              ? 'success'
                              : 'disabled'
                          "
                          >$IconLock</v-icon
                        ></v-btn
                      >
                    </template>
                    <span>Закрыть объект</span>
                  </v-tooltip>
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
                      :color="
                        item.is_load === 2
                          ? 'warning'
                          : item.is_load === 1
                          ? 'success'
                          : 'error'
                      "
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
          <div v-else class="d-flex align-center justify-center h-100">
            <v-progress-circular
              v-if="loading"
              color="primary"
              :size="80"
              indeterminate
            />
            <v-app-bar-title class="text--text text-h5" v-else>{{
              data.content?.code === 2
                ? 'Период не обрабатывался'
                : 'Период не обрабатывался'
            }}</v-app-bar-title>
          </div>
        </div>
      </v-tab-item>

      <v-tab-item class="h-100">
        <div class="v-panel d-flex flex-column">
          <SidelistHeader
            @changeStage="stageBack()"
            @changePeriod="
              changePeriod({ type: 'object', object: data.detail })
            "
            :data="data.detail"
            :date="$props.date"
            :disabled="disabled"
            :lock="{
              color:
                data.detail?.is_close === 2
                  ? 'warning'
                  : data.detail?.is_close === 1
                  ? 'success'
                  : 'disabled',
              tooltip: 'Закрыть объект',
            }"
            stage
          />
          <v-row v-if="data.detail?.is_close === 2" class="justify-center mt-4">
            <v-btn
              @click=";(confirm.isShow = true), (confirm.object = data)"
              color="success"
              :disabled="disabled"
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
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      @click.stop="changePeriod({ type: 'type', object: item })"
                      icon
                      x-small
                      v-bind="attrs"
                      v-on="on"
                      class="mr-1 flex-grow-0"
                      :disabled="disabled"
                    >
                      <v-icon
                        small
                        :color="item?.is_close ? 'success' : 'disabled'"
                        >$IconLock</v-icon
                      ></v-btn
                    >
                  </template>
                  <span>Закрыть тип</span>
                </v-tooltip>
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
                      <div
                        @click="
                          item.content?.filepath &&
                            downloadFile(item.content?.filepath)
                        "
                        class="v-panel-item-doc mt-4 v-panel-item-doc__pointer"
                      >
                        <v-row
                          class="d-flex align-center justify-space-between"
                        >
                          <v-col cols="12" sm="8">
                            <div class="d-flex align-center">
                              <v-icon x-small color="disabled"
                                >$IconAttachMail</v-icon
                              >
                              <div
                                class="ml-1 text--text v-panel-item-doc_text font-weight-bold"
                              >
                                {{ item.content?.filepath }}
                              </div>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <span
                              class="ml-1 gray--text v-panel-item-doc_date"
                              >{{ formatDate(item.content?.last_date) }}</span
                            >
                          </v-col>
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

                <template v-else-if="item.type_id === 3">
                  <v-col class="p-0" cols="12" sm="12">
                    <v-row class="mb-4 align-center">
                      <div
                        class="v-panel-item_text v-panel-item_text__bold d-flex align-center"
                      >
                        <div>{{ item.content?.load }}/</div>
                        <div v-if="!item.content?.edit">
                          {{ item.content?.total }}
                        </div>
                        <v-text-field
                          class="pt-0 mt-0 ml-1"
                          v-else
                          v-model="editedType.total"
                          v-mask="'#########'"
                        />
                      </div>
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
                        <div
                          @click="
                            history.filepath && downloadFile(history.filepath)
                          "
                          class="v-panel-item-doc mt-4 v-panel-item-doc__pointer"
                        >
                          <v-row
                            class="d-flex align-center justify-space-between"
                          >
                            <v-col cols="12" sm="8">
                              <div class="d-flex align-center">
                                <v-icon x-small color="disabled"
                                  >$IconAttachMail</v-icon
                                >
                                <div
                                  class="ml-1 text--text v-panel-item-doc_text font-weight-bold"
                                >
                                  {{ history.filepath }}
                                </div>
                              </div>
                            </v-col>
                            <v-col cols="12" sm="4">
                              <span
                                class="ml-1 gray--text v-panel-item-doc_date"
                                >{{ formatDate(history.date) }}</span
                              >
                            </v-col>
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

                <template v-if="item.type_id === 6">
                  <v-col class="p-0" cols="12" sm="12">
                    <v-row>
                      <v-row class="align-center">
                        <span class="v-panel-item_text v-panel-item_text__bold"
                          >{{ item.content?.count }}/{{
                            ![4, 8, 17].includes(permission)
                              ? item.content?.max
                              : ''
                          }}</span
                        >
                        <v-text-field
                          v-if="
                            item.content?.max !== undefined &&
                            [4, 8, 17].includes(permission)
                          "
                          class="v-panel-item_field"
                          v-model="maxBin"
                          dense
                          color="primary"
                          hide-details
                          maxlength="8"
                        ></v-text-field>
                        <v-btn
                          v-if="[4, 8, 17].includes(permission)"
                          @click="changeBin(maxBin, item)"
                          class="ml-6"
                          elevation="0"
                          :disabled="
                            !Number(maxBin) ||
                            Number(maxBin) === Number(item.content?.max)
                          "
                          color="primary"
                          small
                          >Изменить</v-btn
                        >
                      </v-row>
                    </v-row>
                    <v-row>
                      <div class="v-panel-item_text">
                        Назначений: {{ item.content?.target_count }}
                      </div>
                    </v-row>
                    <v-row>
                      <div class="v-panel-item_text v-panel-item_text__bold">
                        На сумму: {{ item.content?.sum }}р
                      </div>
                    </v-row>
                    <div class="v-panel-item-doc mt-4">
                      <v-row>
                        <div class="v-panel-item_text">
                          Последнее значение установлено: <br />
                          {{ item.content?.okk_name }}
                          {{ item.content?.last_date }}
                        </div>
                      </v-row>
                      <v-row>
                        <div class="v-panel-item_text v-panel-item_text__bold">
                          Распределил: <br />
                          {{
                            item.content?.account_name
                              ? item.content?.account_name
                              : '-'
                          }}
                          {{
                            item.content?.account_name
                              ? item.content?.diff_date
                              : ''
                          }}
                        </div>
                      </v-row>
                    </div>
                    <v-row class="justify-end">
                      <div
                        class="v-panel-item_text v-panel-item_text__bold mt-2"
                      >
                        Итого: {{ item.content?.payment_sum }}р
                      </div>
                    </v-row>
                  </v-col>
                </template>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog persistent v-model="confirm.isShow" width="500">
      <v-card>
        <v-card-title class="text-h5 justify-center">
          Вы подтверждаете начало периода?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="confirm.isShow = false">
            Отменить
          </v-btn>
          <v-btn
            @click="
              changePeriod({ type: 'object', object: confirm.object.detail }),
                (confirm.isShow = false)
            "
            class="ml-4"
            type="submit"
            color="primary"
          >
            Принять
          </v-btn>
          <!-- <v-progress-circular
            v-if="prepaymentLoading"
            color="primary"
            :size="30"
            indeterminate
          /> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
