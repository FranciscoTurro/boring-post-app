import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Textarea } from "./ui/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { api } from "../utils/api";

type PostInput = {
  content: string;
};

export const CreatePost = ({}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    //maybe add watch to check when the post user is writing goes over 140 characters
  } = useForm<PostInput>();

  const { user } = useUser();

  if (!user) return null;

  const ctx = api.useContext();

  const handleFormSubmit: SubmitHandler<PostInput> = (data) => {
    mutate(data);
  };

  const { mutate, isLoading } = api.posts.create.useMutation({
    onSuccess: () => {
      reset();
      void ctx.posts.getAll.invalidate();
    },
  });

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
          disabled={isLoading}
          className="w-full resize-none border-0 text-xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
      {/*make the textarea grow with text, not add a scroll bar inside of it, also dont keep writing if over 140 characters*/}
      {/*find a way to save the formatting on the post*/}
    </div>
  );
};
