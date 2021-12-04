import { SafeAny } from '../core/types';

export default {
  /**
   * 判空方法
   * @param value
   * @returns
   */
  isBlank(value: string | SafeAny[] | SafeAny): boolean {
    if (value == null) {
      return true;
    }
    if (typeof value === 'string') {
      return value.trim().length === 0;
    } else if (Array.isArray(value)) {
      return value.length === 0;
    }
    return false;
  },
  /**
   * 判断非空方法
   * @param value
   * @returns
   */
  isNotBlank(value: string | SafeAny[] | SafeAny): boolean {
    return !this.isBlank(value);
  }
};
