<template>
  <div>
    <div style="padding: 10px">
      <TextInfo :infoObj="infoObj" />
      <v-row> Проверьте документы: </v-row>
      <FormError>Какой-то коммент</FormError>
      <div>
        <template>
          <v-row justify="space-between" class="py-3">
            <v-col cols="auto">
              <div style="width: 70px; height: 45px">
                <img
                  style="object-fit: contain; width: 70px; height: 45px"
                  src="https://i.pinimg.com/736x/b1/0f/17/b10f17228bdc373bc8a4fe6b7a40edd1.jpg"
                />
              </div>
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <v-btn class="mr-3" fab x-small>
                <v-icon x-small>$IconStar</v-icon>
              </v-btn>
              <v-btn fab x-small>
                <v-icon x-small>$IconEdit</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </template>
      </div>
      <FormComment />
    </div>
    <v-divider></v-divider>
    <v-row class="py-2" justify="end">
      <v-btn class="mr-2" color="info">
        <v-icon left> $IconMain </v-icon>
        Завершить
      </v-btn>
      <v-btn color="blue-grey">
        <v-icon left> $IconMain </v-icon>
        Закрыть
      </v-btn>
    </v-row>
  </div>
</template>

<script src="./setup.js"></script>

<style lang="scss" scoped src="./style.scss"></style>
