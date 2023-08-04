import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../slices/usersSlice";
import { faker } from "@faker-js/faker";

export interface Album {
  id: number;
  title: string;
  userId: number;
}

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  tagTypes: ["Album"],
  endpoints(builder) {
    return {
      // FETCH ALBUMS
      fetchAlbums: builder.query({
        providesTags: (results, error, user: User) => [
          { type: "Album", id: user.id },
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
          { type: "Album", id: user.id },
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
          { type: "Album", id: album.userId },
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
