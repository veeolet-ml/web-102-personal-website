
export type GitHubFetchResult = {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  html_url: string;
};

export async function getGitHubCommits(
  username: string,
  repo: string,
): Promise<GitHubFetchResult[]> {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repo}/commits`,
  );

  if (!res.ok) {
    throw new Error(`GitHub request failed with status ${res.status}`);
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}
