import { SafeAny } from '@/core/types';
import { BaseDTO } from '../base';

export interface MenuDTO extends BaseDTO {
  key?: string;
  name?: string;
  icon?: SafeAny;
  /** 层级 */
  level?: number;
  url?: string;
  childs?: MenuDTO[];
}
