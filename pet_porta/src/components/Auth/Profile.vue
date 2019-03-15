<template>
    <v-app> 
        <v-responsive>
            <v-layout row align-center>
                <v-content>
                    <v-container fluid>
                        <v-responsive>
                            <img height="25" src="./../../assets/bemvindo.png">
                            <br>
                            <img height="50" src="./../../assets/logo.png">
                            <br>
                        </v-responsive>
                        <v-card>
                            <v-list two-line>
                                <v-list-tile @click="">
                                    <v-list-tile-avatar color="grey darken-3">
                                         <v-img class="elevation-6" src='https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads02&accessoriesType=Round&hairColor=SilverGray&facialHairType=MoustacheMagnum&facialHairColor=Platinum&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light'></v-img>
                                    </v-list-tile-avatar>
                                    <v-list-tile-content>
                                        <v-list-tile-title><div>Usuario:{{this.$store.state.usuario.username}}</div></v-list-tile-title>
                                        <v-list-tile-sub-title><div>Nome:{{this.$store.state.usuario.name}}</div></v-list-tile-sub-title>
                                        <v-list-tile-sub-title><div>E-mail:{{this.$store.state.usuario.email}}</div></v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                            <v-list-tile-action></v-list-tile-action>
                            <v-list two-line>
                                <v-divider></v-divider>
                                <v-list-tile @click="''">
                                    <v-list-tile-action>
                                        <v-icon color="gray">class</v-icon>
                                    </v-list-tile-action>
                                    <v-list-tile-content>
                                        <v-list-tile-title>Projetos Ativos:</v-list-tile-title>
                                        <v-list-tile-sub-title>Projeto1: blablabla... </v-list-tile-sub-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider></v-divider>
                                 <v-btn dark color="red" @click="logout()">
                                    <span>Sair </span>
                                    <v-icon>exit_to_app</v-icon>
                                </v-btn>
                            </v-list>
                        </v-card>
                    </v-container>
                </v-content>
            </v-layout>
        </v-responsive>
    </v-app>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {
    },
    computed: {
    },
    methods: {
        logout () {
            this.$store.dispatch('logout')
            this.$router.push('/logar')
        }
    },
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
