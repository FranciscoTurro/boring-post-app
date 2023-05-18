import { api } from "../utils/api";
import { Post } from "./Post";
import { LoadingSpinner } from "./ui/LoadingSpinner";

interface ProfilePostProps {
  userId: string;
}

export const ProfilePosts: React.FC<ProfilePostProps> = ({ userId }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({ userId });

  if (isLoading)
    return (
      <div className="flex w-full justify-center border-x border-t border-siteBorders lg:max-w-2xl">
        <LoadingSpinner />
      </div>
    );

  if (!data)
    return (
      <div className="flex w-full justify-center border-x border-t border-siteBorders lg:max-w-2xl">
        something went wrong
      </div>
    );

  return (
    <div className="w-full border-x border-t border-siteBorders lg:max-w-2xl">
      {data.map((postObj) => {
        return <Post PostObj={postObj} key={postObj.post.id} />;
      })}
    </div>
  );
};
