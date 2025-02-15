import { Drawer } from "antd";

const DetailUserModal = (props) => {
  const { isDetailModal, setIsDetailModal, dataDetail, setDataDetail } = props;

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
              justifyContent: "center",
              objectFit: "cover",
            }}
          >
            <img
              style={{ width: "200px", height: "200px" }}
              src={`${import.meta.env.VITE_BACKEND_URL}//images/avatar/${
                dataDetail.avatar
              }`}
              alt=""
            />
          </div>
          <p>ID: {dataDetail._id} </p>
          <p>Full Name: {dataDetail.fullName} </p>
          <p>Email: {dataDetail.email} </p>
          <p>Phone: {dataDetail.phone} </p>
          <div>
            <label
              htmlFor="btnUploadImg"
              style={{ cursor: "pointer", background: "orange" }}
            >
              <h1>Upload Img</h1>
            </label>
            <input type="file" hidden id="btnUploadImg" />
          </div>
        </div>
      ) : (
        <p>Khong co du lieu</p>
      )}
    </Drawer>
  );
};
export default DetailUserModal;
