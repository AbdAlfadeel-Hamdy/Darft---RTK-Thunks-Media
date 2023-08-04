import { Album } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./ui/Button";
import { GoTrash } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";

interface AlbumListItemProps {
  album: Album;
}

const AlbumListItem: React.FC<AlbumListItemProps> = ({ album }) => {
  const [removeAlbum, removeAlbumResults] = useRemoveAlbumMutation();

  const removeAlbumHandler = () => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex gap-2 items-center">
      {/* <Button
        loading={
          removeAlbumResults.originalArgs?.id === album.id
            ? removeAlbumResults.isLoading
            : undefined
        }
        onClick={removeAlbumHandler}
      > */}
      <Button
        loading={removeAlbumResults.isLoading}
        onClick={removeAlbumHandler}
      >
        <GoTrash />
      </Button>
      <h6 className="font-medium">{album.title}</h6>
    </div>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos
    </ExpandablePanel>
  );
};

export default AlbumListItem;
