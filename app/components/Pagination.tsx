"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());

    if (searchParams.get("status"))
      params.append("status", searchParams.get("status")!);
    if (searchParams.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);
    if (searchParams.get("sort"))
      params.append("sort", searchParams.get("sort")!);

    const query = params.size ? "?" + params.toString() : "";

    router.push(query);
  };

  if (pageCount <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(1)}
        disabled={currentPage === 1}
      >
        <DoubleArrowLeftIcon className="cursor-pointer" />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="cursor-pointer" />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <ChevronRightIcon className="cursor-pointer" />
      </Button>
      <Button
        color="gray"
        variant="soft"
        onClick={() => changePage(pageCount)}
        disabled={currentPage === pageCount}
      >
        <DoubleArrowRightIcon className="cursor-pointer" />
      </Button>
    </Flex>
  );
};

export default Pagination;
