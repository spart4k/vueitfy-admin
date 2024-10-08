<template>
  <div class="v-object d-flex flex-column h-100 w-100 pb-5">
    <SidelistHeader @closePanel="$emit('closePanel')" :data="$props.data" />
    <template v-if="objects?.length && !initLoading">
      <div class="flex-grow-1 d-flex flex-column overflow-hidden">
        <SidelistSearch class="ml-7 mr-7 flex-grow-0" v-model="search" />
        <div
          v-if="!loading"
          class="overflow-auto d-block flex-grow-1 pl-7 pr-7"
        >
          <v-expansion-panels multiple v-model="panel">
            <v-expansion-panel v-for="object in objects" :key="object.id">
              <v-expansion-panel-header>
                <v-btn
                  class="mr-2"
                  @click.stop="object.footer = !object.footer"
                  icon
                  x-small
                  v-if="permission && !object.readonly && !disabled"
                >
                  <v-icon small :color="object.footer ? 'primary' : 'disabled'"
                    >$IconEtc</v-icon
                  ></v-btn
                >
                <span>
                  {{ object.name }}
                </span>
                <template v-slot:actions>
                  <v-progress-circular
                    v-if="object.loading"
                    color="primary"
                    :size="28"
                    indeterminate
                  />
                </template>
              </v-expansion-panel-header>
              <div
                v-if="object.footer"
                class="d-flex flex-column pb-4 v-object-methods"
              >
                <div class="d-flex mb-4">
                  <v-btn
                    @click="changeMethod(object, 'add')"
                    class="flex-grow-1"
                    small
                    :color="
                      object.method === 'add' || !object.method
                        ? 'success'
                        : 'disabled'
                    "
                    >+</v-btn
                  >
                  <v-btn
                    @click="changeMethod(object, 'edit')"
                    class="flex-grow-1 ml-5 mr-5"
                    small
                    :color="
                      object.method === 'edit' || !object.method
                        ? 'primary'
                        : 'disabled'
                    "
                    ><v-icon x-small>$IconEdit</v-icon></v-btn
                  >
                  <v-btn
                    @click="changeMethod(object, 'delete')"
                    class="flex-grow-1"
                    small
                    :color="
                      object.method === 'delete' || !object.method
                        ? 'error'
                        : 'disabled'
                    "
                    ><v-icon x-small>$IconDelete</v-icon></v-btn
                  >
                </div>
                <div
                  v-if="object.method"
                  class="d-flex justify-space-between align-end mb-4"
                >
                  <div>
                    <template v-if="object.method !== 'delete'">
                      <span class="text--text">Коэффициент</span>
                      <v-text-field
                        class="mt-1"
                        v-model="object.coef"
                        v-mask="mask(object.coef)"
                        outlined
                      />
                    </template>
                  </div>
                  <v-btn
                    v-if="!object.methodLoading"
                    color="success"
                    @click="changeObjectCoef(object)"
                    ><v-icon small class="mr-2">$IconGalka</v-icon
                    >Применить</v-btn
                  >
                  <v-progress-circular
                    v-else
                    color="primary"
                    :size="28"
                    indeterminate
                  />
                </div>
                <v-divider></v-divider>
              </div>
              <v-expansion-panel-content>
                <v-expansion-panels multiple v-model="object.objectPanel">
                  <v-expansion-panel
                    v-for="service in object.content"
                    :key="service.id"
                  >
                    <v-expansion-panel-header class="pl-3">
                      <v-btn
                        class="mr-2"
                        @click.stop="service.footer = !service.footer"
                        icon
                        x-small
                        v-if="permission && !service.readonly && !disabled"
                      >
                        <v-icon
                          small
                          :color="service.footer ? 'primary' : 'disabled'"
                          >$IconEtc</v-icon
                        ></v-btn
                      >
                      <span>
                        {{ service.name }}
                      </span>
                      <template v-slot:actions>
                        <v-progress-circular
                          v-if="service.loading"
                          color="primary"
                          :size="28"
                          indeterminate
                        /> </template
                    ></v-expansion-panel-header>
                    <div
                      v-if="service.footer"
                      class="d-flex flex-column pb-4 v-object-methods pl-3"
                    >
                      <div class="d-flex mb-4">
                        <v-btn
                          @click="changeMethod(service, 'add')"
                          class="flex-grow-1"
                          small
                          :color="
                            service.method === 'add' || !service.method
                              ? 'success'
                              : 'disabled'
                          "
                          >+</v-btn
                        >
                        <v-btn
                          @click="changeMethod(service, 'edit')"
                          class="flex-grow-1 ml-5 mr-5"
                          small
                          :color="
                            service.method === 'edit' || !service.method
                              ? 'primary'
                              : 'disabled'
                          "
                          ><v-icon x-small>$IconEdit</v-icon></v-btn
                        >
                        <v-btn
                          @click="changeMethod(service, 'delete')"
                          class="flex-grow-1"
                          small
                          :color="
                            service.method === 'delete' || !service.method
                              ? 'error'
                              : 'disabled'
                          "
                          ><v-icon x-small>$IconDelete</v-icon></v-btn
                        >
                      </div>
                      <div
                        v-if="service.method"
                        class="d-flex justify-space-between align-end mb-4"
                      >
                        <div>
                          <template v-if="service.method !== 'delete'">
                            <span class="text--text">Коэффициент</span>
                            <v-text-field
                              class="mt-1"
                              v-model="service.coef"
                              v-mask="mask(service.coef)"
                              outlined
                            />
                          </template>
                        </div>
                        <v-btn
                          v-if="!service.methodLoading"
                          color="success"
                          @click="changeObjectCoef(service, true)"
                          ><v-icon small class="mr-2">$IconGalka</v-icon
                          >Применить</v-btn
                        >
                        <v-progress-circular
                          v-else
                          color="primary"
                          :size="28"
                          indeterminate
                        />
                      </div>
                      <v-divider></v-divider>
                    </div>
                    <v-expansion-panel-content class="pl-3">
                      <div>
                        <v-btn
                          @click="addPerson(service, object)"
                          class="mb-3"
                          v-if="
                            !(
                              service?.content?.length &&
                              service?.content[0]?.added
                            ) &&
                            permission &&
                            !service.readonly
                          "
                          small
                          block
                          color="success"
                          :disabled="disabled"
                          >+</v-btn
                        >
                        <div
                          v-for="person in service.content"
                          :key="person.personal_id"
                          class="v-object-item"
                        >
                          <div
                            v-if="!person.edit.isShow"
                            class="v-object-item-person text--text"
                          >
                            <span class="flex-grow-1 mr-2">{{
                              person.personal_name
                            }}</span>
                            <div class="d-flex align-center">
                              {{ person.coefficient
                              }}<v-btn
                                v-if="
                                  permission && !service.readonly && !disabled
                                "
                                class="ml-2 v-object-item-person_btn"
                                icon
                                x-small
                                @click="editPerson(person)"
                              >
                                <v-icon small color="gray"
                                  >$IconEdit</v-icon
                                ></v-btn
                              >
                              <v-btn
                                v-if="
                                  permission && !service.readonly && !disabled
                                "
                                @click="confirmDelete(person, 'person')"
                                class="v-object-item-person_btn opacity-50"
                                icon
                                x-small
                              >
                                <v-icon small color="error"
                                  >$IconClose</v-icon
                                ></v-btn
                              >
                            </div>
                          </div>
                          <div
                            class="d-flex align-center v-object-item-edit mb-1 mt-1"
                            v-else
                          >
                            <v-col
                              cols="12"
                              sm="8"
                              class="pl-0 pr-0 flex-grow-1 v-object-item-edit_select"
                            >
                              <Autocomplete
                                :field="autocompleteConfig"
                                v-model="person.edit.name_id"
                                :filter="person.edit.filter"
                                :readonly="person.loading"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="2"
                              class="pl-0 pr-0 mr-3 ml-3 v-object-item-edit_coef"
                            >
                              <v-text-field
                                v-model="person.edit.coefficient"
                                v-mask="mask(person.edit.coefficient)"
                                outlined
                                hide-details
                                :rules="[() => !!person.edit.coefficient || '']"
                                :readonly="person.loading"
                              />
                            </v-col>
                            <v-col
                              v-if="!person.edit.loading"
                              class="pl-0 pr-0"
                              cols="12"
                              sm="1"
                            >
                              <v-btn
                                @click="
                                  changePerson(
                                    person,
                                    person.added ? 'add' : 'edit'
                                  )
                                "
                                icon
                                x-small
                              >
                                <v-icon small color="success"
                                  >$IconGalka</v-icon
                                ></v-btn
                              >
                            </v-col>
                            <v-col
                              v-if="!person.edit.loading"
                              class="pl-0 pr-0"
                              cols="12"
                              sm="1"
                            >
                              <v-btn
                                icon
                                x-small
                                @click="
                                  person.added
                                    ? service.content.shift()
                                    : (person.edit.isShow = false)
                                "
                              >
                                <v-icon small color="gray"
                                  >$IconArrowCircleRight</v-icon
                                ></v-btn
                              >
                            </v-col>
                            <v-col
                              v-if="person.edit.loading"
                              class="pl-0 pr-0 d-flex justify-center"
                              cols="12"
                              sm="2"
                            >
                              <v-progress-circular
                                color="primary"
                                :size="26"
                                indeterminate
                              />
                            </v-col>
                          </div>
                        </div>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div v-else class="d-flex align-center justify-center h-100">
          <v-progress-circular
            v-if="loading"
            color="primary"
            :size="80"
            indeterminate
          />
        </div>
      </div>
    </template>
    <div v-else class="d-flex align-center justify-center h-100">
      <v-app-bar-title v-if="!initLoading" class="text--text text-h5">
        Период не обрабатывался</v-app-bar-title
      >
      <div v-else class="d-flex align-center justify-center h-100">
        <v-progress-circular color="primary" :size="80" indeterminate />
      </div>
    </div>

    <v-dialog persistent v-model="confirm.isShow" width="380">
      <v-card>
        <v-card-title class="text-h5 text-center">
          Вы подтверждаете удаление коэффициента?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="confirm.isShow = false">
            Отменить
          </v-btn>
          <v-btn
            @click="deleteHandler()"
            class="ml-4"
            type="submit"
            color="primary"
          >
            Принять
          </v-btn>
          <!-- <v-progress-circular
            v-if="prepaymentLoading"
            color="primary"
            :size="30"
            indeterminate
          /> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script src="./setup.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
