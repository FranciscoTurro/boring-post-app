import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";

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
      <Link href={`/${author.email}`}>
        <Image
          src={author.profilePicture}
          alt={`${author.email}'s profile picture`}
          width={48}
          height={48}
          className="self-center rounded-full hover:border-2 hover:border-sitePrimary"
        />
      </Link>
      <div className="w-full break-words">
        <Link href={`post/${post.id}`}>
          <div className="flex gap-1 text-sm text-neutral-300">
            <Link href={`/${author.email}`}>
              <div className="font-bold hover:text-sitePrimary hover:underline">
                {author.email}
              </div>
            </Link>
            <span>·</span>
            <div> {dayjs(post.createdAt).fromNow()}</div>
          </div>
          <div className="overflow-anywhere text-lg">{post.content}</div>
        </Link>
      </div>
    </div>
  );
};
