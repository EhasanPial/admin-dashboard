import { Button, Space, Typography, Flex, Card, Spin, Table, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

function Teacher() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [recentAdded, setRecentAdded] = useState();
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [input, setInput] = useState("");

  const { Search } = Input;

  const onSearch = (e) => {
    console.log(e);
    const searchInput = e.target.value;
    const newFilter = dataSource.filter((value) => {
      return value.teacherName.toLowerCase().includes(searchInput.toLowerCase());
    });
    if (searchInput === "") {
      setDataSource([]);
    } else {
      setDataSource(newFilter);
    }
  };
  const columns = [
    {
      title: (
        <div orientation="vertical">
          <div style={{ margin: "8px 0px", textAlign: "center" }}>Teacher Name</div>
          <Search
            placeholder="Search Name"
            onChange={(e) => onSearch(e)}
            value={input}
            style={{
              width: 200,
            }}
          />
        </div>
      ),
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: (
        <div orientation="vertical">
          <div style={{ margin: "8px 0px", textAlign: "center" }}>Class of Teacher</div>
          <Search
            placeholder="Search Class"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
      ),
      dataIndex: "teacherOfClass",
      key: "teacherOfClass",
    },
    {
      title: (
        <div orientation="vertical">
          <div style={{ margin: "8px 0px", textAlign: "center" }}>Total Students</div>
          <Search
            placeholder="Search Name"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
      ),
      dataIndex: "totalStudents",
      key: "totalStudents",
    },
    {
      title: (
        <div orientation="vertical">
          <div style={{ margin: "8px 8px", textAlign: "center" }}>Action</div>
        </div>
      ),
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditFilled
            style={{ fontSize: "16px", color: "green" }}
            onClick={() => {
              navigate(`/create_teacher`, { state: { teacher: dataSource.filter((item) => item.keyOK === record.keyOK)[0] } });
            }}
          />
          <DeleteFilled
            style={{ fontSize: "16px", color: "red" }}
            onClick={async () => {
              // delete from firebsae collection and update the state
              console.log(record.keyOK);
              setIsLoading(true);
              await deleteDoc(doc(db, "teachers", record.keyOK)).then(() => {
                const tempDataSource = dataSource.filter((item) => item.keyOK !== record.keyOK);
                setDataSource(tempDataSource);
                setIsLoading(false);
              });
            }}
          />
        </Space>
      ),
    },
  ];

  const DataTable = () => {
    return (
      // display antd data table
      <div>
        <Table dataSource={dataSource} columns={columns} loading={isLoading} pagination={{ pageSize: 8 }} />
      </div>
    );
  };

  useEffect(() => {
    console.log("Use Effect");
    if (location.state && location.state.teacher) {
      setRecentAdded(location.state.teacher);
    }
    const allTeachers = async () => {
      const tempDataSource = [];
      const querySnapshot = await getDocs(collection(db, "teachers"));
      querySnapshot.forEach((doc) => {
        tempDataSource.push({
          keyOK: doc.id,
          teacherName: doc.data().teacherName,
          teacherOfClass: doc.data().teacherOfClass,
          totalStudents: doc.data().students.length,
          students: doc.data().students,
        });
        setDataSource(tempDataSource);
        setFilteredData(tempDataSource);
      });
    };
    allTeachers().then(() => {
      setIsLoading(false);
    });
  }, [location.state]);

  return (
    <>
      <div style={{ display: Flex, justifyContent: "space-around" }} size="large">
        <Typography.Title level={2}>Teacher</Typography.Title>
        <Button type="primary" onClick={() => navigate("/create_teacher")}>
          <PlusCircleOutlined />
          Create
        </Button>
        <DataTable />
      </div>
      {recentAdded ? (
        isLoading ? (
          <Spin />
        ) : (
          <Card direction="vertical" style={{ margin: "20px 0px", padding: 5 }} title="Recently Added Teacher">
            Name: {recentAdded.teacherName}
            <br />
            Class of Teacher: {recentAdded.teacherOfClass}
          </Card>
        )
      ) : null}
    </>
  );
}

export default Teacher;
