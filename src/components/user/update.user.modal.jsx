import { Button, Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [id, setId] = useState("");

  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    userUpdate,
    setUserUpdate,
    LoadUser,
  } = props;

  useEffect(() => {
    if (userUpdate) {
      setId(userUpdate._id);
      setFullName(userUpdate.fullName);
      setPhone(userUpdate.phone);
    }
    // [userUpdate] next data update  != previous data update
  }, [userUpdate]);

  const closeModalAndReset = () => {
    setUserUpdate(null);
    setIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
  };

  const handleSubmitUpdateUser = async () => {
    const res = await updateUserAPI(id, fullName, phone);
    if (res.data) {
      notification.success({
        message: "Update User",
        description: "Update created successfully",
        duration: 3,
      });
      closeModalAndReset();
      await LoadUser();
      return;
    }
    return notification.error({
      message: "Update User",
      description: JSON.stringify(res.message),
      showProgress: true,
      pauseOnHover: true,
    });
  };

  return (
    <Modal
      title="Update User Form"
      open={isModalUpdateOpen}
      onOk={() => {
        handleSubmitUpdateUser();
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
          <label htmlFor="">ID</label>
          <Input value={id} disabled />
        </div>
        <div>
          <label htmlFor="">Full Name</label>
          <Input
            onChange={(event) => setFullName(event.target.value)}
            value={fullName}
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
