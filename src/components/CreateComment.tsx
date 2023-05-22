import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Textarea } from "./ui/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { api } from "../utils/api";
import { ProgressBar } from "./ui/ProgressBar";

const MAX_COMMENT_LENGTH = 140;

type CommentInput = {
  content: string;
  postId: string;
};

export const CreateComment = ({ postId }: { postId: string }) => {
  const { user } = useUser();

  const { handleSubmit, register, reset, watch } = useForm<CommentInput>();

  const ctx = api.useContext();

  const { mutate, isLoading } = api.comments.create.useMutation({
    onSuccess: () => {
      reset();
      void ctx.comments.getCommentsById.invalidate();
    },
  });

  const handleFormSubmit: SubmitHandler<CommentInput> = (data) => {
    data.postId = postId;
    mutate(data);
  };

  let inputContent = watch("content");
  if (inputContent === undefined) inputContent = "";

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
          {...register("content", {
            required: true,
            maxLength: MAX_COMMENT_LENGTH,
          })}
          placeholder="Let this guy know what's up!"
          disabled={isLoading}
          className="w-full resize-none border-0 text-xl outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="flex items-center gap-6">
          {inputContent.length > 0 && (
            <>
              <ProgressBar
                className="h-3 w-28"
                total={140}
                value={inputContent.length}
              />
              <span className="text-2xl text-siteBorders">|</span>
            </>
          )}
          <Button
            disabled={
              isLoading ||
              inputContent.length > MAX_COMMENT_LENGTH ||
              inputContent.length === 0
            }
            className="h-9"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
      {/*make the textarea grow with text, not add a scroll bar inside of it*/}
      {/*find a way to save the formatting on the post*/}
    </div>
  );
};
