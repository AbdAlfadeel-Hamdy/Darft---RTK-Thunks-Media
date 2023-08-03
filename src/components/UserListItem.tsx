import useThunk from "../hooks/use-thunk";
import { User, removeUser } from "../store";
import { GoTrash } from "react-icons/go";
import Button from "./ui/Button";

interface UserListItemProps {
  user: User;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
  const {
    isLoading,
    loadingError,
    runThunk: doRemoveUser,
  } = useThunk(removeUser);

  const removeUserHandler = () => {
    doRemoveUser(user);
  };
  return (
    <div className="mb-2 border rounded">
      <div className="flex items-center gap-4 p-2 cursor-pointer">
        <Button loading={isLoading} onClick={removeUserHandler}>
          <GoTrash />
        </Button>
        {loadingError && <p>Error deleting user!</p>}
        {user.name}
      </div>
    </div>
  );
};

export default UserListItem;
