<template>
  <div class="navigation-bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
    >
      <el-menu-item index="0">首页</el-menu-item>
      <el-menu-item index="1">个人中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类新闻</template>
        <el-menu-item index="2-1">热点</el-menu-item>
        <el-menu-item index="2-2">国内</el-menu-item>
        <el-menu-item index="2-3">国际</el-menu-item>
        <el-menu-item index="2-4">军事</el-menu-item>
        <el-menu-item index="2-5">财经</el-menu-item>
        <el-menu-item index="2-6">娱乐</el-menu-item>
        <el-menu-item index="2-7">体育</el-menu-item>
        <el-menu-item index="2-8">科技</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">前往新闻网站</template>
        <el-menu-item index="3-1"
          ><a
            href="https://news.qq.com/"
            rel="noopener noreferrer"
            target="_blank"
            >腾讯新闻</a
          ></el-menu-item
        >
        <el-menu-item index="3-2"
          ><a
            href="https://news.sina.com.cn/"
            rel="noopener noreferrer"
            target="_blank"
            >新浪新闻</a
          ></el-menu-item
        >
        <el-menu-item index="3-3"
          ><a
            href="http://www.people.com.cn/"
            rel="noopener noreferrer"
            target="_blank"
            >人民网</a
          ></el-menu-item
        >
      </el-submenu>
      <el-row type="flex" justify="end">
        <div class="login-bar">
          <el-button
            round
            type="success"
            slot="append"
            icon="el-icon-user-solid"
            >登录</el-button
          >
          <el-button round type="" slot="append" icon="el-icon-user"
            >注册</el-button
          >
        </div>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    activeIndex: String,
  },
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if(keyPath[0] === "2") {
        var subitem = String(keyPath[1].split('-')[1]);
        console.log(subitem);
        this.$router.push({name: 'SearchResult', query: {query: subitem, issearch: false}});
      } else if (keyPath[0] === "0") {
        this.$router.push({name: 'Home'});
      }
    },
  },
  created() {
    this.activeIndex = "0";
  },
};
</script>

<style scope>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.login-bar {
  margin-top: 8px;
  margin-right: 10px;
}
</style>
