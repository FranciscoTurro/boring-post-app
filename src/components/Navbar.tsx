import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHome } from "react-icons/ai";
import { FiUserCheck, FiUserX } from "react-icons/fi";

export const Navbar = () => {
  const { signOut, openSignIn } = useClerk();
  const { isSignedIn } = useUser();
  const router = useRouter();
  return (
    <main className="flex h-full justify-center">
      <div className="flex h-10 w-full items-center justify-center gap-20 border-x border-b border-siteBorders lg:max-w-2xl">
        <Link href={"/"}>
          <AiFillHome />
        </Link>
        {isSignedIn ? (
          <button
            onClick={() => {
              void signOut();
              void router.push("/");
            }}
          >
            <FiUserX />
          </button>
        ) : (
          <button
            onClick={() => {
              void openSignIn();
              void router.push("/");
            }}
          >
            <FiUserCheck />
          </button>
        )}
      </div>
    </main>
  );
};
