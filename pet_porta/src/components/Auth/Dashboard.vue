<template>
  <v-container fluid>
      <v-card-title>
        <v-layout column align-center>
            <div class="button" @click="abrir()"><img height="100" src="../../assets/ClickHereHand.gif">
              <div class="outer" @click="comment">
                <div class="height">
                  <div class="inner">
                      <v-responsive><img height="100" src="../../assets/logo.png"></v-responsive>
                    </div>
                  </div>
                </div>
              </div>
        </v-layout>
      </v-card-title>
      <!--v-timeline dense clipped>
        <v-slide-x-transition group>
          <v-timeline-item v-for="event in timeline" :key="event.id" class="mb-3" color="green" small>
            <v-layout justify-space-between>
              <v-flex xs7 v-text="event.text"></v-flex>
              <v-flex xs5 text-xs-right v-text="event.time"></v-flex>
            </v-layout>
          </v-timeline-item>
        </v-slide-x-transition>
      </v-timeline-->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    events: [],
    input: null,
    nonce: 0
  }),
  computed: {
    timeline () {
      return this.events.slice().reverse()
    }
  },
  methods: {
    comment () {
      const time = (new Date()).toTimeString()
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
          return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
        })
      })
      this.input = null
    },
    abrir () {
      this.$store.dispatch('openDoor')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
font-family: Impact;
}
.button {
height: 200px;
width: 200px;
cursor: pointer;
padding: 01%;
margin: 0px auto;
}
.button .outer {
position: relative;
width: 100%;
height: 100%;
padding: 10px;
background: rgba(0,0,0,0.65);
border-radius: 140px;
-webkit-border-radius: 140px;
-moz-border-radius: 140px;
box-shadow: inset rgba(0,0,0,0.85) 0px 1px 5px;
-webkit-box-shadow: inset rgba(0,0,0,0.85) 0px 1px 5px;
-moz-box-shadow: inset rgba(0,0,0,0.85) 0px 1px 5px;
-webkit-transform: perspective(500px) rotateX(35deg);
-moz-transform: perspective(500px) rotateX(35deg);
}
.button .outer .height {
position: relative;
height: 100%;
margin-top: -15px;
padding-bottom: 15px;
background: #39a02d;
border-radius: 160px;
-webkit-border-radius: 160px;
-moz-border-radius: 160px;
box-shadow: rgba(0,0,0,0.85) 0px 1px 1px, inset rgba(0,0,0,0.35) 0px -2px 8px;
-webkit-box-shadow: rgba(0,0,0,0.85) 0px 1px 1px, inset rgba(0,0,0,0.35) 0px -2px 8px;
-moz-box-shadow: rgba(0,0,0,0.85) 0px 1px 1px, inset rgba(0,0,0,0.35) 0px -2px 8px;
-webkit-transition: all 0.1s ease-in-out;
-moz-transition: all 0.1s ease-in-out;
}
.button:hover .outer .height {
margin-top: -10px;
padding-bottom: 10px;
background: #3aaf2d;
box-shadow: rgba(0,0,0,0.25) 0px 1px 1px, inset rgba(0,0,0,0.35) 0px -2px 6px;
-webkit-box-shadow: rgba(0,0,0,0.25) 0px 1px 1px, inset rgba(0,0,0,0.35) 0px -2px 6px;
-moz-box-shadow: rgba( 0,0,0,0.25) 0px 1px 1px, inset rgba(0,0,0,0.35) 0px -2px 6px;
}
.button:active .outer .height {
margin-top: 0px;
padding-bottom: 0px;
}
.button .outer .height .inner {
line-height: 2.8em;
font-size: 30px;
padding-top: 30px;
padding-right: 0px;
letter-spacing: .05em;
position: relative;
height: 100%;
text-align: center;
text-shadow: #8aff7b 0px 0px 1px;
background: #44d135;
background: -moz-linear-gradient(top, #80ec75 0%, #43d034 100%); /* FF3.6+ */
background: -webkit-linear-gradient(top, #80ec75 0%,#43d034 100%); /* Chrome10+,Safari5.1+ */
background: linear-gradient(to top, #80ec75 0%,#43d034 100%); /* W3C */
border-radius: 120px;
-webkit-border-radius: 120px;
-moz-border-radius: 120px;
box-shadow: inset rgba(255,255,255,0.85) 0px 0px 1px;
-webkit-box-shadow: inset rgba(255,255,255,0.85) 0px 0px 1px;
-moz-box-shadow: inset rgba(255,255,255,0.85) 0px 0px 1px;
-webkit-transition: all 0.1s ease-in-out;
-moz-transition: all 0.1s ease-in-out;
}
.button:hover .outer .height .inner{
text-shadow: #99f48d 0px 0px 1px;
background: #43d034; /* Old browsers */
background: -moz-linear-gradient(top, #43d034 0%, #67e45c 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#43d034), color-stop(100%,#67e45c)); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top, #43d034 0%,#67e45c 100%); /* Chrome10+,Safari5.1+ */
background: linear-gradient(to top, #43d034 0%,#67e45c 100%); /* W3C */
}
.button:active .outer .height .inner{
text-shadow: #319926 0px 1px 0px;
border-radius: 160px;
-webkit-border-radius: 160px;
-moz-border-radius: 160px;
box-shadow: inset rgba(0,0,0,0.9) 0px 0px 8px;
-webkit-box-shadow: inset rgba(0,0,0,0.9) 0px 0px 8px;
-moz-box-shadow: inset rgba(0,0,0,0.9) 0px 0px 8px;
background: #1d7d12; /* Old browsers */
background: -moz-linear-gradient(top, #1d7d12 0%, #4fd342 100%); /* FF3.6+ */
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#1d7d12), color-stop(100%,#4fd342)); /* Chrome,Safari4+ */
background: -webkit-linear-gradient(top, #1d7d12 0%,#4fd342 100%); /* Chrome10+,Safari5.1+ */
background: linear-gradient(to top, #1d7d12 0%,#4fd342 100%); /* W3C */
}
</style>
