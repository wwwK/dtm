/**
 * 聚合操作符
 */
export enum AggregateOperatorEnum {
  /**
   * 存在
   */
  Exists = 'Exists',
  /**
   * 不存在
   */
  NotExists = 'NotExists',
  /**
   * 计算数量
   */
  Count = 'Count',
  /**
   * 去重后计算数量
   */
  CountDistinct = 'CountDistinct',
  /**
   * 计算总数
   */
  Sum = 'Sum',
  /**
   * 计算平均数
   */
  Avg = 'Avg',
  /**
   * 计算最大值
   */
   Max = 'Max',
  /**
   * 计算最小值
   */
   Min = 'Min'
}
