import dayjs from "dayjs";
import type { RouterOutputs } from "../utils/api";
import Image from "next/image";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";

type CommentObjType = RouterOutputs["comments"]["getCommentsById"][0];
dayjs.extend(relativeTime);

interface CommentProps {
  CommentObj: CommentObjType;
}

export const Comment: React.FC<CommentProps> = ({ CommentObj }) => {
  const { author, comment } = CommentObj;

  return (
    <div className="flex gap-3 border-b border-siteBorders px-4 py-6">
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
        <div className="flex gap-1 text-sm text-neutral-300">
          <Link href={`/${author.email}`}>
            <div className="font-bold hover:text-sitePrimary hover:underline">
              {author.email}
            </div>
          </Link>
          <span>·</span>
          <div> {dayjs(comment.createdAt).fromNow()}</div>
        </div>
        <div className="overflow-anywhere text-lg">{comment.content}</div>
      </div>
    </div>
  );
};
