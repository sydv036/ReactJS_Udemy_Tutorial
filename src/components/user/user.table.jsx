import { useState } from "react";
import { Table, Popconfirm, notification } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateUserModal from "./update.user.modal";
import DetailUserModal from "./view.user.detail";
import { deleteUserAPI } from "../../services/api.service";

const UserTable = (props) => {
  const {
    dataUsers,
    LoadUser,
    currentPage,
    pageSize,
    totalPage,
    setCurrentPage,
    setPageSize,
  } = props;

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [userUpdate, setUserUpdate] = useState(null);

  const [isDetailModal, setIsDetailModal] = useState(false);

  const [dataDetail, setDataDetail] = useState(null);

  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data.deletedCount > 0) {
      notification.success({
        message: "Delete user",
        description: "Deleted user successfully!",
        duration: 3,
        showProgress: true,
      });
      await LoadUser();
    } else {
      notification.error({
        message: "Delete user",
        description: "Delet user failed!",
        duration: 3,
        showProgress: true,
      });
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{index + 1 + (currentPage - 1) * pageSize}</>;
      },
    },
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
            {/* <DeleteOutlined style={{ cursor: "pointer", color: "red" }} /> */}
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              placement="left"
              onConfirm={() => {
                handleDeleteUser(record._id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
            </Popconfirm>
          </div>
        </>
      ),
    },
  ];

  const onChange = async (pagination, filters, sorter, extra) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
          total: totalPage,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
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
        LoadUser={LoadUser}
      />
    </>
  );
};
export default UserTable;
