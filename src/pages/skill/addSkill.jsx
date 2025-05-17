import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Button, Form, Input, message, Select, Space } from "antd";
import { postSkill } from "../../redux/skillsSlice";
import { useDispatch, useSelector } from "react-redux";

function AddSkill() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const onFinish = async (skillData) => {
    form.resetFields();

    try {
      const resultAction = await dispatch(
        postSkill({ skillData, access_token: user.access_token })
      );
      console.log(resultAction)

      if (postSkill.fulfilled.match(resultAction)) {
        message.success("Đã thêm 1 kỹ năng mới!");
      } else {
        message.error(resultAction.payload || "Ghi log thất bại.");
      }
    } catch (error) {
      console.error("Log creation error:", error);
      message.error("Đã xảy ra lỗi khi gửi log.");
    }
  };
  const onFinishFailed = () => {
    message.error("Thêm kỹ năng mới thất bại!");
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // quay lại 1 trang trước
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{ state: "Learning" }}
    >
      <h1 style={{ textAlign: "center" }}>Thêm kỹ năng</h1>
      <Form.Item
        name="title"
        label="Tiêu đề:"
        rules={[
          { required: true, message: "Vui lòng nhập tiêu đề" },
          { type: "text", warningOnly: true },
          { type: "string", min: 1 },
        ]}
      >
        <Input type="text" placeholder="Nhập tên kĩ năng" />
      </Form.Item>
      <Form.Item
        label="Trạng thái:"
        name="status"
        rules={[{ required: true, message: "Vui lòng thêm trạng thái!" }]}
      >
        <Select
          options={[
            { value: "Planed", label: "Planed" },
            { value: "Learning", label: "Learning" },
            { value: "Done", label: "Done" },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="description" label="Mô tả:">
        <Input.TextArea rows={6} />
      </Form.Item>
      <Form.Item style={{ textAlign: "center" }}>
        <Space>
          <Button onClick={handleBack}>Quay lại</Button>
          <Button size="medium" type="primary" htmlType="submit">
            Thêm
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default AddSkill;