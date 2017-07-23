<template>
  <div class="sidebar">
    <h1 class="ui inverted center aligned header"> #Slacky#</h1>
    <connected-user></connected-user>
  </div>
</template>
<script>
  import ConnectedUser from './ConnectedUser.vue';
  export default {
    name: 'sidebar',
    components:{ ConnectedUser }
  }
</script>

<style scoped>
  .sidebar{
    position: fixed;
    display: flex;
    flex-flow: column nowrap;
    width: 300px;
    padding: 10px;
    top: 0;
    left: 0;
    bottom: 0;
    padding-top: 110px;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#bf6e4e+0,752201+21,752201+100 */
    background: rgb(191,110,78); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(191,110,78,1) 0%, rgba(117,34,1,1) 21%, rgba(117,34,1,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(191,110,78,1) 0%,rgba(117,34,1,1) 21%,rgba(117,34,1,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(191,110,78,1) 0%,rgba(117,34,1,1) 21%,rgba(117,34,1,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bf6e4e', endColorstr='#752201',GradientType=0 ); /* IE6-9 */
  }
</style>
