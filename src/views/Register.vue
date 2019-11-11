<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="form.name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>    
<v-container fill-height>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12"></v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field 
              prepend-icon="person" 
              name="name" 
              label="Name" 
              type="text"                                          
              v-model="form.name" 
              :rules="nameRules" 
              required>                            
            </v-text-field>
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
            @click="submit">Join</v-btn>                    
        </v-card-actions>    
    </v-flex>        
  </v-layout>    
</v-container>
</template>


<script>
import firebase from 'firebase';
import { mapGetters,  mapActions} from 'vuex';

export default {
  data() {
    return {
      valid: false,
      form: {
        name: '',
        email: '',
        password: ''
      },
      error: null,
      authUser: null,
      nameRules: [ (v) => !!v || 'Name is required', (v) => v.length >= 3 || 'Name must be greater than 3 characters'],
      emailRules: [ (v) => !!v || 'E-mail is required', (v) => /.+@.+/.test(v) || 'E-mail must be valid'],
      passwordRules: [
        (v) => !!v || 'Password is required', (v) => v.length >= 6 || 'Password must be greater than 6 characters']
    };
  },

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/register', {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password
        });
      }
    }
  }
};
</script>