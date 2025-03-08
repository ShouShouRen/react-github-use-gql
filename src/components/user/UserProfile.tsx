import { GET_USER } from "@/queries";
import { UserData } from "@/type";
import { useQuery } from "@apollo/client";
import ForkedRepos from "../charts/ForkedRepos";
import PopularRepos from "../charts/PopularRepos";
import StatsContainer from "./StatsContainer";
import UserCard from "./UserCard";
import UsedLanguages from "../charts/UsedLanguages";
import Loading from "./loading";

type UserProfileProps = {
  userName: string;
};
function UserProfile({ userName }: UserProfileProps) {
  const { data, loading, error } = useQuery<UserData>(GET_USER, {
    variables: { login: userName },
  });

  if (loading) return <Loading />;

  if (error) return <h2 className="text-xl">{error.message}</h2>;

  if (!data) return <p>User Not found</p>;

  const {
    avatarUrl,
    name,
    bio,
    url,
    repositories,
    followers,
    following,
    gists,
  } = data.user;

  return (
    <div>
      <UserCard avatarUrl={avatarUrl} name={name} bio={bio} url={url} />
      <StatsContainer
        totalRepos={repositories.totalCount}
        followers={followers.totalCount}
        following={following.totalCount}
        gists={gists.totalCount}
      />
      {repositories.totalCount > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          <UsedLanguages repositories={repositories.nodes} />
          <PopularRepos repositories={repositories.nodes} />
          <ForkedRepos repositories={repositories.nodes} />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
