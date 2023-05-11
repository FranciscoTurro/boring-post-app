import type { Post as PostType } from "@prisma/client";

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="cursor-pointer border-b border-siteBorders px-4 py-6 hover:bg-siteBackgroundHover">
      {post.content}
    </div>
  );
};
