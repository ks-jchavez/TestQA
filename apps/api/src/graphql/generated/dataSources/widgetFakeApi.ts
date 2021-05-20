/* eslint @typescript-eslint/camelcase: 0, @typescript-eslint/no-unused-vars: 0 */
import { DataListingArgs, DataAggregationArgs } from '../../../types';
import { DataSource } from 'apollo-datasource';
import { getListingData, getWidgetData } from '../../../realisticFakeData';

export class WidgetFakeApi extends DataSource {
  async object_listing_87cd7546_81f1_4371_98c4_23bcc80e2ede(args: DataListingArgs) {
    return getListingData(args);
  }

  async summary_title_ceb0070d_193e_4c86_a2b2_25b20c3f61bf(args: DataListingArgs) {
    return getListingData(args);
  }

  async widget_b908198a_3ac1_4971_98d0_25eacd0c2eca(args: DataAggregationArgs) {
    return getWidgetData(args);
  }
}
