import React, { useState } from "react";
import { Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import DetailUserModal from "./view.user.detail";
const UserTable = (props) => {
  const { dataUsers, LoadUser } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [userUpdate, setUserUpdate] = useState(null);

  const [isDetailModal, setIsDetailModal] = useState(false);

  const [dataDetail, setDataDetail] = useState(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setIsDetailModal(true);
              setDataDetail(record);
            }}
          >
            {" "}
            {record._id}
          </a>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <EditOutlined
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                setIsModalUpdateOpen(true);
                setUserUpdate(record);
              }}
            />
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        userUpdate={userUpdate}
        setUserUpdate={setUserUpdate}
        LoadUser={LoadUser}
      />
      <DetailUserModal
        isDetailModal={isDetailModal}
        setIsDetailModal={setIsDetailModal}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
      />
    </>
  );
};
export default UserTable;
