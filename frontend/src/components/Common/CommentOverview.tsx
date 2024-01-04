import { useQuery } from "@apollo/client";
import { ALL_USERS_QUERY } from "../../graphql";

type CommentOverviewProps = {
  commenterId?: number;
  content?: string;
};

const CommentOverview = ({ commenterId, content }: CommentOverviewProps) => {
  const {
    loading: allLoading,
    error: allError,
    data: queryUser,
  } = useQuery(ALL_USERS_QUERY);
  if (allLoading) return <div>Loading...</div>;
  if (allError) return <div>{allError.message}</div>;
  const commenter = queryUser?.AllUsers?.filter(
    (user: any) => user?.id === commenterId,
  );
  if (!commenter) throw new Error("commenter is undefined");

  return (
    <>
      <form key={commenterId}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <p className="text-lg">{commenter[0]?.name}</p>
          </div>
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              className="w-full px-0 text-lg text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 outline-none resize-none"
              placeholder="Write theComment comment..."
              value={content}
              disabled
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
};

export default CommentOverview;
