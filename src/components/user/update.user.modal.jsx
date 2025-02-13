import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";

const UpdateUserModal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModalAndReset = () => {
    setIsModalOpen(false);
    setFullName("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  const handleSubmitUser = async () => {
    const res = await createUserAPI(fullName, email, password, phone);
    if (res.data) {
      notification.success({
        message: "Create User",
        description: "User created successfully",
        duration: 3,
      });
      closeModalAndReset();
      //   await LoadUser();
      return;
    }
    return notification.error({
      message: "Create User",
      description: JSON.stringify(res.message),
      showProgress: true,
      pauseOnHover: true,
    });
  };
  return (
    <Modal
      title="Update User Form"
      open={isModalOpen}
      onOk={() => {
        handleSubmitUser();
      }}
      okText={"Update"}
      onCancel={() => {
        closeModalAndReset();
      }}
      maskClosable={false}
    >
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
          <Input
            onChange={(event) => setFullName(event.target.value)}
            value={fullName}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <Input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <Input.Password
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <div>
          <label htmlFor="">Phone number</label>
          <Input
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
          />
        </div>
      </div>
    </Modal>
  );
};
export default UpdateUserModal;
