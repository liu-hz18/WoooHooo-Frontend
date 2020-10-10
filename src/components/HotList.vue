<template>
  <div class="hot-list">
    <el-card>
      <em class="el-icon-date"> 今日热榜</em>
      <ul>
        <li v-for="(hotnews, index) in hotList" v-bind:key="index">
          <div class="hot-item">
            <ul>
              <li>
                  <a v-bind:href="hotnews.link" target="_blank" v-line-clamp:100="1">
                      {{ hotnews.title }}
                  </a>
              </li>
              <li>
                <em class="el-icon-date"> {{ hotnews.hot }} </em>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HotList",
  components: {
  },
  props: {
    hotList: {
      type: Array,
      default: () =>
        new Array(6).fill({
          uid: 0,
          link: "https://www.baidu.com",
          title: "This is a news Title Title" + 0,
          hot: "100万",
        }),
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.hot-list {
  margin-top: 15px;
}
.hot-item {
  position: relative;
  width: 100%;
}
#left {
  position: relative;
  float: left;
  margin-bottom: 4%;
}
#right {
  position: relative;
  float: right;
  margin-bottom: 4%;
}
</style>
