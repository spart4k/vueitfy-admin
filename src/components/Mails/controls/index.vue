<template>
  <div class="v-controls">
    <div class="v-controls-list">
      <v-checkbox
        color="primary"
        class="v-controls-list_item v-controls-list_item__input"
        @change="$emit('changeSelection', 'all')"
        :value="$props.selectedAllMails"
        :disabled="
          $route.query.filter === 'sent' ||
          $route.query.filter === 'trash' ||
          $route.query.compose === 'new'
        "
      ></v-checkbox>
      <v-btn
        class="v-controls-list_item"
        color="text"
        :disabled="!$props.selectedMails.length"
        plain
        @click="popupBroadcast = true"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconBroadcast</v-icon
        >
        Транслировать
      </v-btn>
      <v-btn
        :disabled="!$props.selectedMails.length"
        class="v-controls-list_item"
        color="text"
        plain
        @click="
          $emit(
            'changeMailArrayKey',
            'is_read',
            $props.selectedAllMails && !$props.allMails.loadAll
              ? $props.allSelectionFilter.is_read.value
              : intersection.read.length >= $props.selectedMails.length
              ? false
              : true
          )
        "
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          x-small
          >$IconCheckoutMessage</v-icon
        >
        {{
          $props.selectedAllMails && !$props.allMails.loadAll
            ? $props.allSelectionFilter.is_read.value
              ? 'Прочитано'
              : 'Не прочитаны'
            : intersection.read.length >= $props.selectedMails.length
            ? 'Не прочитаны'
            : 'Прочитано'
        }}
      </v-btn>
      <v-btn
        class="v-controls-list_item"
        id="menu-activator"
        color="text"
        plain
        :disabled="!$props.selectedMails.length"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconSystem</v-icon
        >
        В папку
      </v-btn>
      <v-menu
        v-if="
          $props?.filterData?.folderData?.length && $props.selectedMails.length
        "
        content-class="v-controls-list_menu"
        activator="#menu-activator"
        :close-on-content-click="false"
      >
        <v-list>
          <v-list-item
            v-for="item in $props.filterData.folderData"
            :key="item.id"
            :class="[
              'v-controls-list_menu-item',
              $props.selectedAllMails && !$props.allMails.loadAll
                ? $props.allSelectionFilter.folders.find(
                    (x) => x.id === item.id
                  ).value && 'v-controls-list_menu-item__active'
                : intersection.folders.includes(String(item.id)) &&
                  'v-controls-list_menu-item__active',
            ]"
            @click="
              $emit(
                'changeMailArrayKey',
                'folders',
                item,
                $props.selectedAllMails && !$props.allMails.loadAll
                  ? $props.allSelectionFilter.folders.find(
                      (x) => x.id === item.id
                    ).value
                  : intersection.folders.includes(String(item.id))
              )
            "
          >
            {{ item.name }}
            {{
              $props.selectedAllMails
                ? `(${
                    $props.allSelectionFilter.folders.find(
                      (x) => x.id === item.id
                    ).count
                  }
            / ${$props.allMails.count})`
                : `(${
                    intersection.foldersCount.find((x) => x.id === item.id)
                      .value
                  } / ${$props.selectedMails.length})`
            }}
            <v-icon
              v-if="
                $props.selectedAllMails && !$props.allMails.loadAll
                  ? $props.allSelectionFilter.folders.find(
                      (x) => x.id === item.id
                    ).value
                  : intersection.folders.includes(String(item.id))
              "
              color="text"
              class="ml-3"
              small
              >$IconDelete</v-icon
            >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        class="v-controls-list_item"
        id="tags-activator"
        color="text"
        plain
        :disabled="!$props.selectedMails.length"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconTag</v-icon
        >
        Тэг
      </v-btn>
      <v-menu
        v-if="
          $props?.filterData?.tagsData?.length && $props.selectedMails.length
        "
        content-class="v-controls-list_tags"
        activator="#tags-activator"
        :close-on-content-click="false"
      >
        <v-list>
          <v-list-item
            v-for="item in $props.filterData.tagsData"
            :key="item.id"
            class="v-controls-list_tags-item"
            @click="
              $emit(
                'changeMailArrayKey',
                'tags',
                item,
                $props.selectedAllMails && !$props.allMails.loadAll
                  ? $props.allSelectionFilter.tags.find((x) => x.id === item.id)
                      .value
                  : intersection.tags.includes(String(item.id))
              )
            "
          >
            <div
              :style="{ background: item.color }"
              :class="[
                'v-controls-list_tags-item-tag',
                $props.selectedAllMails && !$props.allMails.loadAll
                  ? $props.allSelectionFilter.tags.find((x) => x.id === item.id)
                      .value && 'v-controls-list_tags-item-tag__active'
                  : intersection.tags.includes(String(item.id)) &&
                    'v-controls-list_tags-item-tag__active',
              ]"
            ></div>
            {{
              $props.selectedAllMails
                ? `${
                    $props.allSelectionFilter.tags.find((x) => x.id === item.id)
                      .count
                  }/${$props.allMails.count}`
                : `${
                    intersection.tagsCount.find((x) => x.id === item.id).value
                  }/${$props.selectedMails.length}`
            }}
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        :disabled="!$props.selectedMails.length"
        class="v-controls-list_item"
        color="text"
        plain
        @click="popupDelete = true"
      >
        <v-icon
          :color="$props.selectedMails.length ? 'primary' : 'disabled'"
          class="mr-3"
          small
          >$IconDelete</v-icon
        >
        Удалить
      </v-btn>
    </div>
    <Popup
      :options="{
        portal: 'filter',
        padding: '20px 30px',
        width: '600px',
      }"
      @close="popupBroadcast = false"
      v-if="popupBroadcast"
    >
      <div class="v-controls-popup d-flex flex-column">
        <p class="v-controls-popup_title text-center">Транслировать письма?</p>
        <v-select
          v-model="broadcast.direction"
          class="mt-4"
          :items="broadcast.directionArray"
          item-text="title"
          item-value="value"
          outlined
          label="Кому транслировать"
        ></v-select>
        <v-checkbox
          v-if="broadcast.direction === 'all'"
          color="primary"
          label="Для всех"
          v-model="broadcast.toAll"
        ></v-checkbox>
        <v-select
          v-if="broadcast.direction"
          v-model="broadcast.users"
          :items="['a', 'b', 'c']"
          :menu-props="{ maxHeight: '400' }"
          label="Выберите пользователей"
          multiple
          persistent-hint
        ></v-select>
        <div class="d-flex mt-9 justify-center">
          <v-btn
            @click="
              $emit('broadcast')
              popupBroadcast = false
            "
            tonal
            color="primary"
          >
            <v-icon small class="mr-2">$IconBroadcast</v-icon>
            Транслировать
          </v-btn>
          <v-btn
            class="ml-8"
            @click="popupBroadcast = false"
            tonal
            color="error"
          >
            Отменить
          </v-btn>
        </div>
      </div>
    </Popup>
    <Popup
      :options="{ portal: 'filter', padding: '20px 30px' }"
      closeButton
      @close="popupDelete = false"
      v-if="popupDelete"
    >
      <div class="v-controls-popup d-flex flex-column">
        <p class="v-controls-popup_title text-center">Удалить письма?</p>
        <div class="d-flex mt-7">
          <v-btn
            @click="
              $emit('changeMailArrayKey', 'del', true)
              popupDelete = false
            "
            tonal
            color="error"
          >
            <v-icon small class="mr-2">$IconDelete</v-icon>
            Удалить
          </v-btn>
          <v-btn
            @click="popupDelete = false"
            tonal
            color="primary"
            class="ml-5"
          >
            <v-icon small class="mr-2">$IconArrowCansel</v-icon>
            Отменить
          </v-btn>
        </div>
      </div>
    </Popup>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
