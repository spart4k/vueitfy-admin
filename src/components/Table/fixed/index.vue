<template>
  <div class="v-table d-flex flex-column flex-grow-1 justify-space-between">
    <!--<h1 class="v-table-title">{{ options.options.title }}</h1>-->
    <DropZone
      v-show="false"
      @fileUpload="fileUpload"
      :options="{
        withoutSave: true,
        folder: options.options.folder,
        formats: options.options.formats,
      }"
      ref="dropzone"
    />
    <v-dialog persistent v-model="confirmPayment" width="400">
      <v-card>
        <v-card-title class="text-h5 text-center">
          Вы подтверждаете начисление аванса за
          {{ currentDate.monthArray[currentDate.month] }}
          {{ currentDate.year }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="error" @click="confirmPayment = false">
            Отменить
          </v-btn>
          <v-btn text color="primary" @click="createPayment"> Принять </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Popup
      v-if="globalLoading"
      :options="{ portal: 'filter', transparent: true }"
    >
      <v-progress-circular color="primary" :size="80" indeterminate />
    </Popup>
    <Popup
      :options="{ portal: 'filter', padding: '20px 30px', width: '434px' }"
      @close="acceptData.popup = false"
      v-if="acceptData.popup"
    >
      <div class="d-flex flex-column align-center">
        <v-select
          v-model="acceptData.valueProfit"
          :items="[
            { title: 'Аванс', value: 5 },
            { title: 'Зарплата', value: 3 },
          ]"
          item-text="title"
          full-width
          return-object
          style="width: 100%"
          label="Вид ведомости"
        ></v-select>
        <v-date-picker
          locale="ru"
          v-model="acceptData.valueDate"
          color="primary"
          width="100%"
          type="month"
        ></v-date-picker>
        <div class="d-flex mt-7">
          <v-btn @click="acceptForm" tonal color="primary"> Принять </v-btn>
          <v-btn
            @click="acceptData.popup = false"
            tonal
            color="error"
            class="ml-5"
          >
            Отменить
          </v-btn>
        </div>
      </div>
    </Popup>
    <Popup
      closeButton
      @close="closePopupForm"
      :options="{ width: options.detail.width, portal: 'table-detail' }"
      v-if="
        options.detail && options.detail.type === 'popup' && popupForm.isShow
      "
    >
      <router-view
        :content="popupForm.dataCellForm"
        :detail="detail"
        :class="[...options.detail.bootstrapClass, ...options.detail.classes]"
        @closePopup="closePopupForm"
        @getItems="getItems"
      />
    </Popup>
    <div class="v-table-body-wrap d-flex flex-column flex-grow-1 h-100">
      <div
        :class="options.options.headerFixed ? 'v-table-panel--fixed' : ''"
        class="v-table-panel"
      >
        <div v-if="panel.date" class="v-table-panel-date">
          <v-btn icon class="mr-4" @click="changeMonth(-1)">
            <v-icon small> $IconArrowLeft </v-icon>
          </v-btn>
          <div class="v-table-panel-date_month">
            {{ currentDate.monthArray[currentDate.month] }}
            {{ currentDate.year }}
          </div>
          <v-btn icon class="ml-4" @click="changeMonth(1)">
            <v-icon small> $IconArrowRight </v-icon>
          </v-btn>
        </div>
        <div class="v-table-panel-items">
          <div class="v-table-panel-items__actions flex-wrap">
            <v-btn
              v-for="(button, indexButton) in availablePanelBtn"
              :key="indexButton"
              @click="panelHandler(button)"
              :disabled="button.isDisabled"
              small
            >
              <v-icon small class="mr-2">
                {{ button.url }}
              </v-icon>
              <p v-if="true">{{ button.label }}</p>
            </v-btn>
          </div>
          <div class="v-table-panel-items__search">
            <v-text-field
              v-if="panel.search"
              label="Поиск"
              hide-details="auto"
              clearable
              v-model="paramsQuery.searchGlobal"
            ></v-text-field>
            <v-btn
              v-if="panel.filters"
              small
              @click="openFilter"
              class="ml-2"
              elevation="2"
            >
              Фильтры
            </v-btn>
          </div>
        </div>
      </div>

      <div class="v-table-wrap">
        <table id="mainTable" ref="mainTable">
          <thead
            :class="options.options.headerFixed ? 'v-table-header--fixed' : ''"
            class="v-table-header"
          >
            <tr class="v-table-header-row">
              <!-- <th
                :class="[
                  headerOptions.some((el) => el.fixed.value)
                    ? 'v-table-header-row-cell--fixed'
                    : '',
                ]"
                align="center"
                width="40px"
                v-if="options.options.selecting"
                class="v-table-header-row-cell"
              ></th> -->
              <th
                :align="head.align"
                :class="[
                  head.fixed.value ? 'v-table-header-row-cell--fixed' : '',
                  head.weekendDate && 'v-table-header-row-cell--weekendDate',
                  head.currentDate && 'v-table-header-row-cell--currentDate',
                  head.class,
                ]"
                :style="{
                  minWidth: `${head.width}px`,
                  width: `${head.width}px`,
                }"
                v-show="head.isShow"
                :id="head.value + '-table-header'"
                class="v-table-header-row-cell"
                v-for="head in options.head"
                :key="head.id"
                ref="cells"
              >
                <div class="v-table-header-row-cell-wrap">
                  <span
                    :class="
                      head.align === 'center'
                        ? 'justify-center'
                        : head.align === 'left'
                        ? 'justify-start'
                        : head.align === 'rigth'
                        ? 'justify-end'
                        : ''
                    "
                    class="v-table-header-row-cell-wrap__sort"
                  >
                    <span @click="!head.added && sortRow(head)">
                      {{ head.title }}
                    </span>
                    <v-icon
                      v-if="!head.added"
                      class="ml-2"
                      @click="openSort(head)"
                      small
                      >$IconSearch</v-icon
                    >
                  </span>
                  <transition name="accordion">
                    <div
                      v-if="head.sorts && head.sorts[0].isShow"
                      class="v-table-header-row-cell-sort"
                    >
                      <v-text-field
                        class="v-table-header-row-cell-sort__search"
                        @clearfield="clearField('searchField')"
                        clearable
                        clearing
                        type="search"
                        placeholder="Поиск"
                        v-model="
                          paramsQuery.searchColumns.find(
                            (el) => el.field === head.value
                          ).value
                        "
                      />
                    </div>
                  </transition>
                </div>
              </th>
            </tr>
          </thead>

          <tbody v-if="!loading && options.data.rows" class="v-table-body">
            <template v-for="row in options.data.rows">
              <tr
                :key="row.row.id"
                :class="[row.row.selected ? 'v-table-body-row--selected' : '']"
                @contextmenu="openContext($event, row)"
                @click="openChildRow($event, row)"
                class="v-table-body-row"
                ref="cellItems"
              >
                <td
                  :style="{
                    width: cell.width,
                  }"
                  :class="[
                    !cell.noAction ? 'v-table-body-row-cell--hover' : '',
                    cell.fixed.value ? 'v-table-body-row-cell--fixed' : '',
                    cell.weekendDate && 'v-table-body-row-cell--weekendDate',
                    cell.currentDate && 'v-table-body-row-cell--currentDate',
                    cell.type === 'object' &&
                      'v-table-body-row-cell--noPadding',
                  ]"
                  :id="cell.value + '-table-cell' + '_id' + row.row.id"
                  :align="cell.align"
                  class="v-table-body-row-cell v-table-actions"
                  v-show="cell.isShow ? true : false"
                  v-for="(cell, cellIndex) in options.head"
                  @dblclick="doubleHandler($event, row, cell)"
                  :key="cellIndex"
                >
                  <template v-if="cell.type === 'default'">
                    {{ Object.byString(row.row, cell.value) }}
                  </template>
                  <template v-else-if="cell.type === 'object'">
                    <!-- <template
                      v-if="options.options.pageName && cell.type === 'object'"
                      >1
                    </template> -->
                    <template
                      v-for="card in Object.byString(row.row, cell.value)"
                    >
                      <!-- {{ card }} -->
                      <div
                        :key="card.id"
                        class="v-table-body-row-cell-item"
                        :style="{
                          width: '150px',
                          height: '60px',
                          background:
                            card.type_shift === 1
                              ? '#c5ffc5'
                              : card.type_shift === 2
                              ? '#d0f6ff'
                              : '#f4d0ff',
                        }"
                      >
                        <p class="v-table-body-row-cell-item_text">
                          {{ card.hour }}
                        </p>
                        <p class="v-table-body-row-cell-item_text">
                          {{ card.doljnost_name }}
                        </p>
                        <p
                          class="v-table-body-row-cell-item_text v-table-body-row-cell-item_text__bold"
                        >
                          {{
                            options.head[0].value === 'personal_name'
                              ? card.object_name
                              : card.personal_name
                          }}
                        </p>
                      </div>
                    </template>
                  </template>
                  <template v-else-if="cell.type === 'actions'">
                    <div class="v-table-actions-wrap">
                      <v-btn
                        v-for="(action, indexAction) in cell.actions"
                        :key="indexAction"
                      >
                        <v-icon small>
                          {{ action.url }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </template>
                </td>
              </tr>
              <tr
                :key="row.row.account_id + 'child'"
                v-show="
                  row.child.isShow && options.head.some((el) => !el.isShow)
                "
                class="v-table-body-row v-table-body-row--child overflowHidden"
              >
                <td class="v-table-body-row-cell" :colspan="colspanLength">
                  <transition-group
                    name="testanim"
                    class="overflowHidden"
                    tag="ul"
                  >
                    <template
                      v-if="!cell.isShow"
                      v-for="(cell, cellIndex) in options.head"
                    >
                      <li
                        v-if="cell.type === 'default'"
                        class="v-table-body-row-paragraph"
                        :key="cellIndex"
                      >
                        <span>{{ cell.title }}: </span>
                        <span>{{ row.child.data[cell.value] }}</span>
                      </li>
                      <li
                        v-else-if="cell.type === 'actions'"
                        class="v-table-body-row-paragraph v-table-actions"
                        :key="cellIndex"
                      >
                        <v-btn
                          v-for="(action, indexAction) in cell.actions"
                          :key="indexAction"
                          class="mr-3"
                          @click="action.function"
                        >
                          <v-icon small>
                            {{ action.url }}
                          </v-icon>
                        </v-btn>
                      </li>
                    </template>
                  </transition-group>
                </td>
              </tr>
            </template>
          </tbody>
          <div
            v-if="loading"
            class="v-table-loading text-center d-flex align-center justify-center flex-grow-1"
          >
            <v-progress-circular color="primary" :size="80" indeterminate />
          </div>
          <p
            v-if="
              (!loading && options.data.rows && !options.data.rows.length) ||
              options.data.rows === null
            "
            class="v-table-loading"
          >
            Объекты не найдены
          </p>
        </table>
      </div>
    </div>

    <div class="v-table-footer pl-4">
      <div class="v-table-footer-total">
        Итого: {{ options.data.totalRows }}
      </div>
      <div class="v-table-footer-pagination">
        <div class="v-table-footer-pagination-length">
          <v-select
            :items="rowCount"
            label="Количество на странице:"
            v-model="paramsQuery.countRows"
            hide-details
          />
        </div>
        <div class="text-center">
          <v-pagination
            v-model="paramsQuery.currentPage"
            :length="options.data.totalPages"
            :total-visible="7"
          ></v-pagination>
        </div>
      </div>
    </div>
    <v-contextmenu :options="contextmenu" />
    <portal v-if="filters" to="filter">
      <Sheet :isShow="filter.isShow">
        <keep-alive>
          <TableFilter
            @closeFilter="closeFilter"
            @saveFilter="saveFilter"
            :filtersConfig="filters"
          />
        </keep-alive>
      </Sheet>
    </portal>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
