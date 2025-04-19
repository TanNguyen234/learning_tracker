import './style.scss'
import { Button, Form, Input, message, Select, Space } from 'antd';

function AddSkill() {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        message.success('Đã thêm 1 kỹ năng mới!');
        form.resetFields()
        console.log(values)
    };
    const onFinishFailed = () => {
        message.error('Thêm kỹ năng mới thất bại!');
    };
    return (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{ state: 'Learning' }}
        >
          <h1 style={{textAlign: 'center'}}>Thêm kỹ năng</h1>
          <Form.Item
            name="title"
            label="Tiêu đề:"
            rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 1 }]}
          >
            <Input type='text' placeholder="Nhập tên kĩ năng" />
          </Form.Item>
          <Form.Item
            label="Trạng thái:"
            name="state"
            rules={[{ required: true, message: 'Vui lòng thêm trạng thái!' }]}
          >
            <Select 
              options={[
                { value: 'Planed', label: 'Planed' },
                { value: 'Learning', label: 'Learning' },
                { value: 'Done', label: 'Done' },
              ]}
            >
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả:"
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item style={{textAlign: 'center'}}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Thêm
              </Button>
            </Space>
          </Form.Item>
        </Form>
      );
    
}

export default AddSkill