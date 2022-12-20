<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <span>Login</span>
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="rules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-s-custom"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import http from "../api/request";
export default {
  name: "Login",
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      //这是表单的验证规则对象
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //点击重置按钮，重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //点登录按钮
    login() {
      // 对整个表单进行校验
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        //发起请求
        const { data } = await http.post("login", this.loginForm);
        console.log(data);
        if (data.meta.status !== 200) {
          return this.$message.error("用户不存在！");
        }
        this.$message({
          message: "登录成功！",
          type: "success",
        });

        // 1.将登录成功的 token 保存到客户端的 sessionStorage 中。
        // 1.1 项目中除了登录之外的其他 api 接口，必须在登录之后才能访问。
        // 1.2 token 只应在当前网站打开期间生效，所以将 token 保存在sessionStorage 中。
        sessionStorage.setItem("token", data.data.token);
        // 2.通过编程式导航跳转到后台主页，路由地址是 /home。
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background: linear-gradient(to bottom right, blue, pink);
  position: relative;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      text-align: center;
      margin-top: 20px;
      span {
        font-size: 23px;
        color: antiquewhite;
      }
    }
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>