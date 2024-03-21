import { Menu } from "antd";
import { AppstoreOutlined, ShoppingCartOutlined, UserOutlined,TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate();
  return (
    <Menu
      onClick={(item) => {
        navigate(item.key);
      }}
      items={[
        {
          label: "Dashboard",
          icon: <AppstoreOutlined />,
          key: "/",
        },
        {
          label: "Teachers",
          key: "/teacher",
          icon: <TeamOutlined />
        },
        {
          label: "Orders",
          key: "/orders",
          icon: <ShoppingCartOutlined />,
        },
        {
          label: "Customers",
          key: "/customers",
          icon: <UserOutlined />,
        },
      ]}
    ></Menu>
  );
}

export default SideMenu;
