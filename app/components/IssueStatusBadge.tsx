import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import { statusMap } from '../constants';

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
