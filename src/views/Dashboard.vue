<template>
<v-container fluid grid-list-lg>
  <v-layout row wrap>
    <v-flex xs12>
      <h2 v-if="ptuser">Hello {{ ptuser.displayName }} !!!</h2>
      <h2 v-else>Hello Stranger</h2>
      <div v-for="player in players">
        <v-card>
          <v-card-title primary-title>
            <v-form>
              <div v-if="player !== editingPlayer">
                <h3>#{{ player.jerseyNumber }} {{ player.firstName }} {{ player.lastName }}</h3>
              </div>
              <div v-else>
                <v-text-field v-model="jerseyNumber"></v-text-field>
                <v-text-field v-model="firstName"></v-text-field>
                <v-text-field v-model="lastName"></v-text-field>
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
      <v-spacer></v-spacer>
      <div>
        <v-card>
          <v-card-title primary-title>
            <h3>Add a Player</h3>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-if="!editingPlayer">
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
              <v-btn 
              color="primary" 
              type="submit"
              @click.prevent="addPlayer()">Add</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </div>

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
    return {
    players: [],
    firstName: '',
    lastName: '',
    jerseyNumber: '',
    editingPlayer: null,
    ptuser: user

    };
  },
  methods: {
    // PLAYER METHODS
    addPlayer() {
      const player = {
        firstName: this.firstName,
       lastName: this.lastName,
      jerseyNumber: this.jerseyNumber
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
      this.$store.dispatch('players/updatePlayer', {player, userId});
      this.cancelEditingPlayer();
    },
    // USER METHODS
    getUserProfile() {
      const user = firebase.auth().currentUser;
      console.log('user', user)
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
    console.log('jmk getUserProfile', this.getUserProfile());
    database.ref('users/' + userId).on('child_added', (snapshot) => {
      this.players.push({...snapshot.val(), id: snapshot.key});
    });
    database.ref('users/' + userId).on('child_removed', (snapshot) => {
      const deletedPlayer = this.players.find((player) => player.id === snapshot.key);
      const index = this.players.indexOf(deletedPlayer);
      this.players.splice(index, 1);
    });
    database.ref('users/' + userId).on('child_changed', (snapshot) => {
      const updatedPlayer = this.players.find((player) => player.id === snapshot.key);
      updatedPlayer.firstName = snapshot.val().firstName;
      updatedPlayer.lastName = snapshot.val().lastName;
      updatedPlayer.jerseyNumber = snapshot.val().jerseyNumber;
    });
  }
};
</script>
