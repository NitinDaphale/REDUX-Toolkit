import React from "react";
import {
  increment,
  decrement,
  getPosts,
  setLoadingStatus,
  setError
} from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  const { count, posts, isLoading, errorMessage } = useSelector(
    (state) => state.counter
  );

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement{" "}
        </button>
        <br />
        <button
          onClick={() => {
            dispatch(setLoadingStatus(true));
            fetch("https://jsonplaceholder.typicode.com/posts")
              .then((res) => {
                if (!res.ok) {
                  dispatch(
                    setError({
                      isLoading: false,
                      errorMessage: "Error in fetching data! Please try again."
                    })
                  );
                  return [];
                }
                return res.json();
              })
              .then((data) => {
                dispatch(getPosts(data));
              })
              .catch((e) => {
                console.log(e);
                dispatch(
                  setError({
                    isLoading: false,
                    errorMessage: "Error in fetching data! Please try again."
                  })
                );
              });
          }}
        >
          Get Posts
        </button>

        {isLoading && "Please wait, Posts are loading..."}
        {errorMessage && errorMessage}
        <div>
          {!isLoading && posts.length > 0 && (
            <table>
              <tbody>
                {posts.map((p, i) => {
                  return (
                    <tr key={i}>
                      <td> {i + 1} </td>
                      <td>{p.title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
