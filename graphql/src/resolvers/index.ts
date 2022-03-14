import { CategoryResolver } from './category-resolver';
import { PostResolver } from './post-resolver';
import { ClassType } from 'type-graphql';

type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]];

const resolvers: NonEmptyArray<ClassType> = [PostResolver, CategoryResolver];

export default resolvers;
