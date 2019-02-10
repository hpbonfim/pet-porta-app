<template>
  <v-app>
    <div id="app">
    <router-view/>
     <!--v-footer dark height="auto" absolute>
        <v-card class="flex" flat tile>
            <v-divider></v-divider>
          <strong>PET - Sistemas >></strong>
            &copy;2019
        </v-card>
      </v-footer-->
    </div>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>
<style>
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
#nav a {
font-weight: bold;
color: #1c647e;
}
#nav a.router-link-exact-active {
color: #1c647e;
}
</style>
