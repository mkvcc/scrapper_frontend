<template>
    <div class="page">
    <v-card 
         style="margin-top: 30px ; margin-bottom: 30px; padding: 30px"
    class="mx-auto"
    max-width="344"
    outlined
     @keydown.enter="submit">
      <h2 class="card-title mb-10">ورود</h2>
      <v-text-field
        class="card-field"
        v-model="email"
        label="ایمیل"
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="رمز ورود"
      ></v-text-field>

    <p style="text-align: center; margin-bottom: 0">
        <v-btn
          color="primary"
          @click="submit()"
        >
            ورود
        </v-btn>
      </p>
    </v-card>
  </div>
</template>

<script>
    
import loginService from '../service/login' ;
    
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  } ,
  methods: {
    async submit() {
        let response = await loginService.login({
            email: this.email ,
            password: this.password
        }) ;
        console.log(response.data.access_token) ;
        
        localStorage.setItem("token" , JSON.stringify(response.data.access_token))
         this.$router.push({name:'home'}); 
    }  
  }
}
</script>