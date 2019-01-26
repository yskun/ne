<template>
   <div class="screen">
     <div class="qrcode"></div>
     <div class="message">使用微信扫一扫进行登陆</div>
   </div>
</template>

<script>
    export default {
        name: "LoginWechat"
    }
</script>

<style lang="less" scoped>
.qrcode{
  width: 250px;
  height: 250px;
  border: 1px solid #b3b3b3;
  margin: 0 auto;
  background-image: url("https://qr.api.cli.im/qr?data=http%253A%252F%252Fele.me&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=4b492272cfe023801c5981996efb83bc");
  background-size: cover;
}

  .message{
    color: #b3b3b3;
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
  }
</style>
