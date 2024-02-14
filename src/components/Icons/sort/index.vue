<template>
  <!-- <svg
    :class="state"
    class="v-table-header-row-cell-sort__row__icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="asc"
      :fill="state === 'asc' ? 'black' : 'rgba(0,0,0,.15)'"
      d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
    />
    <path
      class="desc"
      :fill="state === 'desc' ? 'black' : 'rgba(0,0,0,.15)'"
      d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
    />
  </svg> -->
  <svg
    :class="state"
    class="v-table-header-row-cell-sort__row__icon"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="#000000"
    version="1.1"
    id="Capa_1"
    viewBox="0 0 490 490"
    xml:space="preserve"
  >
    <g class="asc" :fill="state === 'asc' ? 'black' : 'rgba(0,0,0,.15)'">
      <polygon
        points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46    0,194.27 37.087,221.213  "
      />
      <polygon
        points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54    490,295.715 452.913,268.802  "
      />
    </g>
    <g class="desc" :fill="state === 'desc' ? 'black' : 'rgba(0,0,0,.15)'">
      <polygon
        points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46    0,194.27 37.087,221.213  "
      />
      <polygon
        points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54    490,295.715 452.913,268.802  "
      />
    </g>
  </svg>
</template>

<script src="./index.js"></script>
