import { User } from "../store";

interface AlbumListProps {
  user: User;
}

const AlbumList: React.FC<AlbumListProps> = ({ user }) => {
  return <div>Album for {user.name}</div>;
};

export default AlbumList;
