"use client";
import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { answersFormSchema } from "@/lib/validation";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/themeProvider";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

interface answerProps {
  questionId: string;
  authorId: string;
}
const AnswersForm = ({ questionId, authorId }: answerProps) => {
  const pathName = usePathname();
  const { mode } = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof answersFormSchema>>({
    resolver: zodResolver(answersFormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof answersFormSchema>) {
    setSubmitting(true);
    try {
      await createAnswer({
        content: values.content,
        author: JSON.parse(authorId),
        question: questionId,
        path: pathName,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-col-reverse justify-between sm:flex-row sm:items-center my-4">
        <span className="paragraph-semibold text-dark400_light800">
          You can answer here
        </span>
        <Button className=" text-primary-500 dark:text-primary-500 p-3 flex gap-x-2 dark:bg-slate-800">
          <span className="text-primary-500 dark:text-primary-500 ">
            Answer with AI
          </span>
          <Image
            src="/assets/icons/stars.svg"
            width={16}
            height={16}
            alt="AIicon"
            className="object-contain"
          />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                    onInit={(_evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 500,
                      menubar: false,
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
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient !text-light-900 min-w-[200px]"
              disabled={submitting}
            >
              {submitting ? "Posting..." : "Answer a question"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AnswersForm;
