<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <div v-for="message in messages">
        <v-card>
          <v-card-title primary-title>
            <div>
              <div v-if="message !== editingMessage">
                <h3>{{ message.nickname }}</h3>
                <h3>{{ message.text }}</h3>
              </div>
              <div v-else>
                <textarea v-model="messageText" class="form-control"></textarea>
                <textarea v-model="nickname" class="form-control"></textarea>
              </div>
            </div>
          </v-card-title>

          <v-card-actions>
              <div v-if="message !== editingMessage">
                <v-btn flat @click.prevent="editMessage(message)" color="info">edit</v-btn>
                <v-btn flat @click.prevent="deleteMessage(message)" color="info">delete</v-btn>
              </div>
              <div v-else>
                <v-btn flat @click.prevent="cancelEditingMessage" color="info">cancel</v-btn>
                <v-btn flat @click.prevent="updateMessage" color="info">update</v-btn>
              </div>
          </v-card-actions>
        </v-card>
      </div>
      <div>
        <v-card>
          <v-card-title primary-title>
            <h3>Write a Message</h3>
          </v-card-title>
          <v-card-text>
            <v-form v-if="!editingMessage" @submit.prevent="storeMessage">
              <div class="form-group">
                <label>Message</label>
                <input v-model="messageText" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Nickname</label>
                <input v-model="nickname" class="form-control"/>
              </div>
              <button>Send</button>
            </v-form>
          </v-card-text>
        </v-card>
      </div>

      <div v-for="player in players">
        <v-card>
          <v-card-title primary-title>
            <div>
              <div v-if="player !== editingPlayer">
                <h3>{{ player.firstName }}</h3>
                <h3>{{ player.lastName }}</h3>
                <h3>{{ player.jerseyNumber }}</h3>
              </div>
              <div v-else>
                <textarea v-model="firstName" class="form-control"></textarea>
                <textarea v-model="lastName" class="form-control"></textarea>
                <textarea v-model="jerseyNumber" class="form-control"></textarea>
              </div>

            </div>
          </v-card-title>

          <v-card-actions>
              <div v-if="player !== editingPlayer">
                <v-btn flat @click.prevent="editPlayer(player)" color="info">edit</v-btn>
                <v-btn flat @click.prevent="deletePlayer(player)" color="info">delete</v-btn>
              </div>
              <div v-else>
                <v-btn flat @click.prevent="cancelEditingPlayer" color="info">cancel</v-btn>
                <v-btn flat @click.prevent="updatePlayer" color="info">update</v-btn>
              </div>
          </v-card-actions>
        </v-card>
      </div>
      <div>
        <v-card>
          <v-card-title primary-title>
            <h3>Add a Player</h3>
          </v-card-title>
          <v-card-text>
            <v-form v-if="!editingPlayer" @submit.prevent="storePlayer">
              <div class="form-group">
                <label>First Name</label>
                <input v-model="firstName" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input v-model="lastName" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Jersey Number</label>
                <input v-model="jerseyNumber" class="form-control"/>
              </div>
              <button>Add</button>
            </v-form>
          </v-card-text>
        </v-card>
      </div>

    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';
export default {

  data: () => {
    return {
    messages: [],
    messageText: '',
    nickname: '',
    editingMessage: null,
    players: [],
    firstName: '',
    lastName: '',
    jerseyNumber: '',
    editingPlayer: null
    };
  },
  methods: {
    // MESSAGE METHODS
    storeMessage() {
      const database = firebase.database();
      database.ref('messages').push({text: this.messageText, nickname: this.nickname});
      this.messageText = '';
      this.nickname = '';
    },
    deleteMessage(message) {
      const database = firebase.database();
      database.ref('messages').child(message.id).remove();
    },
    editMessage(message) {
      this.editingMessage = message;
      this.messageText = message.text;
      this.nickname = message.nickname;
    },
    cancelEditingMessage() {
      this.editingMessage = null;
      this.messageText = '';
      this.nickname = '';
    },
    updateMessage() {
      const database = firebase.database();
      database.ref('messages').child(this.editingMessage.id).update({text: this.messageText});
      database.ref('messages').child(this.editingMessage.id).update({nickname: this.nickname});
      this.cancelEditingMessage();
    },
    // PLAYER METHODS
    storePlayer() {
      const database = firebase.database();
      database.ref('players').push(
        {
          firstName: this.firstName,
          lastName: this.lastName,
          jerseyNumber: this.jerseyNumber
        });
      this.firstName = '';
      this.lastName = '';
      this.jerseyNumber = '';
    },
    deletePlayer(player) {
      const database = firebase.database();
      database.ref('players').child(player.id).remove();
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
    updatePlayer() {
      const database = firebase.database();
      database.ref('players').child(this.editingPlayer.id).update({firstName: this.firstName});
      database.ref('players').child(this.editingPlayer.id).update({lastName: this.lastName});
      database.ref('players').child(this.editingPlayer.id).update({jerseyNumber: this.jerseyNumber});
      this.cancelEditingPlayer();
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
    database.ref('messages').on('child_added', (snapshot) => {
      this.messages.push({...snapshot.val(), id: snapshot.key});
    });
    database.ref('messages').on('child_removed', (snapshot) => {
      const deletedMessage = this.messages.find((message) => message.id === snapshot.key);
      const index = this.messages.indexOf(deletedMessage);
      this.messages.splice(index, 1);
    });
    database.ref('messages').on('child_changed', (snapshot) => {
      const updatedMessage = this.messages.find((message) => message.id === snapshot.key);
      updatedMessage.text = snapshot.val().text;
      updatedMessage.nickname = snapshot.val().nickname;
    });
    database.ref('players').on('child_added', (snapshot) => {
      this.players.push({...snapshot.val(), id: snapshot.key});
    });
    database.ref('players').on('child_removed', (snapshot) => {
      const deletedPlayer = this.players.find((player) => player.id === snapshot.key);
      const index = this.players.indexOf(deletedPlayer);
      this.players.splice(index, 1);
    });
    database.ref('players').on('child_changed', (snapshot) => {
      const updatedPlayer = this.players.find((player) => player.id === snapshot.key);
      updatedPlayer.firstName = snapshot.val().firstName;
      updatedPlayer.lastName = snapshot.val().lastName;
      updatedPlayer.jerseyNumber = snapshot.val().jerseyNumber;
    });
  }
};
</script>
