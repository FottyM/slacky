<template>
  <div class="messages__form">
    <div class="ui inverted form">
      <div class="two fields">

        <div class="field">
          <textarea name="message" id="message" rows="1" placeholder="message..." v-model="message"></textarea>
        </div>

        <div class="field">
          <button class="ui green button" @click.prevent="sendMessage">Send</button>
          <button class="ui orange labeled icon  button"><i class="cloud upload icon"></i>Upload File</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'message-form',
    data(){
      return{
        message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dicta enim eveniet magni non possimus quas, quibusdam quos reprehenderit. Amet consequatur debitis deserunt eos magnam magni mollitia, perferendis quos ullam?'
      }
    },
    computed:{
      ...mapGetters(['currentUser', 'currentChannel']),
    }
    ,
    methods:{
      sendMessage(){
        this.$parent.messagesRef.child(this.currentChannel.id)
      }
    }
  }

</script>
<style scoped>
  /*This style needs lots of fixes*/
.messages__form{
  position: fixed;
  bottom: 0;
  background-color: antiquewhite;
  padding: 20px 10px 10px;
  height: 210px;
  left: 300px;
  right: 0;
}
  .messages__form.big{
    height: 350px;
  }
  .shortcut{
    color: whitesmoke;
  }
</style>
