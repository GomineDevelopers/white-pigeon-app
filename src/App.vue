<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>
<script>
export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      active: 0,
      icon: {
        active: "home"
      },
      isRouterAlive: true
    };
  },
  created() {
    let vm = this;
    // H5 plus事件处理
    function plusReady() {
      // 设置系统状态栏背景为白色
      plus.navigator.setStatusBarBackground("#FFFFFF");
      plus.navigator.setStatusBarStyle("dark");

      var clientid = plus.push.getClientInfo().clientid;
      console.log(clientid);
      if (clientid) {
        //如果获取的cid为空，说明客户端向推送服务器注册还未完成，可以使用setTimeout延时重试。
        setTimeout(() => {
          this.clientid = plus.push.getClientInfo().clientid;
        }, 4000);
      }
      //监听系统通知栏消息点击事件
      plus.push.addEventListener(
        "click",
        function(msg) {
          //处理点击消息的业务逻辑代码
          console.log(msg);
          vm.$router.push("/visitrecord");
        },
        false
      );
      //监听接收透传消息事件
      plus.push.addEventListener(
        "receive",
        function(msg) {
          //处理透传消息的业务逻辑代码
          console.log(msg);
        },
        false
      );
    }
    if (window.plus) {
      plusReady();
    } else {
      document.addEventListener("plusready", plusReady, false);
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
