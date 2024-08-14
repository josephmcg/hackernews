import { QueryClient, QueryClientProvider } from 'react-query'

import { StoryList } from '~/components/StoryList'
import { NUM_TOTAL_STORIES } from '~/constants'

const queryClient = new QueryClient()

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex h-full flex-grow flex-col items-center justify-between gap-6 px-4 pt-8">
        <h1 className="text-3xl">
          Top {NUM_TOTAL_STORIES} Hacker News Stories
        </h1>
        <StoryList />
      </main>
    </QueryClientProvider>
  )
}

export default App
