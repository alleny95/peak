<template>
  <el-form :model="form" label-width="80px" :rules="rules" ref="ruleForm" required>
    <el-form-item label="模板名称" prop="name">
      <el-input v-model="form.name" class="simple-input"></el-input>
    </el-form-item>
    <el-form-item label="模板类型" prop="category" required>
      <el-select v-model="form.category" placeholder="选择模板类型" clearable class="simple-input">
        <template v-for="item in MODULE_TYPE_LIST">
          <el-option :key="item.value" :label="item.label" :value="item.value"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="图片上传">
      <input type="file" id="photoFileUpload" @change="uploadFile" class="file-btn"/>
      <el-button type="primary" @click="handleUploadFile">上传</el-button>
      <a :href=form.imgUrl>{{form.imgUrl}}</a>
    </el-form-item>
    <el-form-item label="模板描述" prop="desc" required>
      <el-input v-model="form.desc" class="simple-input"></el-input>
    </el-form-item>
    <el-form-item label="组件代码" prop="code" required>
      <!-- <el-input type="textarea" class="code" v-model="form.code" :rows="20"></el-input> -->
      <editor v-model="form.code" @init="editorInit" theme="monokai" lang="html" width="100%" height="400"></editor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading='isCreating'>立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { createModule } from '@/api/api'
import { MODULE_TYPE_LIST } from '@/common/js/config'

var AV = require('leancloud-storage')
var APP_ID = 'a5zjlnxgv6vhjnstba351wh97s3tc40hsot0no9j2b9wa153'
var APP_KEY = 'qhod8u5iijtvgm16g07gw1dm8f4mgmtqnthsloc7rqkyoxgb'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})
export default {
  components: {
    editor: require('vue2-ace-editor')
  },
  data () {
    return {
      MODULE_TYPE_LIST: MODULE_TYPE_LIST,
      form: {
        name: '',
        category: '',
        imgUrl: '',
        desc: '',
        code: ''
      },
      rules: {
        name: [
          { required: true, message: '模版名称不能为空', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '模版类型不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '模版描述不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '组件代码不能为空', trigger: 'blur' }]
      },
      isCreating: false
    }
  },
  methods: {
    editorInit: function (editor) {
      editor.getSession().setMode('ace/mode/html')
      editor.setTheme('ace/theme/monokai')
      editor.setOptions({
        fontSize: '16px',
        tabSize: 2
      })
    },
    onSubmit () {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          let params = this.form
          this.isCreating = true
          createModule(params).then(res => {
            if (res.data.code === 200) {
              this.$message({ message: '保存模板成功', type: 'success' })
              this.$router.push({ path: '/' })
            } else {
              this.$message({ message: '保存模板失败', type: 'error' })
            }
            this.isCreating = false
          })
        } else {
          return false
        }
      })
    },
    handleUploadFile () {
      document.getElementById('photoFileUpload').click()
    },
    uploadFile (e) {
      var _this = this
      var localFile = e.target.files[0]
      var name = e.target.files[0].name
      if (!/\.(gif|jpg|jpeg|png|webp|svg)$/i.test(name)) {
        this.$message({
          message: '图片类型必须是.gif,jpeg,jpg,png中的一种',
          type: 'warning'
        })
        return
      }
      var file = new AV.File(name, localFile)
      file.save().then(
        function (file) {
          // 文件保存成功
          // console.log(file.url())
          _this.form.imgUrl = file.url()
        },
        function (error) {
          // 异常处理
          console.error(error)
        }
      )
    }
  }
}
</script>
<style scoped lang="scss">
.file-btn {
  display: none;
}
</style>


