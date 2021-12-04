import { FilterDTO } from './filter';

/**
 * 通用查询筛选条件组
 * --
 * 注意：filters和groups嵌套的filters集合中至少需要存在一条有效的单属性查询条件
 */
export interface FilterGroupDTO {
  /** 组条件操作符，默认 And */
  operate?: FilterGroupOperatorEnum;

  /** 单查询条件组 */
  filters?: FilterDTO[];

  /** 查询条件组集合 */
  groups?: FilterGroupDTO[];
}

/**
 * 筛选条件组操作符
 */
export enum FilterGroupOperatorEnum {
  And = 'And',
  Or = 'Or'
}
