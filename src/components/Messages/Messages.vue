<template>
    <div class="message__container">
      <div class="message__content">
        <h2 class="ui orange center aligned header"> # {{currentChannel.name}}</h2>
        <div class="ui segment">
          <div class="ui comments">
            <!--message component-->
          </div>
        </div>
      </div>
<!--send message input-->
      <message-from></message-from>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import MessageFrom from './MessageForm.vue'

  export default {
    name: 'messages',
    components: { MessageFrom },
    computed:{
      ...mapGetters(['currentChannel'])
    },
    data(){
      return{
        messagesRef: firebase.database().ref('messages')
      }
    }
  }
</script>
<style scoped>
  .message__container{
    position: relative;
    background-color: rgba(255, 96, 24, 0.17);
    padding: 10px 30px 100% 30px; /*padding botton is messing up don't do this at home*/
    margin-left: 300px;
    min-height: 100%;
  }

  .message__container .comments{
    font-size: 1.2em;
  }
</style>
