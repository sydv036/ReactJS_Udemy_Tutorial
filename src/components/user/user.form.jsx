import { Button, Flex, Input } from "antd";
const Userform = () => {
  return (
    <>
      <div
        className="user-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <div>
          <label htmlFor="">Full Name</label>
          <Input />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <Input />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <Input.Password />
        </div>
        <div>
          <label htmlFor="">Phone number</label>
          <Input />
        </div>
        <div>
          <Button type="dashed">Save User</Button>
        </div>
      </div>
    </>
  );
};
export default Userform;
