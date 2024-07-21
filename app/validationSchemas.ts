import { Status } from "@prisma/client";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required!").max(255),
  description: z.string().min(1, "Description is required!").max(65535),
  status: z.enum([Status.CLOSED, Status.IN_PROGRESS, Status.OPEN]),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required!").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(65535)
    .optional(),
  status: z.enum([Status.CLOSED, Status.IN_PROGRESS, Status.OPEN]).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required!")
    .max(255)
    .optional()
    .nullable(),
});
