<template>
  <div class="v-files">
    <a
      :target="$props.expand && '_blank'"
      :href="$props.expand && item.path"
      :class="[
        'v-files_item',
        index > 2 && !$props.expand && 'v-files_item__hidden',
      ]"
      v-for="(item, index) in files"
      :key="index"
    >
      <v-tooltip content-class="v-files_tooltip" top>
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="$props.expand && on">
            <template v-if="item.format">
              <img
                :src="
                  require(`../../../../../src/assets/image/${item.format}.png`)
                "
                alt=""
              />
            </template>
            <div v-else class="v-files_item-unregistered">?</div>
          </div>
        </template>
        <span>{{ item.name }}</span>
      </v-tooltip>
    </a>
    <template v-if="files.length > 3">
      <div v-if="!$props.expand" class="v-files_additional-item">
        +{{ files.length - 3 }}
      </div>
    </template>
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
