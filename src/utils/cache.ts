import Common from './common';

const cookieCache = {
  /**
   * 设置Cookie
   * @param key
   * @param value
   * @param expires
   * --
   *                过期时间，值类型可以为 空 | number | string
   *                类型为空时：    不设置过期时间，cookie 在浏览器关闭时被删除
   *                类型为number时：单位默认为‘天’
   *                类型为string时：支持单位 D（天） | H（时） | M（分） | S（秒），例子：2T、15T、1.55T、24H、60M、60S
   * @returns
   */
  set(key: string, value: string, expires?: number | string): void {
    if (Common.isNotBlank(key) && value != null) {
      // 最终用来计算过期时间的毫秒数
      let expiresTime = 0;
      if (expires) {
        // 1秒的毫秒数
        const secondTime = 1000;
        // 1分钟的毫秒数
        const minuteTime = 60 * secondTime;
        // 1小时的毫秒数
        const hourTime = 60 * minuteTime;
        // 1天的毫秒数
        const dayTime = 24 * hourTime;
        if (typeof expires === 'number') {
          if (expires < 0) {
            throw new Error('过期时间不能为负数');
          } else if (expires > 0) {
            expiresTime = expires * dayTime;
          }
        } else {
          try {
            const number = Number.parseFloat(
              expires.substr(0, expires.length - 1)
            );
            if (expires.endsWith('D')) {
              expiresTime = number * dayTime;
            } else if (expires.endsWith('H')) {
              expiresTime = number * hourTime;
            } else if (expires.endsWith('M')) {
              expiresTime = number * minuteTime;
            } else if (expires.endsWith('S')) {
              expiresTime = number * secondTime;
            }
          } catch (error) {
            throw new Error('传入了非法的失效时间');
          }
        }
      }
      if (expiresTime > 0) {
        expiresTime = new Date().getTime() + expiresTime;
      }
      document.cookie =
        `${key}=${value}` +
        (expiresTime ? `;expires=${new Date(expiresTime).toUTCString()}` : '');
    }
  },
  /**
   * 获取Cookie
   * @param key
   * @returns
   */
  get(key: string): string | null {
    if (Common.isBlank(key)) {
      return null;
    }
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      for (const c of cookies) {
        const value = c.trim().split('=');
        if (value[0] == key.trim()) {
          return value[1];
        }
      }
    }
    return null;
  },
  /**
   * 获取所有cookie信息
   * @returns 
   */
  getCookies(): string {
    return document.cookie;
  },
  /**
   * 移除Cookie
   * @param key
   */
  remove(key: string): void {
    if (Common.isNotBlank(key)) {
      document.cookie = `${key}= ;expires=${new Date(
        new Date().getTime() - 1
      ).toUTCString()}`;
      sessionStorage.removeItem(key);
    }
  }
};

const sessionCache = {
  /**
   * 设置sessionStorage
   * @param key
   * @param value
   * @returns
   */
  set(key: string, value: string): void {
    if (!sessionStorage) {
      return;
    }
    if (key != null && value != null) {
      sessionStorage.setItem(key, value);
    }
  },
  /**
   * 获取sessionStorage
   * @param key
   * @returns
   */
  get(key: string): string | null {
    if (!sessionStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return sessionStorage.getItem(key);
  },
  /**
   * 移除sessionStorage
   * @param key
   */
  remove(key: string): void {
    sessionStorage.removeItem(key);
  }
};

const localCache = {
  /**
   * 设置localStorage
   * @param key
   * @param value
   * @returns
   */
  set(key: string, value: string): void {
    if (!localStorage) {
      return;
    }
    if (key != null && value != null) {
      localStorage.setItem(key, value);
    }
  },
  /**
   * 获取localStorage
   * @param key
   * @returns
   */
  get(key: string): string | null {
    if (!localStorage) {
      return null;
    }
    if (key == null) {
      return null;
    }
    return localStorage.getItem(key);
  },
  /**
   * 移除localStorage
   * @param key
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }
};

export const cache = {
  /**
   * cookie缓存
   */
  cookie: cookieCache,
  /**
   * 会话级缓存
   */
  session: sessionCache,
  /**
   * 本地缓存
   */
  local: localCache
};
