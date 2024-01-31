import { Status } from '@prisma/client';
import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required!').max(255),
  description: z.string().min(1, 'Description is required!'),
  status: z.enum([Status.CLOSED, Status.IN_PROGRESS, Status.OPEN])
});
