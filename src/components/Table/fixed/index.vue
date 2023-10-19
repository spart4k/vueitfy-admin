<template>
  <div class="v-table d-flex flex-column flex-grow-1 justify-space-between">
    <!--<h1 class="v-table-title">{{ options.options.title }}</h1>-->
    <div class="v-table-body-wrap d-flex flex-column flex-grow-1 h-100">
      <div
        :class="options.options.headerFixed ? 'v-table-panel--fixed' : ''"
        class="v-table-panel"
      >
        <div class="v-table-panel-date">
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
              v-for="(button, indexButton) in options.panel.buttons"
              :key="indexButton"
              @click="panelHandler(button)"
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
              label="Поиск"
              hide-details="auto"
              clearable
              v-model="paramsQuery.searchGlobal"
            ></v-text-field>
            <v-btn small @click="openFilter" class="ml-2" elevation="2">
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
                    <span @click="sortRow(head)">
                      {{ head.title }}
                    </span>
                  </span>
                </div>
              </th>
            </tr>
          </thead>

          <!-- <tbody v-if="!loading && options.data.rows" class="v-table-body">
            <template v-for="(row, indexRow) in options.data.rows">
              <tr
                :key="row.row.id"
                :class="[row.row.selected ? 'v-table-body-row--selected' : '']"
                @contextmenu="openContext($event, row)"
                @click="openChildRow($event, row)"
                v-on:dblclick="openRow($event, row)"
                class="v-table-body-row"
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
                    width: cell.width,
                  }"
                  :class="
                    cell.fixed.value ? 'v-table-body-row-cell--fixed' : ''
                  "
                  :id="cell.value + '-table-cell' + '_id' + row.row.id"
                  :align="cell.align"
                  class="v-table-body-row-cell v-table-actions"
                  v-show="cell.isShow ? true : false"
                  v-for="(cell, cellIndex) in options.head"
                  :key="cellIndex"
                >
                  <template v-if="cell.type === 'default'">
                    {{ Object.byString(row.row, cell.value) }}
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
                :key="row.row.id + 'child'"
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
          </tbody> -->
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

    <!-- <div class="v-table-footer pl-4">
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
    </div> -->
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
