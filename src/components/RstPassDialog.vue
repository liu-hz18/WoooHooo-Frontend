<template>
  <el-dialog
        style="text-align: center"
        title="发表"
        :visible.sync="dialogVisible"
        :show-close=false
        width="80%">
    <el-form label-width="80px">
        <el-form-item label="标题">
            <!--请修改这两行注释中间的代码来输入消息标题-->
            <el-input v-model="input_title" placeholder="title"></el-input>
            <!--请修改这两行注释中间的代码来输入消息标题-->
        </el-form-item>
        <el-form-item label="内容">
            <!--请修改这两行注释中间的代码来输入消息内容-->
            <el-input v-model="input_message" type="textarea" placeholder="message"></el-input>
            <!--请修改这两行注释中间的代码来输入消息内容-->
        </el-form-item>
        <el-form-item label="用户名">
            <!--请修改这两行注释中间的代码来输入用户名-->
            <el-input v-model="state.username"/>
            <!--请修改这两行注释中间的代码来输入用户名-->
            <span v-if="state.username_valid===false" style="color: red">请设置合法用户名!</span>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
                <el-button @click="cancelClick">取 消</el-button>
                <el-button type="primary"
                            :disabled="state.username_valid===false"
                            @click="okClick(input_title,input_message,state.username)">确 定</el-button>
                <!--请修改这两行注释中间的代码来产生相应按钮的点击事件-->
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "PostDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: () => true
    },
    state: {
      type: Object,
      default: () => {
          return {
          username: "",
          username_valid: false
        }
      }
    }
  },
  // 请在下方设计自己的数据结构以及事件函数
  data(){
    return {
	input_title:"",
	input_message:"",
	
    }
  },
  methods: {
	cancelClick() {
        this.input_title = ""
        this.input_message = ""
        this.$emit('cancelClick')
      },
	okClick(input_title,input_message,username){
    this.$emit('postmsg', input_title,input_message,username)
    this.input_title = ""
    this.input_message = ""
	}
  },
  watch: { // 用于实时检测username是否合法
    "state.username": {
      handler(newName) {
        this.state.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
      }
    }
  }
}
</script>