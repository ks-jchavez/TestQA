import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiTitulo extends RESTDataSource {
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

  // add Titulo
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('titulo', entity);

    // an example making an HTTP POST request.
    // return this.post('titulo', entity);
  }

  // delete Titulo
  async deleteEntity(id: string) {
    return KapiCrud.delete('titulo', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`titulo/${id}`);
  }

  // list Titulo
  async listEntity(params: any) {
    return KapiCrud.list('titulo', params);

    // an example making an HTTP GET request.
    // return this.get('titulo', params);
  }

  // get Titulo
  async getEntity(id: string) {
    return KapiCrud.get('titulo', id);

    // an example making an HTTP GET request.
    // return this.get(`titulo/${id}`);
  }

  // update Titulo
  async updateEntity(entity) {
    return KapiCrud.update('titulo', entity);

    // an example making an HTTP PATH request.
    // return this.patch(titulo, entity);
  }

  // auto complete for Titulo
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('titulo');

    return results.map((obj: { titulo: { displayValue: string; value?: any } }) => ({ ...obj.titulo }));
  }
}
