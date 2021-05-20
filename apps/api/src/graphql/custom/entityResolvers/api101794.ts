import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiTimestamp extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://put.your.api.here/';
    // If you need to access the current user, the token and data sources,
    // you can get them from 'this.context'
  }

  willSendRequest(request: RequestOptions) {
    // Use this line to set a header token.
    // request.headers.set('Authorization', this.context.token);
    // Use this line to set a params token.
    // request.params.set('api_key', this.context.token);
  }

  // add Timestamp
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('timestamp', entity);

    // an example making an HTTP POST request.
    // return this.post('timestamp', entity);
  }

  // delete Timestamp
  async deleteEntity(id: string) {
    return KapiCrud.delete('timestamp', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`timestamp/${id}`);
  }

  // list Timestamp
  async listEntity(params: any) {
    return KapiCrud.list('timestamp', params);

    // an example making an HTTP GET request.
    // return this.get('timestamp', params);
  }

  // get Timestamp
  async getEntity(id: string) {
    return KapiCrud.get('timestamp', id);

    // an example making an HTTP GET request.
    // return this.get(`timestamp/${id}`);
  }

  // update Timestamp
  async updateEntity(entity) {
    return KapiCrud.update('timestamp', entity);

    // an example making an HTTP PATH request.
    // return this.patch(timestamp, entity);
  }

  // auto complete for Timestamp
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('timestamp');

    return results.map((obj: { timestamp: { displayValue: string; value?: any } }) => ({ ...obj.timestamp }));
  }
}
