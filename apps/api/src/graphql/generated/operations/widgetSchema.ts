import { gql } from 'apollo-server-express';

export const widgetSchema = gql`
  type GraphResult {
    format: JSON
    results: JSON
    crossLinking: JSON
  }

  type MultiTransFormationResults {
    crossLinking: JSON
    format: JSON
    results: JSON
    transformation: String!
  }

  type ListingResult {
    data: JSON
    format: JSON
    pagination: JSON
  }

  input DataListingArgs {
    entity: String!
    attributes: JSON!
    filters: JSON
    pagination: JSON
  }

  input MultiTransFormationArgs {
    entity: String!
    filters: JSON
    transformations: [String!]!
  }

  input CustomActionArgs {
    entity: String!
    functionName: String!
    filters: JSON
  }

  extend type Query {
    # View: netflix
    # Chart type: [WIDGET] FULL_TABLE
    object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede(input: DataListingArgs): ListingResult

    # View: NETFLIX
    # Value: titulo
    # Value aggregated by: No Aggregation
    # Chart type: [WIDGET] SUMMARY_TITLE
    summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf(input: DataListingArgs): ListingResult

    # View: NETFLIX --- Widget: Vista
    # Group by: duracion
    # No Aggregation
    # Value: puntuacion
    # Value aggregated by: No Aggregation
    # Chart type: [WIDGET] AREA_GRADIENT
    widget_b908198a_3ac1_4971_98d0_25eacd0c2eca(input: DataAggregationArgs): GraphResult
  }
`;
