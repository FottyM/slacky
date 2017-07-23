<template>
  <div>
    <div class="slaky_container">
      <sidebar></sidebar>
      <messages></messages>
    </div>
  </div>
</template>
<script>
  import Sidebar from '../components/sidebar/Sidebar.vue'
  import Messages from '../components/Messages.vue'

  export default {
    name: 'tchat',
    components: {Sidebar, Messages},
    data(){
      return {

      }
    },
    computed:{

    },
    methods:{

      logout(){
        firebase.auth().signOut().then(
          () => {
            this.$router.push('/login')
            this.$store.dispatch('setUser', null)
          },
          (error) =>{
            alert(error.message);
          })
      }

    }

  }

</script>

<style scoped>
  .slaky_container{
    height:100%;

  }
</style>
