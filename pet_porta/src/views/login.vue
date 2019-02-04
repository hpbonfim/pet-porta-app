<template>
<v-app>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-responsive>
          <img height="100" src="../assets/pet.png"><br>
        </v-responsive>
        <v-divider/>
          <v-card>
              <v-card-text>
                <div>
                  <v-text-field v-model="nome" type="text" name="Nome" label="Nome"></v-text-field>
                  <v-text-field v-model="senha" type="password" name="Senha" label="Senha"></v-text-field><br>
                </div>
                <v-divider></v-divider>
                <div id="app" style="padding-top:1em">
                <v-btn class="button" dark color="#000077" @click="login()">Entrar</v-btn>
                <v-btn class="button" color="#686868" @click="$router.push('register')">Registrar</v-btn>
                </div>
              </v-card-text>
          </v-card>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      nome: '',
      senha: ''
    }
  },
  methods: {
    login: function () {
      const nome = this.nome
      const senha = this.senha
      this.$store.dispatch('login', { nome, senha })
        .then(() => this.$router.push('/dashboard'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #00008b;
}
.button {
margin: 10 auto;
-webkit-border-radius: 20px;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
