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
            </div>
            <h1>List of Messages</h1>
            <div v-for="message in messages">
              <h3>{{ message.nickname }}</h3>
              <h3>{{ message.text }}</h3>
            </div>
            <h1>Write a message</h1>
            <form @submit.prevent="storeMessage">
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
    players: [],
    firstName: '',
    lastName: '',
    jerseyNumber: 0
    };
  },
  methods: {
    storeMessage() {
      this.messages.push({text: this.messageText, nickname: this.nickname});
      this.messageText = '';
    },
    storePlayer() {
      this.players.push({firstName: this.firstName, lastName: this.lastName, jerseyNumber: this.jerseyNumber});
      this.firstName = '';
      this.lastName = '';
      this.jerseyNumber = '';
    }
  },
  computed: {
  //  map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user/user',
      // players: 'players/players'
    })
  },
  beforeCreate() {
    console.log('jmk beforeCreate');
  },
  created() {
    const database = firebase.database();
    database.ref('messages').on('child_added', (snapshot) => {
      this.messages.push(snapshot.val());
    });
    database.ref('players').on('child_added', (snapshot) => {
      this.players.push(snapshot.val());
    });
  }
};
</script>
