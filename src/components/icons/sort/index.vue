<template>
  <svg
    :class="state"
    class="v-table-header-row-cell-sort__row__icon"
    fill="#000000"
    height="800px"
    width="800px"
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 489.4 489.4"
    xml:space="preserve"
  >
    <path
      class="asc"
      d="M4.78125 0L7.81234 5.25H1.75016L4.78125 0Z"
      :fill="state === 'asc' ? 'black' : 'rgba(0,0,0,.2)'"
    />
    <path
      class="desc"
      d="M1.75 7.03092L7.81218 7.03092L4.78109 12.2809L1.75 7.03092Z"
      :fill="state === 'desc' ? 'black' : 'rgba(0,0,0,.2)'"
    />
  </svg>
</template>

<script src="./index.js"></script>
