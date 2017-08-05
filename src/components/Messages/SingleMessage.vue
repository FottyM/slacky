<template>
  <div class="comment comment_container">
    <a href="" class="avatar">
      <img :src="message.user.avatar" alt="user avatar">
    </a>

    <div class="content" :class="{comment__self: userMessage(message.user)}">
      <a class="author"> {{message.user.name}}</a>
      <div class="metadata">
        <span class="date comment__date"> {{message.timestamp | timeAgo}}</span>
      </div>
      <div class="text">
        {{message.content}}
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import moment from 'moment'
  export default {
    name:'single-message',
    props: ['message'],
    computed:{
      ...mapGetters(['currentUser'])
    },
    mounted() {
      console.log(this.message.user)
    },
    methods:{
      userMessage(user){
        return user.id = this.currentUser.uid
      }
    },
    filters:{
      timeAgo(date) {
        return moment(date).fromNow()
      }
    }
  }
</script>
<style scoped>
  .comment_container pre{
    font-size: 0.9em;
    background: #232323;
    box-shadow: 3px 6px 9px 0px #a2a2a2;
  }

  .comment__self{
    border-left: 1px solid orange;
    padding-left: 8px;
  }

  .comment__image{
    min-height: 100px;
    margin-top: 16px;
  }

  .comment__date{
    color: #767676;
  }

</style>
