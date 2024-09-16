"use client";
import React, { useState } from "react";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { questionFormSchema } from "@/lib/validation";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

interface props {
  clerkUserId: string;
}
const QuestionsForm = ({ clerkUserId }: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const buttonType: any = "create";
  const [submitting, setSubmitting] = useState(false);
  const editorRef = useRef(null);

  const form = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  const handleKeyDownTags = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagVInput = e.target as HTMLInputElement;
      const tagValue = tagVInput.value.trim();
      if (!(tagValue === "")) {
        if (tagValue.length > 15) {
          form.setError("tags", {
            type: "required",
            message: "tag length must be under 15 characters",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagVInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  
  const handleDeleteTag = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  async function onSubmit(values: z.infer<typeof questionFormSchema>) {
    setSubmitting(true);
    try {
      console.log(values);
      await createQuestion({
        title: values.title,
        explanation: values.explanation,
        tags: values.tags,
        author: JSON.parse(clerkUserId),
        path:pathname
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-md font-semibold text-dark400_light800">
                Question Title
              </FormLabel>
              <FormControl>
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-10 border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-light-500 text-sm font-semibold">
                Be scpecific !
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-dark400_light800">
                Detail explanation of your Problem
              </FormLabel>
              <FormControl>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(_evt, editor) => {
                    //@ts-ignore
                    editorRef.current = editor;
                  }}
                  initialValue=""
                  onBlur={field.onBlur}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 350,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo " +
                      "codesample | bold italic forecolor | alignright alignjustify alignleft aligncenter " +
                      " bullist numlist ",
                    content_style: "body { font-family:Inter; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="text-light-500 text-sm font-semibold">
                Introduce The problem and expand on what you put in the title .
                Min 15 Characters
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-semibold text-dark400_light800">
                Tags
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-y-3 ">
                  <Input
                    placeholder="Tags ..."
                    className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-10 border"
                    onKeyDown={(e) => handleKeyDownTags(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex gap-x-4">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          onClick={() => handleDeleteTag(tag, field)}
                          className="p-3 rounded-md capitalize background-light800_dark300 text-light500 flex items-center justify-center gap-x-1"
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            width={12}
                            height={12}
                            alt="closeIcon"
                            className="object-contain invert-0 dark:invert cursor-pointer"
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-light-500 text-sm font-semibold">
                Add up to 3 tags to descripe what your question is about
              </FormDescription>
              <FormMessage className="text-red-600 " />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient !text-light-900 w-full"
          disabled={submitting}
        >
          {submitting ? (
            <>{buttonType === "create" ? "Posting..." : "Editing..."}</>
          ) : (
            <>{buttonType === "create" ? "Ask a question" : "Edit question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionsForm;
