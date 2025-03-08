import { Repository } from "@/type";

export const calculateMostForkedRepos = (
  repositories: Repository[]
): { repo: string; count: number }[] => {
  if (repositories.length === 0) {
    return [];
  }

  const forkedRepos = repositories
    .map((repo) => ({
      repo: repo.name,
      count: repo.forkCount,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return forkedRepos;
};

export const calculateMostStarredRepos = (
  repositories: Repository[]
): { repo: string; starts: number }[] => {
  if (repositories.length === 0) {
    return [];
  }

  const starredRepos = repositories
    .map((repo) => ({
      repo: repo.name,
      starts: repo.stargazerCount,
    }))
    .sort((a, b) => b.starts - a.starts)
    .slice(0, 5);

  return starredRepos;
};

export const calculatePopularLanguages = (
  repositories: Repository[]
): { language: string; count: number }[] => {
  if (repositories.length === 0) {
    return [];
  }

  const languageMap: { [key: string]: number } = {};

  repositories.forEach((repo) => {
    if (repo.languages.edges.length == 0) {
      return;
    }
    repo.languages.edges.forEach((language) => {
      const { name } = language.node;
      languageMap[name] = (languageMap[name] || 0) + 1;
    });
  });

  if (Object.keys(languageMap).length === 0) {
    return [];
  }

  return Object.entries(languageMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, count]) => ({ language, count }));
};
