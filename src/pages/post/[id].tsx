import { GetStaticProps, type NextPage } from "next";
import { generateServerSideHelper } from "../../server/utils/serverSideHelper";
import { api } from "../../utils/api";
import Head from "next/head";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";

const SinglePost: NextPage<{ postId: string }> = ({ postId }) => {
  const { data, isLoading } = api.posts.getPostById.useQuery({ postId });

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
    <>
      <Head>
        <title>{`${data.author.firstName ?? ""} on Boring: "${
          data.post.content ?? ""
        }"`}</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-siteBorders lg:max-w-2xl"></div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateServerSideHelper();

  const id = context.params?.id;
  if (typeof id !== "string") throw new Error("No slug");

  await helpers.posts.getPostById.prefetch({ postId: id });
  //prefetch is a fetch, but it doesn't return anything and it doesn't throw any errors, it just makes the query and adds it to the cache, which is then dehydrated and sent to the client

  return {
    props: {
      trpcState: helpers.dehydrate(),
      postId: id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" }; //??
};

export default SinglePost;
