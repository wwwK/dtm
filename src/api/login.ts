import axios from 'axios';
import global from '@/core/global';
import { SafeAny } from '@/core/types';

/**
 * 存放登录相关功能接口
 */
export default {
  /**
   * 登录方法
   * @param account 账户
   * @param password 密码
   * @returns
   */
  login(account: string, password: string): Promise<SafeAny> {
    return axios.post(`${global.rbacUrl}/session`, {
      account,
      password
    });
  },
  check(): void {
    axios.get(`${global.rbacUrl}/session`);
  },
  logout(): void {
    console.log('logout');
  }
};
