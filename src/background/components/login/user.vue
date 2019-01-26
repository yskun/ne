<template>
  <form class="login-form" @submit.prevent="submit">
    <div class="form-group">
      <label for="login">
        用户名
      </label>
      <input id="login" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="password">
        密码
      </label>
      <input id="password" type="password" class="form-control">
    </div>
    <div class="form-group">
      <label for="verify">
        验证码
      </label>
      <div style="display: flex">
        <input id="verify" type="text" class="form-control" style="flex: 1;">
        <div class="verify-code"></div>
      </div>
    </div>

    <button class="btn btn-primary login-btn">登陆</button>
  </form>
</template>

<script>
  export default {
    name: "LoginUser",
    methods: {
      submit() {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="less" scoped>

  label{
    font-weight: bold;
    font-size: 18px;
    color: #2b2b2b;
  }

  input{
    border: none;
    border-radius: 0;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    border-bottom: 1px solid #c7c7c7;
  }

  input:focus{
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #17a2b8;
  }
  .login-form{
    position: relative;
  }

  .btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary:not(:disabled):not(.disabled).active:focus, .show > .btn-primary.dropdown-toggle:focus{
    box-shadow: none;
    box-shadow: 3px 6px 18px rgba(0,0,0,0.38);
  }

  .btn-primary:not(:disabled):not(.disabled):active, .btn-primary:not(:disabled):not(.disabled).active, .show > .btn-primary.dropdown-toggle{
    background-color: #1f1f1f;
    border-color: #1f1f1f;
  }
  .login-btn{
    margin-top: 10px;
    width: 100%;
    background-color: #1f1f1f;
    border-color: #1f1f1f;
    border-radius: 30px;
    padding: 7px;
    font-size: 18px;
    font-weight: 600;
  }

  .login-btn:hover{
    background-color: #060606;
    border-color: #060606;
  }
  .login-btn:focus{
    box-shadow: 3px 6px 18px rgba(0,0,0,0.38);
  }

  .verify-code {
    width: 100px;
    height: 38px;
    border: 1px solid #dadada;
    display: inline-block;
    margin-left: 5px;
  }
</style>
