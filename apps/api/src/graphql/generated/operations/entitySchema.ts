import { gql } from 'apollo-server-express';

export const entitySchema = gql`
  input AutoCompleteByEntityInput {
    entity: String!
    offset: Int
    totalCount: Int
    limit: Int
  }

  input AddEntityParent {
    id: String!
    entity: String
  }

  input AddEntityInput {
    entity: JSON
    parent: AddEntityParent
  }

  input ListEntityInput {
    entity: JSON
  }

  type AutoCompleteOptionShape {
    displayValue: String!
    value: String
    id: String
  }

  type AutoCompleteResponse {
    data: [AutoCompleteOptionShape]
    errorMessage: String
  }

  extend type Query {
    # Timestamp
    add101794(input: AddEntityInput): GenericEntity
    list101794(input: ListEntityInput): GenericEntity
    get101794(id: String): GenericEntity
    delete101794(id: String): GenericEntity
    update101794(entity: JSON): GenericEntity
    autoComplete101794(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Titulo
    add101800(input: AddEntityInput): GenericEntity
    list101800(input: ListEntityInput): GenericEntity
    get101800(id: String): GenericEntity
    delete101800(id: String): GenericEntity
    update101800(entity: JSON): GenericEntity
    autoComplete101800(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Actores
    add101801(input: AddEntityInput): GenericEntity
    list101801(input: ListEntityInput): GenericEntity
    get101801(id: String): GenericEntity
    delete101801(id: String): GenericEntity
    update101801(entity: JSON): GenericEntity
    autoComplete101801(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Duracion
    add101802(input: AddEntityInput): GenericEntity
    list101802(input: ListEntityInput): GenericEntity
    get101802(id: String): GenericEntity
    delete101802(id: String): GenericEntity
    update101802(entity: JSON): GenericEntity
    autoComplete101802(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Categoria
    add101804(input: AddEntityInput): GenericEntity
    list101804(input: ListEntityInput): GenericEntity
    get101804(id: String): GenericEntity
    delete101804(id: String): GenericEntity
    update101804(entity: JSON): GenericEntity
    autoComplete101804(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Puntuacion
    add101805(input: AddEntityInput): GenericEntity
    list101805(input: ListEntityInput): GenericEntity
    get101805(id: String): GenericEntity
    delete101805(id: String): GenericEntity
    update101805(entity: JSON): GenericEntity
    autoComplete101805(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Tomatasos
    add101806(input: AddEntityInput): GenericEntity
    list101806(input: ListEntityInput): GenericEntity
    get101806(id: String): GenericEntity
    delete101806(id: String): GenericEntity
    update101806(entity: JSON): GenericEntity
    autoComplete101806(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Creditos
    add102138(input: AddEntityInput): GenericEntity
    list102138(input: ListEntityInput): GenericEntity
    get102138(id: String): GenericEntity
    delete102138(id: String): GenericEntity
    update102138(entity: JSON): GenericEntity
    autoComplete102138(input: AutoCompleteByEntityInput): AutoCompleteResponse
  
    # Ranking
    add102139(input: AddEntityInput): GenericEntity
    list102139(input: ListEntityInput): GenericEntity
    get102139(id: String): GenericEntity
    delete102139(id: String): GenericEntity
    update102139(entity: JSON): GenericEntity
    autoComplete102139(input: AutoCompleteByEntityInput): AutoCompleteResponse
    }
`;
