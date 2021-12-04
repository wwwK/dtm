import { computed, reactive, ref } from 'vue';
import { SafeAny } from '@/core/types';
import { ResponseResultMenu } from '@/dto/core/response';
import { Notification } from '@/plugins/modal';
import DtmRequest, { RequestModelCodeMenu } from '@/api/request';
import { ResourceTypeMeum } from '@/dto/base/resource';
import { ResourceTypeDTO } from './resource-form';

export default function ResourceTable(queryProps, formProps) {
  const state = reactive<SafeAny>({
    selectedRowKeys: [],
    selectedRow: null
  });
  const columns = [
    {
      title: '资源名称（中文）',
      dataIndex: 'resName'
    },
    {
      title: '资源名称（英文）',
      dataIndex: 'resNameEn'
    },
    {
      title: '资源类型',
      dataIndex: 'resType'
    },
    {
      title: '资源代码',
      dataIndex: 'resCode'
    },
    {
      title: '资源地址',
      dataIndex: 'resUiRoute'
    },
    {
      title: '排序',
      dataIndex: 'resSerial',
      align: 'center'
    },
    {
      title: '资源图标',
      dataIndex: 'resIcon',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center'
    }
  ];
  return {
    state,
    columns,
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    // 设置行属性
    customRow: (record: SafeAny) => {
      return {
        onClick: () => {
          if (state.selectedRowKeys.indexOf(record.key) === -1) {
            state.selectedRowKeys = [record.key];
            state.selectedRow = record;
          } else {
            state.selectedRowKeys = [];
            state.selectedRow = null;
          }
        }
      };
    },
    // 表格‘选择’功能配置，
    rowSelection: computed(() => {
      return {
        selectedRowKeys: state.selectedRowKeys,
        type: 'radio',
        onChange: (keys: string[], selectedRows: SafeAny[]) => {
          state.selectedRowKeys = keys;
          state.selectedRow = selectedRows[0];
        }
      };
    }),
    // 表格‘选择’功能配置，
    getResourceName: (type: ResourceTypeMeum) => {
      return formProps.resourceTypes.find(
        (r: ResourceTypeDTO) => r.value === type
      )?.label;
    },
    /** 编辑资源 */
    edit(record: SafeAny) {
      state.selectedRow = record;
      formProps.formState.value = { ...record };
      formProps.visible.value = true;
      formProps.editing.value = true;
    },
    /** 上移资源 */
    up(record: SafeAny) {
      console.log(record);
      DtmRequest.upMethod(RequestModelCodeMenu.Resource, record).then(res => {
        if (res.code === ResponseResultMenu.success) {
          queryProps.searchData();
          Notification.success({
            message: '成功',
            description: '上移成功'
          });
        } else {
          Notification.error({
            message: '失败',
            description: res.message || '上移失败'
          });
        }
      });
    },
    /** 下移资源 */
    down(record: SafeAny) {
      console.log(record);
      DtmRequest.downMethod(RequestModelCodeMenu.Resource, record).then(res => {
        if (res.code === ResponseResultMenu.success) {
          queryProps.searchData();
          Notification.success({
            message: '成功',
            description: '下移成功'
          });
        } else {
          Notification.error({
            message: '失败',
            description: res.message || '下移失败'
          });
        }
      });
    },
    /** 删除资源 */
    deleteRow(record: SafeAny) {
      console.log(record);
      DtmRequest.deleteMethod(
        RequestModelCodeMenu.Resource,
        formProps.formState
      ).then(res => {
        if (res.code === ResponseResultMenu.success) {
          queryProps.searchData();
          Notification.success({
            message: '成功',
            description: '删除成功'
          });
        } else {
          Notification.error({
            message: '失败',
            description: res.message || '删除失败'
          });
        }
      });
    },
    changeOption() {
      console.log(formProps.formState);
    }
  };
}
