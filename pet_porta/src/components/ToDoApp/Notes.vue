<template>
    <v-app>
        <v-content>
            <v-container fluid>
                <v-layout column align-center>
                    <v-card>
                      <v-responsive>
                        <div class="main">
                          <v-container>
                            <v-responsive>
                              <v-alert v-if="isWrongActivity" :value="errorMessage" type="error" :center="true" dismissible>{{errorMessage}}</v-alert>
                              <h1>Atividades</h1>
                              <div v-if="isEmpty">
                                  <el-alert title="Nenhuma atividade na lista" type="info" :center="true" show-icon :closable="false"></el-alert>
                              </div>
                              <div v-else>
                                <el-table :data="activities" :row-class-name="tableRowColor">
                                        <el-table-column prop="name" label="Name">
                                    </el-table-column>
                                    <el-table-column label="Date">
                                        <template slot-scope="scope">
                                            <i class="el-icon-time"></i>
                                            <span style="margin-left: 10px">{{getDate(scope.row.date)}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="Remove">
                                        <template slot-scope="scope">
                                            <el-button type="danger" icon="el-icon-delete" @click="removeActivity(scope.row)" circle size="small"></el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="Check">
                                        <template slot-scope="scope">
                                            <el-button type="success" icon="el-icon-check" circle @click="completeActivity(scope.row)" size="small"></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                              </div>
                            </v-responsive>
                          </v-container>
                        </div>
                      <v-responsive>
                        <v-card-actions type="flex" justify="center" class="counterSection">
                            <v-card-text :span="4"> Completo: {{completed}}</v-card-text>
                            <v-card-text :span="3"> Total : {{total}}</v-card-text>
                        </v-card-actions>
                        <v-card dark>
                            <v-divider/>
                            <v-form>
                                <v-container>
                                    <v-text-field placeholder="..." v-model="activity" size="mini">
                                        <template slot="label">Digite sua <strong>Tarefa</strong>:</template>
                                    </v-text-field>
                            <el-date-picker v-model="date" type="date" placeholder="Escolha o dia"></el-date-picker>
                                </v-container>
                            </v-form>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" circle @click="addActivityMethod()"></el-button>
                        </v-card>
                    </v-card>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'Activity',
  data () {
    return {
      activity: '',
      wrong: false,
      date: '',
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters({
      'activities': 'getActivities'
    }),
    isWrongActivity () {
      return this.wrong
    },
    completed () {
      return this.activities.filter((val) => val.completed === true).length
    },
    total () {
      return this.activities.length
    },
    isEmpty () {
      return this.activities.length === 0
    }

  },
  methods: {
    ...mapActions(['addActivity', 'deleteActivity', 'changeActivityState']),
    addActivityMethod () {
      if (this.validateData() === true) {
        const activity = {
          name: this.activity,
          completed: false,
          date: this.date
        }

        this.addActivity({ activity })
        this.activity = ''
        this.date = ''
        this.wrong = false
      } else {
        this.wrong = true
        this.setMessageError()
      }
    },

    removeActivity (item) {
      this.deleteActivity({ activity: item })
    },

    completeActivity (item) {
      this.changeActivityState({ activity: item })
    },
    tableRowColor ({ row, rowIndex }) {
      if (row.completed === true) {
        return 'success-row'
      } else {
        return 'warning-row'
      }
    },
    validateData () {
      if (this.activity !== '' && this.date !== '') {
        return true
      } else {
        return false
      }
    },
    setMessageError () {
      if (this.activity === '' && this.date === '') {
        this.errorMessage = 'Defina Atidade && Data'
      } else {
        if (this.activity === '') {
          this.errorMessage = 'Defina uma Atividade'
        } else {
          this.errorMessage = 'Escolha uma Data'
        }
      }
    },

    getDate (item) {
      return moment(item).format('DD/MM/YYYY')
    }

  }
}
</script>

<style>
    .main {
        text-align: center;
    }

    .wrongNotification {
        margin-bottom: 0.2rem;
        width: 80%;
        margin-left: 10%;
        text-align: center
    }

    div.cell {
        text-align: center;
    }

    .counterSection {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
