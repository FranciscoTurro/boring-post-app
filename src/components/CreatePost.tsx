import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Textarea } from "./ui/Textarea";

export const CreatePost: React.FC = ({}) => {
  const { user } = useUser();
  console.log(user);

  if (!user) return null;

  return (
    <div className="flex gap-3 border-b border-siteBorders p-4 lg:p-8">
      <div>
        <Image
          src={user.profileImageUrl}
          alt="User profile image"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <Textarea className="w-full resize-none" />
    </div>
  );
};
//proper ui, dont just folow the tut on this one. make everything look better
//react hook form
