import { type Repository } from "@/type";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { calculateMostStarredRepos } from "@/utils/utils";

const PopularRepos = ({ repositories }: { repositories: Repository[] }) => {
  const popularRepos = calculateMostStarredRepos(repositories);
  console.log(popularRepos);

  const chartConfig = {
    repo: {
      label: "Repository",
      color: "#e11c47",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Popular Repos</h2>
      <ChartContainer config={chartConfig} className="h-100 w-full">
        <BarChart accessibilityLayer data={popularRepos}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="repo"
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <YAxis dataKey="starts" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="starts" fill="var(--color-)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default PopularRepos;
