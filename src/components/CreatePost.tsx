import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Textarea } from "./ui/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/Button";

type PostInput = {
  content: string;
};

export const CreatePost: React.FC = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostInput>();

  const handleFormSubmit: SubmitHandler<PostInput> = (data) => {
    console.log(data);
  };

  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex gap-3 border-b border-siteBorders px-4 py-6">
      <Image
        src={user.profileImageUrl}
        alt="Your profile image"
        width={48}
        height={48}
        className="self-center rounded-full"
      />
      <form
        className="flex w-full flex-col items-end"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Textarea
          {...register("content", { required: true, maxLength: 140 })}
          placeholder="Thoughts?"
          className="w-full resize-none border-0 text-xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button type="submit">Submit</Button>
      </form>
      {/*make the textarea grow with text, not add a scroll bar inside of it, also dont keep writing if over 140 characters*/}
      {/*find a way to save the formatting on the post*/}
    </div>
  );
};
