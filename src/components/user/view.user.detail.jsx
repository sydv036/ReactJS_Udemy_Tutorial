import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { updateUserAPI, uploadFileAPI } from "../../services/api.service";

const DetailUserModal = (props) => {
  const [selectFile, setSelectFile] = useState(null);

  const [imgPreview, setImgpreview] = useState(null);

  const {
    isDetailModal,
    setIsDetailModal,
    dataDetail,
    setDataDetail,
    LoadUser,
  } = props;

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectFile(file);
      const urlImgPreview = URL.createObjectURL(file);
      setImgpreview(urlImgPreview);
    } else {
      setSelectFile(null);
      setImgpreview(null);
    }
  };

  const handleUploadImg = async () => {
    // step 1 upload file
    const res = await uploadFileAPI(selectFile, "avatar");
    if (res.data && res.data.fileUploaded) {
      const newImgAvatar = res.data.fileUploaded;
      // step 2 update user
      const resUpdateUser = await updateUserAPI(
        dataDetail._id,
        dataDetail.fullName,
        dataDetail.phone,
        newImgAvatar
      );
      if (resUpdateUser.data) {
        setIsDetailModal(false);
        setSelectFile(null);
        setImgpreview(null);
        notification.success({
          message: "Update user avatar",
          description: "Update user avatar successfully!",
        });
        await LoadUser();
      }
    } else {
      notification.error({
        message: "Upload file",
        description: JSON.stringify(res.message),
      });
    }
  };

  return (
    <Drawer
      title="Basic Drawer"
      onClose={() => {
        setIsDetailModal(false);
        setDataDetail(null);
      }}
      open={isDetailModal}
    >
      {dataDetail ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              objectFit: "cover",
            }}
          >
            <img
              style={{ width: "150px", height: "150px" }}
              src={`${import.meta.env.VITE_BACKEND_URL}//images/avatar/${
                dataDetail.avatar
              }`}
              alt=""
            />
            {imgPreview && (
              <img
                style={{ width: "150px", height: "150px" }}
                src={imgPreview}
                alt=""
              />
            )}
          </div>
          <p>ID: {dataDetail._id} </p>
          <p>Full Name: {dataDetail.fullName} </p>
          <p>Email: {dataDetail.email} </p>
          <p>Phone: {dataDetail.phone} </p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                cursor: "pointer",
                width: "100px",
                height: "35px",
                background: "orange",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label htmlFor="btnUploadImg">Upload Img</label>
              <input
                type="file"
                onChange={handleOnChange}
                hidden
                id="btnUploadImg"
              />
            </div>
            <div>
              <Button
                type="primary"
                onClick={() => {
                  handleUploadImg();
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p>Khong co du lieu</p>
      )}
    </Drawer>
  );
};
export default DetailUserModal;
