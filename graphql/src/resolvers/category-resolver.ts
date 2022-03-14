import { ApolloError } from 'apollo-server-express';
import axios from 'axios';
import {
  Resolver,
  Query,
  ObjectType,
  Field,
  Arg,
  Mutation,
  InputType,
} from 'type-graphql';

@ObjectType()
class CategoryObjectType {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;
}

interface ICategory {
  id: string;
  name: string;
}

@InputType()
class CategoryInputType {
  @Field()
  name: string;
}

@Resolver()
export class CategoryResolver {
  @Query(() => [CategoryObjectType])
  async Categories(): Promise<ICategory[]> {
    const host = 'http://api-category-srv:3000';
    try {
      const { data } = await axios.get<ICategory[]>(`${host}/category`);
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

  @Query(() => CategoryObjectType)
  async Category(@Arg('id') id: string): Promise<ICategory> {
    const host = 'http://api-category-srv:3000';
    try {
      const { data } = await axios.get<ICategory>(`${host}/category/${id}`);
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

  @Mutation(() => CategoryObjectType)
  async UpdateCategory(
    @Arg('id') id: string,
    @Arg('input') input: CategoryInputType
  ): Promise<ICategory> {
    const host = 'http://api-category-srv:3000';
    try {
      const { data } = await axios.put<ICategory>(
        `${host}/category/${id}`,
        input
      );
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
