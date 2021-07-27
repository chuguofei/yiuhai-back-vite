<template>
  <div class="login-box">
    <div class="login-body">
      <div class="container">
        <div class="left-svg fade-in"></div>
        <div class="login-form">
          <div class="text-center margin-bottom-15 font-bold font-18 enter-x">
            GF后台管理系统
          </div>
          <a-form :form="submitForm" :wrapper-col="{ span: 24 }">
            <a-form-item class="enter-x">
              <a-input
                v-model:value="submitForm.username"
                :maxLength="11"
                allowClear
              >
                <template #prefix
                  ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </a-input>
            </a-form-item>
            <a-form-item class="enter-x">
              <a-input
                v-model:value="submitForm.password"
                type="password"
                :maxLength="16"
                allowClear
              >
                <template #prefix
                  ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </a-input>
            </a-form-item>
            <a-form-item class="enter-x">
              <a-button block type="primary" @click="submitHandleMeth()">登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="domain text-center font-disabled">www.guofeian.cn</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
// struct
import { loginStateStruct } from "./struct/login";
// api
import LoginController from '/@/api/system/login.ts'
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const loginState: loginStateStruct = reactive({
      submitForm: {
        username: "",
        password: "",
      },
    });


    const submitHandleMeth = ()=>{
      LoginController.loginApi(loginState.submitForm).then((res:CallBack.Response)=>{

      })
    }

    return {
      ...toRefs(loginState),
      submitHandleMeth
    };
  },
});
</script>


<style scoped lang="scss">
$login-bg-img: url("@/assets/images/login/default-login-bg.svg");
$login-body-left-img: url("@/assets/images/login/login-body-left.svg");
.login-box {
  width: 100%;
  height: 100vh;
  background: linear-gradient(88deg, #18bbff 0, #06b5cc 50%);
  &::before {
    content: "";
    width: 96%;
    height: 96%;
    background-image: $login-bg-img;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 0;
  }
  .login-body {
    padding: 10px 30px;
    width: 600px;
    background: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    min-height: 330px;

    & .container {
      display: flex;
      flex: 1;
      > div {
        flex: 1;
      }

      & .left-svg {
        width: 50%;
        margin-left: -20px;
        height: 230px;
        background-image: $login-body-left-img;
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: contain;
        transform: translateY(25%);
      }

      & .login-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
      }
    }

    & .domain {
      user-select: none;
    }
  }
}
</style>