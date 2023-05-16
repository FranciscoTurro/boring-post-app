import type { GetStaticProps, NextPage } from "next";
import { api } from "../utils/api";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "../server/api/root";
import { prisma } from "../server/db";
import superjson from "superjson";
import Head from "next/head";

const Profile: NextPage<{ email: string }> = ({ email }) => {
  const { data } = api.profiles.getUserByEmail.useQuery({
    email,
  });

  if (!data)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        something went wrong
      </div>
    );

  return (
    <>
      <Head>
        <title>{`${data.firstName ?? ""} (${data.email}) / Boring`}</title>
      </Head>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    //helper functions that can prefect queries on the server. calls procedures directly on the server, without an HTTP request
    router: appRouter,
    ctx: { currentUserId: null, prisma },
    transformer: superjson,
  });

  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("No slug");

  await helpers.profiles.getUserByEmail.prefetch({ email: slug });
  //prefetch is a fetch, but it doesn't return anything and it doesn't throw any errors, it just makes the query and adds it to the cache, which i then dehydrate and send to the client

  return {
    props: {
      trpcState: helpers.dehydrate(),
      email: slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default Profile;
