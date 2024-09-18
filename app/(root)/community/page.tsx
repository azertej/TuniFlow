import UserCards from "@/components/cards/UserCards";
import LocalFilter from "@/components/shared/LocalFilter";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getUsers } from "@/lib/actions/user.action";
import React from "react";

const Community = async () => {
  const allUsers = await getUsers({});
  return (
    <section className="flex flex-col gap-y-8">
      <span className="font-bold text-3xl text-dark100_light900 ">
        All Users
      </span>
      <div className="flex gap-x-5 max-sm:flex-col max-sm:gap-y-5">
        <LocalSearch
          placeholder="Search users..."
          iconPosition="left"
          iconImage="/assets/icons/search.svg"
        />
        <LocalFilter filters={UserFilters} otherClass="min-h-[60px]" />
      </div>
      <section className="flex justify-center">
        {allUsers && allUsers.users.length > 0 ? (
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {allUsers.users.map((user) => (
              <UserCards key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <NoResult
            title="There's no Users to show"
            description="Be the first User . Get Involved !"
            buttonTitle="Ask a question"
          />
        )}
      </section>
    </section>
  );
};

export default Community;
