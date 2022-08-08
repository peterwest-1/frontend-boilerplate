import { QueryInput, Cache } from "@urql/exchange-graphcache";

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  update: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(queryInput, (data) => update(result, data as any) as any);
}
