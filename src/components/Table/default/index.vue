<template>
  <div class="v-table d-flex flex-column flex-grow-1 justify-space-between">
    <!--<h1 class="v-table-title">{{ options.options.title }}</h1>-->
    <div class="v-table-body-wrap d-flex flex-column flex-grow-1 h-100">
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
            @click="panelHandler(button)"
            small
          >
            <v-icon v-if="button.type === 'icon'" small class="mr-2">
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
          <v-btn small @click="openFilter($event)" class="ml-2" elevation="2">
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
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <div v-if="head.type === 'default'">
                            <span class="mr-2" @click="sortRow(head)">
                              {{ head.title }}
                            </span>
                            <v-icon @click="openSort(head)" small
                              >$IconSearch</v-icon
                            >
                          </div>
                          <div v-if="head.type === 'icon'">
                            <span class="mr-2" @click="sortRow(head)">
                              <v-icon> {{ head.icon }}</v-icon>
                            </span>
                          </div>
                        </div>
                      </template>
                      <span>{{ head.title }}</span>
                    </v-tooltip>
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
                class="v-table-body-row"
              >
                <td
                  class="v-table-body-row-cell__checkbox"
                  align="center"
                  v-on:dblclick="openRow($event, row)"
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
                  :class="{
                    'red-1': true,
                    ...addBackgroundClass(cell, row.row, Object.byString),
                  }"
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
                  <template v-if="cell.type === 'icon'">
                    <!-- <slot #name="icons"></slot> -->
                    <!-- <v-icon :color="iconColor">{{ iconType }}</v-icon>  -->
                    <!-- :class="{
                        'red-1': true,
                        'v-table-body-row-cell--error':
                          Object.byString(
                            row.row,
                            'backgroundValue' in cell
                              ? cell.backgroundValue
                              : null
                          ) == 0,
                        'v-table-body-row-cell--error1':
                          Object.byString(
                            row.row,
                            'backgroundValue' in cell
                              ? cell.backgroundValue
                              : null
                          ) == 1,
                      }" -->
                    <!-- <template v-if="Object.byString(row.row, cell.value) == 0">
                      <v-icon color="red">mdi-close</v-icon>
                    </template>
                    <template v-if="Object.byString(row.row, cell.value) == 1">
                      <template v-if="cell.conditionValue">
                        <template
                          v-if="
                            Object.byString(row.row, cell.conditionValue) ===
                            null
                          "
                        >
                          <v-icon color="red">mdi-close</v-icon>
                        </template>
                        <template v-esle>
                          {{ Object.byString(row.row, cell.conditionValue) }}
                        </template>
                      </template>
                      <template v-else>
                        <v-icon color="green">mdi-check</v-icon>
                      </template>
                    </template>
                    <template v-if="Object.byString(row.row, cell.value) == 2">
                      <v-icon color="yellow">mdi-minus</v-icon>
                    </template> -->
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
                  <template v-else-if="cell.type === 'actions'">
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
                          Object.byString(row.row, cell.value))
                      "
                      class="v-table-actions-wrap"
                    >
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
    <Popup
      closeButton
      @close="closePopupForm"
      :options="{ width: options.detail.width, portal: 'table-detail' }"
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
      />
    </Popup>
  </div>
</template>

<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
