import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { PlayersState, RootState } from '../../types';

const state: PlayersState = {
  players: {},
  player: {
    firstName: '',
    lastName: '',
    jerseyNumber: 0
  }
};

export const getters: GetterTree<PlayersState, RootState> = {
  players: (playersModuleState) => {
    return playersModuleState.player;
  }
};

const mutations: MutationTree<PlayersState> = {

  SET_PLAYERS(playersModuleState, data) {
    playersModuleState.players = data;
  }
};

export const actions: ActionTree<PlayersState, RootState> = {
  fetchPlayers({ commit }, players) {
    if (players) {
      commit('SET_PLAYERS', {
        players: players.player
      });
    } else {
      commit('SET_PLAYERS', null);
    }
  }
};

export const players: Module<PlayersState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
