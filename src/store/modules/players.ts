import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { PlayersState, RootState } from '../../types';
import firebase from 'firebase';

const state: PlayersState = {
  players: {},
  player: {
    firstName: '',
    lastName: '',
    jerseyNumber: 0
  }
};

export const getters: GetterTree<PlayersState, RootState> = {
  player: (playersModuleState) => {
    return playersModuleState.player;
  }
};

const mutations: MutationTree<PlayersState> = {

  SET_PLAYERS(playersModuleState, data) {
    playersModuleState.players = data;
  }
};

export const actions: ActionTree<PlayersState, RootState> = {
  addPlayer({ state }, payload) {
    firebase
      .database()
      .ref('players')
      .push({
        firstName: payload.firstName,
        lastName: payload.lastName,
        jerseyNumber: payload.jerseyNumber
      });
  },
  deletePlayer({ state }, playerId) {
    const database = firebase.database();
    database.ref('players').child(playerId).remove();
  },
  updatePlayer({ state }, player) {
    firebase.database().ref('players').child(player.id).update({
      firstName: player.firstName,
      lastName: player.lastName,
      jerseyNumber: player.jerseyNumber
    });
  }
};

export const players: Module<PlayersState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
