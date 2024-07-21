import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssuesTable, {
  columnNames,
  IssueQuery,
} from "@/app/issues/list/IssuesTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statues = Object.values(Status);
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const sorts = ["asc", "desc"];
  const sort = sorts.includes(searchParams.sort)
    ? searchParams.sort
    : undefined;
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sort }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issuesCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issuesCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
