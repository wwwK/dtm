import { SafeAny } from '@/core/types';
import { QueryDTO } from './query';

/**
 * 数据接口请求实体
 */
export interface RequestDTO {
  /** 应用ID */
  application?: string;

  /** 当前用户活动角色ID，为空时将仅查询数据对象具有公开权限的属性 */
  roleId?: string;

  /** 模型ID（主表名称） */
  model: string;

  /** 数据操作代码，通用数据查询固定为Query，其他操作如定制查询、创建、修改等需自定义 */
  action: string;

  /** 当前用户使用的语言，为空时将使用当前应用的默认语言。当有错误信息时，根据语言返回提示信息 */
  language?: string;

  /**
   * 请求体内容
   * --
   * Query：通用查询请求数据结构
   */
  data: QueryDTO | SafeAny;
}
