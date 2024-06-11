<template>
  <div class="form">
    <v-row>
      <!--{{ tab.fields }}-->
      <v-col cols="12" sm="3" class="field-col">
        <!-- <div v-if="loading && field.isShow" class="field-loading gradient">
        </div> -->
        <div class="accountName">
          <p>{{ account.name }}</p>
          <p>{{ formatedRow }}</p>
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <div
                v-show="thisTarget.error"
                class="accountName-tooltip"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="20" color="red">mdi-alert</v-icon>
              </div>
            </template>
            <span v-if="thisTarget?.error">{{ thisTarget.error }}</span>
          </v-tooltip>
        </div>
      </v-col>
      <v-col :sm="showKey ? 3 : 6" class="field-col">
        <Autocomplete
          :field="fieldsTemplate.avatar_with_user_key_id"
          v-model="formData.avatar_with_user_key_id"
          :error-messages="formErrors.avatar_with_user_key_id"
          :formData="formData"
          ref="autocompleteRef"
          @change="changeAutocomplete"
        />
      </v-col>
      <v-col cols="12" sm="3" class="field-col">
        <Autocomplete
          :field="vidVedField"
          v-model="formData.vid_vedomost_id_logistic"
          :error-messages="formErrors.vid_vedomost_id_logistic"
          :formData="formData"
          ref="autocompleteRef"
          @change="changeAutocomplete"
        />
      </v-col>
      <v-col cols="12" sm="3" class="field-col">
        <Autocomplete
          v-if="showKey"
          :field="fieldsTemplate.print_form_key"
          v-model="formData.print_form_key"
          :error-messages="formErrors.print_form_key"
          :formData="formData"
          ref="autocompleteRef"
          @change="changeAutocomplete"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script src="./setup"></script>
<style lang="scss" scoped src="./style.scss"></style>
