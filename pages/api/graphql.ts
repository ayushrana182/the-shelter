import "reflect-metadata"
import {ApolloServer} from "apollo-server-micro"
import {buildSchema, Resolver, Query, Arg, ObjectType, Field, ID} from "type-graphql"

@ObjectType()
export class Dog{
    @Field(()=>ID)
    name:string;
}

@Resolver(Dog)
export class DogsResolver{
    @Query(() =>[Dog])
    dogs(): Dog[]{
        return [{name:"Bubbles"}, {name:"Bo"}];
    }
}

const schema = await buildSchema({
    resolvers:[DogsResolver]
})


const server = new ApolloServer({
    schema
})


export const config={
    api:{
        bodyParser:false,
    },
}

const startServer = server.start()


export default async function handler(req,res){
    await startServer;
    await server.createHandler({path:"/api/graphql"})(req,res);
}