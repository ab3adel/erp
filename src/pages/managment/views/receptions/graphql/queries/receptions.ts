import { gql } from "@apollo/client";

export const receptions = gql`
query Lots($first: Int!, $page: Int!) {
    lots(first: $first, page: $page) {
      data {
          id
          uuid
          status
          grade
          weight
          commission_uom
          total_price
          cherry_price
          name
          cupping_score
          coffee_state
          reception_date
          cost_per_uom
          is_paid
          is_combined
          certification
          receivedTo {
              id
              name
          }
          account {
              id
              name
          }
          tags {
              id
          }
          currency {
            id
            name
          }

      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
  }
}
`;
