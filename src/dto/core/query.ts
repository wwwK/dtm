import { FilterGroupDTO } from './filter-group';
import { PageDTO } from './page';
import { SortDTO } from './sort';

/**
 * 数据接口请求实体
 */
export interface QueryDTO {
  /** 要查询的属性列表，为空时将根据当前用户活动角色ID取得其所有有查询权限的属性 */
  selections?: string[];

  /** 通用查询条件组，为空时将查询模型所有数据对象  */
  conditions?: FilterGroupDTO;

  /** 通用查询排序组，为空时将使用对象的默认排序条件   */
  sorts?: SortDTO[];

  /** 通用查询分页，为空时将返回所有满足条件的数据对象  */
  page?: PageDTO;
}
