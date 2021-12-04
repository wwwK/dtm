import { SafeAny } from '@/core/types';

/**
 * 数据接口请求实体
 */
export interface ResultDTO {
  /** 查询结果属性表，根据用户权限和查询请求中的查询属性表综合判断而来，即用户权限于查询请求中的查询属性表的差集 */
  selections?: string[];

  /** 满足查询条件的总结果数量  */
  total?: number;

  /**
   * 查询结果主对象唯一标志集合
   * --
   * 唯一标志格式：ApplicationCode:ModelCode:ObjectId
   *
   * 例如：DTM:Dict:xxxxxx1
   */
  objectKeys?: string[];

  /**
   * 查询结果对象数据
   * --
   * 第一层Key是上述对象唯一标志，第一层Value是对象属性键值对Map
   *
   * 第二层Key是对象属性名，第二层Value是对象属性值
   */
  objects?: { [objId: string]: { [propName: string]: SafeAny } };
}
