<template>
  <div class="ui middle aligned center aligned grid login_container">
    <div class="column">
      <h2 class="ui orange  header">
        <div class="content">
          #Slacky::Register#
        </div>
      </h2>
      <form class="ui large form" :class="{'error': hasErrors}">
        <div class="ui stacked segment">

          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="name" placeholder="username please" v-model.trim="name" required>
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="email" placeholder="E-mail address" v-model.trim="email" required>
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model.trim="password" required>
            </div>
          </div>

          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password_confirmantion" placeholder="Password confirmation" v-model.trim="password_confirmation" required>
            </div>
          </div>


          <div class="ui fluid large orange  button" @click.prevent="register" :class="{'loading': isLoading}">Register</div>
        </div>

        <div class="ui error message" v-if="hasErrors">
          <p v-for="error in errors"> {{error}}</p>
        </div>

      </form>

      <div class="ui message">
        Already have an account? <router-link to="/login">Sign in</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from 'md5'

  export default {

    name:'register',
    data(){
      return{
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        errors: [],
        usersRef: firebase.database().ref('users'),
        isLoading: false
      }
    },
    computed:{
      hasErrors(){
        return this.errors.length > 0;
      }
    },
    methods:{

      register(){
        this.errors = [];
        if( this.isFormValid()){
          this.isLoading = true;
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
              user.updateProfile({
                displayName: this.name,
                photoURL: `http://www.gravatar.com/avatar/${md5(user.email)}?d=identicon`
              }).then(
                () => {
                  this.saveUserTOUsersRef(user).then( () =>{
                    this.$store.dispatch('setUser', user);
                    user.sendEmailVerification()
                      .then(
                        ()=>{
                          console.log('Email sent');
                        },
                        error => {
                          console.error(error);
                        });
                    this.$router.push('/');
                  })
                },
                error => {
                  console.log(error);
                  this.errors.push(error.message)
                  this.isLoading = false

                });

            })
            .catch( error => {
              console.log(error);
              this.errors.push(error.message);
              this.isLoading = false;
            });
        }
      },
      saveUserTOUsersRef(user){
        return this.usersRef.child(user.uid).set({
          name: user.displayName,
          avatar: user.photoURL
        })
      },
      isEmpty(){
        return this.name.length === 0 || this.email.length === 0 || this.password.length === 0 || this.password_confirmation.length === 0;
      },
      passwordValid(){
        if(this.password !== this.password_confirmation)
          return false;

        if(this.password.length < 6 || this.password_confirmation.length < 6)
          return false;

        return true
      },
      isFormValid(){
        if(this.isEmpty()){
          this.errors.push('one of the fields is empty');
          return false;
        }
        if(!this.passwordValid()){
          this.erros.push('Passwords mismatch or something');
          return false;
        }
        return true;
      }

    }

  }

</script>
<style scoped>
  .login_container{
    margin-top: 40px;
  }

  .column{
    max-width: 450px;
  }

</style>
