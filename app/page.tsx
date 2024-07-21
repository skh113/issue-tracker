import IssuesSummary from "@/app/IssuesSummary";
import prisma from "@/prisma/client";
import IssuesChart from "@/app/IssuesChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "@/app/LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="6">
      <Flex direction="column" gap="4">
        <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
        <IssuesChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of your project issues",
};
