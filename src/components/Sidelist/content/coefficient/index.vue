<template>
  <div class="w-100 h-100">
    <v-tabs-items class="h-100" v-model="stage" v-if="data?.code === 1 || true">
      <v-tab-item class="h-100">
        <div class="v-panel d-flex flex-column">
          <div class="pl-7 pr-7">
            <div class="v-panel-heading">
              <v-btn
                class="v-panel-heading_item v-panel-heading_item__left"
                icon
                x-small
                @click="$emit('closePanel')"
              >
                <v-icon small color="disabled">$IconArrowRight</v-icon></v-btn
              >
              План закрытия
            </div>
          </div>
          <div class="overflow-auto flex-grow-1 pl-7 pr-7">
            <div class="v-panel-item" v-for="(item, i) in 16" :key="i">
              <div class="v-panel-item-container">
                <div class="v-panel-item-container_name">
                  РЦ Самара
                  <v-btn icon x-small>
                    <v-icon x-small color="success">$IconLock</v-icon></v-btn
                  >
                </div>
                <v-btn icon x-small @click="stage++">
                  <v-icon small color="disabled">$IconArrowRight</v-icon></v-btn
                >
              </div>
              <div class="v-panel-item-container">
                <div class="v-panel-item-container-info">
                  <div class="v-panel-item-container-info_item">
                    А:&nbsp;<v-icon x-small color="success">$IconGalka</v-icon>
                  </div>
                  <div class="v-panel-item-container-info_item">
                    Б/П:&nbsp;<v-icon x-small color="error">$IconClose</v-icon>
                  </div>
                  <div class="v-panel-item-container-info_item">
                    К:&nbsp;<v-icon x-small color="success">$IconGalka</v-icon>
                  </div>
                  <div class="v-panel-item-container-info_item">
                    Г:&nbsp;<v-icon x-small color="error">$IconClose</v-icon>
                  </div>
                </div>
                <div class="v-panel-item-container_sum">Сумма: 500000</div>
              </div>
            </div>
          </div>
        </div>
      </v-tab-item>

      <v-tab-item class="h-100">
        <div class="v-panel d-flex flex-column">
          <div class="pl-7 pr-7">
            <div class="v-panel-heading">
              <v-btn
                class="v-panel-heading_item v-panel-heading_item__left"
                icon
                x-small
                @click="stage--"
              >
                <v-icon small color="disabled">$IconArrowLeft</v-icon></v-btn
              >
              <div class="v-panel-heading_relative">
                <v-btn
                  icon
                  x-small
                  class="v-panel-heading_item v-panel-heading_item__center"
                >
                  <v-icon small color="disabled">$IconLock</v-icon></v-btn
                >
                РЦ Самара
              </div>
              <div class="v-panel-heading_item v-panel-heading_item__right">
                Январь 2024
              </div>
            </div>
          </div>
          <v-expansion-panels
            multiple
            class="overflow-auto d-block flex-grow-1 pl-7 pr-7"
          >
            <v-expansion-panel v-for="(item, i) in 6" :key="i">
              <v-expansion-panel-header>
                <v-btn @click.stop icon x-small class="mr-1 flex-grow-0">
                  <v-icon small color="success">$IconLock</v-icon></v-btn
                >
                <span
                  class="flex-grow-1 d-flex align-center v-panel-item_heading"
                >
                  Аванс
                  <v-icon x-small color="disabled" class="ml-1"
                    >$IconAttachMail</v-icon
                  >
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-col class="p-0" cols="12" sm="12">
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
                </v-col>
                <div class="v-panel-item_text mt-4 mb-2">Загруженный файл</div>
                <div class="v-panel-item-doc">
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
                </div>
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
