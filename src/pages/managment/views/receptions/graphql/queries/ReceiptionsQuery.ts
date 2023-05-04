import { gql } from "@apollo/client";

export const receiptionQuery = gql`
  query ReceptionsQuery {
    receptions {
      data {
        id
        attributes {
          date
          status
          account {
            data {
              id
              attributes {
                name
              }
            }
          }
          lot {
            data {
              id
              attributes {
                number
                grade
                weight
                uom
              }
            }
          }
          totalCost
          payment
          comission
          cherryPrice
          currecnyFixed
        }
      }
      meta {
        pagination {
          page
          pageSize
          total
          pageCount
        }
      }
    }
  }
`;
