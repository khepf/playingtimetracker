import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { TopToolbarState, UserState, RootState } from '../../types';

const state: UserState = {
  user: {
    loggedIn: false,
    data: null
  }
};

export const getters: GetterTree<UserState, RootState> = {
  user: (userModuleState) => {
    return userModuleState.user;
  }
};

const mutations: MutationTree<UserState> = {
  SET_LOGGED_IN(userModuleState, value) {
    userModuleState.user.loggedIn = value;
  },
  SET_USER(userModuleState, data) {
    userModuleState.user.data = data;
  }
};

export const actions: ActionTree<UserState, RootState> = {
  fetchUser({ commit }, user) {
    commit('SET_LOGGED_IN', user !== null);
    if (user) {
      commit('SET_USER', {
        displayName: user.displayName,
        email: user.email
      });
    } else {
      commit('SET_USER', null);
    }
  }
};

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
