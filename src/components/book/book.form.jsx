import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
} from "antd";
import { useState } from "react";
import { uploadFileAPI } from "../../services/api.service";
import { createBookAPI } from "../../services/api.book.service";
import { delay } from "../common/common";

const BookForm = (props) => {
  const [isModalCreateBook, setIsModalCreateBook] = useState(false);

  const [urlImg, setUrlImg] = useState(null);

  const [file, setFile] = useState(null);

  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const [formCreate] = Form.useForm();

  const { loadDataTableBook } = props;

  const resetFormAndCloseModal = () => {
    formCreate.resetFields();
    setIsModalCreateBook(false);
    setFile(null);
    setUrlImg(null);
  };

  const handleCreateForm = async () => {
    const dataCreateBook = formCreate.getFieldsValue();
    if (!file) {
      return notification.error({
        message: "File not found!",
        description: "Please select a file image!",
        duration: 2,
      });
    }
    setIsLoadingBtn(true);
    const resUploadImg = await uploadFileAPI(file, "book");
    if (!resUploadImg || !resUploadImg.data) {
      return notification.error({
        message: "Upload fail!",
        description: "Upload image failed!",
        duration: 2,
      });
    }
    dataCreateBook["thumbnail"] = resUploadImg.data.fileUploaded;
    await delay(3000);
    const resBookCreate = await createBookAPI(dataCreateBook);
    if (resBookCreate.statusCode == 201 && resBookCreate.data) {
      resetFormAndCloseModal();
      loadDataTableBook();
      message.success("Create book successfully!");
    }
    setIsLoadingBtn(false);
  };
  const handleSelectImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setUrlImg(url);
    }
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Book Table</h1>
        <Button
          type="primary"
          onClick={() => {
            setIsModalCreateBook(true);
          }}
        >
          Create
        </Button>
      </div>
      <Modal
        loading={isLoadingBtn}
        title="Create Book Form"
        open={isModalCreateBook}
        onOk={() => {
          formCreate.submit();
        }}
        onCancel={() => {
          resetFormAndCloseModal();
        }}
        okText={"Saves"}
      >
        <Form
          layout="vertical"
          form={formCreate}
          onFinish={() => handleCreateForm()}
        >
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please enter item!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Main text"
            name="mainText"
            rules={[{ required: true, message: "Please enter item!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter item!" }]}
          >
            <InputNumber style={{ width: "100%" }} addonAfter="đ" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter item!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter item!" }]}
          >
            <Select
              //   defaultValue="Arts"
              style={{
                width: "100%",
              }}
              //   onChange={handleChange}
              options={[
                { value: "Arts", label: "Arts" },
                { value: "Business", label: "Business" },
                { value: "Comics", label: "Comics" },
                { value: "Cooking", label: "Cooking" },
                { value: "Entertainment", label: "Entertainment" },
                { value: "History", label: "History" },
                { value: "Music", label: "Music" },
                { value: "Sports", label: "Sports" },
                { value: "Teen", label: "Teen" },
                { value: "Travel", label: "Travel" },
              ]}
            />
          </Form.Item>
          {/* <Form.Item name={"thumbnail"} hidden>
            <Input />
          </Form.Item> */}
          <div>
            <label
              htmlFor="thumbnail"
              style={{
                width: "100px",
                height: "30px",
                backgroundColor: "orange",
                borderRadius: "10px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Select Img
            </label>
            <Input
              type="file"
              id="thumbnail"
              onChange={(event) => {
                handleSelectImg(event);
              }}
              style={{ display: "none" }}
            />
            {urlImg && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Image
                  width={150}
                  height={150}
                  style={{ objectPosition: "center", objectFit: "cover" }}
                  src={urlImg}
                />
              </div>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default BookForm;
