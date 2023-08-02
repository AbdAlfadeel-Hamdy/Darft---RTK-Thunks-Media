import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, createUser, fetchUsers } from "../store";
import Skeleton from "./ui/Skeleton";
import Button from "./ui/Button";

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, data, error } = useSelector(
    (state: RootState) => state.users
  );

  const createUserHandler = () => {
    dispatch(createUser());
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading && !data.length)
    return <Skeleton times={5} className="h-10 w-20" />;

  if (error) return <p>Cannot fetch user!</p>;

  const rendredUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  if (isLoading && data.length)
    return (
      <div>
        <div className="flex justify-between m-3">
          <h1 className="m-2 text-xl">Users</h1>
          <Button onClick={createUserHandler}>Loading...</Button>
        </div>
        {rendredUsers}
      </div>
    );

  return (
    <div>
      <div className="flex justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={createUserHandler}>+ Create User</Button>
      </div>
      {rendredUsers}
    </div>
  );
};

export default UserList;
