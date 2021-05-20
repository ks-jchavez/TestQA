import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiActores extends RESTDataSource {
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

  // add Actores
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('actores', entity);

    // an example making an HTTP POST request.
    // return this.post('actores', entity);
  }

  // delete Actores
  async deleteEntity(id: string) {
    return KapiCrud.delete('actores', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`actores/${id}`);
  }

  // list Actores
  async listEntity(params: any) {
    return KapiCrud.list('actores', params);

    // an example making an HTTP GET request.
    // return this.get('actores', params);
  }

  // get Actores
  async getEntity(id: string) {
    return KapiCrud.get('actores', id);

    // an example making an HTTP GET request.
    // return this.get(`actores/${id}`);
  }

  // update Actores
  async updateEntity(entity) {
    return KapiCrud.update('actores', entity);

    // an example making an HTTP PATH request.
    // return this.patch(actores, entity);
  }

  // auto complete for Actores
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('actores');

    return results.map((obj: { actores: { displayValue: string; value?: any } }) => ({ ...obj.actores }));
  }
}
