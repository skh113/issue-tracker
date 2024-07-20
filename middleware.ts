export { default } from "next-auth/middleware";

export const config = {
  matchers: ["/issues/new", "/issues/edit/:id+"],
};
