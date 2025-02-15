import { useEffect, useState } from "react";
import Userform from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUsers } from "../services/api.service";

const UserPage = () => {
  const [dataUsers, isDataUsers] = useState([]);
  useEffect(() => {
    LoadUser();
  }, []);

  const LoadUser = async () => {
    const res = await fetchAllUsers();
    isDataUsers(res.data);
  };
  return (
    <div style={{ padding: 20 }}>
      <Userform LoadUser={LoadUser} />
      <UserTable dataUsers={dataUsers} LoadUser={LoadUser} />
    </div>
  );
};
export default UserPage;
