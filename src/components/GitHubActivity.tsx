import { useEffect, useState } from "react";
import {
  getGitHubCommits,
  type GitHubFetchResult,
} from "@/services/githubService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  ExternalLink,
  GitCommitHorizontal,
  GitFork,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface GitHubActivityProps {
  username: string;
  repo: string;
}

const GitHubActivity = ({ username, repo }: GitHubActivityProps) => {
  const [commits, setCommits] = useState<GitHubFetchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCommits() {
      try {
        setIsLoading(true);
        setError(null);

        const commits: GitHubFetchResult[] = await getGitHubCommits(
          username,
          repo,
        );

        setCommits(commits);
      } catch {
        setCommits([]);
        setError("Could not load commit history.");
      } finally {
        setIsLoading(false);
      }
    }

    loadCommits();
  }, [username, repo]);

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg border border-purple-950/70 bg-slate-950/80 text-slate-100 shadow-sm">
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-slate-800 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-purple-900/70 bg-[var(--accent-soft)]">
            <GitFork className="size-4 text-purple-200" aria-hidden="true" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">Recent commits</h2>
            <p className="truncate text-xs text-slate-400">
              {username}/{repo}
            </p>
          </div>
        </div>

        <a
          href={`https://github.com/${username}/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${username}/${repo} on GitHub`}
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-[var(--accent-soft)] hover:text-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>

      <ScrollArea className="h-[320px] max-h-[320px]">
        <div className="p-2">
          {isLoading && <CommitSkeleton />}

          {!isLoading && error && <StateMessage icon="error" text={error} />}

          {!isLoading && !error && commits.length === 0 && (
            <StateMessage
              icon="empty"
              text="No recent commits were found for this repository."
            />
          )}

          {!isLoading &&
            !error &&
            commits.map((commit, index) => (
              <CommitRow
                key={commit.sha}
                commit={commit}
                showSeparator={index < commits.length - 1}
              />
            ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface CommitRowProps {
  commit: GitHubFetchResult;
  showSeparator: boolean;
}

const CommitRow = ({ commit, showSeparator }: CommitRowProps) => (
  <a
    href={commit.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="block rounded-md px-3 py-2.5 transition-colors hover:bg-[var(--accent-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
  >
    <div className="flex min-w-0 items-start gap-3">
      <GitCommitHorizontal
        className="mt-0.5 size-4 shrink-0 text-purple-300/70"
        aria-hidden="true"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-5 text-slate-100">
          {commit.commit.message}
        </p>

        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
          <span className="max-w-[12rem] truncate">
            {commit.commit.author.name}
          </span>
          <span aria-hidden="true">•</span>
          <span>
            {formatDistanceToNow(new Date(commit.commit.author.date), {
              addSuffix: true,
            })}
          </span>
          <span aria-hidden="true">•</span>
          <code className="font-mono text-slate-300">
            {commit.sha.slice(0, 7)}
          </code>
        </div>
      </div>
    </div>

    {showSeparator && <Separator className="mt-2 bg-slate-800" />}
  </a>
);

const CommitSkeleton = () => (
  <div className="space-y-2 p-1" aria-label="Loading commits">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="rounded-md px-3 py-2.5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 size-4 shrink-0 rounded-full bg-slate-800" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-slate-800" />
            <div className="h-3 w-1/2 rounded bg-slate-900" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

interface StateMessageProps {
  icon: "empty" | "error";
  text: string;
}

const StateMessage = ({ icon, text }: StateMessageProps) => {
  const Icon = icon === "error" ? AlertCircle : GitCommitHorizontal;

  return (
    <div className="flex h-[280px] flex-col items-center justify-center gap-3 px-6 text-center text-sm text-slate-400">
      <Icon className="size-5 text-slate-500" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
};

export default GitHubActivity;
