import { useUser } from "@clerk/nextjs";

export const CreatePost: React.FC = ({}) => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="p-2">
      <img
        className="h-10 w-10 rounded-full"
        src={user.profileImageUrl}
        alt="User profile image"
      />
    </div>
  );
};
