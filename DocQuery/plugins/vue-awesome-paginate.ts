import VueAwesomePaginate from 'vue-awesome-paginate';
// import the necessary css file
import 'vue-awesome-paginate/dist/style.css';

import VueSidePanel from 'vue3-side-panel';
import 'vue3-side-panel/dist/vue3-side-panel.css';

//import 'vue-awesome-paginate/dist/style.css';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueAwesomePaginate);
  nuxtApp.vueApp.use(VueSidePanel);
});
