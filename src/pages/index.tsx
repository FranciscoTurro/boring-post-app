import { type NextPage } from "next";
import { api } from "~/utils/api";
import { Post } from "../components/Post";
import { CreatePost } from "../components/CreatePost";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!data)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        something went wrong
      </div>
    );

  return (
    <main className="flex h-full justify-center">
      <div className="w-full border-x border-siteBorders lg:max-w-2xl">
        <CreatePost />
        {data.map((postObj) => (
          <Post PostObj={postObj} key={postObj.post.id} />
        ))}
      </div>
    </main>
  );
};

export default Home;
