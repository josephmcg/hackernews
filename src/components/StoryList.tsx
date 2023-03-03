import { useState } from "react";
import { useQuery } from "react-query";
import { Button } from "~/components/Button";
import { Loader } from "~/components/Loader";
import { StoryListItem } from "~/components/StoryListItem";
import { NUM_PER_PAGE, NUM_TOTAL_STORIES } from "~/constants";
import { Story } from "~/types";

export const StoryList: React.FC = () => {
  const [page, setPage] = useState(1);

  const bottomResultsInfo = () => {
    if (page === 1) {
      return `${page}-${NUM_PER_PAGE} of ${NUM_TOTAL_STORIES}`;
    }
    return `${(page - 1) * NUM_PER_PAGE + 1}-${
      page * NUM_PER_PAGE
    } of ${NUM_TOTAL_STORIES}`;
  };

  // fetch all story ids
  const { error: idError, data: storyIds } = useQuery<Story["id"][]>(
    "storyIds",
    () =>
      fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
      ).then((res) => res.json())
  );

  // is first fetch done
  const areIdsReady = Boolean(storyIds?.length);

  // using previously fetched ids, fetch all stories for current page
  const {
    isLoading,
    isIdle,
    error: storyError,
    data: stories,
  } = useQuery<Story[]>(
    ["stories", areIdsReady, page],
    async () => {
      const startingIndex = page === 1 ? 0 : NUM_PER_PAGE * (page - 1);
      const endingIndex = page * NUM_PER_PAGE;
      const idsToFetch = storyIds?.slice(startingIndex, endingIndex);

      if (!idsToFetch) {
        return [];
      }
      const stories = await Promise.all(
        idsToFetch.map(async (id) => {
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          );
          return await res.json();
        })
      );
      return stories;
    },
    {
      // The query will not execute until the story ids have been fetched
      enabled: areIdsReady,
    }
  );

  if (idError || storyError) {
    return <div className="text-red-500">An error has occured.</div>;
  }

  return (
    <>
      {isLoading || isIdle ? (
        <Loader size="xl" />
      ) : (
        <div className="flex w-full max-w-3xl flex-col gap-2">
          {stories?.map((story) => (
            <StoryListItem key={story.id} {...story} />
          ))}
        </div>
      )}
      <div className="flex w-full max-w-3xl items-center gap-2">
        <div className="mr-auto text-sm">{bottomResultsInfo()}</div>
        {/* 
          generate an array of n integers (starting from 0).
          n = NUM_TOTAL_STORIES / NUM_PER_PAGE */}
        {[...Array(NUM_TOTAL_STORIES / NUM_PER_PAGE).keys()].map((i) => (
          <Button
            key={i}
            onClick={() => setPage(i + 1)}
            size="lg"
            active={page === i + 1}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  );
};
