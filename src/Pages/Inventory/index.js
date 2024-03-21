import { Typography, Space } from "antd";
import { useEffect, useState } from "react";
import { Table, Rate } from "antd";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((data) => {
      setDataSource(data.products);
      console.log(dataSource);
      setLoading(false);
    });
  }, []);
  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
    <Typography.Title level={4}>Inventory</Typography.Title>
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
          title: "Price",
          dataIndex: "price",
          render: (price) => `$${price}`,
        },
        {
          title: "Stock",
          dataIndex: "Stock",
        },
        {
          title: "Rating",
          dataIndex: "rating",
          render: (rating) => <Rate value={rating} disabled allowHalf />,
        },
        {
          title: "thumbnail",
          dataIndex: "thumbnail",
          render: (thumbnail) => (
            <img src={thumbnail} style={{ width: 50, height: 50, objectFit: "cover" }} />
          ),
        },
        {
          title: "Category",
          dataIndex: "category",
        },
      ]}
    ></Table>
  </Space>
  
  );
}

export default Inventory;
