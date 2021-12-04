/**
 * 页面查询范围
 */
export interface PageDTO {
  /** 跳过行数 */
  skip?: number;
  /** 获取行数 */
  take: number;
}
