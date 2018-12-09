<template>
  <div class="hero">
    <h3 class="vue-title"><i class="fa fa-list" style="padding: 3px"></i>{{messagetitle}}</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="customers" :options="options">
        <a slot="edit" slot-scope="props" class="fa fa-edit fa-2x" @click="editCustomer(props.row.customerID)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import CustomerService from '@/services/CustomerService'
import Vue from 'vue'
import VueTables from 'vue-tables-2'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Customers',
  data () {
    return {
      messagetitle: ' Customer Information ',
      customers: [],
      props: ['customer'],
      errors: [],
      columns: ['customerID', 'name', 'email', 'password', 'edit'],
      // columns: ['customerID', 'paymenttype', 'date', 'amount', 'roomNum', 'edit', 'remove'],
      options: {
        perPage: 10,
        // filterable: ['customerID', 'date'],
        headings: {
          customerID: 'customerID',
          name: 'name',
          email: 'email',
          password: 'password'
        }
      }
    }
  },
  // Fetches Bookings when the component is created.
  created () {
    this.loadCustomers()
  },
  methods: {
    loadCustomers: function () {
      CustomerService.fetchCustomers()
        .then(response => {
          // JSON responses are automatically parsed.
          this.customers = response.data
          console.log(this.customers)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // Fetches Bookings when the component is created
    editBooking: function (customerID) {
      this.$router.params = customerID
      this.$router.push('edit')
    }

  }
}
</script>

<style scoped>
  #app1 {
    width: 80%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
</style>
