<template>
  <div class="v-table d-flex flex-column flex-grow-1 justify-space-between">
    <!--<h1 class="v-table-title">{{ options.options.title }}</h1>-->
    <div
      :class="options.options.headerFixed ? 'v-table-panel--fixed' : ''"
      class="v-table-panel"
    >
      <div class="v-table-panel__actions flex-wrap">
        <!--<v-button
          :option="button"
          v-for="(button, indexButton) in options.panel.buttons"
          :key="indexButton"
        />-->
        <v-btn
          v-for="(button, indexButton) in options.panel.buttons"
          :key="indexButton"
          @click="button.function"
          small
        >
          <v-icon small class="mr-2">
            {{ button.url }}
          </v-icon>
          <p v-if="true">{{ button.label }}</p>
        </v-btn>
      </div>
      <div class="v-table-panel__search">
        <!--<v-input
          @clearfield="clearField('searchField')"
          clearing
          type="search"
          placeholder="Поиск"
          v-model="searchField"
        />-->
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
            >
              <!--s-->
            </th>
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
              v-for="(head, index) in options.head"
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
                  <!--<v-icon
                    v-if="head.sorts && head.sorts.length"
                    @click="openSort(head)"
                    color="yellow"
                    :class="
                      paramsQuery.sorts.find((el) => el.field === head.value)
                        .value
                    "
                    class="v-table-header-row-cell-wrap__sort-icon"
                    small
                  >
                    $IconSort
                  </v-icon>-->
                  <vIconSort
                    v-if="
                      head.sorts &&
                      head.sorts.length &&
                      paramsQuery.sorts.length
                    "
                    class="v-table-header-row-cell-wrap__sort-icon mr-1"
                    :state="
                      paramsQuery.sorts.find((el) => el.field === head.value)
                        .value
                    "
                    @click="sortRow(head)"
                  />
                  <span class="mr-2" @click="sortRow(head)">
                    {{ head.title }}
                  </span>
                  <v-icon @click="openSort(head)" small>$IconSearch</v-icon>
                </span>
                <transition name="accordion">
                  <div
                    v-if="head.sorts && head.sorts[0].isShow"
                    class="v-table-header-row-cell-sort"
                  >
                    <!--<div
                      class="v-table-header-row-cell-sort__row"
                      v-if="head.sorts[0].type === 'string'"
                    >
                      <p v-if="true">Сортировка от А до Я</p>
                    </div>
                    <div
                      @click="sortRow(head)"
                      class="v-table-header-row-cell-sort__row"
                      v-if="head.sorts[0].type === 'number'"
                    >
                      {{
                        paramsQuery.sorts.find((el) => el.field === head.value)
                          .value
                      }}
                      <p v-if="true">Сортировка по убыванию</p>
                    </div>
                    <div
                      @click="sortRow(head)"
                      class="v-table-header-row-cell-sort__row"
                      v-if="head.sorts[0].type === 'date'"
                    >
                      {{
                        paramsQuery.sorts.find((el) => el.field === head.value)
                          .value
                      }}
                      <p v-if="true">Сортировка по дате</p>
                    </div>-->
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
            <!--<th class='v-table-header-row-cell' v-for='(head, index) in options.head'>{{ head.title }}</th>-->
          </tr>
        </thead>
        <tbody v-if="!loading && options.data.rows" class="v-table-body">
          <!--<tbody v-if="!loading" class="v-table-body">-->
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
                    <!--{{ indexRow }}-->
                    <!--{{ row.row.selected }}-->
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
                }"
                :class="cell.fixed.value ? 'v-table-body-row-cell--fixed' : ''"
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
                  <!--<v-table-button
                    :row="row.row"
                    :option="action"
                    v-for="(action, indexAction) in cell.actions"
                    :key="indexAction"
                  />-->
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
              v-show="row.child.isShow && options.head.some((el) => !el.isShow)"
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
                      <!--<v-table-button
                        :row="row.row"
                        :option="action"
                        v-for="(action, indexAction) in cell.actions"
                        :key="indexAction"
                      />-->
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
        <p v-if="!loading && !options.data.rows.length" class="v-table-loading">
          Объекты не найдены
        </p>
      </table>
    </div>

    <div class="v-table-footer pl-4">
      <div class="v-table-footer-total">
        Итого: {{ options.data.totalRows }}
      </div>
      <div class="v-table-footer-pagination">
        <div class="v-table-footer-pagination-length">
          <!--<span>
            10
          </span>-->
          <!--<select name="" id="">
            <option
              v-for="(option, optionIndex) in 5"
              value=""
              :key="optionIndex"
            >
              10
            </option>
          </select>-->
          <v-select
            :items="rowCount"
            label="Количество на странице:"
            v-model="paramsQuery.countRows"
            hide-details
          />
        </div>
        <!--<div class="v-table-footer-pagination-wrap">
          <div
            class="v-table-footer-pagination__button v-table-footer-pagination__button--prev"
          >
            <svg
              height="800px"
              width="800px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 185.343 185.343"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    fill="currentColor"
                    d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
                      l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
                      c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div class="v-table-footer-pagination-pages">
            <div
              :key="pagesIndex"
              v-for="(page, pagesIndex) in 5"
              :class="
                pagesIndex === 2
                  ? 'v-table-footer-pagination-pages__el--active'
                  : ''
              "
              class="v-table-footer-pagination-pages__el v-table-footer-pagination__button"
            >
              <span>{{ page }}</span>
            </div>
          </div>
          <div
            class="v-table-footer-pagination__button v-table-footer-pagination__button--next"
          >
            <svg
              fill="currentColor"
              height="800px"
              width="800px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 185.343 185.343"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    fill="currentColor"
                    d="M51.707,185.343c-2.741,0-5.493-1.044-7.593-3.149c-4.194-4.194-4.194-10.981,0-15.175
                      l74.352-74.347L44.114,18.32c-4.194-4.194-4.194-10.987,0-15.175c4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
                      c4.194,4.194,4.194,10.987,0,15.175l-81.934,81.939C57.201,184.293,54.454,185.343,51.707,185.343z"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>-->
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
    <portal to="filter">
      <Sheet :isShow="filter.isShow">
        <keep-alive>
          <TableFilter
            @closeFilter="closeFilter"
            @saveFilter="saveFilter"
            :filtersConfig="filtersConfig"
          />
        </keep-alive>
      </Sheet>
    </portal>
    <portal to="table-form">
      <Popup closeButton @close="closePopupForm" v-if="popupForm.isShow">
        <p>asda</p>
      </Popup>
    </portal>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
