<template>
  <div>
    <aside>

    </aside>
    <article>

    </article>

    <button @click="logout"> Logout </button>
  </div>
</template>
<script>

  export default {
    name:'tchat',
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
            alert('Logged out');
            this.$router.push('/login')
          },
          (error) =>{
            console.error(error);
            alert("Can't log out");
          })
      }

    }

  }

</script>
