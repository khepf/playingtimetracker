import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '../types';

import { topToolbar } from './modules/topToolbar';
import { user } from './modules/user';
import { players } from './modules/players';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    topToolbar,
    user,
    players,
  },
};

export default new Vuex.Store<RootState>(store);
