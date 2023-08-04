import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Album } from "./albumsApi";
import { faker } from "@faker-js/faker";
import { BASE_URL } from "../../utils/constants";

export interface Photo {
  id: number;
  url: string;
  albumId: number;
}

export const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Photo", "AlbumPhoto"],
  endpoints(builder) {
    return {
      // FETCH Photos
      fetchPhotos: builder.query({
        providesTags: (results, error, album) => [
          ...results.map((photo: Photo) => ({ type: "Photo", id: photo.id })),
          { type: "AlbumPhoto", id: album.id },
        ],
        query: (album: Album) => {
          return {
            method: "GET",
            url: "/photos",
            params: {
              albumId: album.id,
            },
          };
        },
      }),
      // ADD Photo
      addPhoto: builder.mutation({
        invalidatesTags: (results, error, album) => [
          { type: "AlbumPhoto", id: album.id },
        ],
        query: (album: Album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              url: faker.image.url(),
              albumId: album.id,
            },
          };
        },
      }),
      // DELETE Photo
      deletePhoto: builder.mutation({
        invalidatesTags: (results, error, photo) => [
          { type: "Photo", id: photo.id },
        ],
        query: (photo: Photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;
