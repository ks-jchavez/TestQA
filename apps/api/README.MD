## API

Apollo Graphql Middleware.

## Extended Configuration

You can use some `env` variables to customize the API.

### Dev Configuration

- `LOG_QUERIES`
  - Enable a basic profiling to log the graphql queries and its duration.

- `PERSIST_FAKE_DB`
  - When using the realistic fake data in a lambda you may want to persist it by enabling this variable. This will highly increase the time for each query.
