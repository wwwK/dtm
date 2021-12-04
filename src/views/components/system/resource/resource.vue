<template>
  <div class="resource">
    <div class="dtm-content-btns">
      <a-button type="link" @click="openModal" :disabled="loading">
        <template #icon>
          <img-icon iconName="icon-add" />
        </template>
        资源
      </a-button>
    </div>

    <a-table
      class="dtm-optional-table-row"
      :columns="columns"
      :loading="loading"
      :pagination="false"
      :data-source="resources"
      :row-selection="rowSelection"
      :custom-row="customRow"
    >
      <template #bodyCell="{ record, column }">
        <template v-if="column.dataIndex === 'resType'">
          {{ getResourceName(record.resType) }}
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <!-- 操作列 -->
          <div class="dtm-btns">
            <img-icon iconName="icon-edit" @click="edit(record)" />
            <img-icon iconName="icon-up" @click.stop="up(record)" />
            <img-icon iconName="icon-down" @click.stop="down(record)" />
            <a-popconfirm
              @click.stop
              title="确定要删除选中的数据吗"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteRow(record)"
            >
              <img-icon iconName="icon-delete-option" />
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:visible="visible"
      :centered="true"
      :title="editing ? '编辑资源' : '添加资源'"
      @ok="save"
      @cancel="closeModal"
      okText="保存"
      :confirmLoading="saving"
    >
      <a-form
        class="edit-form"
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="上级资源" name="resParentId">
          <a-input v-model:value="formState.resParentId" :disabled="true" />
        </a-form-item>
        <a-form-item label="资源类型" name="resType">
          <a-select
            :disabled="editing"
            v-model:value="formState.resType"
            :options="getResourceTypes"
            placeholder="请选择资源类型"
            allowClear
            @change="changeOption"
          ></a-select>
        </a-form-item>
        <a-form-item label="资源代码" name="resCode">
          <a-input
            v-model:value="formState.resCode"
            :disabled="editing"
            placeholder="请输入代码"
          />
        </a-form-item>
        <a-form-item label="名称（中文）" name="resName">
          <a-input
            v-model:value="formState.resName"
            placeholder="请输入名称（中文）"
          />
        </a-form-item>
        <a-form-item label="名称（英文）" name="resNameEn">
          <a-input
            v-model:value="formState.resNameEn"
            placeholder="请输入名称（英文）"
          />
        </a-form-item>
        <!-- <a-form-item label="资源地址" name="resUiRoute" required> -->
        <!-- 资源地址：资源类型为'页面'、'链接'时显示 -->
        <a-form-item
          v-if="['PAGE', 'LINK'].includes(formState.resType)"
          label="资源地址"
          name="resUiRoute"
        >
          <a-input
            v-model:value="formState.resUiRoute"
            placeholder="请输入资源地址"
          />
        </a-form-item>
        <a-form-item
          v-if="formState.resType == 'PREVIEWE'"
          label="资源文件"
          name="resUiRoute"
        >
          <a-input
            v-model:value="formState.resUiRoute"
            placeholder="请输入资源文件"
          />
        </a-form-item>
        <!-- 编辑时显示序号 -->
        <a-form-item v-if="editing" label="排序" name="resSerial">
          <a-input-number
            v-model:value="formState.resSerial"
            placeholder="请输入序号"
            :min="1"
          />
        </a-form-item>
        <a-form-item label="资源图标" name="resIcon">
          <a-input v-model:value="formState.resIcon" placeholder="请选择图标" />
        </a-form-item>
        <a-form-item label="备注" name="resDesc">
          <a-textarea
            v-model:value="formState.resDesc"
            placeholder="请输入备注信息"
            allowClear
            :maxlength="500"
            :rows="4"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ResourceQuery from './resource-query';
import ResourceForm from './resource-form';
import ResourceTable from './resource-table';

export default defineComponent({
  components: {},
  setup() {
    // 导入查询模块
    const { ...queryProps } = ResourceQuery();
    // 导入表单模块
    const { ...formProps } = ResourceForm(queryProps.resources);
    // 导入表格模块
    const { ...tableProps } = ResourceTable(queryProps, formProps);
    // 初始查询
    formProps.searchData();
    return {
      ...queryProps,
      ...formProps,
      ...tableProps,
      openModal() {
        formProps.visible.value = true;
        formProps.editing.value = false;
        formProps.formState.value = {};
        // 设置上级资源
        if (tableProps.state.selectedRow) {
          formProps.formState.value.resParent = tableProps.state.selectedRow;
          formProps.formState.value.resParentId =
            tableProps.state.selectedRow.id;
        }
      }
    };
  }
});
</script>

<style lang="less" scope>
div.resource {
  > button {
    margin: 10px 20px;
  }
}
</style>
