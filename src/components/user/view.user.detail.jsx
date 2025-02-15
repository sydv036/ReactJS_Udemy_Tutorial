import { Drawer } from "antd";
import { useEffect, useState } from "react";

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
          <p>ID: {dataDetail._id} </p>
          <p>Full Name: {dataDetail.fullName} </p>
          <p>Email: {dataDetail.email} </p>
          <p>Phone: {dataDetail.phone} </p>
        </div>
      ) : (
        <p>Khong co du lieu</p>
      )}
    </Drawer>
  );
};
export default DetailUserModal;
