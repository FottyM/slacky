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
        message: '',
        errors: []
      }
    },
    computed:{
      ...mapGetters(['currentUser', 'currentChannel']),
    }
    ,
    methods:{
      newMessage(){
        return {
          content: this.message,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          user:{
            name: this.currentUser.displayName,
            avatar: this.currentUser.photoURL,
            id: this.currentUser.uid
          }
        }
      },
      sendMessage(){
        let newMessage = this.newMessage();

        console.log(!this.isEmpty(newMessage.content));
        //TODO: disable the button instead of this
        if(!this.isEmpty(newMessage.content) && this.currentChannel !== null ){

          this.$parent.messagesRef.child(this.currentChannel.id)
            .push()
            .set(newMessage)
            .then( () =>{

            })
            .catch((error) =>{
              alert(error.message);
              this.errors.push(error.message);
            })
        }else{
          this.errors.push('trying to send and empty message?')
        }

        this.message = ''
      },
      isEmpty(message){
        return message.length <= 0;
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
