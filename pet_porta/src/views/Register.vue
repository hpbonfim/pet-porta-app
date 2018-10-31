<template>
  <v-app>
    <v-container style="padding-top:0em" grid-list-xl fluidtile>
      <v-card>
        <v-layout>
          <v-container>
            <h2>Criar Usuário</h2>
              <v-flex>
                <v-divider/>
                <v-text-field xs12 v-model="name" label="Nome:"></v-text-field>
                <v-text-field xs12 v-model="email" label="Email:"></v-text-field>
                <v-text-field xs12 v-model="password" label="Senha:"></v-text-field>
                <v-text-field xs12 v-model="password_confirmation" label="Confirme sua senha"></v-text-field>
              </v-flex>
              <div id="app">
                <v-btn class="button" dark color="#000077" @click="register()" >Criar</v-btn>
                <v-btn class="button" color="#686868" @click="$router.push('login')" >Voltar</v-btn>
              </div>
          </v-container>
        </v-layout>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    register: function () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', data)
        .then(() => this.$router.push('*'))
        .catch(err => console.log(err))
    }
  }
}
</script>
<style scoped>
.button {
margin: 10 auto;
-webkit-border-radius: 30px;
}

h1, h2 {
  font-weight: normal;
  color: #2c3e50;

}
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}
#nav {
  padding: 30px;
}
</style>
