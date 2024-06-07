<template>
  <div class="rates">
    <v-tabs
      style="flex: unset"
      v-model="activeTab"
      background-color="transparent"
      color="basil"
      class="p-5"
      mobile-breakpoint="0"
    >
      <v-tab v-for="item in tabs" :key="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items touchless v-model="activeTab">
      <v-tab-item v-for="item in tabs" :key="item.id">
        <tab
          ref="tabRef"
          :objectInfo="objectInfo"
          :tab="item"
          @openDialog="openDialog"
        />
      </v-tab-item>
    </v-tabs-items>
    <v-row class="mt-5 justify-end">
      <v-btn
        type="submit"
        :color="action.color"
        class="ml-2"
        :loading="loading"
        @click.prevent="
          clickHandler({
            action,
            skipValidation: action.skipValidation,
            // notClose: true,
          })
        "
        v-for="action in actions"
        :key="action.id"
      >
        {{ action.text }}
      </v-btn>
      <v-dialog v-model="dialog" width="600">
        <v-card>
          <!--<v-card-title class="text-h5 grey lighten-2">
            Privacy Policy
          </v-card-title>-->
          <v-card-title class="text-h5">{{ dialogParams.name }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                v-for="field in listFields"
                :key="field.id"
                :cols="field.position.cols"
                :sm="field.position.sm"
                class="field-col"
                :class="field.type"
              >
                <v-select
                  v-if="showField('select', field)"
                  :items="field.items"
                  :item-text="field.selectOption.text"
                  :item-value="field.selectOption.value"
                  :label="field.label"
                  v-model="formData[field.name]"
                  :error-messages="formErrors[field?.name]"
                  persistent-hint
                  clearable
                  :multiple="field.subtype === 'multiselect'"
                ></v-select>
                <v-text-field
                  v-if="showField('string', field)"
                  v-model="formData[field.name]"
                  :label="field.label"
                  clearable
                  :readonly="field.readonly"
                  :error-messages="formErrors[field?.name]"
                />
                <v-menu
                  v-if="showField('date', field)"
                  :key="field.id"
                  :ref="`menuRef_${field.id}`"
                  v-model="field.menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ attrs }">
                    <v-text-field
                      @click:append="openMenu(field)"
                      v-model="formData[field.name]"
                      :label="field.label"
                      append-icon="mdi-calendar"
                      v-bind="attrs"
                      :error-messages="formErrors[field?.name]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData[field.name]"
                    :min="field.min ? formData[field.min] : undefined"
                    :max="field.max ? formData[field.max] : undefined"
                    color="primary"
                    locale="ru-RU"
                    :type="field.subtype === 'period' ? 'month' : undefined"
                    :range="field.subtype === 'range'"
                    :multiple="field.subtype === 'multiple'"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="field.menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="field.menu = false">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-row class="justify-end">
              <v-btn
                type="submit"
                :color="action.color"
                class="ml-2"
                :loading="loading"
                @click.prevent="
                  clickHandler({
                    action,
                    skipValidation: action.skipValidation,
                    notClose: true,
                  })
                "
                v-for="action in actionsDialog"
                :key="action.id"
              >
                {{ action.text }}
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss"></style>
