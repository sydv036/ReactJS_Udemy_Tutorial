import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
const UserTable = (props) => {
  const { dataUsers } = props;

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a> {record._id}</a>
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
            <EditOutlined style={{ cursor: "pointer", color: "blue" }} />
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />
      <UpdateUserModal />
    </>
  );
};
export default UserTable;
