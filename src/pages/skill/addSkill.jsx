import { Button, Form, Input, message, Space } from 'antd';

function AddSkill() {
    const [form] = Form.useForm();
    const onFinish = () => {
        message.success('Submit success!');
        console.log(form)
    };
    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
    return (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 1 }]}
          >
            <Input type='text' placeholder="Nhâp tên kĩ năng" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 1 }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      );
    
}

export default AddSkill