import { defineComponent, reactive, ref, Ref } from 'vue';
import { ElMessage } from 'element-plus';

const Todo = defineComponent({
  setup() {
    const ruleForm = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    });
    const rules: object = {
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      ],
      region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
      ],
      date1: [
        {
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }
      ],
      date2: [
        {
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }
      ],
      type: [
        {
          type: 'array',
          required: true,
          message: '请至少选择一个活动性质',
          trigger: 'change'
        }
      ],
      resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
      ],
      desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
    };

    const formRef: Ref<any> = ref(null);

    function submitForm() {
      formRef.value.validate((valid: boolean) => {
        if (valid) {
          console.log(ruleForm);
          ElMessage.success('验证成功!');
        } else {
          ElMessage.error('验证失败!');
          return false;
        }
      });
    }

    function resetForm() {
      formRef.value.resetFields();
    }

    return () => (
      <el-form
        model={ruleForm}
        rules={rules}
        ref={formRef}
        label-width="100px"
        class="demo-ruleForm"
      >
        <p>表单：</p>
        <br />
        <el-form-item label="活动名称" prop="name">
          <el-input v-model={ruleForm.name}></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model={ruleForm.region} placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col span={'11'}>
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model={ruleForm.date1}
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" span={'2'}>
            -
          </el-col>
          <el-col span={'11'}>
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model={ruleForm.date2}
                style="width: 100%;"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model={ruleForm.delivery}></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model={ruleForm.type}>
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model={ruleForm.resource}>
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model={ruleForm.desc}></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" onClick={submitForm}>
            立即创建
          </el-button>
          <el-button onClick={resetForm}>重置</el-button>
        </el-form-item>
      </el-form>
    );
  }
});

export default Todo;
