import { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ARTICLECOMMENT_MUTATION } from "../../graphql";
import { ALL_ARTICLECOMMENTS_QUERY } from "../../graphql";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

type CommentBoxProps = {
  rootArticleId: number;
};

const CommentBox = ({ rootArticleId }: CommentBoxProps) => {
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [, { loading: allLoading, error: allError }] = useLazyQuery(
    ALL_ARTICLECOMMENTS_QUERY,
  );

  const [createComment, { loading, error }] = useMutation(
    CREATE_ARTICLECOMMENT_MUTATION,
  );
  const handleCreateComment = async (content: string) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>{error.message}</div>;
    }
    await createComment({
      variables: {
        articleCommentInput: {
          commenterId: 1,
          rootArticleId: rootArticleId,
          content: content,
        },
      },
    });
    setComment("");
    if (allLoading) return <div>Loading...</div>;
    if (allError) return <div>{allError.message}</div>;

    window.location.reload();
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleCreateComment(comment);
        }}
      >
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="w-full px-0 text-lg text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 outline-none resize-none"
              placeholder="Write queryComment comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2 px-3 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 bg-blue-600 hover:bg-blue-700 "
              disabled={user === null || undefined}
            >
              Post comment
            </button>
            {(user === null || undefined) && <span>登入以留言</span>}
          </div>
        </div>
      </form>
    </>
  );
};
export default CommentBox;
