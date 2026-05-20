import { useEffect, useState } from "react";
import {
  getGitHubCommits,
  type GitHubFetchResult,
} from "../services/githubService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { GitCommitHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface GitHubActivityProps {
  username: string;
  repo: string;
}

const GitHubActivity = ({ username, repo }: GitHubActivityProps) => {
  const [commits, setCommits] = useState<GitHubFetchResult[]>([]);

  useEffect(() => {
    async function loadCommits() {
      const commits: GitHubFetchResult[] = await getGitHubCommits(
        username,
        repo,
      );
      console.log(commits);
      setCommits(commits);
    }

    loadCommits();
  }, [username, repo]);

  return (
    <div className="rounded-xl border bg-card">
      <ScrollArea className="h-[320px]">
        <div className="p-4">
          {commits.map((c) => (
            <a
              key={c.sha}
              href={c.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-3 transition-colors hover:bg-muted"
            >
              <div className="flex items-start gap-3">
                <GitCommitHorizontal className="mt-1 h-4 w-4 text-muted-foreground" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {c.commit.message}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{c.commit.author.name}</span>
                    <span>•</span>

                    <span>
                      {formatDistanceToNow(new Date(c.commit.author.date), {
                        addSuffix: true,
                      })}
                    </span>

                    <span>•</span>

                    <code className="font-mono">{c.sha.slice(0, 7)}</code>
                  </div>
                </div>
              </div>

              <Separator className="mt-3" />
            </a>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default GitHubActivity;
