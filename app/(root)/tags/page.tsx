import TagCards from "@/components/cards/TagCards";
import LocalFilter from "@/components/shared/LocalFilter";
import NoResult from "@/components/shared/NoResult";
import Paginations from "@/components/shared/Paginations";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { allTags } from "@/lib/actions/tags.action";
import { SearchParamsProps } from "@/types/index";
import React from "react";

const Tags = async ({ searchParams }: SearchParamsProps) => {
  const tags = await allTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <section className="flex flex-col gap-y-8">
        <span className="font-bold text-3xl text-dark100_light900 ">
          All Tags
        </span>
        <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-y-5">
          <LocalSearch
            route="/tags"
            placeholder="Search tags..."
            iconPosition="left"
            iconImage="/assets/icons/search.svg"
          />
          <LocalFilter filters={TagFilters} otherClass="min-h-[60px]" />
        </div>
        <section className="flex justify-center">
          {tags && tags.tags.length > 0 ? (
            <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {tags.tags.map((tag) => (
                <TagCards key={tag._id} tag={tag} />
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
      <Paginations
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={tags.isNext}
      />
    </>
  );
};

export default Tags;
