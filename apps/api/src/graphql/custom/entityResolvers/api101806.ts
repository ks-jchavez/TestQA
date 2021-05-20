import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiTomatasos extends RESTDataSource {
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

  // add Tomatasos
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('tomatasos', entity);

    // an example making an HTTP POST request.
    // return this.post('tomatasos', entity);
  }

  // delete Tomatasos
  async deleteEntity(id: string) {
    return KapiCrud.delete('tomatasos', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`tomatasos/${id}`);
  }

  // list Tomatasos
  async listEntity(params: any) {
    return KapiCrud.list('tomatasos', params);

    // an example making an HTTP GET request.
    // return this.get('tomatasos', params);
  }

  // get Tomatasos
  async getEntity(id: string) {
    return KapiCrud.get('tomatasos', id);

    // an example making an HTTP GET request.
    // return this.get(`tomatasos/${id}`);
  }

  // update Tomatasos
  async updateEntity(entity) {
    return KapiCrud.update('tomatasos', entity);

    // an example making an HTTP PATH request.
    // return this.patch(tomatasos, entity);
  }

  // auto complete for Tomatasos
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('tomatasos');

    return results.map((obj: { tomatasos: { displayValue: string; value?: any } }) => ({ ...obj.tomatasos }));
  }
}
