<template>
  <el-dialog
        style="text-align: center"
        title="重设密码"
        :visible="dialogVisible"
        :show-close=false
        width="40%">
    <el-form label-width="80px">
        <el-form-item label="旧密码">
            <el-input v-model="oldpass" type="password"></el-input>
        </el-form-item>
        
        <el-form-item label="新密码">
            <el-input v-model="newpass" type="password"></el-input>            
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
                <el-button @click="canclebtn">取 消</el-button>
                <el-button @click="yesbtn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "RstPassDialog",
  props: {
      dialogVisible: Boolean,
  },
  // 请在下方设计自己的数据结构以及事件函数
  data(){
    return {
    
	oldpass:"",
	newpass:"",
	
    }
  },
  methods: {
	canclebtn(){
        console.log("点击取消放弃修改")
        this.$emit("canclebtn")
    },
    yesbtn(){
        console.log("点击确认修改密码")
        this.$emit("canclebtn")
    },
  },
  
  
}
</script>