import { GoTrash } from "react-icons/go";
import { Photo, useDeletePhotoMutation } from "../store";
import Button from "./ui/Button";

interface PhotoListItemProps {
  photo: Photo;
}

const PhotoListItem: React.FC<PhotoListItemProps> = ({ photo }) => {
  const [deletePhoto, deletePhotoResult] = useDeletePhotoMutation();

  const deletePhotoHandler = () => {
    deletePhoto(photo);
  };
  return (
    <div className="relative">
      <img src={photo.url} alt="cat" className="w-16 h-16" />
      <div className="absolute inset-0 bg-gray-600 flex items-center justify-center opacity-0 hover:opacity-80 duration-200">
        <Button
          loading={deletePhotoResult.isLoading}
          onClick={deletePhotoHandler}
        >
          <GoTrash className="cursor-pointer text-white" />
        </Button>
      </div>
    </div>
  );
};

export default PhotoListItem;
