<template>
  <v-app>
    <profile v-if="perfil"></profile>
    <dashboard v-if="porta"></dashboard>
    <logout v-if="sair"></logout>
    <todo v-if="anotar"></todo>

    <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute dark shift>
      <v-btn dark v-model="perfil">
        <span>Perfil</span>
        <v-icon>fas fa-user-circle</v-icon>
      </v-btn>
      <v-btn dark v-model="porta">
        <span>Porta</span>
        <v-icon>fas fa-door-open</v-icon>
      </v-btn>

      <v-btn dark>
        <span>Chat</span>
        <v-icon>fas fa-comments</v-icon>
      </v-btn>

      <v-btn dark v-model="anotar">
        <span>TODO</span>
        <v-icon>fas fa-edit</v-icon>
      </v-btn>

      <v-btn dark v-model="sair">
        <span>Sair</span>
        <v-icon>fas fa-times-circle</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import logout from '../Logout'
import profile from './Profile'
import dashboard from './Dashboard'
import todo from '../ToDoApp/Notes'
export default {
  components: {
    todo,
    dashboard,
    profile,
    logout
  },
  data () {
    return {
      perfil: false,
      porta: false,
      anotar: false,
      sair: false,
      bottomNav: 0
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    },
    // eslint-disable-next-line
    color () {
      switch (this.bottomNav) {
        case 0: return 'dark'
        case 1: return 'gray-dark'
        case 2: return 'blue'
        case 3: return 'indigo'
        case 4: return 'black'
      }
    }
  }
}
</script>
