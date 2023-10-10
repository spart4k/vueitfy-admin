<template>
  <div class="v-filters d-flex align-center flex-column">
    <!-- {{ $props.data }} -->
    <h2 class="v-filters-date mt-2">
      {{ new Date().getDate() }} {{ dayOfWeek[new Date().getDay()] }}
    </h2>
    <v-btn
      @click="
        $route.query.compose !== 'new' &&
          $emit('setRouterPath', null, null, { compose: 'new' }, null, true)
      "
      color="primary"
      variant="tonal"
      class="mt-2 mb-7"
    >
      <v-icon small class="mr-2">$IconEdit</v-icon>
      Написать
    </v-btn>
    <div class="v-filters-mail-types-list pl-4 pr-4 mb-4">
      <div
        :class="[
          'v-filters-mail-types-list_item',
          $route.query.filter === item.query &&
            'v-filters-mail-types-list_item__active',
          'd-flex',
          'align-center',
        ]"
        v-for="(item, index) in filters"
        :key="index"
        @click="
          $route.query.filter !== item.query &&
            $emit(
              'setRouterPath',
              null,
              null,
              { filter: item.query },
              ['color'],
              true
            )
        "
      >
        <v-icon small class="mr-4">{{ item.url }}</v-icon>
        <div :class="['flex-grow-1']">
          {{ item.label }}
        </div>
        <div>
          {{ item.number ? item.number : null }}
        </div>
      </div>
    </div>
    <div class="v-filters-expansion">
      <v-expansion-panels
        v-model="folderPanel"
        class="v-filters-expansion-folder"
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="v-filters-expansion-folder-title"
            ><v-icon small class="mr-2">$IconSystem</v-icon> Мои
            папки</v-expansion-panel-header
          >
          <v-expansion-panel-content
            class="v-filters-expansion-folder-container"
          >
            <div
              class="v-filters-expansion-folder-container_item ml-4"
              v-for="(item, index) in $props.filterData.folderData"
              :key="index"
              @click="
                Number($route.query.id) !== item.id &&
                  $emit(
                    'setRouterPath',
                    null,
                    null,
                    {
                      filter: 'folder',
                      id: item.id,
                    },
                    ['color'],
                    true
                  )
              "
            >
              <v-icon
                :color="item.color"
                small
                class="mr-2 v-filters-expansion-folder-container_icon"
                >$IconSystem</v-icon
              >
              <span
                :class="[
                  $route.query.filter === 'folder' &&
                    Number($route.query.id) === item.id &&
                    'v-filters-expansion-folder-container_item__active',
                  'v-filters-expansion-folder-container_text',
                ]"
              >
                {{ item.name }}
              </span>
              <v-icon
                @click.stop="editItem(item, 'folder', index)"
                :color="item.color"
                x-small
                class="mr-2"
                >$IconEdit</v-icon
              >
              <v-icon
                @click.stop="editItem(item, 'folder', index, 'delete')"
                :color="item.color"
                x-small
                >$IconDelete</v-icon
              >
            </div>
            <div
              @click="openCreatePopup('folder')"
              class="v-filters-expansion-folder-container_item v-filters-expansion-folder-container_item__disabled ml-4"
            >
              <v-icon small class="mr-2">$IconSystem</v-icon> Добавить папку
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels
        v-model="boxPanel"
        accordion
        class="v-filters-expansion-folder mb-3"
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="v-filters-expansion-folder-title"
            ><v-icon small class="mr-2">$IconSystem</v-icon> Мои
            ящики</v-expansion-panel-header
          >
          <v-expansion-panel-content
            class="v-filters-expansion-folder-container"
          >
            <div
              class="v-filters-expansion-folder-container_item ml-4"
              v-for="(item, index) in $props.filterData.boxData"
              :key="index"
              @click="
                Number($route.query.id) !== item.id &&
                  $emit(
                    'setRouterPath',
                    null,
                    null,
                    {
                      filter: 'box',
                      id: item.id,
                    },
                    ['color'],
                    true
                  )
              "
            >
              <v-icon :color="item.color" small class="mr-2"
                >$IconSystem</v-icon
              >
              <span
                :class="[
                  $route.query.filter === 'box' &&
                    Number($route.query.id) === item.id &&
                    'v-filters-expansion-folder-container_item__active',
                  'v-filters-expansion-folder-container_text',
                ]"
              >
                {{ item.name }}
              </span>
            </div>
            <div
              @click="openCreatePopup('box')"
              class="v-filters-expansion-folder-container_item v-filters-expansion-folder-container_item__disabled ml-4"
            >
              <v-icon small class="mr-2">$IconSystem</v-icon> Добавить ящик
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="v-filters-color mb-3">
      <div
        :class="[
          'v-filters-color_item',
          $route?.query?.color &&
            JSON.parse($route?.query?.color?.includes(item.id)) &&
            'v-filters-color_item__active',
        ]"
        :style="{ backgroundColor: item.color }"
        @click="
          $emit(
            'setRouterPath',
            null,
            null,
            {
              color: item.id,
            },
            ['filter', 'id'],
            true
          )
        "
        v-for="(item, index) in $props.filterData.tagsData"
        :key="index"
      ></div>
    </div>
    <div class="v-filters-bottom mb-4">
      <v-btn
        :color="$route.query.filter === 'is_main' ? 'primary' : 'disabled'"
        outlined
        plain
        class="v-filters-bottom_item d-flex align-center"
        @click="
          $route.query.filter !== 'is_main' &&
            $emit(
              'setRouterPath',
              null,
              null,
              { filter: 'is_main' },
              ['color'],
              true
            )
        "
      >
        <v-icon small>$IconBookmark</v-icon>
      </v-btn>
      <v-btn
        @click="
          $route.query.filter !== 'is_read' &&
            $emit(
              'setRouterPath',
              null,
              null,
              { filter: 'is_read' },
              ['color'],
              true
            )
        "
        :color="$route.query.filter === 'is_read' ? 'primary' : 'disabled'"
        outlined
        plain
        class="v-filters-bottom_item"
      >
        <div
          :class="[
            'v-filters-bottom_item-point',
            'mr-2',
            $route.query.filter === 'is_read' &&
              'v-filters-bottom_item-point__active',
          ]"
        ></div>
        <p class="v-filters-bottom_item-text">
          {{ $props?.filterData?.notReadData }}
        </p>
      </v-btn>
    </div>

    <Popup
      :options="{ portal: 'filter', padding: '20px 30px' }"
      closeButton
      @close="closePopup"
      v-if="popupCase"
    >
      <div class="v-filters-popup d-flex flex-column align-center">
        <template v-if="popupDelete">
          <p class="v-filters-popup_title">Удалить папку?</p>
          <div class="d-flex mt-7">
            <template v-if="!newCase.loading">
              <v-btn @click="deleteFolder" tonal color="error">
                <v-icon small class="mr-2">$IconDelete</v-icon>
                Удалить
              </v-btn>
              <v-btn @click="closePopup" tonal color="primary" class="ml-5">
                <v-icon small class="mr-2">$IconArrowCansel</v-icon>
                Отменить
              </v-btn>
            </template>
            <v-progress-circular
              indeterminate
              v-else
              color="primary"
            ></v-progress-circular>
          </div>
        </template>
        <template v-else>
          <div class="d-flex align-center">
            <v-icon
              :color="newCase.color"
              @click="openPicker = !openPicker"
              large
              class="mr-9 v-filters-popup_icon"
            >
              {{ openPicker ? '$IconArrowLeft' : '$IconSystem' }}</v-icon
            >
            <div v-if="openPicker" class="v-filters-popup_picker">
              <v-color-picker
                v-model="newCase.color"
                hide-inputs
              ></v-color-picker>
            </div>
            <v-text-field
              v-if="!openPicker"
              max-width="100"
              maxlength="50"
              label="Название"
              v-model="newCase.name"
              :rules="rules"
            ></v-text-field>
          </div>
          <template v-if="!openPicker">
            <v-btn
              v-if="!newCase.loading"
              @click="editFolder"
              tonal
              color="success"
              class="mt-4"
            >
              <v-icon small class="mr-2">{{
                newCase.id ? '$IconEdit' : '$IconAdd'
              }}</v-icon>
              {{ newCase.id ? 'Изменить' : 'Создать' }}
            </v-btn>
            <v-progress-circular
              indeterminate
              v-else
              color="primary"
            ></v-progress-circular>
          </template>
        </template>
      </div>
    </Popup>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
