"use client";

import { Select } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/app/components";
import { toast, Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const UnassignedValue = "null";
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  const handleAssignUser = async (userId: string) => {
    await axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === UnassignedValue ? null : userId,
      })
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  if (isLoading) return <Skeleton height={32} />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || UnassignedValue}
        onValueChange={handleAssignUser}
      >
        <Select.Trigger placeholder="Asign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value={UnassignedValue}>Unassigned</Select.Item>
            {users?.map(({ id, name }) => (
              <Select.Item key={id} value={id}>
                {name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
