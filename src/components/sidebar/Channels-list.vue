<template>
  <div class="channels__container">
    <p class="ui inverted center aligned header" v-on:click="addChannelModal">
      Channels <i class="add square icon add_channel"></i>
    </p>
    <div class="ui raised padded  channels_list">
      <template v-if="!isEmpty(channels)">
        <ul>
          <li class="channels__item" v-for="channel in channels" :key="channel.id" :class="{'is_active': setActiveChannel(channel.id), 'raised':true }" @click="changeChannel(channel)"> # {{channel.name}}</li>
        </ul>
      </template>
      <template v-if="isEmpty(channels)">
        <p>Kept you waiting huh!</p>
      </template>

    </div>
    <!--Modal to add channels-->
    <div class="ui  modal" id="channelModal">
      <div class="ui icon header">
        Add Channel
      </div>
      <div class="content">
        <div class="ui inverted form" :class="{'error': hasErrors}">
          <div class="field">
            <label for="new_channel">Chanel name</label>
            <input type="text" class="" name="new_channel" v-model="new_channel" id="new_channel" placeholder="Please enter the name of the new channel">
          </div>
          <div class="ui error message" v-if="hasErrors">
            <p v-for="error in errors"> {{ error }}</p>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui red  cancel inverted button">
          <i class="remove icon"></i> Cancel
        </div>
        <div class="ui green   inverted button" v-on:click="createChannel">
          <i class="remove icon"></i> Create
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {

    name:'channels-list',
    data(){
      return{
        channels: [],
        new_channel:'',
        channelsRef: firebase.database().ref('channels'),
        errors:[],
        firstLoad: true,
      }
    },
    computed : { ...mapGetters(['currentChannel']),
      hasErrors(){
        return this.errors.length > 0
      },
    },
    mounted(){
      this.addChannelListener()
    },
    methods:{
      addChannelListener(){
        this.channelsRef.on('child_added', snap =>{
          this.channels.push(snap.val())
          if(this.firstLoad && this.channels.length > 0 ){
            this.$store.dispatch('setCurrentChannel', this.channels[0])
          }
          this.firstLoad = false
        })
      },
      addChannelModal(){
        $('#channelModal').modal('show');
      },
      createChannel: function () {
        this.errors = [];
        let key = this.channelsRef.push().key;
        let newChannel = {id: key, name: this.new_channel};
        if (this.isEmpty(this.new_channel)) {
          this.errors.push('Hmmm no channel name, what is it a Ghost Channel?');
        } else {
          this.channelsRef.child(key).update(newChannel).then(() => {
            this.new_channel = '';
            $('#channelModal').modal('hide');
            this.changeChannel(this.channels.slice(-1).pop());  //select the just created channel
          }).catch((error) => {
            this.errors.push(error.message)

          })
        }
      },
      isEmpty(element){
        return element.length <= 0
      },
      detatchChannelListener(){
        this.channelsRef.off();
      },
      changeChannel(channel){
        this.$store.dispatch('setCurrentChannel', channel)
      },
      setActiveChannel(channelId){
        return channelId === this.currentChannel.id
      }

    },
    beforeDestroy(){
      this.detatchChannelListener()
    }

  }
</script>
<style scoped>
  .channels__list {
    min-height: 100px;
    max-height: 300px!important;
    overflow-y: auto!important;
  }
  .channels__container ul{
    margin: 0;
    padding: 0;
  }
  .channels__item{
    color: whitesmoke;
    height: 30px;
    margin: 8px;
    list-style: none;
    background-color: #98350a;
    cursor: pointer;
    line-height: 30px;
    border-radius: 2px;
    padding-left: 12px;
    font-weight: bold;
    font-size: 1.1em;
  }
  .channel__count{
    float:right;
  }
  .is_active{
    background-color: #ff5a12;;
  }
  .channels__item:hover{
    background-color: #ff5000;
  }
  .add_channel{
    cursor: pointer;
    color: #8BC34A;
  }
  .add_channel:hover{
    color: #689F38;
  }

</style>
