import Api from '@/services/api'

export default {
  fetchCustomers () {
    return Api().get('/customers')
  },
  postCustomer (customer) {
    return Api().post('/customers', customer,
      { headers: {'Content-type': 'application/json'} })
  },
  Login (email) {
    return Api().post(`/customers/${email}`,
      { header: {'Content-type': 'application/json'} })
  }
}
