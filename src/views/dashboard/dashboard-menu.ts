import { ref } from 'vue';
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  BellOutlined,
  ApartmentOutlined,
  HomeOutlined,
  VerifiedOutlined
} from '@ant-design/icons-vue';

import { MenuDTO } from '@/dto/base/menu';

export default function DashboardMenu() {
  /** 是否折叠菜单 */
  let collapsed = ref(false);
  let menus = ref<MenuDTO[]>([
    {
      name: '主页',
      key: 'home',
      icon: HomeOutlined,
      url: '/'
    },
    {
      name: '系统字典',
      key: 'dict',
      icon: DesktopOutlined,
      url: '/system/dict'
    },
    {
      name: '菜单管理',
      key: 'menu',
      icon: PieChartOutlined,
      url: '/system/resource'
    },
    { name: '系统参数', key: 'systemParameter', icon: null },
    { name: '规则管理', key: 'rule', icon: null },
    { name: '仿真', key: '5', icon: MailOutlined },
    { name: '可视化', key: '6', icon: BellOutlined },
    {
      name: '组织管理',
      key: '7',
      icon: ApartmentOutlined,
      childs: [
        { name: '组织', key: '7.1' },
        { name: '用户', key: '7.2' },
        {
          name: '角色',
          key: '7.3',
          childs: [
            { name: '文档', key: '7.3.1' },
            { name: '预览', key: '7.3.2' },
            { name: '下载', key: '7.3.3' }
          ]
        }
      ]
    },
    { name: '流程管理', key: '8', icon: null },
    { name: '权限管理', key: '9', icon: VerifiedOutlined },
    { name: '系统管理', key: '10', icon: null }
  ]);
  return {
    /** 是否折叠菜单 */
    collapsed,
    menus,
    /** 折叠、参开 menu方法 */
    toggleCollapsed() {
      collapsed.value = !collapsed.value;
    }
  };
}
