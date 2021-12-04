import { SafeAny } from '@/core/types';
import { ResultDTO } from './result';

/**
 * 数据接口响应实体
 */
export interface ResponseDTO {
  /** 当前请求ID，可用于日志查询 */
  requestId?: string;

  /** 状态码，100000表示成功，其他值表示失败，具体错误消息见message属性 */
  code?: string;

  /**
   * 后台响应消息
   * --
   * 一般请求成功时为空，错误信息会通过此栏位返回
   */
  message?: string;

  /**
   * 后台返回的内容
   * --
   * Result：通用查询响应数据结构
   *
   * Object：后台返回的数据，任意类型，可为空，但除定制开发的Action外，一般情况下的创建需返回新对象的ID，其他如修改、删除等返回空值
   */
  data?: ResultDTO | SafeAny;
}

export enum ResponseResultMenu {
  success = '100000'
}
