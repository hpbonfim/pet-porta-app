<template>
    <v-app>
        <v-layout row>
            <v-flex sm6 offset-sm3>
                <v-card>
                    <v-card-actions>
                        <v-list-tile class="grow">
                            <v-list-tile-avatar color="grey darken-3">
                                <v-img class="elevation-6" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
                                </v-img>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Nome: 1</v-list-tile-title>
                            </v-list-tile-content>
                            <v-menu bottom>
                                <v-btn slot="activator" icon>
                                    <v-icon class="mr-1">fas fa-bars</v-icon>
                                </v-btn>
                            </v-menu>
                        </v-list-tile>
                    </v-card-actions>
                    <v-list two-line>
                        <v-divider inset></v-divider>
                        <v-list-tile @click="''">
                            <v-list-tile-action>
                                <v-icon color="indigo">email</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Email: 1@1.com</v-list-tile-title>
                                <v-list-tile-sub-title>e-mail</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-divider inset></v-divider>
                        <v-list-tile @click="''">
                            <v-list-tile-action>
                                <v-icon color="indigo">fas fa-map-pin</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    <router-view/>
    </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
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
