import {
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  notification,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { uploadFileAPI } from "../../services/api.service";
import { updateBookAPI } from "../../services/api.book.service";
import { delay } from "../common/common";

const BookUpdate = (props) => {
  const {
    isModalUpdatelBook,
    setIsModalUpdatelBook,
    dataBookUpdate,
    setDataBookUpdate,
    loadDataTableBook,
  } = props;

  const [urlImg, setUrlImg] = useState(null);

  const [file, setFile] = useState(null);

  const [isLoadingModalUpdate, setIsLoadingModalUpdate] = useState(false);

  const [formUpdateBook] = Form.useForm();

  useEffect(() => {
    formUpdateBook.setFieldsValue(dataBookUpdate);
  }, [dataBookUpdate]);

  const handleSelectImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setUrlImg(url);
    }
  };
  const handleCloseModalandReset = () => {
    formUpdateBook.resetFields();
    setFile(null);
    setUrlImg(null);
    setIsModalUpdatelBook(false);
  };
  const handleUpdateBook = async () => {
    setIsLoadingModalUpdate(true);
    const dataFormBookUpdate = formUpdateBook.getFieldsValue();
    dataFormBookUpdate["thumbnail"] = dataBookUpdate.thumbnail;
    await delay(3000);
    if (file) {
      const resUploadImg = await uploadFileAPI(file, "book");
      if (!resUploadImg || !resUploadImg.data) {
        return notification.error({
          message: "Upload fail!",
          description: "Upload image failed!",
          duration: 2,
        });
      }
      dataFormBookUpdate["thumbnail"] = resUploadImg.data.fileUploaded;
    }

    const resUpdateBook = await updateBookAPI(dataFormBookUpdate);
    if (resUpdateBook.data) {
      message.success("Update book successfully!");
      setIsModalUpdatelBook(false);
      loadDataTableBook();
    } else {
      message.error("Update book failed!");
    }
    setIsLoadingModalUpdate(false);
  };

  return (
    <>
      <Modal
        loading={isLoadingModalUpdate}
        title="Update Book Form"
        open={isModalUpdatelBook}
        onOk={() => {
          formUpdateBook.submit();
        }}
        onCancel={() => {
          handleCloseModalandReset();
        }}
        okText={"Saves"}
      >
        <Form
          layout="vertical"
          form={formUpdateBook}
          onFinish={() => handleUpdateBook()}
        >
          <Form.Item label="ID" name="_id">
            <Input disabled />
          </Form.Item>
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
              style={{
                width: "100%",
              }}
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

            <div style={{ display: "flex", justifyContent: "center" }}>
              {urlImg ? (
                <Image
                  width={150}
                  height={150}
                  style={{ objectPosition: "center", objectFit: "cover" }}
                  src={urlImg}
                />
              ) : (
                <Image
                  width={150}
                  height={150}
                  style={{ objectPosition: "center", objectFit: "cover" }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                    dataBookUpdate.thumbnail
                  }`}
                />
              )}
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default BookUpdate;
