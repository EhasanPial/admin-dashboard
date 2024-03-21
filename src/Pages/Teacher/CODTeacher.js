import { Button, Form, Input, Space, Typography, Card, Row, Col } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { db } from "../../firebase";
import { collection, addDoc, getDoc, query, where, doc, updateDoc, setDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Teacher() {
  const [submit, setSubmit] = useState(false);
  // const [fieldDisabled, setFieldDisabled] = useState(false);
  const location = useLocation();
  const [form] = Form.useForm();
  // const isEditPage = useRef(false);
  const [isEditPage, setIsEditPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { teacher } = location.state;
      // setFieldDisabled(true);
      //setTeacher(teacher);
      form.setFieldsValue({ teacher: [{ teacherName: teacher.teacherName, teacherOfClass: teacher.teacherOfClass, students: teacher.students }] });
      setIsEditPage(true);
    }
  }, [location.state, form]);

  const handleSubmit = async (values) => {
    if (isEditPage) {
      try {
        setSubmit(true);
        const teacherRef = doc(db, "teachers", location.state.teacher.keyOK);
        await updateDoc(teacherRef, values.teacher[0]).then(() => {
          navigate("/teacher/", { state: { teacher: values.teacher[0] } });
        });
      } catch (error) {
        console.error("Error adding teachers to Firestore:", error);
        setSubmit(false);
      }
    } else {
      try {
        setSubmit(true);
        const teachersCollectionRef = collection(db, "teachers");

        values.teacher.forEach(async (teacher) => {
          // console.log("Adding teacher to Firestore:", teacher);
          await addDoc(teachersCollectionRef, teacher).then((docRef) => {
            const addedTeacher = new Promise((resolve, reject) => {
              const docSnap = getDoc(docRef);
              resolve(docSnap);
            });
            addedTeacher.then((doc) => navigate("/teacher/", { state: { teacher: doc.data() } }));
          });
        });
      } catch (error) {
        // console.error("Error adding teachers to Firestore:", error);
        setSubmit(false);
      }
    }
  };
  const Students = ({ item }) => {
    return (
      <Form.List name={[item.name, "students"]} initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", flexDirection: "column" }} key={item.key}>
            {fields.map((field, index) => (
              <Space key={field.key}>
                <Form.Item label={"Students " + (index + 1)} name={[field.name, "firstName"]} rules={[{ required: true, message: "Please input first name." }]} hasFeedback>
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item name={[field.name, "lastName"]} rules={[{ required: true, message: "Please input last name." }]} hasFeedback>
                  <Input placeholder="Last Name" />
                </Form.Item>
                {index !== 0 && (
                  <MinusCircleOutlined
                    style={{ color: "red", marginTop: 0 }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                )}
              </Space>
            ))}
            <Button type="dashed" onClick={() => add()} block>
              + Add Student
            </Button>
          </div>
        )}
      </Form.List>
    );
  };

  const TeacherInput = () => {
    return (
      <div>
        <Form.List name="teacher" initialValue={[{}]}>
          {(fields, { add, remove }) => (
            <Row justify="start" gutter={[12, 12]}>
              {fields.map((field, index) => (
                <Col span={16}>
                  <Card key={field.key} style={{ marginBottom: 8 }} align="baseline">
                    <div style={{ backgroundColor: "green", padding: "18px", margin: "12px 0px", borderRadius: 5 }}>
                      <Typography variant="2" align="left" style={{ color: "white" }}>
                        {`Teacher ${index + 1}`}
                      </Typography>
                    </div>
                    <Form.Item {...field} name={[field.name, "teacherName"]} label="Teacher Name:" rules={[{ required: true, message: "Please input teacher name." }]}>
                      <Input placeholder="Teacher Name" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "teacherOfClass"]}
                      label="Teacher of Class:"
                      rules={[
                        { required: true, message: "Please input teacher's assigned class." },
                        {
                          validator: async (_, value) => {
                            if (value && value > 0 && value < 13) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("Please input a valid class number."));
                          },
                        },
                      ]}
                    >
                      <Input placeholder="Teacher of Class" />
                    </Form.Item>
                    <Students item={field} />
                    <Space style={{ justifyContent: "flex-end" }}>
                      {!isEditPage && (
                        <MinusCircleOutlined
                          style={{ color: "red" }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      )}
                    </Space>
                  </Card>
                </Col>
              ))}

              {!isEditPage && (
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{}}>
                  Add Teacher
                </Button>
              )}
            </Row>
          )}
        </Form.List>
      </div>
    );
  };

  return (
    <Space
      direction="vertical"
      size={20}
      style={{
        padding: 18,
      }}
    >
      <Typography.Title level={2}>{isEditPage === true ? "Edit Teacher" : "Create Teacher"}</Typography.Title>
      <Form name="dynamic_form_Fnest_item" onFinish={handleSubmit} form={form} style={{ maxHeight: 100 }}>
        <TeacherInput />
        <Button type="primary" htmlType="submit" style={{ margin: "20px 0px" }} disabled={submit}>
          {isEditPage === true ? "Edit" : "Submit"}
        </Button>
      </Form>
    </Space>
  );
}

export default Teacher;
