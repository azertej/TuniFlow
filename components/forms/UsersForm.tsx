"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userSchema } from "@/lib/validation";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/user.action";

interface params {
  clerkId: string;
  user: string;
}
const UsersForm = ({ clerkId, user }: params) => {
  const parsedUser = JSON.parse(user);
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: parsedUser.name || "",
      userName: parsedUser.userName || "",
      portfolio: parsedUser.portfolioWebsite || "",
      location: parsedUser.location || "",
      bio: parsedUser.bio || "",
    },
  });
  const [submitting, setSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof userSchema>) {
    setSubmitting(true);
    try {
      await updateUser({
        clerkId,
        updatedData:{
          name:values.name,
          userName: values.userName,
          portfolioWebsite:values.portfolio,
          location:values.location,
          bio:values.bio
        },
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark300_light700 font-semibold text-lg">
                Name <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Name .."
                  className="no-focus light-border-2 background-light700_dark300 text-dark300_light700 text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark300_light700 font-semibold text-lg">
                userName <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Username .."
                  className="no-focus light-border-2 background-light700_dark300 text-dark300_light700 text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark300_light700 font-semibold text-lg">
                Portfolio
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="Portfolio URL"
                  className="no-focus light-border-2 background-light700_dark300 text-dark300_light700 text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark300_light700 font-semibold text-lg">
                Location
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Location .."
                  className="no-focus light-border-2 background-light700_dark300 text-dark300_light700 text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-dark300_light700 font-semibold text-lg">
                Bio
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type Some Info"
                  className="no-focus light-border-2 background-light700_dark300 text-dark300_light700 text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <div className="flex justify-end ">
          <Button
            className="primary-gradient w-fit min-h-[50px] min-w-[200px] text-white font-bold uppercase"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Editing" : "Edit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UsersForm;
