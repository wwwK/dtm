/**
 * 筛选条件操作符
 */
export enum ParameterOperatorEnum {
  /**
   * 等于
   */
  Equals = 'Equals',
  /**
   * 不等于
   */
  NotEquals = 'NotEquals',
  /**
   * 字符串包含
   */
  Contains = 'Contains',
  /**
   * 字符串不包含
   */
  NotContains = 'NotContains',
  /**
   * 字符串开始于
   */
  StartsWith = 'StartsWith',
  /**
   * 字符串不开始于
   */
  NotStartsWith = 'NotStartsWith',
  /**
   * 字符串结束于
   */
  EndsWith = 'EndsWith',
  /**
   * 字符串不结束于
   */
  NotEndsWith = 'NotEndsWith',
  /**
   * 自定义SQL风格Like操作
   */
  Like = 'Like',
  /**
   * 自定义SQL风格Not Like操作
   */
  NotLike = 'NotLike',
  /**
   * 为空
   */
  Null = 'Null',
  /**
   * 非空
   */
  NotNull = 'NotNull',
  /**
   * 大于
   */
  GreatThan = 'GreatThan',
  /**
   * 大于或等于
   */
  GreatThanOrEquals = 'GreatThanOrEquals',
  /**
   * 小于
   */
  LessThan = 'LessThan',
  /**
   * 小于或等于
   */
  LessThanAndEquals = 'LessThanAndEquals',
  /**
   * 包含
   */
  In = 'In',
  /**
   * 不包含
   */
  NotIn = 'NotIn'
}
