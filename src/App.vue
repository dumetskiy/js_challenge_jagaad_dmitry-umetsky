<template>
  <div>
    <app-header />
    <app-container />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
import AppContainer from "./components/AppContainer";

export default {
  name: 'App',
  components: {
    'app-container': AppContainer,
    'app-header': AppHeader,
  }
}
</script>
