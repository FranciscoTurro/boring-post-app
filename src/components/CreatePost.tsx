import { SignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Input } from "./ui/Input";

export const CreatePost: React.FC = ({}) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="p-2">
      {user ? (
        <Image
          src={user.profileImageUrl}
          alt="User profile image"
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <SignIn />
      )}
      <Input />
    </div>
  );
};
