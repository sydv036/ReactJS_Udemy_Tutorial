import { Drawer } from "antd";

const BookDetail = (props) => {
  const { isModalDetailBook, setIsModalDetailBook, dataBookDetailBook } = props;
  return (
    <>
      <Drawer
        title="Book Details"
        onClose={() => setIsModalDetailBook(false)}
        open={isModalDetailBook}
      >
        <p>{JSON.stringify(dataBookDetailBook)}</p>
      </Drawer>
    </>
  );
};
export default BookDetail;
