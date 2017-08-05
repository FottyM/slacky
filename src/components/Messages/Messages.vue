<template>
  <div class="message__container">
    <div class="message__content">
      <h2 class="ui orange center aligned header"> # {{ channelName }}</h2>
      <div class="ui segment">
        <div class="ui comments">
          <!--message component-->
          <transition-group tag="div" name="list">
          <single-message :key="message.id" :message="message" v-for="message in messages"></single-message>
          </transition-group>
        </div>
      </div>
    </div>
    <!--send message input-->
      <message-from></message-from>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import MessageFrom from './MessageForm.vue'
  import SingleMessage from  './SingleMessage.vue'

  export default {
    name: 'messages',
    components: { MessageFrom, SingleMessage },
    computed: {
      ...mapGetters(['currentChannel', 'currentUser']),
      channelName() {
        if (this.currentChannel !== null) {
          return this.channelName = this.currentChannel.name
        }
      }
    },
    data() {
      return {
        messagesRef: firebase.database().ref('messages'),
        messages: [],
        channel: null,
      }
    },
    watch: {
      currentChannel() {
        this.messages = []
        this.detachListeners()
        this.addListeners()
        this.channel = this.currentChannel

      }
    },
    methods: {
      addListeners() {

        this.messagesRef.child(this.currentChannel.id).on('child_added', (snap) => {
          let message = snap.val()
          message['id'] = snap.key
          this.messages.push(message)
        })
      },
      detachListeners() {
        if (this.channel !== null) {
          this.messagesRef.child(this.channel.id).off('child_added')
        }
      }
    },
    beforeDestroy() {
      this.detachListeners()
    }
  }
</script>
<style scoped>
  .message__container {
    position: relative;
    background-color: rgba(255, 96, 24, 0.17);
    padding: 10px 30px 100% 30px; /*padding botton is messing up don't do this at home*/
    margin-left: 300px;
    min-height: 100%;
  }

  .message__container .comments {
    font-size: 1.2em;
  }
  .list-enter-active{
    transition: all 0.3s;
  }

  .list-enter, list-leave-to{
    opacity: 0;
    transform: translateX(-30px);
  }

</style>
