import { Typography, Space, Card, Table } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getOrders, getRevenue } from "../../API";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <DashboardCard icon={<ShoppingCartOutlined style={{ color: "green", backgroundColor: "rgba(155,222,200,0.5)", borderRadius: 20, fontSize: 25, padding: 8 }} />} title={"Orders"} value={1211} />
        <DashboardCard icon={<DollarCircleOutlined style={{ color: "purple", backgroundColor: "rgba(255,202,200,0.5)", borderRadius: 20, fontSize: 25, padding: 8 }} />} title={"Reveneu"} value={1211} />
        <DashboardCard icon={<UserOutlined style={{ color: "white", backgroundColor: "rgba(15,22,1550,0.5)", borderRadius: 20, fontSize: 25, padding: 8 }} />} title={"Customers"} value={1211} />
        <DashboardCard icon={<ShoppingOutlined style={{ color: "black", backgroundColor: "rgba(255,22,20,0.5)", borderRadius: 20, fontSize: 25, padding: 8 }} />} title={"Products"} value={1211} />
      </Space>
      <Space>
        <RecentOrder />
        <DashboardCart />
      </Space>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic style={{ padding: 12 }} title={title} value={value} />
      </Space>
    </Card>
  );
}

function RecentOrder() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrders().then((data) => {
      setDataSource(data.products.splice(0, 5));
    });
    setLoading(false);
  });
  return (
    <>
      <Typography.Title level={4}>Recent Orders</Typography.Title>
      <Table
        style={{ width: "100%" }}
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
        ]}
      ></Table>
    </>
  );
}
function DashboardCart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    getRevenue().then((data) => {
      const labels = data.carts.map((carts) => {
        return `User-${carts.userId} Cart-${carts.id}`;
      });
      const data_ = data.carts.map((carts) => {
        return carts.discountedTotal;
      });
      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data_,
            backgroundColor: "rgba(255, 0, 0,1)",
          },
        ],
      };
      setRevenueData(dataSource);
    });
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Chart",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar data={revenueData} options={options} />{" "}
    </Card>
  );
}
export default Dashboard;
