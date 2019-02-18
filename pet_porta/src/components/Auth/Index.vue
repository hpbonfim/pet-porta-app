<template>
  <v-app >
    <profile  v-if="perfil"></profile>
    <dashboard v-if="porta"></dashboard>
    <logout v-if="sair"></logout>
    <todo v-if="anotar"></todo>

    <v-bottom-nav :active.sync="bottomNav" :color="color" :value="true" absolute dark shift>
      <v-btn dark v-model="perfil">
        <span>Perfil</span>
        <v-icon>account_box</v-icon>
      </v-btn>

      <v-btn dark v-model="porta">
        <span>Porta</span>
        <v-icon>touch_app</v-icon>
      </v-btn>

      <v-btn dark v-model="anotar">
        <span>Anotações</span>
        <v-icon>note_add</v-icon>
      </v-btn>

      <v-btn dark v-model="sair">
        <span>Sair</span>
        <v-icon>exit_to_app</v-icon>
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
