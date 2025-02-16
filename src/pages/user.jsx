import { useEffect, useState } from "react";
import Userform from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUsers } from "../services/api.service";

const UserPage = () => {
  const [dataUsers, isDataUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    LoadUser();
  }, [currentPage, pageSize]);

  const LoadUser = async () => {
    const res = await fetchAllUsers(currentPage, pageSize);
    if (res.data) {
      isDataUsers(res.data.result);
      setCurrentPage(res.data.meta.current);
      setPageSize(res.data.meta.pageSize);
      setTotalPage(res.data.meta.total);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <Userform LoadUser={LoadUser} />
      <UserTable
        dataUsers={dataUsers}
        LoadUser={LoadUser}
        currentPage={currentPage}
        pageSize={pageSize}
        totalPage={totalPage}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
export default UserPage;
