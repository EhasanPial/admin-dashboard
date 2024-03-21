import { Typography } from "antd";

function AppFooter() {
  return (
    <footer className="AppFooter">
      <div>
        <Typography.Title level={5}>TechHub.Co</Typography.Title>
        <Typography.Text>©2021 Company Name</Typography.Text>
      </div>

      <div className="aboutContact">
        <Typography.Link href="#" style={{ padding: "0px  5px" }}>
          About
        </Typography.Link>
        <Typography.Link style={{ padding: "0px  5px" }} href="#">
          Contact
        </Typography.Link>
      </div>
    </footer>
  );
}

export default AppFooter;
