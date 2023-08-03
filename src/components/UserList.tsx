import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, createUser, fetchUsers } from "../store";
import Skeleton from "./ui/Skeleton";
import Button from "./ui/Button";
import useThunk from "../hooks/use-thunk";
import UserListItem from "./UserListItem";

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

  let content: React.ReactNode;

  if (isLoadingUsers) {
    content = <Skeleton times={5} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <p>Cannot fetch user!</p>;
  } else
    content = data.map((user) => <UserListItem key={user.id} user={user} />);

  return (
    <div>
      <div className="flex justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={createUserHandler}>
          + Create User
        </Button>
        {creatingUserError && "Error creating user!"}
      </div>
      {content}
    </div>
  );
};

export default UserList;
