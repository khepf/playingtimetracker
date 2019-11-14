<template>
  <div>

    <v-navigation-drawer app fixed v-model="showMenu">
      <v-list dense>
        <v-list-tile v-if="!currentUser">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/">Home</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="currentUser">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/dashboard">Dashboard</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!currentUser">
          <v-list-tile-action>
            <v-icon>sports_soccer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/register">Register</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!currentUser">
          <v-list-tile-action>
            <v-icon>sports_soccer</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><router-link to="/login">Log In</router-link></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>




        <v-list-tile @click.prevent="signOut" v-if="currentUser">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="signOut">Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

     

        <v-list-tile v-if="currentUser">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="currentUser">
          <v-list-tile-action>
            <v-icon>help</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Help</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>


    <v-toolbar fixed app dark color="primary">

      <v-toolbar-side-icon @click.stop="toggleMenu"></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>

    </v-toolbar>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Getter } from 'vuex-class';
  import { mapGetters } from 'vuex';
  import firebase from 'firebase';

  @Component
  export default class TopToolbar extends Vue {

    @Getter('title', {namespace: 'topToolbar'}) title!: string;
    @Getter('user', {namespace: 'user' }) user: any;
    showMenu: boolean = false;
    currentUser = firebase.auth().currentUser;

    toggleMenu(): void {
      this.showMenu = !this.showMenu;
    }
    // userLoggedIn() {
    //   console.log('userLoggedIn', firebase.auth().currentUser);
    //   return firebase.auth().currentUser;
    // }
    signOut() {
      this.$store.dispatch('user/signOut');
      console.log('signOut', firebase.auth().currentUser);
    }

  }

</script>
