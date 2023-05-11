import { type NextPage } from "next";
import { api } from "~/utils/api";
import { Post } from "../components/Post";
import { CreatePost } from "../components/CreatePost";

const Home: NextPage = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>...loading...</div>;

  if (!data) return <div>something went wrong</div>;

  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x-2 border-siteBorders lg:max-w-2xl">
        <CreatePost />
        {data.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </main>
  );
};

export default Home;
