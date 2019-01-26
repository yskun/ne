<template>
  <div class="view">
    <div class="bg"></div>
    <a-card class="login-container">
      <div id="qrcode-wechat">
        <img class="img">
      </div>
    </a-card>
  </div>
</template>

<script>


export default {
  name: 'Login',
  data() {
    return {
      loginType: 'User',
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.view {
  // background: linear-gradient(to right, #ead503, #df518d);
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-color: #fff;
  filter: blur(50px);
  transform: scale(1.1);
  background-attachment: fixed;
  background-position: center;
}

.login-container {
  width: 380px;
  height: 540px;
  box-shadow: #999 0 2px 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .help {
    text-align: center;
    font-size: 20px;
    color: #353535;
  }
}

.logo {
  position: fixed;
  left: 60px;
  top: 60px;
}

.img {
  display: block;
  width: 270px;
  height: 270px;
  margin: 42px auto 12px;
}
</style>
