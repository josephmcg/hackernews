import { useState } from 'react'
import { useQuery } from 'react-query'

import { Button } from '~/components/Button'
import { Loader } from '~/components/Loader'
import { StoryListItem } from '~/components/StoryListItem'
import { NUM_PER_PAGE, NUM_TOTAL_STORIES } from '~/constants'
import type { Story } from '~/types'

export const StoryList: React.FC = () => {
  const [page, setPage] = useState(1)

  function handleClick(newPage: number): void {
    setPage(newPage)
    document.documentElement.scrollTop = 0
  }

  const bottomResultsInfo = (): string => {
    if (page === 1) {
      return `${page.toString()}-${NUM_PER_PAGE.toString()} of ${NUM_TOTAL_STORIES.toString()}`
    }
    return `${((page - 1) * NUM_PER_PAGE + 1).toString()}-${(
      page * NUM_PER_PAGE
    ).toString()} of ${NUM_TOTAL_STORIES.toString()}`
  }

  // fetch all story ids
  const { error: idError, data: storyIds } = useQuery<Story['id'][]>(
    'storyIds',
    () =>
      fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      ).then((res) => res.json()),
  )

  // is first fetch done
  const areIdsReady = Boolean(storyIds?.length)

  // using previously fetched ids, fetch all stories for current page
  const {
    isLoading,
    isIdle,
    error: storyError,
    data: stories,
  } = useQuery<Story[]>(
    ['stories', areIdsReady, page],
    async () => {
      const startingIndex = page === 1 ? 0 : NUM_PER_PAGE * (page - 1)
      const endingIndex = page * NUM_PER_PAGE
      const idsToFetch = storyIds?.slice(startingIndex, endingIndex)

      if (!idsToFetch) {
        return []
      }
      const stories = await Promise.all(
        idsToFetch.map(async (id) => {
          const res = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id.toString()}.json?print=pretty`,
          )
          return (await res.json()) as Story
        }),
      )
      return stories
    },
    {
      // The query will not execute until the story ids have been fetched
      enabled: areIdsReady,
    },
  )

  if (idError || storyError) {
    return <div className="text-red-500">An error has occured.</div>
  }

  return (
    <>
      {isLoading || isIdle ? (
        <Loader size="xl" />
      ) : (
        <div className="flex w-full max-w-3xl flex-col gap-2">
          {stories?.map((story) => <StoryListItem key={story.id} {...story} />)}
        </div>
      )}
      <div className="sticky bottom-0 flex w-full max-w-3xl items-center gap-2 bg-slate-800 py-4 shadow-lg">
        <div className="mr-auto text-sm">{bottomResultsInfo()}</div>
        {[
          ...Array.from({ length: NUM_TOTAL_STORIES / NUM_PER_PAGE }).keys(),
        ].map((i) => (
          <Button
            key={i}
            size="lg"
            active={page === i + 1}
            onClick={() => {
              handleClick(i + 1)
            }}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  )
}
