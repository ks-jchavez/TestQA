/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import { DataListingArgs, DataAggregationArgs } from '../../../types';
import { IResolvers } from 'apollo-server-express';

export const widgetResolvers: IResolvers = {
  Query: {
    object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede: async (
      _parent: any,
      args: { input: DataListingArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede(args.input, {
            ...rest,
          })
        : result;
    },

    summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf: async (
      _parent: any,
      args: { input: DataListingArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf(
        args.input,
      );

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf(args.input, {
            ...rest,
          })
        : result;
    },

    widget_b908198a_3ac1_4971_98d0_25eacd0c2eca: async (
      _parent: any,
      args: { input: DataAggregationArgs },
      { dataSources, ...rest },
    ) => {
      const result = await dataSources.widgetApi.widget_b908198a_3ac1_4971_98d0_25eacd0c2eca(args.input);

      return result === 'not implemented'
        ? dataSources.widgetFakeApi.widget_b908198a_3ac1_4971_98d0_25eacd0c2eca(args.input, { ...rest })
        : result;
    },
  },
};
