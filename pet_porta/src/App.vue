<template>
  <v-app>
      <div id="app">
        <!--v-footer dark height="auto" absolute>
        <v-card class="flex" flat tile>
            <v-divider></v-divider>
          <strong>PET - Sistemas >></strong>
            &copy;2019
        </v-card>
        </v-footer-->
      </div>
    <v-content>
      <router-view/>
      <index v-if="loggedIn()"></index>
    </v-content>
  </v-app>
</template>

<script>
import index from './components/Auth/Index.vue'
export default {
  component: {
    index
  },
  data () {
    return {}
  },
  methods: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  computed: {}
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #1c647e;
}
#nav a.router-link-exact-active {
  color: #1c647e;
}
</style>
