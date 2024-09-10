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
    <v-dialog persistent v-model="confirmPayment" width="420">
      <v-card>
        <v-card-title class="text-h5 text-center">
          Вы подтверждаете начисление аванса за
          {{ currentDate.monthArray[currentDate.month] }}
          {{ currentDate.year }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!prepaymentLoading"
            text
            color="error"
            @click="confirmPayment = false"
          >
            Отменить
          </v-btn>
          <v-btn
            v-if="!prepaymentLoading"
            text
            color="primary"
            @click="createPayment"
          >
            Принять
          </v-btn>
          <v-progress-circular
            v-if="prepaymentLoading"
            color="primary"
            :size="30"
            indeterminate
          />
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
              class="mb-2"
              :color="button.color && 'rgb(255, 144, 0)'"
              small
            >
              <v-icon small :class="[button.label && 'mr-2']">
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
                v-for="(head, index) in options.head"
                :key="index"
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
                    <span
                      class="v-table-header-row-cell-wrap__sort-sort mr-2"
                      v-on:click="sortRow(head)"
                      v-if="availibleTitlesForSortIcons.includes(head.title)"
                    >
                      <vIconSort
                        class="v-table-header-row-cell-wrap__sort-icon"
                        :state="
                          paramsQuery.sorts.length
                            ? paramsQuery.sorts.find(
                                (el) => el.field === head.value
                              ).value
                            : null
                        "
                      />
                    </span>
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
                    <v-tooltip
                      text="Tooltip"
                      v-if="head.sorts && head.sorts[0].isShow"
                    >
                      <template v-slot:activator="{ props }">
                        <v-text-field
                          v-bind="props"
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
                      </template>
                    </v-tooltip>
                  </transition>
                </div>
              </th>
            </tr>
          </thead>

          <tbody v-if="!loading && options.data.rows" class="v-table-body">
            <v-sidelist
              v-if="$props.options.options.sideMenu"
              :date="currentDate"
              :data="$props.options.options.sideMenu"
            />
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
                  @dblclick="
                    ;($props.options.options.doubleHandlerType === 'row' &&
                      openRow($event, row, cell)) ||
                      ($props.options.options.doubleHandlerType === 'cell' &&
                        openCell($event, row, cell))
                  "
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
                      <div
                        :key="card.id"
                        :class="[
                          'v-table-body-row-cell-item',
                          card.is_del && 'v-table-body-row-cell-item__deleted',
                        ]"
                        :style="{
                          width: '150px',
                          height: '80px',
                          background:
                            ((card?.type_shift === 1
                              ? '#c5ffc5'
                              : card?.type_shift === 2
                              ? '#d0f6ff'
                              : card?.type_shift === 3
                              ? '#f4d0ff'
                              : null) ??
                              `${
                                card?.status_color ? card?.status_color : ''
                              }` +
                                `${
                                  card?.is_del
                                    ? ' repeating-linear-gradient( -45deg, #cccccc5c 0 10px, #9999991a 10px 30px )'
                                    : ''
                                }`) ||
                            '#c5ffc5',
                        }"
                        @dblclick.stop="
                          $props.options.options.doubleHandlerType === 'cell' &&
                            openCell($event, row, cell, card)
                        "
                      >
                        <p
                          v-if="card.tarif"
                          class="v-table-body-row-cell-item_text"
                        >
                          {{ card.tarif }}
                        </p>
                        <p
                          v-if="card.price"
                          class="v-table-body-row-cell-item_text v-table-body-row-cell-item_text__bold"
                        >
                          {{ card.price }}
                        </p>
                        <p class="v-table-body-row-cell-item_text">
                          {{ card.doljnost_name ?? card.smena }}
                        </p>
                        <p class="v-table-body-row-cell-item_text">
                          {{ card.hour ?? card.position }}
                        </p>
                        <p
                          class="v-table-body-row-cell-item_text v-table-body-row-cell-item_text__bold"
                        >
                          {{
                            options.head[0].value === 'fio' ||
                            options.head[1].value === 'personal_name'
                              ? card.object_name
                              : card.fio
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
                  <template v-else-if="cell.type === 'download'">
                    <div
                      v-if="Object.byString(row.row, cell.value)"
                      class="v-table-actions-wrap"
                    >
                      {{ Object.byString(row.row, cell.value) }}
                      <v-btn
                        class="ml-2"
                        @click="getDownLoadLink(row.row.object_id)"
                      >
                        <v-icon small> $IconDownload </v-icon>
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

    <div
      v-if="options.data.rows && options.data.rows.length"
      class="v-table-footer pl-4"
    >
      <div v-if="!options.data.footer?.length" class="v-table-footer-total">
        Итого: {{ options.data.totalRows }}
      </div>
      <div v-if="options.data?.footer?.length" class="text-center">
        <span
          v-for="footerInfo in options.data?.footer"
          v-show="footerInfo.value"
          :key="footerInfo.name"
        >
          {{ footerInfo.name }}: {{ footerInfo.value }}
        </span>
      </div>
      <div v-if="options.data.footer" class="v-table-footer-state">
        <div
          class="v-table-footer-state-container"
          v-if="options.data.footer.state"
        >
          <div class="v-table-footer-state-container-column">
            <div
              class="v-table-footer-state-container-column-item font-weight-bold"
            >
              Итого: {{ options.data.footer.all }}
            </div>
            <div
              class="v-table-footer-state-container-column-item font-weight-bold"
            >
              Итого: {{ options.data.footer.del }}
            </div>
          </div>
          <div
            class="v-table-footer-state-container-column"
            v-for="(item, index) in options.data.footer.state"
            :key="index"
          >
            <div class="v-table-footer-state-container-column-item">
              <div
                class="v-table-footer-state-container-column-item_type mr-1"
                :style="{ background: item.color }"
              ></div>
              <span class="v-table-footer-state-container-column-item_count">{{
                item.count
              }}</span>
            </div>
            <div class="v-table-footer-state-container-column-item">
              <div
                class="v-table-footer-state-container-column-item_type mr-1"
                :style="{
                  background:
                    item.color +
                    ' repeating-linear-gradient( -45deg, #cccccc5c 0 2px, #9999991a 2px 6px )',
                }"
              ></div>
              <span class="v-table-footer-state-container-column-item_count">{{
                getItemFromCompare({
                  compareItem: item.color,
                  cuttedArray: options.data.footer.del_state,
                })
              }}</span>
            </div>
          </div>
        </div>
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
