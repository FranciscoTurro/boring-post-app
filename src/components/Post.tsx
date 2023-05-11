import type { Post as PostType } from "@prisma/client";

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="border border-siteBorders px-4 py-6">{post.content}</div>
  );
};
