import {
  Album,
  User,
  useCreateAlbumMutation,
  useFetchAlbumsQuery,
} from "../store";
import AlbumListItem from "./AlbumListItem";
import Button from "./ui/Button";
import Skeleton from "./ui/Skeleton";

interface AlbumListProps {
  user: User;
}

const AlbumList: React.FC<AlbumListProps> = ({ user }) => {
  const { isFetching, data, error } = useFetchAlbumsQuery(user);
  const [createAlbum, createAlbumResults] = useCreateAlbumMutation();

  const createAlbumHandler = () => {
    createAlbum(user);
  };

  let content: JSX.Element;
  if (isFetching) content = <Skeleton times={3} className="h-8 w-full" />;
  else if (error) content = <div>"Error loading albums!"</div>;
  else
    content = data.map((album: Album) => (
      <AlbumListItem key={album.id} album={album} />
    ));

  return (
    <div>
      <div className="m-2 flex items-center justify-between">
        <h3 className="text-md font-bold">Album for {user.name}</h3>
        <Button
          loading={createAlbumResults.isLoading}
          onClick={createAlbumHandler}
        >
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlbumList;
