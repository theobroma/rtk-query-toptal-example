import { components } from "@octokit/openapi-types";

// export type PaginationParams = Pick<
//   components["parameters"],
//   "per_page" | "page"
// >;

export type PaginationParams = {
  per_page: number;
  page: number;
};
