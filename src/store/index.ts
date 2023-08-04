import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer, User } from "./slices/usersSlice";
import { albumsApi, Album } from "./apis/albumsApi";
import { photosApi, Photo } from "./apis/photosApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./thunks/fetchUsers";
export * from "./thunks/createUser";
export * from "./thunks/removeUser";
export type { User, Album, Photo };

export {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";

export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} from "./apis/photosApi";
