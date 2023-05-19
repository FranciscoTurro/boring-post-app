import { GetStaticProps, type NextPage } from "next";
import { generateServerSideHelper } from "../../server/utils/serverSideHelper";
import { api } from "../../utils/api";
import Head from "next/head";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

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

  const { author, post } = data;

  return (
    <>
      <Head>
        <title>{`${data.author.firstName ?? ""} on Boring: "${
          data.post.content ?? ""
        }"`}</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-siteBorders lg:max-w-2xl">
          <div className="flex flex-col gap-4 border-b border-siteBorders px-4 py-6">
            <Link href={`/${author.email}`}>
              <div className="flex gap-3">
                <Image
                  src={author.profilePicture}
                  alt={`${author.email}'s profile picture`}
                  width={48}
                  height={48}
                  className="self-center rounded-full hover:border-2 hover:border-sitePrimary"
                />
                <div className="flex flex-col">
                  <div className="font-bold hover:text-sitePrimary hover:underline">
                    {author.firstName}
                  </div>
                  <div className="text-neutral-300">{author.email}</div>
                </div>
              </div>
            </Link>
            <div className="break-words text-xl">{post.content}</div>
            <div className="flex gap-1 text-sm text-neutral-300">
              <div>{dayjs(post.createdAt).format("hh:mm A")}</div>
              <span>·</span>
              <div>{dayjs(post.createdAt).format("MMMM D, YYYY")}</div>
            </div>
          </div>
        </div>
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
