import { useEffect, useState } from "react";
import BookForm from "../components/book/book.form";
import BookTable from "../components/book/book.table";
import { fetchBookWithPage } from "../services/api.book.service";
import { delay } from "../components/common/common";

const BookPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [total, setTotal] = useState(null);
  const [dataBooks, setDataBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadDataTableBook();
  }, [currentPage, pageSize]);

  const loadDataTableBook = async () => {
    setIsLoading(true);
    await delay(2000);
    const res = await fetchBookWithPage(currentPage, pageSize);
    if (res.data) {
      setCurrentPage(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotal(res.data.meta.total);
      setDataBooks(res.data.result);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <BookForm loadDataTableBook={loadDataTableBook} />
        <BookTable
          dataBooks={dataBooks}
          isLoading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          total={total}
          loadDataTableBook={loadDataTableBook}
        />
      </div>
    </>
  );
};
export default BookPage;
