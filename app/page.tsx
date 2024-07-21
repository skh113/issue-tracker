import IssuesSummary from "@/app/IssuesSummary";
import prisma from "@/prisma/client";
import IssuesChart from "@/app/IssuesChart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  return (
    <>
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <IssuesChart open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
