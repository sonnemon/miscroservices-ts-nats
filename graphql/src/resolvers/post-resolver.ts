import { ApolloError } from 'apollo-server-express';
import axios from 'axios';
import { Resolver, Query, ObjectType, Field, Arg } from 'type-graphql';

@ObjectType()
class CateObjectType {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
export class PostObjectType {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field(() => [CateObjectType], { nullable: true })
  categories: {
    id: string;
    name: string;
  }[];
}

interface IPost {
  title: string;
  content: string;
  id: string;
  categories: {
    id: string;
    name: string;
  }[];
}

@Resolver()
export class PostResolver {
  @Query(() => [PostObjectType])
  async Posts(): Promise<IPost[]> {
    const host = 'http://api-post-srv:3000';
    try {
      const { data } = await axios.get<IPost[]>(`${host}/post`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error.message);
      }

      throw new ApolloError('ERROR TO REQUEST SRV');
    }
  }

  @Query(() => PostObjectType)
  async Post(@Arg('id') id: string): Promise<IPost> {
    const host = 'http://api-post-srv:3000';
    try {
      const { data } = await axios.get<IPost>(`${host}/post/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error.message);
      }

      throw new ApolloError('ERROR TO REQUEST SRV');
    }
  }
}
