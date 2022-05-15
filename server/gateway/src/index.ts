import { ApolloServer } from 'apollo-server';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

const typeDefFiles = loadFilesSync(path.join(__dirname, "/**/*.type.graphql"));
const resolverFiles = loadFilesSync(path.join(__dirname, "./**/*.resolver.*"));

const typeDefs = mergeTypeDefs(typeDefFiles)
const resolvers = mergeResolvers(resolverFiles);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});