import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Textarea } from "./ui/Textarea";

export const CreatePost: React.FC = ({}) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex gap-3 border-b border-siteBorders px-4 py-6">
      <Image
        src={user.profileImageUrl}
        alt="User profile image"
        width={48}
        height={48}
        className="self-center rounded-full"
      />
      <Textarea
        placeholder="Thoughts?"
        className="w-full resize-none border-0 text-xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {/*make the textarea grow with text, not add a scroll bar inside of it*/}
    </div>
  );
};
//react hook form
