<template>
<v-container fluid grid-list-lg>
  <v-layout column>
    <v-flex xs12>
      <h4 v-if="ptuser"><em>Signed in as {{ ptuser.email }}</em></h4>
      <h4 v-else>Hello Stranger</h4>
      <h3 class="mt-2 text-xs-center">Your Players</h3>
      <div v-for="player in players" class="mt-2">
        <v-card>
          <v-card-title primary-title>
            <v-form>
              <div v-if="player !== editingPlayer">
                <h3>#{{ player.jerseyNumber }} {{ player.firstName }} {{ player.lastName }} - {{ player.teamName}}</h3>
              </div>
              <div v-else>
                <v-text-field v-model="jerseyNumber"></v-text-field>
                <v-text-field v-model="firstName"></v-text-field>
                <v-text-field v-model="lastName"></v-text-field>
                <v-select                  
                  :items="teams"
                  item-text="teamName"
                  label="Select Team">
                </v-select>
              </div>

            </v-form>
          </v-card-title>
          <v-card-actions>
              <div v-if="player !== editingPlayer">
                <v-btn flat @click.prevent="editPlayer(player)" color="info">edit</v-btn>
                <v-btn flat @click.prevent="deletePlayer(player)" color="info">delete</v-btn>
              </div>
              <div v-else>
                <v-btn flat @click.prevent="cancelEditingPlayer" color="info">cancel</v-btn>
                <v-btn flat @click.prevent="updatePlayer(player)" color="info">update</v-btn>
              </div>
          </v-card-actions>
        </v-card>
      </div>

      <v-expansion-panel class="mt-3">
        <v-expansion-panel-content>
          <div slot="header"><h3>Add a Player</h3></div>
          <v-card>
          <v-card-text>
            <v-form ref="form">
              <div>
                <v-text-field
                name="firstName"
                v-model="firstName"
                label="First Name">
                </v-text-field>
              </div>
              <div>
                <v-text-field 
                name="lastName"
                v-model="lastName"
                label="Last Name">
                </v-text-field>
              </div>
              <div>
                <v-text-field
                name="jerseyNumber"
                v-model="jerseyNumber"
                label="Jersey Number" >
                </v-text-field>
              </div>
              <div>
                <v-select
                  
                  :items="teams"
                  v-model="teamName"
                  item-text="teamName"
                  label="Select Team">
                </v-select>
              </div>
              <v-btn 
              color="primary" 
              type="submit"
              @click.prevent="addPlayer()">Add</v-btn>
            </v-form>
          </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

            <h3 class="mt-2 text-xs-center">Your Teams</h3>
      <div v-for="team in teams" class="mt-2">
        <v-card>
          <v-card-title primary-title>
            <v-form>
              <div v-if="team !== editingTeam">
                <h3> {{ team.teamName }}</h3>
                <h3>members: {{ team.members }}</h3>
              </div>
              <div v-else>
                <v-text-field v-model="teamName"></v-text-field>
                <v-text-field v-model="members"></v-text-field>
              </div>

            </v-form>
          </v-card-title>
          <v-card-actions>
              <div v-if="team !== editingTeam">
                <v-btn flat @click.prevent="editTeam(team)" color="info">edit</v-btn>
                <v-btn flat @click.prevent="deleteTeam(team)" color="info">delete</v-btn>
              </div>
              <div v-else>
                <v-btn flat @click.prevent="cancelEditingTeam" color="info">cancel</v-btn>
                <v-btn flat @click.prevent="updateTeam(team)" color="info">update</v-btn>
              </div>
          </v-card-actions>
        </v-card>
      </div>

      <v-expansion-panel class="mt-3">
        <v-expansion-panel-content>
          <div slot="header"><h3>Add a Team</h3></div>
          <v-card>
          <v-card-text>
            <v-form ref="form">
              <div>
                <v-text-field
                name="teamName"
                v-model="teamName"
                label="Team Name">
                </v-text-field>
              </div>
              <div>
                <v-text-field 
                name="members"
                v-model="members"
                label="Members">
                </v-text-field>
              </div>
              <div>
              </div>
              <v-btn 
              color="primary" 
              type="submit"
              @click.prevent="addTeam()">Add</v-btn>
            </v-form>
          </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</v-container>

</template>

<script>
import firebase from 'firebase';
import { mapGetters, mapActions } from 'vuex';

export default {

  data: () => {
    const user = firebase.auth().currentUser;
    const userId = firebase.auth().currentUser.uid;
    return {
      teams: [],
      teamName: '',
      members: '',
      players: [],
      firstName: '',
      lastName: '',
      jerseyNumber: '',
      editingPlayer: null,
      editingTeam: null,
      ptuser: user
    };
  },
  methods: {
    // PLAYER METHODS
    addPlayer() {
      const player = {
        firstName: this.firstName,
       lastName: this.lastName,
      jerseyNumber: this.jerseyNumber,
      teamName: this.teamName
      };
      this.$store.dispatch('players/addPlayer', player);
      this.firstName = '';
      this.lastName = '';
      this.jerseyNumber = '';
    },
    deletePlayer(player) {
      const userId = firebase.auth().currentUser.uid;
      const playerId = player.id;
      this.$store.dispatch('players/deletePlayer', {playerId, userId});
    },
    editPlayer(player) {
      this.editingPlayer = player;
      this.firstName = player.firstName;
      this.lastName = player.lastName;
      this.jerseyNumber = player.jerseyNumber;
      this.teamName = player.teamName;
    },
    cancelEditingPlayer() {
      this.editingPlayer = null;
      this.firstName = '';
      this.lastName = '';
      this.jerseyNumber = '';
    },
    updatePlayer(player) {
      const userId = firebase.auth().currentUser.uid;
      player.firstName = this.firstName;
      player.lastName = this.lastName;
      player.jerseyNumber = this.jerseyNumber;
      player.teamName = this.teamName;
      this.$store.dispatch('players/updatePlayer', {player, userId});
      this.cancelEditingPlayer();
    },
    // TEAM METHODS
    addTeam() {
      const team = {
        teamName: this.teamName,
        members: this.members
      };
      this.$store.dispatch('teams/addTeam', team);
      this.teamName = '';
      this.members = '';
    },
    deleteTeam(team) {
      const userId = firebase.auth().currentUser.uid;
      const teamId = team.id;
      this.$store.dispatch('teams/deleteTeam', {teamId, userId});
    },
    editTeam(team) {
      this.editingTeam = team;
      this.teamName = team.teamName;
      this.members = team.members;
    },
    cancelEditingTeam() {
      this.editingTeam = null;
      this.teamName = '';
      this.members = '';
    },
    updateTeam(team) {
      const userId = firebase.auth().currentUser.uid;
      team.teamName = this.teamName;
      team.members = this.members;
      this.$store.dispatch('teams/updateTeam', {team, userId});
      this.cancelEditingTeam();
    },



    // USER METHODS
    getUserProfile() {
      const user = firebase.auth().currentUser;
      var name, email, photoUrl, uid, emailVerified;

      if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;  // The user's ID, unique to the Firebase project.
      }
      return user;
    },

  },
  computed: {
  //  map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user/user',
      // players: 'players/players'
    })
  },

  created() {
    const database = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const userDisplayName = firebase.auth().currentUser.displayName;
    this.getUserProfile();
    database.ref('users/' + userId + '/players').on('child_added', (snapshot) => {
      this.players.push({...snapshot.val(), id: snapshot.key});
    });
    database.ref('users/' + userId + '/players').on('child_removed', (snapshot) => {
      const deletedPlayer = this.players.find((player) => player.id === snapshot.key);
      const index = this.players.indexOf(deletedPlayer);
      this.players.splice(index, 1);
    });
    database.ref('users/' + userId + '/players').on('child_changed', (snapshot) => {
      const updatedPlayer = this.players.find((player) => player.id === snapshot.key);
      updatedPlayer.firstName = snapshot.val().firstName;
      updatedPlayer.lastName = snapshot.val().lastName;
      updatedPlayer.jerseyNumber = snapshot.val().jerseyNumber;
      updatedPlayer.teamName = snapshot.val().teamName;
    });

    database.ref('users/' + userId + '/teams').on('child_added', (snapshot) => {
      this.teams.push({...snapshot.val(), id: snapshot.key});
    });
    database.ref('users/' + userId + '/teams').on('child_removed', (snapshot) => {
      const deletedTeam = this.teams.find((team) => team.id === snapshot.key);
      const index = this.teams.indexOf(deletedTeam);
      this.teams.splice(index, 1);
    });
    database.ref('users/' + userId + '/teams').on('child_changed', (snapshot) => {
      const updatedTeam = this.teams.find((team) => team.id === snapshot.key);
      updatedTeam.teamName = snapshot.val().teamName;
      updatedTeam.members = snapshot.val().members;
    });
  }
};
</script>
