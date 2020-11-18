/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { useGetPostQuery, useGetPostsQuery } from "./api";

function App() {
  const [postId, setPostId] = React.useState(-1);

  return (
    <Provider store={store}>
      <p>
        This example is exactly the same as the basic example, but each query
        has been refactored to be it's own custom hook. This design is the
        suggested way to use React Query, as it makes it much easier to manage
        query keys and shared query logic.
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </Provider>
  );
}

function Posts({ setPostId }) {
  const { data, error, isLoading, isFetching } = useGetPostsQuery();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data?.map((post) => (
                <p key={post.id}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    // style={
                    //   // We can use the queryCache here to show bold links for
                    //   // ones that are cached
                    //   // cache.getQueryData(["post", post.id])
                    //   //   ? {
                    //   //       fontWeight: "bold",
                    //   //       color: "green",
                    //   //     }
                    //   //   : {}
                    // }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

function Post({ postId, setPostId }) {
  const { data, error, isLoading, isFetching } = useGetPostQuery(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || isLoading ? (
        "Loading..."
      ) : error ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data?.title}</h1>
          <div>
            <p>{data?.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
