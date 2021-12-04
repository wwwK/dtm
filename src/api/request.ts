import axios from 'axios';
import global from '@/core/global';
import { SafeAny } from '@/core/types';
import Common from '@/utils/common';
import { RequestDTO } from '@/dto/core/request';
import { ResponseDTO } from '@/dto/core/response';
import { QueryDTO } from '@/dto/core/query';

export default {
  /**
   * 调用接口的通用方法
   * --
   * 系统中所有请求都通过这个方法走
   * @param requestData 请求参数，请根据请求标准：RequestDTO传入
   * @returns
   */
  request(requestData: RequestDTO): Promise<ResponseDTO> {
    if (requestData == null) {
      new Error('requestData不能为空');
    }
    if (Common.isBlank(requestData.application)) {
      // 设置app信息
      // requestData.application = ;
    }
    if (Common.isBlank(requestData.roleId)) {
      // 设置角色id
      // requestData.roleId = ;
    }
    if (Common.isBlank(requestData.language)) {
      // 设置默认语言
      // requestData.language = ;
    }
    return axios.post(global.url, requestData);
  },

  /**
   * 通用查询方法
   * @param modelCode 要操作的模型code
   * @param data 通用查询实体类信息
   * @returns
   */
  query(modelCode: string, data?: QueryDTO | null): Promise<ResponseDTO> {
    if (Common.isBlank(modelCode)) {
      new Error('modelCode不能为空');
    }
    return this.request({
      model: modelCode,
      action: 'Query',
      data: data
    });
  },

  /**
   * 模块通用新增方法
   * @param modelCode 要操作的模型code
   * @param data
   * @returns
   */
  addMethod(modelCode: string, data: SafeAny): Promise<ResponseDTO> {
    if (Common.isBlank(modelCode)) {
      new Error('modelCode不能为空');
    }
    return this.request({
      model: modelCode,
      action: 'Add',
      data
    });
  },

  /**
   * 模块通用修改方法
   * @param modelCode 要操作的模型code
   * @param data
   * @returns
   */
  editMethod(modelCode: string, data: SafeAny): Promise<ResponseDTO> {
    if (Common.isBlank(modelCode)) {
      new Error('modelCode不能为空');
    }
    return this.request({
      model: modelCode,
      action: 'Edit',
      data
    });
  },

  /**
   * 模块通用删除方法
   * @param modelCode 要操作的模型code
   * @param data
   * @returns
   */
  deleteMethod(modelCode: string, data: SafeAny): Promise<ResponseDTO> {
    if (Common.isBlank(modelCode)) {
      new Error('modelCode不能为空');
    }
    return this.request({
      model: modelCode,
      action: 'Delete',
      data
    });
  },

  /**
   * 模块通用上移方法
   * @param modelCode 要操作的模型code
   * @param data
   * @returns
   */
  upMethod(modelCode: string, data: SafeAny): Promise<ResponseDTO> {
    if (Common.isBlank(modelCode)) {
      new Error('modelCode不能为空');
    }
    return this.request({
      model: modelCode,
      action: 'MoveUp',
      data
    });
  },

  /**
   * 模块通用下移方法
   * @param modelCode 要操作的模型code
   * @param data
   * @returns
   */
  downMethod(modelCode: string, data: SafeAny): Promise<ResponseDTO> {
    if (Common.isBlank(modelCode)) {
      new Error('modelCode不能为空');
    }
    return this.request({
      model: modelCode,
      action: 'MoveDown',
      data
    });
  }
};

/**
 * 存放所有模型code
 */
export enum RequestModelCodeMenu {
  /** 资源（菜单管理） */
  Resource = 'Resource',
  /** 字典 */
  Dict = 'Dict'
}
