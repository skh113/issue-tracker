"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: Status.OPEN },
  { label: "Closed", value: Status.CLOSED },
  { label: "In Progress", value: Status.IN_PROGRESS },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || "null"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
