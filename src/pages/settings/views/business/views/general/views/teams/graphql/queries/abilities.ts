import { gql } from "@apollo/client";

export const query = gql`
  query Abilities($first: Int, $page: Int) {
    abilities(first: $first, page: $page) {
      paginatorInfo {
        count
      }
      data {
        id
        title
        category
        subcategory
      }
    }
  }
`;
