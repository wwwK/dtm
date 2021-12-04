import { ref } from 'vue';
import DtmRequest, { RequestModelCodeMenu } from '@/api/request';
import { ResourceTypeMeum } from '@/dto/base/resource';

export default function ResourceQuery() {
  /** 表格是否加载中 */
  let loading = ref(false);
  let resources = ref([
    {
      key: 'WEB',
      resName: '浏览器端',
      resCode: 'web',
      resType: ResourceTypeMeum.CLIENT,
      children: [
        {
          key: 'systemMAG',
          resName: '系统管理',
          resCode: 'systemMAG',
          resType: ResourceTypeMeum.MENU,
          children: [
            {
              key: 'menu',
              resName: '菜单管理',
              resCode: '代码code',
              resType: ResourceTypeMeum.PAGE,
              resUiRoute: '/menu'
            },
            {
              key: 'gg',
              resName: '孪生体管理',
              resCode: '代码code2',
              resType: ResourceTypeMeum.LINK,
              resUiRoute: '/ssx'
            },
            {
              key: 'model',
              resName: '模型管理',
              resCode: '代码code3',
              resType: ResourceTypeMeum.PREVIEWE,
              resUiRoute: '/model'
            },
            {
              key: 'property',
              resName: '属性管理',
              resCode: '代码code4',
              resType: ResourceTypeMeum.ACTION,
              resUiRoute: '/property'
            }
          ]
        }
      ]
    },
    {
      key: 'APP',
      resName: '手机端',
      resCode: 'app',
      resType: ResourceTypeMeum.CLIENT,
      children: [
        {
          key: 'role',
          resName: '规则',
          resCode: '代码code6',
          resType: ResourceTypeMeum.CLIENT,
          resUiRoute: '/role'
        },
        ...new Array(5).fill({}).map((item, index) => ({
          key: '00' + index,
          resName: '模型管理' + index,
          resCode: '代码code3' + index,
          resType: ResourceTypeMeum.CLIENT,
          resUiRoute: '/model' + index
        }))
      ]
    }
  ]);
  const searchData = () => {
    loading.value = true;
    DtmRequest.query(RequestModelCodeMenu.Resource)
      .then(res => {
        console.log(res.data);
        // TODO: 查询所有资源数据，构造资源数
        resources.value = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return {
    loading,
    resources,
    searchData
  };
}
