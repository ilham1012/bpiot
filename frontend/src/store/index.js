// import Vue from 'vue';
import { createStore } from 'vuex';

import { auth } from './auth.module';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   modules: {
//     auth
//   }
// });

export default createStore({
  modules: {
    auth
  }
});