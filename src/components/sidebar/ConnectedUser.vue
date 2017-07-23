<template>
  <div class="slacky_connected_user_container">
    <div class="ui items">
      <div class="ui item">
        <div class="ui tiny circular image avatar  ">
          <img :src="currentUser.photoURL" alt="avatar">
        </div>
        <div class="middle aligned content">
          <div class="ui container">
            <div class="ui inverted header">
              {{currentUser.displayName}}
            </div>
          </div>
        </div>
        <div class="extra">
          <button class="ui black circular right floated button"  @click="logout" data-tooltip="Logout" data-position="bottom left" data-inverted="">
            <i class="icon sign out"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name:'connected-user',
    computed:{ ...mapGetters(['currentUser'])},
    methods:{
      logout(){
        firebase.auth().signOut().then(
          () => {
            this.$store.dispatch('setUser', null)
            this.$router.push('/login')
          },
          error => {
            alert(error.message)
          })
      }
    }

  }
</script>
<style scoped>

  .slacky_connected_user_container{
    position: absolute;
    background-color: #BF6E4E;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 90px;
    padding: 8px;
    box-shadow: -4px 1px 8px 3px #360F01;
  }

  .avatar{
    box-shadow: 1px 1px 4px 3.5px #360F01;
  }


</style>
