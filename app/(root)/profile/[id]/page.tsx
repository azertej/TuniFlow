import AnswerTab from "@/components/shared/AnswerTab";
import ProfileInfo from "@/components/shared/ProfileInfo";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { formatMonthYear } from "@/lib/utils";
import { URLProps } from "@/types/index";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = async ({ params, searchParams }: URLProps) => {
  const userInfos = await getUserInfo({ userId: params.id });
  const { userId } = auth();
  const clerkId = userId;
  return (
    <>
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start gap-4">
        <div className="flex flex-col items-start lg:flex-row gap-x-5">
          <Image
            src={userInfos.user.userPic}
            width={140}
            height={140}
            alt="userPic"
            className="rounded-full object-cover"
          />
          <div className="mt-5 flex flex-col flex-wrap">
            <span className="font-bold text-2xl text-dark100_light900">
              {userInfos.user.name}{" "}
            </span>
            <span className="text-md text-dark200_light800">
              @{userInfos.user.userName}{" "}
            </span>
            <div className="mt-1 flex flex-col max-lg:flex-row flex-wrap mb-3 ">
              <div className="flex items-start gap-x-5 my-2">
                {userInfos.user.location && (
                  <ProfileInfo
                    img="/assets/icons/location.svg"
                    title={userInfos.user.location}
                  />
                )}
                {userInfos.user.portfolioWebsite && (
                  <ProfileInfo
                    img="/assets/icons/link.svg"
                    title={userInfos.user.portfolioWebsite}
                    href={userInfos.user.portfolioWebsite}
                  />
                )}
              </div>
              <ProfileInfo
                img="/assets/icons/calendar.svg"
                title={`Joined ${formatMonthYear(userInfos.user.createdAt.toString())}`}
              />
            </div>
            {userInfos.user.bio && (
              <span className="text-dark400_light700">
                {userInfos.user.bio}{" "}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end max-sm:w-full">
          <SignedIn>
            {clerkId === userInfos.user.clerkId && (
              <Link href={`edit/${clerkId}`}>
                <Button className="btn-secondary text-dark300_light700 min-h-[40px] min-w-[170px] ">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <Stats
        totalQuestions={userInfos.userQuestions}
        totalAnswers={userInfos.userAnswers}
      />
      <div className="mt-10">
        <Tabs defaultValue="top-posts" className=" flex-1">
          <TabsList className="background-light800_dark400 min-h-[40px]">
            <TabsTrigger value="top-posts" className="tab">
              Top-posts
            </TabsTrigger>
            <TabsTrigger value="answers" className="tab">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            <QuestionTab
              userId={userInfos.user._id}
              clerkId={clerkId ?? undefined}
              searchParams={searchParams}
            />
          </TabsContent>
          <TabsContent value="answers">
            <AnswerTab
              userId={userInfos.user._id}
              userClerkId={userInfos.user.clerkId}
              clerkId={clerkId ?? undefined}
              searchParams={searchParams}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
