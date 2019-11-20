import { ActionTree, Module, MutationTree, GetterTree } from 'vuex';
import { TeamsState, RootState } from '../../types';
import firebase from 'firebase';

const state: TeamsState = {
  teams: {},
  team: {
    teamName: '',
    teamPlayers: []
  }
};

export const getters: GetterTree<TeamsState, RootState> = {
  team: (teamsModuleState) => {
    return teamsModuleState.team;
  }
};

const mutations: MutationTree<TeamsState> = {

  SET_TEAMS(teamsModuleState, data) {
    teamsModuleState.teams = data;
  }
};

export const actions: ActionTree<TeamsState, RootState> = {
  
  addTeam({ state }, payload) {
    var user = firebase.auth().currentUser;
    if (user) {
      firebase
        .database()
        .ref('users').child(user.uid).child('teams')
        .push({
          teamName: payload.teamName,
          players: payload.teamPlayers,
        });
    }
  },
  deleteTeam({ state }, {teamId, userId}) {
    const user = firebase.auth().currentUser;
    const database = firebase.database();
    database.ref('users/' + userId).child('teams').child(teamId).remove();
  },
  updateTeam({ state }, { team, userId }) {
    var user = firebase.auth().currentUser;
    firebase.database().ref('users/' + userId).child('teams').child(team.id).update({
      teamName: team.teamName,
      players: team.teamPlayers,
    });
  }
};

export const teams: Module<TeamsState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};