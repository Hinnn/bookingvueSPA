<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label class="form-label">Input customerID</label>
      <input class="form__input" type="number" v-model.trim="customerID"/>
      <div class="error" v-if="!$v.customerID.required">customerID is Required</div>
    </div>
    <div class="form-group">
      <label class="form-label">Input name</label>
      <input class="form__input" type="name" v-model.trim="name"/>
      <div class="error" v-if="!$v.name.required">Name is Required</div>
    </div>
    <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
      <label class="form-label" name="email">Email</label>
      <input class="form__input" type="email" placeholder="Enter Email" v-model.trim="email"/>
    </div>
    <div class="error" v-if="!$v.email.required">Email is Required</div>
    <div class="error" v-if="!$v.email.email">Email format is wrong</div>
    <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
      <label class="form-label" name="password">Password (Minimum Password length is 6)</label>
      <input class="form__input" type="password" placeholder="Enter Password" v-model.trim="password"/>
      <div class="error" v-if="!$v.password.required">Password is Required</div>
    </div>
    <div class="error" v-if="!$v.password.minLength">Minimum Password length is 6</div>
    <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">{{ customerBtnTitle }}</button>
    </p>
    <p>
      <a href="#/customers" class="btn btn-primary btn1" role="button">Manage Customers</a>
    </p>
    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your Booking!</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">booking...</p>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)

export default {
  name: 'FormData',
  props: ['customerBtnTitle', 'customer'],
  data () {
    return {
      messagetitle: 'SignUp',
      customerID: this.customer.customerID,
      name: this.customer.name,
      email: this.customer.email,
      password: this.customer.password,
      submitStatus: null
    }
  },
  validations: {
    customerID: {
      required
    },
    name: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var customer = {
            customerID: this.customerID,
            name: this.name,
            email: this.email,
            password: this.password
          }
          this.customer = customer
          console.log('Submitting in CustomerForm : ' +
              JSON.stringify(this.customer, null, 5))
          this.$emit('customer-is-created-updated', this.customer)
        }, 500)
      }
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .book-form .form-control-label.text-left{
    text-align: left;
  }

  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }

  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }

  .dirty {
    border-color: #5A5;
    background: #EFE;
  }

  .dirty:focus {
    outline-color: #8E8;
  }

  .error {
    border-color: red;
    background: #157ffb;
    color: whitesmoke;
  }

  .error:focus {
    outline-color: #ffa519;
  }
</style>
