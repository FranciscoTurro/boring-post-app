import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
type PostObjType = RouterOutputs["posts"]["getAll"][0];

interface PostProps {
  PostObj: PostObjType;
}

export const Post: React.FC<PostProps> = ({
  PostObj: { author, post },
}: PostProps) => {
  return (
    <div className="flex cursor-pointer gap-3 border-b border-siteBorders px-4 py-6 hover:bg-siteBackgroundHover">
      <Image
        src={author.profilePicture}
        alt="User profile image"
        width={48}
        height={48}
        className="self-center rounded-full"
      />
      <div>
        <div className="flex gap-1 text-sm font-bold text-neutral-300">
          <div>{author.email}</div>
          <span>·</span>
          <div> x hours ago</div>
        </div>
        <div>{post.content}</div>
      </div>
    </div>
  );
};
