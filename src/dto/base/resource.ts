import { BaseDTO } from '../base';

export interface ResourceDTO extends BaseDTO {
  /** 资源id */
  id?: string;
  /** 资源code */
  resCode?: string;
  /** 资源名 */
  resName?: string;
  /** 资源描述 */
  resDesc?: string;
  /** 父级资源id */
  resParentId?: string;
  /** 父级资源 */
  resParent?: ResourceDTO;
  /** 序号 */
  resSerial?: number;
  /** 资源类型 */
  resType?: ResourceTypeMeum;
  /** 资源地址 */
  resUiRoute?: string;
  /** 资源图标 */
  resIcon?: string;
  appId?: string;
}

export enum ResourceTypeMeum {
  /**
   * 客户端
   */
  CLIENT = 'CLIENT',
  /**
   * 菜单，客户端和菜单下使用
   */
  MENU = 'MENU',
  /**
   * 页面，客户端和菜单下使用
   */
  PAGE = 'PAGE',
  /**
   * 操作，页面和功能区下使用
   */
  ACTION = 'ACTION',
  /**
   * 链接，客户端和菜单下使用
   */
  LINK = 'LINK',
  /**
   * 文件预览页面，客户端和菜单下使用
   */
  PREVIEWE = 'PREVIEWE'
}
