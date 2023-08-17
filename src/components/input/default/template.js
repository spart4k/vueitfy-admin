const template = `
  <div class='v-input'>
    <input :placeholder='placeholder' @input='valuePass' v-model='value' type='text'>
    <transition name='faderight'>
      <svg @click='clearField' v-if='clearing && value' class='v-icon v-icon-close' enable-background='new 0 0 256 256' height='256px' id='Layer_1' version='1.1' viewBox='0 0 256 256' width='256px' xml:space='preserve' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
        <path d='M137.051,128l75.475-75.475c2.5-2.5,2.5-6.551,0-9.051s-6.551-2.5-9.051,0L128,118.949L52.525,43.475  c-2.5-2.5-6.551-2.5-9.051,0s-2.5,6.551,0,9.051L118.949,128l-75.475,75.475c-2.5,2.5-2.5,6.551,0,9.051  c1.25,1.25,2.888,1.875,4.525,1.875s3.275-0.625,4.525-1.875L128,137.051l75.475,75.475c1.25,1.25,2.888,1.875,4.525,1.875  s3.275-0.625,4.525-1.875c2.5-2.5,2.5-6.551,0-9.051L137.051,128z'/>
      </svg>
    </transition>
  </div>
`

export default template