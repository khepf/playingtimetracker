import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '../types';

import { topToolbar } from './modules/topToolbar';
import { user } from './modules/user';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    topToolbar,
    user
  },
};

export default new Vuex.Store<RootState>(store);
