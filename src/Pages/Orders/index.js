import { Typography, Space } from "antd";
import { useEffect, useState } from "react";
import { Table, Rate } from "antd";
import { getOrders } from "../../API";

function Orders() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrders().then((data) => {
      setDataSource(data.products);
      console.log(dataSource);
      setLoading(false);
    });
    
  }, []);
  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={4}>Orders</Typography.Title>
      <Table
        style={{ width: "100%" }}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        loading={loading}
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },

          {
            title: "Discount Price",
            dataIndex: "price",
            render: (price) => `$${price}`,
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            render: (rating) => <Rate value={rating} disabled allowHalf />,
          },

          
        ]}
      ></Table>
    </Space>
  );
}

export default Orders;
