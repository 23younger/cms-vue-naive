<template>
  <n-card :bordered="false" class="proCard">
    <SearchForm :formItemList="formItemList" @search="searchFormFn" />

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
    >
      <template #tableTitle>
        <h3>这是表格</h3>
      </template>

      <template #toolbar>
        <n-space
          ><n-button type="primary" @click="reloadTable">刷新数据</n-button>
          <n-button type="primary" @click="addTable">
            <icon-carbon:add text-24 />
            新建
          </n-button>
          <n-button type="primary" @click="addTable">
            <icon-akar-icons:download text-24 />
            导出
          </n-button></n-space
        >
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form :model="formParams" :rules="rules" ref="formRef" label-placement="left" :label-width="80" class="py-4">
        <n-form-item label="名称" path="name">
          <n-input placeholder="请输入名称" v-model:value="formParams.name" />
        </n-form-item>
        <n-form-item label="地址" path="address">
          <n-input type="textarea" placeholder="请输入地址" v-model:value="formParams.address" />
        </n-form-item>
        <n-form-item label="日期" path="date">
          <n-date-picker type="datetime" placeholder="请选择日期" v-model:value="formParams.date" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from "vue";
import { useMessage } from "naive-ui";
import { BasicTable, TableAction } from "@/components/TableA";
import { fetchGoodsList } from "@/apis/mock";
import { columns } from "./columns";
import { useRouter } from "vue-router";

const rules = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入名称",
  },
  address: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入地址",
  },
  date: {
    type: "number",
    required: true,
    trigger: ["blur", "change"],
    message: "请选择日期",
  },
};

const formItemList: FormItem[] = [
  {
    key: "name",
    label: "姓名",
    type: "input",
    value: "ty",
    placeholder: "请输入姓名",
  },
  {
    key: "age",
    label: "年龄",
    type: "input",
    value: "23",
    placeholder: "请输入年龄",
  },
  {
    key: "sex",
    label: "性别",
    type: "select",
    value: 0,
    options: [
      { label: "男", value: 1 },
      { label: "女", value: 2 },
    ],
  },
  {
    key: "date",
    label: "出仓时间",
    type: "date-picker",
    value: [],
  },
];

let formData = reactive({
  // 有初始值的情况下
  name: "ty",
  age: 23,
  sex: 0,
});

const searchFormFn = (res) => {
  formData = res;
  actionRef.value.reload();
};

const router = useRouter();
const formRef: any = ref(null);
const message = useMessage();
const actionRef = ref();

const showModal = ref(false);
const formBtnLoading = ref(false);
const formParams = reactive({
  name: "",
  address: "",
  date: null,
});

const actionColumn = reactive({
  width: 220,
  title: "操作",
  key: "action",
  fixed: "right",
  render(record) {
    return h(TableAction as any, {
      style: "button",
      actions: [
        {
          label: "删除",
          // icon: "ic:outline-delete-outline",
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          // auth: ["basic_list"],
        },
        {
          label: "编辑",
          onClick: handleEdit.bind(null, record),
          ifShow: () => {
            return true;
          },
          // auth: ["basic_list"],
        },
      ],
      dropDownActions: [
        {
          label: "启用",
          key: "enabled",
          // 根据业务控制是否显示: 非enable状态的不显示启用按钮
          ifShow: () => {
            return true;
          },
        },
        {
          label: "禁用",
          key: "disabled",
          ifShow: () => {
            return true;
          },
        },
      ],
      select: (key) => {
        message.info(`您点击了，${key} 按钮`);
      },
    });
  },
});

function addTable() {
  showModal.value = true;
}

const loadDataTable = async (res) => {
  return await fetchGoodsList({ ...formData, ...res });
};

function onCheckedRow(rowKeys) {
  console.log(rowKeys);
}

function reloadTable() {
  actionRef.value.reload();
}

function confirmForm(e) {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors) => {
    if (!errors) {
      message.success("新建成功");
      setTimeout(() => {
        showModal.value = false;
        reloadTable();
      });
    } else {
      message.error("请填写完整信息");
    }
    formBtnLoading.value = false;
  });
}

function handleEdit(record) {
  console.log("点击了编辑", record);
  // router.push({ name: "basic-info", params: { id: record.id } });
}

function handleDelete(record) {
  console.log("点击了删除", record);
  window.$dialog.info({
    title: "提示",
    content: `您想删除${record.name}`,
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      message.success("删除成功");
    },
    onNegativeClick: () => {},
  });
}
</script>

<style lang="less" scoped></style>
