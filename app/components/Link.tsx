import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
  className?: string;
}

const Link = ({ children, href, className }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink className={className}>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
