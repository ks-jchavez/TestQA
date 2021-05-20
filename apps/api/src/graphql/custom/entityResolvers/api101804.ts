import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiCategoria extends RESTDataSource {
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

  // add Categoria
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('categoria', entity);

    // an example making an HTTP POST request.
    // return this.post('categoria', entity);
  }

  // delete Categoria
  async deleteEntity(id: string) {
    return KapiCrud.delete('categoria', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`categoria/${id}`);
  }

  // list Categoria
  async listEntity(params: any) {
    return KapiCrud.list('categoria', params);

    // an example making an HTTP GET request.
    // return this.get('categoria', params);
  }

  // get Categoria
  async getEntity(id: string) {
    return KapiCrud.get('categoria', id);

    // an example making an HTTP GET request.
    // return this.get(`categoria/${id}`);
  }

  // update Categoria
  async updateEntity(entity) {
    return KapiCrud.update('categoria', entity);

    // an example making an HTTP PATH request.
    // return this.patch(categoria, entity);
  }

  // auto complete for Categoria
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('categoria');

    return results.map((obj: { categoria: { displayValue: string; value?: any } }) => ({ ...obj.categoria }));
  }
}
