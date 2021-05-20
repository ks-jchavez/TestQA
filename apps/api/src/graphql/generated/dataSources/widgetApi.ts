/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import { RESTDataSource } from 'apollo-datasource-rest';
import { DataListingArgs, DataAggregationArgs, AuthContext } from '../../../types';
import { object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede } from '../../custom/widgetResolvers/object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede';
import { summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf } from '../../custom/widgetResolvers/summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf';
import { widget_b908198a_3ac1_4971_98d0_25eacd0c2eca } from '../../custom/widgetResolvers/widget_b908198a_3ac1_4971_98d0_25eacd0c2eca';

// If you need to access the current user, the token and data sources,
// you can get them from 'this.context'
export class WidgetApi extends RESTDataSource {
  async object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede(args: DataListingArgs) {
    return object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede(args, this.context);
  }

  async summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf(args: DataListingArgs) {
    return summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf(args, this.context);
  }

  async widget_b908198a_3ac1_4971_98d0_25eacd0c2eca(args: DataAggregationArgs) {
    return widget_b908198a_3ac1_4971_98d0_25eacd0c2eca(args, this.context);
  }
}
