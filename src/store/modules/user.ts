import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { UserState, RootState } from '../../types';
import firebase from 'firebase';
import router from '@/router';

const state: UserState = {
  user: {
    loggedIn: false,
    data: null
  }
};

export const getters: GetterTree<UserState, RootState> = {
  user: (userModuleState) => {
    return userModuleState.user;
  },
  isAuthenticated(userModuleState) {
    return userModuleState.user !== null && userModuleState.user !== undefined;
  }

};

const mutations: MutationTree<UserState> = {
  SET_LOGGED_IN(userModuleState, value) {
    userModuleState.user.loggedIn = value;
  },
  SET_USER(userModuleState, payload) {
    userModuleState.user.data = payload;
  }
};

export const actions: ActionTree<UserState, RootState> = {
  register({ commit }, { name, email, password }) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
        commit('SET_USER', user);
        commit('SET_LOGGED_IN', true);
        router.replace({
          name: 'Dashboard'
        });
      })
      .catch(() => {
        commit('SET_USER', null);
        commit('SET_LOGGED_IN', false);
        router.replace({
          name: 'Register'
        });
      });
  },



};

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
