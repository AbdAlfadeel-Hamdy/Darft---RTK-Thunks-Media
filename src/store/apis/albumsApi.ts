import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../slices/usersSlice";
import { faker } from "@faker-js/faker";
import { BASE_URL } from "../../utils/constants";

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Album", "UserAlbum"],
  endpoints(builder) {
    return {
      // FETCH ALBUMS
      fetchAlbums: builder.query({
        providesTags: (results, error, user: User) => [
          ...results.map((album: Album) => ({ type: "Album", id: album.id })),
          { type: "UserAlbum", id: user.id },
        ],
        query: (user: User) => ({
          method: "GET",
          url: "/albums",
          params: {
            userId: user.id,
          },
        }),
      }),
      // CREATE ALBUM
      createAlbum: builder.mutation({
        invalidatesTags: (results, error, user: User) => [
          { type: "UserAlbum", id: user.id },
        ],
        query: (user: User) => ({
          method: "POST",
          url: "/albums",
          body: {
            title: faker.music.genre(),
            userId: user.id,
          },
        }),
      }),
      // REMOVE ALBUM
      removeAlbum: builder.mutation({
        invalidatesTags: (results, error, album) => [
          { type: "Album", id: album.id },
        ],
        query: (album: Album) => ({
          method: "DELETE",
          url: `/albums/${album.id}`,
        }),
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useCreateAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
