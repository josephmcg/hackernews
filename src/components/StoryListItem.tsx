import { ChatBubbleLeftIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Story } from "~/types";

export const StoryListItem: React.FC<Story> = ({
  by,
  id,
  title,
  url,
  score,
  descendants,
}) => {
  return (
    <div className="flex min-h-[4.25rem] items-center gap-6 rounded border-2 border-slate-600 bg-slate-700 px-4 py-2">
      <div className="flex w-12 flex-shrink-0 flex-col gap-2 text-xs">
        <div className="flex items-center justify-between gap-2">
          <ChevronUpIcon className="h-5 w-5 flex-shrink-0" />
          <span>
            <span className="sr-only">score:</span>
            {score}
          </span>
        </div>
        {/* cant use falsy since descendants can be 0 */}
        {typeof descendants === "number" && (
          <a
            className="flex items-center justify-between gap-2 rounded hover:underline"
            href={`https://news.ycombinator.com/item?id=${id}`}
            target="_blank"
            rel="noreferrer"
            title="view comments on Hacker News"
          >
            <ChatBubbleLeftIcon className="h-5 w-5 flex-shrink-0" />
            {}
            <span>
              <span className="sr-only">descendants:</span>
              {descendants}
            </span>
          </a>
        )}
      </div>
      <div className="flex h-full flex-col justify-between">
        <a
          className={clsx(
            "self-start rounded",
            url && "text-blue-400 hover:underline"
          )}
          href={url}
          target="_blank"
          rel="noreferrer"
          title={title}
          data-testid="link"
        >
          {title}
        </a>
        <div className="text-sm text-slate-400">by: {by}</div>
      </div>
    </div>
  );
};
