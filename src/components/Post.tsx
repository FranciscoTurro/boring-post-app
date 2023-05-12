import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
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
        alt={`${author.email}'s profile picture`}
        width={48}
        height={48}
        className="self-center rounded-full"
      />
      <div>
        <div className="flex gap-1 text-sm text-neutral-300">
          <div className="font-bold">{author.email}</div>
          <span>·</span>
          <div> {dayjs(post.createdAt).fromNow()}</div>
        </div>
        <div className="text-lg">{post.content}</div>
      </div>
    </div>
  );
};
