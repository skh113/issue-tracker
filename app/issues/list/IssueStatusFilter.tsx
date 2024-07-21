"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";
import { UnassignedValue } from "@/app/constants";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: Status.OPEN },
  { label: "Closed", value: Status.CLOSED },
  { label: "In Progress", value: Status.IN_PROGRESS },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === UnassignedValue ? "" : `?status=${status}`;
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || UnassignedValue}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
