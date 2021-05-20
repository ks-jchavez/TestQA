import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiPuntuacion extends RESTDataSource {
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

  // add Puntuacion
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('puntuacion', entity);

    // an example making an HTTP POST request.
    // return this.post('puntuacion', entity);
  }

  // delete Puntuacion
  async deleteEntity(id: string) {
    return KapiCrud.delete('puntuacion', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`puntuacion/${id}`);
  }

  // list Puntuacion
  async listEntity(params: any) {
    return KapiCrud.list('puntuacion', params);

    // an example making an HTTP GET request.
    // return this.get('puntuacion', params);
  }

  // get Puntuacion
  async getEntity(id: string) {
    return KapiCrud.get('puntuacion', id);

    // an example making an HTTP GET request.
    // return this.get(`puntuacion/${id}`);
  }

  // update Puntuacion
  async updateEntity(entity) {
    return KapiCrud.update('puntuacion', entity);

    // an example making an HTTP PATH request.
    // return this.patch(puntuacion, entity);
  }

  // auto complete for Puntuacion
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('puntuacion');

    return results.map((obj: { puntuacion: { displayValue: string; value?: any } }) => ({
      ...obj.puntuacion,
    }));
  }
}
