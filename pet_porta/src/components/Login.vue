<template>
  <v-app id="app">
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <v-responsive>
              <img height="100" src="../assets/logo.png">
              <br>
              <img height="50" src="../assets/peet.png">
              <br>
              <img height="25" src="../assets/sistemas.png">
              <br>
            </v-responsive>
            <br>
            <v-divider/>
            <v-card>
              <v-card-text>
                <div>
                  <v-text-field
                    v-model="username"
                    prepend-icon="account_box"
                    large
                    name="username"
                    label="Usuário"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    id="password"
                    prepend-icon="https"
                    name="Senha"
                    label="Senha"
                    type="password"
                  ></v-text-field>
                </div>
                <v-divider></v-divider>
                <div>
                  <v-btn class="button" large dark color="#000099" @click="login()">
                    <v-icon color="white">how_to_reg</v-icon>
                  </v-btn>
                  <v-btn class="button" large color="#2f3537" @click="cadastrar()">
                    <v-icon color="white">person_add</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
            <v-responsive>
              <br>
              <img height="12" src="../assets/facom.png">
              <v-divider></v-divider>
              <v-tooltip bottom>
                <v-btn
                  slot="activator"
                  href="https://petsistemas.ufms.br/"
                  icon
                  large
                  target="_blank"
                >
                  <v-icon>info</v-icon>
                </v-btn>
                <span>Informações</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn small slot="activator" icon large href>
                  <v-icon>help</v-icon>
                </v-btn>
                <span>Dúvidas</span>
              </v-tooltip>
            </v-responsive>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer dark height="auto" absolute>
      <v-card class="flex" flat tile>
        <v-divider></v-divider>
        <strong>PET - Sistemas >></strong>
        &copy;2019
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    cadastrar () {
      this.$router.push('cadastrar')
    },
    login () {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: '/' }, location.reload())
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000038;
}
.button {
  margin: 10 auto;
  -webkit-border-radius: 20px;
}
</style>
