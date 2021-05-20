import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiCreditos extends RESTDataSource {
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

  // add Creditos
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('creditos', entity);

    // an example making an HTTP POST request.
    // return this.post('creditos', entity);
  }

  // delete Creditos
  async deleteEntity(id: string) {
    return KapiCrud.delete('creditos', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`creditos/${id}`);
  }

  // list Creditos
  async listEntity(params: any) {
    return KapiCrud.list('creditos', params);

    // an example making an HTTP GET request.
    // return this.get('creditos', params);
  }

  // get Creditos
  async getEntity(id: string) {
    return KapiCrud.get('creditos', id);

    // an example making an HTTP GET request.
    // return this.get(`creditos/${id}`);
  }

  // update Creditos
  async updateEntity(entity) {
    return KapiCrud.update('creditos', entity);

    // an example making an HTTP PATH request.
    // return this.patch(creditos, entity);
  }

  // auto complete for Creditos
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('creditos');

    return results.map((obj: { creditos: { displayValue: string; value?: any } }) => ({ ...obj.creditos }));
  }
}
