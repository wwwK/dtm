import { computed, ref } from 'vue';
import DtmRequest, { RequestModelCodeMenu } from '@/api/request';
import { ResourceDTO, ResourceTypeMeum } from '@/dto/base/resource';
import { ResponseResultMenu } from '@/dto/core/response';
import { Notification } from '@/plugins/modal';

/**
 * 资源类型实体
 */
export interface ResourceTypeDTO {
  /** 下拉选项名称 */
  label: string;
  /** 下拉选项值 */
  value: string;
  /** 控制下拉选项显示的条件，根据配置的值匹配是否在对应值的时候显示 */
  visible: (undefined | ResourceTypeMeum)[];
}

export default function ResourceForm(resources) {
  /** 控制弹框是否显示 */
  let visible = ref(false);
  /** 是否编辑 */
  let editing = ref(false);
  /** 保存中 */
  let saving = ref(false);
  /** 表单引用 */
  const formRef = ref();
  let formState = ref<ResourceDTO>({});
  const rules = {
    resType: [
      {
        required: true,
        message: '请选择资源类型',
        trigger: ['change', 'blur']
      }
    ],
    resCode: [
      {
        required: true,
        message: '请输入代码',
        trigger: ['change', 'blur']
      }
    ],
    resName: [
      {
        required: true,
        message: '请输入名称（中文）',
        trigger: ['change', 'blur']
      }
    ],
    resUiRoute: [
      {
        required: true,
        message: '请输入资源地址',
        trigger: ['change', 'blur']
      }
    ]
  };
  const resourceTypes: ResourceTypeDTO[] = [
    {
      label: '客户端',
      value: ResourceTypeMeum.CLIENT,
      visible: [undefined]
    },
    {
      label: '菜单',
      value: ResourceTypeMeum.MENU,
      visible: [undefined, ResourceTypeMeum.CLIENT, ResourceTypeMeum.MENU]
    },
    {
      label: '页面',
      value: ResourceTypeMeum.PAGE,
      visible: [undefined, ResourceTypeMeum.CLIENT, ResourceTypeMeum.MENU]
    },
    {
      label: '文件预览页',
      value: ResourceTypeMeum.PREVIEWE,
      visible: [undefined, ResourceTypeMeum.CLIENT, ResourceTypeMeum.MENU]
    },
    {
      label: '链接',
      value: ResourceTypeMeum.LINK,
      visible: [undefined, ResourceTypeMeum.CLIENT, ResourceTypeMeum.MENU]
    },
    {
      label: '操作',
      value: ResourceTypeMeum.ACTION,
      visible: [ResourceTypeMeum.PAGE]
    }
  ];
  const searchData = () => {
    DtmRequest.query(RequestModelCodeMenu.Resource).then(res => {
      console.log(res.data);
      resources.value = res.data;
    });
  };
  return {
    visible,
    editing,
    saving,
    formRef,
    formState,
    rules,
    resourceTypes,
    getResourceTypes: computed(() => {
      // 根据父级资源类型过滤能显示哪些资源类型
      return resourceTypes.filter(r =>
        r.visible.includes(formState.value.resParent?.resType)
      );
    }),
    searchData,
    // 保存
    save: () => {
      formRef.value
        .validate()
        .then(() => {
          saving.value = true;
          let call;
          let msg: string;
          if (editing.value) {
            call = DtmRequest.editMethod(
              RequestModelCodeMenu.Resource,
              formState.value
            );
            msg = '保存';
          } else {
            call = DtmRequest.addMethod(
              RequestModelCodeMenu.Resource,
              formState.value
            );
            msg = '创建';
          }
          call
            .then(res => {
              console.log(res);
              saving.value = false;
              if (res.code === ResponseResultMenu.success) {
                visible.value = false;
                searchData();
                Notification.success({
                  message: '成功',
                  description: msg + '成功'
                });
              } else {
                Notification.error({
                  message: '失败',
                  description: res.message || msg + '失败'
                });
              }
            })
            .finally(() => {
              saving.value = false;
            });
        })
        .catch((error: Error) => {
          console.log('error', error);
        });
    },
    // 关闭弹框
    closeModal: () => {
      // 重置校验信息
      formRef.value.resetFields();
    }
  };
}
