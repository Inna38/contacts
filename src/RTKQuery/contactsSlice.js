import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contacts",

  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://thingproxy.freeboard.io/fetch/https://live.devnimble.com/api",
  }),

  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: `/v1/contacts`,
        headers: {
          Authorization: `Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn`,
          "content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      }),
      providesTags: ["contacts"],
    }),

    getContactById: builder.query({
      query: (contactId) => ({
        url: `/v1/contact/${contactId}`,

        headers: {
          Authorization: `Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn`,
        },
      }),
      providesTags: ["contacts"],
    }),

    postContact: builder.mutation({
      query: (user) => ({
        url: "/v1/contact",
        method: "POST",
        body: user,

        headers: {
          Authorization: `Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn`,
        },
      }),
      invalidatesTags: ["contacts"],
    }),

    putTagsContact: builder.mutation({
      query: ({ id, tags }) => ({
        url: `/v1/contacts/${id}/tags`,
        method: "PUT",
        body: { tags },

        headers: {
          Authorization: `Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn`,
        },
      }),
      invalidatesTags: ["contacts"],
    }),

    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/v1/contact/${contactId}`,
        method: "DELETE",

        headers: {
          Authorization: `Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn`,
        },
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const {
  useGetContactByIdQuery,
  useGetContactsQuery,
  usePostContactMutation,
  usePutTagsContactMutation,
  useDeleteContactMutation,
} = contactsApi;
