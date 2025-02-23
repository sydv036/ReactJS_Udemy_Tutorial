import { message, Popconfirm, Table } from "antd";
import BookDetail from "./book.view.detail";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteBookAPI } from "../../services/api.book.service";
import BookUpdate from "./book.modal.update";

const BookTable = (props) => {
  const {
    isLoading,
    dataBooks,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    total,
    loadDataTableBook,
  } = props;

  const [isModalDetailBook, setIsModalDetailBook] = useState(false);

  const [isModalUpdatelBook, setIsModalUpdatelBook] = useState(false);

  const [dataBookDetailBook, setDataBookDetailBook] = useState({});

  const [dataBookUpdate, setDataBookUpdate] = useState({});

  const handleDeleteBook = async (id) => {
    const res = await deleteBookAPI(id);
    if (res.statusCode == 200 && res.data && res.data.deletedCount > 0) {
      message.success("Book deleted successfully!");
      setCurrentPage(1);
    } else {
      message.error("Book delete failed!");
    }
  };

  const handleChangePage = async (values) => {
    const { current, pageSize } = values;
    setCurrentPage(current);
    setPageSize(pageSize);
  };

  const columns = [
    {
      title: "ID",
      key: "_id",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setIsModalDetailBook(true);
              setDataBookDetailBook(record);
            }}
          >
            {record._id}
          </a>
        </>
      ),
    },
    {
      title: "Author",
      key: "author",
      dataIndex: "author",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (_, record) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(record.price);
      },
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Popconfirm
              title="Confirm deletion"
              description="Are you sure to delete this product?"
              onConfirm={() => {
                handleDeleteBook(record._id);
              }}
              okText="Đồng ý"
              cancelText="Từ chối"
            >
              <DeleteOutlined style={{ cursor: "pointer" }} />
            </Popconfirm>
            <EditOutlined
              onClick={() => {
                setIsModalUpdatelBook(true);
                setDataBookUpdate(record);
              }}
              style={{ cursor: "pointer" }}
            />
          </div>
        </>
      ),
    },
  ];
  return (
    <>
      <Table
        loading={isLoading}
        dataSource={dataBooks}
        columns={columns}
        rowKey={"_id"}
        onChange={(e) => {
          handleChangePage(e);
        }}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
      />
      <BookDetail
        isModalDetailBook={isModalDetailBook}
        setIsModalDetailBook={setIsModalDetailBook}
        dataBookDetailBook={dataBookDetailBook}
      />
      <BookUpdate
        isModalUpdatelBook={isModalUpdatelBook}
        setIsModalUpdatelBook={setIsModalUpdatelBook}
        dataBookUpdate={dataBookUpdate}
        setDataBookUpdate={setDataBookUpdate}
        loadDataTableBook={loadDataTableBook}
      />
    </>
  );
};
export default BookTable;
