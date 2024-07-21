import { Card, Flex, Text } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { Link } from "@/app/components";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesSummary = ({ closed, inProgress, open }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: Status.OPEN },
    {
      label: "In-progress Issues",
      value: inProgress,
      status: Status.IN_PROGRESS,
    },
    { label: "Closed Issues", value: closed, status: Status.CLOSED },
  ];

  return (
    <Flex gap="4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="2">
            <Link
              className="text-sm font-medium"
              href={`/issues/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssuesSummary;
