import { defineComponent, ref } from 'vue'
import textInfo from '@/components/Task/el/TextInfo/index.vue'
import formError from '@/components/Task/el/FormError/index.vue'
import formComment from '@/components/Task/el/FormComment/index.vue'

const ThirdPopupView = defineComponent({
  name: 'ThirdPopupView',
  components: {
    TextInfo: textInfo,
    FormError: formError,
    FormComment: formComment,
  },
  props: {
    objectData: {
      type: Object,
    },
  },
  setup(props) {
    const infoObj = {
      pasp: {
        key: 'key',
        value: 'value',
      },
    }
    let file = ref('')
    let imagePreview = ref('')
    imagePreview = props.objectData
    const handleFileUpload = () => {
      file = file.value.file.files[0]
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        imagePreview = reader.result
      })
      if (file.value) {
        if (/\.(jpe?g|png|gif)$/i.test(file.value.name)) {
          reader.readAsDataURL(file)
        }
      }
    }
    // let file = evt.target.files; // FileList object
    // let f = file[0];
    // // Only process image files.
    // if (!f.type.match('image.*')) {
    //     alert("Image only please....");
    // }
    // var reader = new FileReader();
    // // Closure to capture the file information.
    // reader.onload = (function(theFile) {
    //     return function(e) {
    //         // Render thumbnail.
    //         var span = document.createElement('span');
    //         span.innerHTML = ['<img class="thumb" title="', escape(theFile.name), '" src="', e.target.result, '" />'].join('');
    //         document.getElementById('output').insertBefore(span, null);
    //     };
    // })(f);
    // // Read in the image file as a data URL.
    // reader.readAsDataURL(f);

    const confirmDocs = ref([])
    const editedDocs = ref({})
    return { infoObj, confirmDocs, editedDocs, handleFileUpload, imagePreview }
  },
})
export default ThirdPopupView
