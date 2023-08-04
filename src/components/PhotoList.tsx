import {
  Album,
  Photo,
  useAddPhotoMutation,
  useFetchPhotosQuery,
} from "../store";
import PhotoListItem from "./PhotoListItem";
import Button from "./ui/Button";
import Skeleton from "./ui/Skeleton";

interface PhotoListProps {
  album: Album;
}
const PhotoList: React.FC<PhotoListProps> = ({ album }) => {
  const { isFetching, error, data } = useFetchPhotosQuery(album);
  const [addPhoto, addPhotoResults] = useAddPhotoMutation();

  const addPhotoHandler = () => {
    addPhoto(album);
  };

  let content: JSX.Element;
  if (isFetching) content = <Skeleton times={4} className="h-8 w-full" />;
  else if (error) content = <div>Error fetching photos </div>;
  else
    content = (
      <div className="flex gap-2 p-2 flex-wrap justify-center">
        {data.map((photo: Photo) => (
          <PhotoListItem key={photo.id} photo={photo} />
        ))}
      </div>
    );

  return (
    <div>
      <header className="flex items-center justify-between m-2">
        <h6 className="text-bold text-sm">Photos In {album.title}</h6>
        <Button loading={addPhotoResults.isLoading} onClick={addPhotoHandler}>
          + Add Photo
        </Button>
      </header>
      {content}
    </div>
  );
};

export default PhotoList;
