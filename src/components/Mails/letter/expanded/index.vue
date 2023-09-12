<template>
  <div class="v-letter-expanded d-flex flex-column">
    <div class="v-letter-expanded_user">
      <MailsLetterUser expanded />
    </div>
    <div class="v-letter-expanded-container">
      <div class="v-letter-expanded-container-files d-flex">
        <div class="v-letter-expanded-container-files_item">
          <img src="../../../../../src/assets/image/doc.png" alt="" />
        </div>
        <div class="v-letter-expanded-container-files_item">
          <img src="../../../../../src/assets/image/pdf.png" alt="" />
        </div>
        <div class="v-letter-expanded-container-files_item">
          <img src="../../../../../src/assets/image/xls.png" alt="" />
        </div>
      </div>
      <div class="v-letter-expanded-container-title mb-1">СРМ-100</div>
      <div class="v-letter-expanded-container-text mb-1">
        Текст сообщения в карточке письма. В нем ограничены символы. Ведь все
        письо не поместиться тут. Примерно 200 символов. Вот пример статьи на
        1000 символов. Это достаточно маленький текст, оптимально подходящий для
        карточек товаров в интернет-магазинах или для небольших информационных
        публикаций. В таком тексте редко бывает более 2-3 абзацев и обычно один
        подзаголовок. Но можно и без него. На 1000 символов рекомендовано
        использовать 1-2 ключа и одну картину. Текст на 1000 символов – это
        сколько примерно слов? Статистика Word показывает, что «тысяча» включает
        в себя 150-200 слов средней величины. Но, если злоупотреблять
        предлогами, союзами и другими частями речи на 1-2 символа, то количество
        слов неизменно возрастает. В копирайтерской деятельности принято считать
        «тысячи» с пробелами или без. Учет пробелов увеличивает объем текста
        примерно на 100-200 символов – именно столько раз мы разделяем слова
        свободным пространством. Считать пробелы заказчики не любят, так как это
        «пустое место». Однако некоторые фирмы и биржи видят справедливым
        ставить стоимость за 1000 символов с пробелами, считая последние важным
        элементом качественного восприятия. Согласитесь, читать слитный текст
        без единого пропуска, никто не будет. Но большинству нужна цена за 1000
        знаков без пробелов.
      </div>
      <v-btn color="primary">
        <v-icon small class="mr-2">$IconEdit</v-icon>
        Отправить
      </v-btn>
    </div>
    <!-- <div class="v-letter-expanded-button mt-6">
    </div> -->
  </div>
</template>
<script src="./setup.js"></script>
<style lang="scss" scoped src="./style.scss"></style>
