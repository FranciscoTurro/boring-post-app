import type { GetStaticProps, NextPage } from "next";
import { api } from "../utils/api";
import Head from "next/head";
import Image from "next/image";
import { ProfilePosts } from "../components/ProfilePosts";
import { generateServerSideHelper } from "../server/utils/serverSideHelper";

const Profile: NextPage<{ email: string }> = ({ email }) => {
  const { data: author } = api.profiles.getUserByEmail.useQuery({
    email,
  });

  if (!author)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        something went wrong
      </div>
    );

  return (
    <>
      <Head>
        <title>{`${author.firstName ?? ""} (${author.email}) / Boring`}</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-siteBorders lg:max-w-2xl">
          <div className="relative h-1/5 bg-sitePrimaryVariant">
            <div className="absolute bottom-0 left-0 -mb-24 pl-4">
              <Image
                src={author.profilePicture}
                alt={`${author.email}'s profile picture`}
                width={80}
                height={80}
                className="h-20 w-20 self-center rounded-full border-4 border-black lg:h-32 lg:w-32"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{author.firstName}</span>
                <span className="text-lg text-neutral-300">{author.email}</span>
              </div>
            </div>
          </div>
          <div className="h-32" />
          <ProfilePosts userId={author.id} />
          {/* if the user is signed up and this is their profile show createpost here too */}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateServerSideHelper();

  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("No slug");

  await helpers.profiles.getUserByEmail.prefetch({ email: slug });
  //prefetch is a fetch, but it doesn't return anything and it doesn't throw any errors, it just makes the query and adds it to the cache, which is then dehydrated and sent to the client

  return {
    props: {
      trpcState: helpers.dehydrate(),
      email: slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" }; //??
};

export default Profile;
