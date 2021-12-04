import { SafeAny } from '@/core/types';
import { AggregateOperatorEnum } from './aggregate-operator';
import { ParameterOperatorEnum } from './parameter-operator';

/** 通用查询筛选条件 */
export interface FilterDTO {
  /** 筛选属性:条件目标属性，支持级联，用“.”分隔属性，如：PropA.PropA1 */
  prop: string;

  /** 属性比较操作符 */
  operate: ParameterOperatorEnum;

  /** 是否是属性间比较，默认false，例如PropA>PropB此类比较条件 */
  betweenProp?: boolean;

  /** 操作属性值betweenProp为true时，传入目标属性，支持级联操作符是In、NotIn时为List，操作符是Null、NotNull时为空 */
  value?: string | SafeAny | SafeAny[];

  /**
   * 聚合操作符
   */
  aggregate?: AggregateOperatorEnum;

  /**
   * 聚合操作目标属性，支持级联
   */
  aggregateProp?: string;
}
