<template>
  <v-container centered>
    <v-card class="mx-auto" max-width="300">
      <v-img src="https://cdn-images-1.medium.com/max/1000/1*0PgQGucR46gNhEYOnYb_Aw.jpeg"></v-img>
      <v-divider></v-divider>
      <v-card-actions centered>
        <v-spacer/>
        <v-btn color="red" dark @click="logout()">Sair</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    logoutDev () {
      this.$router.push('login')
    },
    logout () {
      //this.$store.dispatch('clearTodos')
      this.$store.dispatch('destroyToken').then(response => {
        this.$router.push('login')
      })
    }
  }
}
</script>
