<template>
  <div id="app">
    <Header />
    <div class="main" id="main">
      <router-view />
    </div>
    <Footer />
    <Loader :show="showLoader" />
    <Alert :show="alert.show" :type="alert.type" :message="alert.message" />
  </div>
</template>

<script lang="js" src="./App.js"></script>
<style src="./App.scss" lang="scss"></style>
