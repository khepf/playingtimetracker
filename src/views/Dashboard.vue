<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header"><h1>Dashboard</h1></div>
          <div class="card-body">
            <div v-if="user" class="alert alert-success" role="alert">You are logged in!</div>
            <h1>List of Players</h1>
            <div v-for="player in players">
              <h3>{{ player.firstName }}</h3>
              <h3>{{ player.lastName }}</h3>
              <h3>{{ player.jerseyNumber }}</h3>
              <a @click.prevent="editPlayer(player)" href="">edit</a>
              <a @click.prevent="deletePlayer(player)" href="">delete</a>
            </div>
            <h1>Add a Player</h1>
            <form @submit.prevent="storePlayer">
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
              <button>Send</button>
            </form>
            <h1>List of Messages</h1>
            <div v-for="message in messages">
              <h3 v-if="message !== editingMessage">{{ message.nickname }}</h3>
              <h3 v-if="message !== editingMessage">{{ message.text }}</h3>
              <textarea v-else v-model="messageText" class="form-control"></textarea>
              <div v-if="message !== editingMessage">
                <a @click.prevent="editMessage(message)" href="">edit</a>
                <a @click.prevent="deleteMessage(message)" href="">delete</a>
              </div>
              <div v-else>
                <a @click.prevent="cancelEditingMessage" href="">cancel</a>
                <a @click.prevent="updateMessage" href="">update</a>
              </div>

              
              
            </div>
            <h1>Write a message</h1>
            <form v-if="!editingMessage" @submit.prevent="storeMessage">
              <div class="form-group">
                <label>Message</label>
                <input v-model="messageText" class="form-control"/>
              </div>
              <div class="form-group">
                <label>Nickname</label>
                <input v-model="nickname" class="form-control"/>
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
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
    },
    cancelEditingMessage() {
      this.editingMessage = null;
      this.messageText = '';
    },
    updateMessage() {
      const database = firebase.database();
      database.ref('messages').child(this.editingMessage.id).update({text: this.messageText});
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
    });
    database.ref('players').on('child_added', (snapshot) => {
      this.players.push({...snapshot.val(), id: snapshot.key});
    });
    database.ref('players').on('child_removed', (snapshot) => {
      const deletedPlayer = this.players.find((player) => player.id === snapshot.key);
      const index = this.players.indexOf(deletedPlayer);
      this.players.splice(index, 1);
    });

  }
};
</script>
