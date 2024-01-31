import { Status } from '@prisma/client';

export const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'green' | 'orange' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  CLOSED: { label: 'Closed', color: 'green' },
  IN_PROGRESS: { label: 'In Progress', color: 'orange' }
};
