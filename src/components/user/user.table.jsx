import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
const UserTable = (props) => {
  const { dataUsers } = props;

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
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
  ];

  return <Table columns={columns} dataSource={dataUsers} rowKey={"_id"} />;
};
export default UserTable;
