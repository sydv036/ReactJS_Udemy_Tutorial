import { Flex } from "antd";
import Userform from "../components/user/user.form";
import UserTable from "../components/user/user.table";

const UserPage = () => {
  return (
    <div style={{ padding: 20 }}>
      <Userform />
      <UserTable />
    </div>
  );
};
export default UserPage;
