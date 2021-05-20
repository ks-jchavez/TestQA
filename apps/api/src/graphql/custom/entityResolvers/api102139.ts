import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { KapiCrud, dispatchCustomAction } from '../../../realisticFakeData';
import { AutoCompleteParams, CustomActionArgs, DispatchCustomActionResults } from '../../../types';

export class ApiRanking extends RESTDataSource {
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

  // add Ranking
  async addEntity(entity: { [key: string]: unknown }, parent?: { id: string; entity: string }) {
    if (parent) console.log('parent', parent);
    return KapiCrud.add('ranking', entity);

    // an example making an HTTP POST request.
    // return this.post('ranking', entity);
  }

  // delete Ranking
  async deleteEntity(id: string) {
    return KapiCrud.delete('ranking', id);

    // an example making an HTTP DELETE request.
    // return this.delete(`ranking/${id}`);
  }

  // list Ranking
  async listEntity(params: any) {
    return KapiCrud.list('ranking', params);

    // an example making an HTTP GET request.
    // return this.get('ranking', params);
  }

  // get Ranking
  async getEntity(id: string) {
    return KapiCrud.get('ranking', id);

    // an example making an HTTP GET request.
    // return this.get(`ranking/${id}`);
  }

  // update Ranking
  async updateEntity(entity) {
    return KapiCrud.update('ranking', entity);

    // an example making an HTTP PATH request.
    // return this.patch(ranking, entity);
  }

  // auto complete for Ranking
  async getAutoCompleteValues(entity: AutoCompleteParams) {
    const results = await KapiCrud.list('ranking');

    return results.map((obj: { ranking: { displayValue: string; value?: any } }) => ({ ...obj.ranking }));
  }
}
