import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/posts/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "",
    }),
    getPost: builder.query({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetPostQuery, useGetPostsQuery } = api.hooks;
