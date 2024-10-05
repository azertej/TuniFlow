import QuestionCards from "@/components/cards/QuestionCards";
import LocalFilter from "@/components/shared/LocalFilter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getTagByID } from "@/lib/actions/tags.action";
import { URLProps } from "@/types/index";
import React from "react";

const Tag = async ({ params, searchParams }: URLProps) => {
  const tag = await getTagByID({
    tagId: params.id,
    searchQuery: searchParams.q,
  });
  return (
    <section className="flex flex-col gap-y-8 w-full">
      <span className="font-bold text-3xl text-dark100_light900 ">
        {tag.tagName}
      </span>
      <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-y-5">
        <LocalSearch
          route={`/tags/${params.id}`}
          placeholder="Search tags..."
          iconPosition="left"
          iconImage="/assets/icons/search.svg"
        />
        <LocalFilter filters={TagFilters} otherClass="min-h-[60px]" />
      </div>
      <section className="flex justify-center">
        {tag && tag.questions.length > 0 ? (
          <div className="w-full">
            {tag.questions.map((tagQuestion: any) => (
              <QuestionCards
                key={tagQuestion._id}
                _id={tagQuestion._id}
                title={tagQuestion.title}
                tags={tagQuestion.tags}
                auther={tagQuestion.author}
                votes={tagQuestion.upVotes}
                views={tagQuestion.views}
                answers={tagQuestion.answers}
                created={tagQuestion.createdAt}
              />
            ))}
          </div>
        ) : (
          <NoResult
            title="There's no Tags to show"
            description="Add a question with tags. Get Involved !"
            buttonTitle="Ask a question"
          />
        )}
      </section>
    </section>
  );
};

export default Tag;
