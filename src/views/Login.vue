<template>    
<v-container fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12"></v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Log In</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field 
              prepend-icon="email" 
              name="email" 
              label="Email" 
              type="email"                                          
              v-model="form.email" 
              :rules="emailRules" 
              required>                            
            </v-text-field>
            <v-text-field 
              prepend-icon="lock" 
              name="password" 
              label="Password" 
              id="password"
              type="password" 
              required 
              v-model="form.password" 
              :rules="passwordRules">                            
            </v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>                        
          <v-spacer></v-spacer>                        
          <v-btn color="primary" 
            :disabled="!valid" 
            @click="submit">Log In</v-btn>                    
        </v-card-actions>    
    </v-flex>        
  </v-layout>    
</v-container>
</template>
<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      valid: false,
      form: {
        email: '',
        password: ''
      },
      emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
      passwordRules: [
                (v) => !!v || 'Password is required',
                (v) =>
                    v.length >= 6 ||
                    'Password must be greater than 6 characters'
            ],
      error: null
    };
  },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('user/login', {
                    email: this.form.email,
                    password: this.form.password
                });
            }
        }
    }
};
</script>