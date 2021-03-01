import { MockedQueries } from './MockedQueries';
import { GraphQLQueries } from './GraphQLQueries';

export const Queries = process.env.NODE_ENV === 'test' ? MockedQueries : GraphQLQueries;
