<template>
  <div>
    <AppHeader></AppHeader>
    <AppContainer></AppContainer>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppContainer from "./components/AppContainer";

export default {
  name: 'app',
  components: {AppContainer, AppHeader},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
