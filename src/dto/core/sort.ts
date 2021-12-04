/**
 * 通用查询排序
 */
export interface SortDTO {
  /** 排序目标属性，支持级联，用“.”分隔属性，如：PropA.PropA1 */
  prop: string;
  /** 排序方向，默认Ascend（升序） */
  dir?: SortDirectionEnum;
}

/**
 * 排序方向枚举
 */
export enum SortDirectionEnum {
  Ascend = 'Ascend',
  Descend = 'Descend'
}
