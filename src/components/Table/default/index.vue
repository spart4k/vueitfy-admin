<template>
  <div class="v-table d-flex flex-column flex-grow-1 justify-space-between">
    <div class="v-table-body-wrap d-flex flex-column flex-grow-1 h-100">
      <div
        :class="options.options.headerFixed ? 'v-table-panel--fixed' : ''"
        class="v-table-panel"
      >
        <!-- <div v-if="panel.date" class="v-table-panel-date">
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
        </div> -->
        <div class="v-table-panel-items">
          <div class="v-table-panel-items__actions flex-wrap">
            <div class=""></div>
            <div
              v-for="(button, indexButton) in availablePanelBtn"
              :key="indexButton"
              :class="`panel-button_${button.label}`"
              small
            >
              <SwitchDefault
                @getItems="changeHeaders"
                :button="button"
                :config="options"
                v-if="button.type === 'switch'"
                v-model="button.value"
              />
              <v-btn v-else @click="panelHandler(button)" small>
                <v-icon
                  v-if="button.type === 'icon' || button.icon"
                  small
                  :class="[button.label && 'mr-2']"
                >
                  {{ button.url ?? button.icon }}
                </v-icon>
                <p v-if="true">{{ button.label }}</p>
              </v-btn>
            </div>
          </div>

          <div class="v-table-panel-items__search">
            <v-text-field
              label="Поиск"
              hide-details="auto"
              clearable
              v-model="paramsQuery.searchGlobal"
            ></v-text-field>
            <v-btn
              v-if="options.filters"
              small
              @click="openFilter($event)"
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
              <th
                :class="[
                  headerOptions.some((el) => el.fixed.value)
                    ? 'v-table-header-row-cell--fixed'
                    : '',
                ]"
                align="center"
                width="40"
                v-if="options.options.selecting"
                class="v-table-header-row-cell"
              ></th>
              <th
                :align="head.align"
                :class="[
                  head.fixed.value ? 'v-table-header-row-cell--fixed' : '',
                  head.class,
                ]"
                :style="{
                  width: head.width,
                }"
                v-show="head.isShow"
                :id="head.value + '-table-header'"
                class="v-table-header-row-cell"
                v-for="(head, index) in proxyOptions"
                :key="index"
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
                    <div
                      class="v-table-header-row-cell-wrap__sort-sort"
                      v-on:click="sortRow(head)"
                    >
                      <vIconSort
                        v-if="
                          head.sorts &&
                          head.sorts.length &&
                          paramsQuery.sorts.length
                        "
                        class="v-table-header-row-cell-wrap__sort-icon"
                        :state="
                          paramsQuery.sorts.find(
                            (el) => el.field === head.value
                          )?.value
                        "
                      />
                    </div>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <div
                            v-if="
                              head.type === 'default' ||
                              head.type === 'checkbox'
                            "
                          >
                            <span class="mr-2" @click="sortRow(head)">
                              {{ head.title }}
                            </span>
                            <v-icon
                              v-if="head.search.isShow"
                              @click="openSort(head)"
                              small
                            >
                              $IconSearch
                            </v-icon>
                          </div>
                          <div v-if="head.type === 'icon'">
                            <span class="mr-2" @click="sortRow(head)">
                              <v-icon> {{ head.icon }}</v-icon>
                            </span>
                          </div>
                          <div v-if="head.type === 'download'">
                            <span class="mr-2">
                              {{ head.title }}
                            </span>
                          </div>
                        </div>
                      </template>
                      <span>{{ head.title }}</span>
                    </v-tooltip>
                  </span>
                  <transition name="accordion">
                    <v-tooltip
                      text="Tooltip"
                      v-if="
                        head.sorts && head.sorts.length && head.sorts[0].isShow
                      "
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
            <template v-for="(row, indexRow) in options.data.rows">
              <!-- {{ row.row.id + indexRow }} -->
              <tr
                :key="row.row.id + indexRow"
                :class="[row.row.selected ? 'v-table-body-row--selected' : '']"
                @contextmenu="openContext($event, row)"
                @click="openChildRow($event, row)"
                class="v-table-body-row"
                :style="insertStyle(row.row)"
              >
                <td
                  class="v-table-body-row-cell__checkbox"
                  align="center"
                  v-if="options.options.selecting"
                  :class="[
                    headerOptions.some((el) => el.fixed.value)
                      ? 'v-table-body-row-cell--fixed'
                      : '',
                    `v-table-body-row__checkbox`,
                  ]"
                >
                  <div @click.stop class="v-table-checkbox">
                    <label>
                      <input
                        @change="saveLastSelected({ row, indexRow })"
                        @click.stop.shift="checkboxInput(row, indexRow)"
                        v-model="row.row.selected"
                        type="checkbox"
                      />
                    </label>
                  </div>
                </td>
                <td
                  :style="{
                    //...getFixedStyle(cell),
                    width: cell.width,
                    backgroundColor: cell.backgroundColorKey
                      ? row.row[cell.backgroundColorKey]
                      : undefined,
                  }"
                  :class="{
                    ...addBackgroundClass(cell, row.row, Object.byString),
                  }"
                  :id="cell.value + '-table-cell' + '_id' + row.row.id"
                  :align="cell.align"
                  class="v-table-body-row-cell v-table-actions"
                  v-show="cell.isShow ? true : false"
                  v-for="(cell, cellIndex) in options.head"
                  :key="cellIndex"
                  @dblclick="
                    doubleHandler($event, row.row, cell, indexRow, cellIndex, [
                      0,
                    ])
                  "
                >
                  <template v-if="cell.type === 'default'">
                    {{ Object.byString(row.row, cell.value) }}
                  </template>
                  <template v-if="cell.type === 'icon'">
                    <v-icon
                      :style="styleDate(row.row, cell, Object.byString)"
                      :color="
                        iconColor(
                          Object.byString(row.row, cell.value),
                          'conditionValue' in cell
                            ? Object.byString(row.row, cell.conditionValue)
                            : cell.conditionValue
                        )
                      "
                    >
                      {{ iconType(row.row, cell, Object.byString) }}
                    </v-icon>
                  </template>
                  <template v-else-if="cell.type === 'checkbox'">
                    <v-row class="d-flex justify-center">
                      <v-checkbox
                        :input-value="Object.byString(row.row, cell.value)"
                        value
                        disabled
                      ></v-checkbox>
                    </v-row>
                  </template>
                  <!--<template v-else-if="cell.type === 'actions'">
                    <div
                      v-if="
                        !cell.actionCondition ||
                        (cell.actionCondition &&
                          Object.byString(row.row, cell.value) &&
                          false)
                      "
                      class="v-table-actions-wrap"
                    >
                      <v-btn
                        v-for="(action, indexAction) in cell.actions"
                        :key="indexAction"
                        @click="
                          action.function(Object.byString(row.row, cell.value))
                        "
                      >
                        <v-icon small>
                          {{ action.url }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </template>-->
                  <template v-else-if="cell.type === 'download'">
                    <!--<v-table-button
                      :row="row.row"
                      :option="action"
                      v-for="(action, indexAction) in cell.actions"
                      :key="indexAction"
                    />-->
                    <div
                      v-if="
                        !cell.actionCondition ||
                        (cell.actionCondition &&
                          Object.byString(row.row, cell.value) &&
                          false)
                      "
                      class="v-table-actions-wrap"
                    >
                      <v-btn
                        v-for="(action, indexAction) in cell.actions"
                        :key="indexAction"
                        @click="
                          downloadFile(Object.byString(row.row, cell.value))
                        "
                      >
                        <v-icon small>
                          {{ action.url }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </template>
                </td>
              </tr>
              <!-- {{ row.row.id + 'child' + indexRow }} -->
              <tr
                :key="row.row.id + 'child' + indexRow"
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
                      <!-- <li
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
                      </li> -->
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
            v-else-if="
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
      <div class="v-table-footer-info">
        <div class="v-table-footer-total">
          Итого: {{ options.data.totalRows }}
          <div v-if="options.data?.footer?.length" class="">
            <span
              v-for="footerInfo in options.data?.footer"
              v-show="footerInfo.value"
              :key="footerInfo.name"
            >
              {{ footerInfo.name }}: {{ footerInfo.value }}
            </span>
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
    <v-row
      style="flex: 0"
      class="mt-5 justify-end"
      v-if="options.actions && options.actions.length"
    >
      <v-btn
        type="submit"
        :color="action.color"
        class="ml-2"
        :loading="loading"
        @click.prevent="
          clickHandler({ action, skipValidation: action.skipValidation })
        "
        v-for="action in options.actions"
        :key="action.id"
        :text="action.action === 'closePopup' ? true : false"
      >
        {{ action.text }}
      </v-btn>
    </v-row>
    <v-contextmenu
      @handlerContext="handlerContext"
      ref="contextMenuRef"
      :options="contextmenu"
    />
    <Sheet class="v-table-filter-sheet" :isShow="filter.isShow">
      <keep-alive>
        <TableFilter
          class="v-table-filter"
          @closeFilter="closeFilter"
          @saveFilter="saveFilter"
          :filtersConfig="filters"
        />
      </keep-alive>
    </Sheet>
    <v-dialog persistent v-model="confirmDialog.isShow" width="550">
      <v-card>
        <div class="pt-3 mb-4 text-h5 text-center">
          {{ confirmDialog.text }}
        </div>
        <v-card-actions class="pb-4 flex justify-center">
          <v-btn
            v-if="!confirmDialog.loading"
            color="primary mr-4"
            @click="triggerDialogFunction"
          >
            Подтверждаю
          </v-btn>
          <v-btn
            v-if="!confirmDialog.loading"
            color="error"
            @click="confirmDialog.isShow = false"
          >
            Отменить
          </v-btn>
          <v-progress-circular
            v-if="confirmDialog.loading"
            color="primary"
            :size="30"
            indeterminate
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Popup
      closeButton
      @close="closePopupForm"
      :options="{
        width: options.detail.width,
        portal: 'table-detail',
      }"
      v-if="
        options.detail && options.detail.type === 'popup' && popupForm.isShow
      "
    >
      <!--<Detail
        class="cols-6"
        :detail="options.detail"
        :class="[...options.detail.bootstrapClass, ...options.detail.classes]"
      />-->
      <router-view
        :detail="detail"
        :class="[...options.detail.bootstrapClass, ...options.detail.classes]"
        @closePopup="closePopupForm"
        @getItems="getItems"
      />
    </Popup>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
