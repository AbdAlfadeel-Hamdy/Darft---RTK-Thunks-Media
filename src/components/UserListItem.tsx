import useThunk from "../hooks/use-thunk";
import { User, removeUser } from "../store";
import { GoTrash } from "react-icons/go";
import Button from "./ui/Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";

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

  const header = (
    <div className="flex items-center gap-4 p-2">
      <Button loading={isLoading} onClick={removeUserHandler}>
        <GoTrash />
      </Button>
      {loadingError && <p>Error deleting user!</p>}
      <h2 className="text-lg font-bold">{user.name}</h2>
    </div>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  );
};

export default UserListItem;
