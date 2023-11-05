<template>
  <div>
    <div style="padding: 10px">
      <div v-if="isShow" style="margin-bottom: 30px">
        <!-- <TextInfo :infoObj="{ textInfo }"></TextInfo> -->
        <FormTitle
          :docName="getDocName(item.doc_id)"
          v-for="(item, index) in docs"
          :docs="item"
          :key="index"
          @confirmed="addConfirmed"
          @unconfirmed="addUnconfirmed"
        ></FormTitle>
        <FormComment v-model="comment" />
        <span class="danger" v-if="commentError"
          >Заполните поле комментарий!</span
        >
        <v-btn @click="clickCheckBtn" color="primary" block> Завершить </v-btn>
      </div>
    </div>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped></style>
