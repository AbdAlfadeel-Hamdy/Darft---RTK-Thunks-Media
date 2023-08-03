import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, createUser, fetchUsers } from "../store";
import Skeleton from "./ui/Skeleton";
import Button from "./ui/Button";
import useThunk from "../hooks/use-thunk";

export const UserList: React.FC = () => {
  const {
    isLoading: isLoadingUsers,
    loadingError: loadingUsersError,
    runThunk: doFetchUsers,
  } = useThunk(fetchUsers);

  const {
    isLoading: isCreatingUser,
    loadingError: creatingUserError,
    runThunk: doCreateUser,
  } = useThunk(createUser);

  const { data } = useSelector((state: RootState) => state.users);

  const createUserHandler = () => {
    doCreateUser();
  };

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  if (isLoadingUsers) return <Skeleton times={5} className="h-10 w-20" />;

  if (loadingUsersError) return <p>Cannot fetch user!</p>;

  const rendredUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={createUserHandler}>
          + Create User
        </Button>
        {creatingUserError && "Error creating user!"}
      </div>
      {rendredUsers}
    </div>
  );
};

export default UserList;
