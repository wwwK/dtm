<template>
  <div class="login">
    <div>
      <img alt="数字孪生管理系统" src="@/assets/images/logo.png" />
      <div>
        <div>数字孪生管理系统</div>
        <div>Digital Twin Management</div>
      </div>
    </div>
    <div class="box">
      <a-form
        layout="inline"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <div class="login-text">登录</div>
        <a-form-item class="username">
          <a-input v-model:value="formState.account" placeholder="请输入用户名">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item class="password">
          <a-input
            v-model:value="formState.password"
            type="password"
            placeholder="请输入密码"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <div class="remember-me">
            <a-checkbox v-model:checked="formState.checked">记住我</a-checkbox>
            <span>忘记密码</span>
          </div>
        </a-form-item>
        <a-form-item class="login-btn">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div>
      <div>北京中航路通科技有限公司</div>
      <a href="https://www.zhlttech.com/" target="_blank">www.zhlttech.com</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef } from 'vue';
import { useRouter } from 'vue-router';
import type { FormProps } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import Login from '@/api/login';
import { cache } from '@/utils/cache';
import { Notification } from '@/plugins/modal';

interface FormState {
  account?: string;
  password?: string;
  checked?: boolean;
}

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    // 1.检查是否已登录
    // Login.check();
    // 2.获取session中的账号信息
    const formState: UnwrapRef<FormState> = reactive({
      account: cache.cookie.get('account') || undefined,
      password: cache.cookie.get('password') || undefined,
      checked: false
    });
    const router = useRouter();
    const handleFinish: FormProps['onFinish'] = values => {
      if (!formState.account || !formState.password) {
        Notification.error({
          message: '错误',
          description: '请填写账户密码'
        });
        return;
      }
      Notification.success({
        message: '成功',
        description: '登录成功'
      });
      router.push({ path: '/' });
      // Login.login(
      //   formState.account as string,
      //   formState.password as string
      // ).then(res => {
      //   console.log(res);
      //   if (res?.success) {
      //     if (
      //       formState.checked &&
      //       (!cache.cookie.get('account') || !cache.cookie.get('password'))
      //     ) {
      //       // 记住账号密码，保存30天
      //       cache.cookie.set('account', formState.account as string, 30);
      //       cache.cookie.set('password', formState.password as string, 30);
      //     } else if (
      //       !formState.checked &&
      //       (!!cache.cookie.get('account') || !!cache.cookie.get('password'))
      //     ) {
      //       // 不记住账号密码信息
      //       cache.cookie.remove('account');
      //       cache.cookie.remove('password');
      //     }
      //     Notification.success({
      //       message: '成功',
      //       description: '登录成功'
      //     });
      //     router.push({ path: '/' });
      //   } else {
      //     // 账户或密码错误
      //     Notification.error({
      //       message: '错误',
      //       description: '账号或密码错误'
      //     });
      //   }
      // });
    };
    const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
      console.log(errors);
    };
    return {
      formState,
      handleFinish,
      handleFinishFailed
    };
  }
});
</script>

<style lang="less" scoped>
div.login {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: center;
  background-image: url(~@/assets/images/login.png);
  background-size: cover;
  &,
  a {
    font-size: 12px;
    color: white;
  }
  > div:first-child {
    display: flex;
    text-align: left;
    margin-top: 40px;
    margin-left: 50px;
    > img {
      width: 100px;
      height: 72px;
      margin-right: 20px;
    }
    > div {
      > :first-child {
        font-size: 28px;
      }
      > :last-child {
        font-size: 14px;
      }
    }
  }
  > div.box {
    flex: 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 10%;
    > form {
      display: flex;
      flex-direction: column;
      width: 512px;
      height: 550px;
      margin-bottom: 50px;
      padding: 55px 56px;
      background-color: rgba(186, 205, 255, 0.6);
      border-radius: 30px;
      > div.ant-form-item {
        margin-right: 0px;
      }
      > div.login-text {
        color: white;
        font-size: 36px;
        margin-bottom: 55px;
      }
      > div.username {
        margin-bottom: 40px;
      }
      > div.password {
        margin-bottom: 20px;
      }
      .remember-me {
        color: white;
        margin: 0 20px;
        label {
          float: left;
          color: white;
        }
        span {
          float: right;
        }
      }
      > div.login-btn {
        margin-top: 40px;
        button {
          width: 100%;
          height: 60px;
          border-radius: 30px;
          color: white;
        }
      }
      .ant-input-affix-wrapper {
        padding: 10px 11px;
        border-radius: 30px;
        background: rgba(186, 205, 255, 0);
        border: 1px solid white;
      }
    }
  }
  > div:last-child {
    height: 60px;
  }
}
</style>

<style lang="less">
div.login {
  > div.box {
    > form {
      .placeholder-style() {
        color: #eaecf4 !important;
      }
      input::-webkit-input-placeholder {
        .placeholder-style;
      }
      /* Mozilla Firefox 19+ */
      input::-moz-placeholder {
        .placeholder-style;
      }
      /* Mozilla Firefox 4 to 18 */
      input:-moz-placeholder {
        .placeholder-style;
      }
      /* Internet Explorer 10-11 */
      input:-ms-input-placeholder {
        .placeholder-style;
      }
      > div.login-btn {
        .ant-btn-primary,
        .ant-btn-primary:hover,
        .ant-btn-primary:focus {
          background: rgba(3, 25, 68, 0.6);
          border-color: rgba(3, 25, 68, 0.6);
        }
      }
      .ant-input-affix-wrapper > input.ant-input {
        font-size: 20px;
        color: white;
        background: rgba(186, 205, 255, 0);
      }
      .ant-input-affix-wrapper .ant-input-prefix {
        font-size: 20px;
        margin-left: 20px;
        margin-right: 15px;
        > .anticon {
          color: white !important;
        }
      }
    }
  }
}
</style>
