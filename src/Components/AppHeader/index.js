import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
function AppHeader() {
  return (
    <div className="AppHeader">
      <Image src="https://via.placeholder.com/150" width={40} />
      <Typography.Title level={3}>Admin Dashboard</Typography.Title>
      <Space>
        <Badge count={10} dot>
          <MailOutlined style={{ fontSize: 24 }}></MailOutlined>
        </Badge>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24 }}></BellFilled>
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
