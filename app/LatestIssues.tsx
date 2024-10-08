import prisma from "@/prisma/client";
import { Avatar, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link, Skeleton } from "@/app/components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Flex direction="column">
      <Heading size="6" mb="3">
        Latest Issues
      </Heading>
      <Table.Root variant="surface">
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>

                  {issue.assignedToUser && (
                    <Avatar
                      size="2"
                      radius="full"
                      fallback={<Skeleton width={27} circle />}
                      src={issue.assignedToUser.image!}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default LatestIssues;
