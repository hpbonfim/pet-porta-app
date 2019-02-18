<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <v-responsive>
              <img height="20" src="../assets/registre.png">
              <br>
              <br>
            </v-responsive>
            <v-card>
              <v-system-bar window dark>
                <v-divider/>
                <v-btn pr-4 @click="retornar" icon>
                  <v-icon>close</v-icon>
                </v-btn>
              </v-system-bar>
              <v-container>
                <v-flex xs12>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="name"
                      :rules="[rules.required, rules.min]"
                      label="Nome Completo:"
                      required
                    ></v-text-field>
                    <v-spacer/>
                    <v-text-field
                      v-model="email"
                      :rules="[rules.required, rules.emailValid]"
                      label="E-mail:"
                      required
                    ></v-text-field>
                    <v-spacer/>
                    <v-text-field
                      v-model="user"
                      :rules="[rules.required, rules.min]"
                      label="Username:"
                      required
                    ></v-text-field>
                    <v-spacer/>
                    <v-text-field
                      v-model="password"
                      :append-icon="mostrarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"
                      :rules="[rules.required, rules.min]"
                      :type="mostrarSenha ? 'text' : 'password'"
                      name="input-10-2"
                      label="Crie sua Senha:"
                      class="input-group--focused"
                      @click:append="mostrarSenha = !mostrarSenha"
                    ></v-text-field>
                    <v-spacer/>
                    <v-text-field
                      v-model="senha"
                      :append-icon="confirmarSenha ? 'fas fa-eye-slash' : 'fas fa-eye'"
                      :rules="[rules.required, rules.min]"
                      :type="confirmarSenha ? 'text' : 'password'"
                      name="input-10-2"
                      label="Confirme sua senha!"
                      @click:append="confirmarSenha = !confirmarSenha"
                    ></v-text-field>
                    <v-checkbox v-model="checkbox" :rules="[v => !!v]" label="Tudo OK!?" required></v-checkbox>
                    <v-divider/>
                    <br>
                    <v-btn class="button" dark color="#000077" v-if="checkbox" @click="registrar()">
                      <v-icon>save</v-icon>
                    </v-btn>
                    <v-btn class="button" dark color="#696969" @click="retornar()">
                      <v-icon>subdirectory_arrow_left</v-icon>
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-form>
                </v-flex>
              </v-container>
            </v-card>
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
  data: () => ({
    valid: true,
    checkbox: false,
    mostrarSenha: false,
    confirmarSenha: false,
    tudoOK: false,
    rules: {
      required: value => !!value || 'Obrigatório.',
      min: v => v.length >= 8 || 'Min 8 chars',
      emailValid: v => /.+@.+/.test(v) || 'E-mail deve ser válido'
    },
    name: '',
    email: '',
    user: '',
    password: '',
    senha: ''
  }),

  methods: {
    // validar () {
    //   if (this.name >= 8) {
    //     if (this.email != rules.emailValid) {
    //     }
    //   }
    // },
    registrar () {
      let data = {
        name: this.name,
        email: this.email,
        username: this.user,
        password: this.password
      }
      this.$store
        .dispatch('register', data)
        .then(() => this.$router.push('/logar'))
        .catch(err => console.log(err))
    },
    retornar () {
      this.$router.push('/logar')
    }
  }
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.button {
  margin: 10 auto;
  -webkit-border-radius: 30px;
}
</style>
