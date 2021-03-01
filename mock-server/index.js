const { ApolloServer, gql } = require("apollo-server");
const { v4: uuidv4 } = require('uuid');

const typeDefs = gql`
  type ListItem {
    id: ID!,
    data: [String]
  }
  type Query {
    itemsData: [ListItem]
  }
  type Mutation {
    deleteData(ids: [String]): [ListItem],
    addItemData(data:[String]): [ListItem],
    resetData: [ListItem]
  }
`;

const initialData = [
  {
    id: uuidv4(),
    data: ['Oreo', 437, 18, 63, 4]
  },
  {
    id: uuidv4(),
    data: ['Nougat', 308, 19, 9, 37]
  },
  {
    id: uuidv4(),
    data: ['Marshmallow', 318, 3, 81, 2]
  },
  {
    id: uuidv4(),
    data: ['Lollipop', 398, 2, 98, 0]
  },
  {
    id: uuidv4(),
    data: ['KitKat', 518, 26, 65, 60]
  },
];

let currentData = [...initialData];

const resolvers = {
  Query: {
    itemsData: () => currentData,
  },
  Mutation: {
    deleteData: (parent, { ids }) => {
      currentData = currentData.filter((item) => {
        return !ids.includes(item.id);
      })
      return currentData;
    },
    addItemData: (parent, { data }) => {
      currentData.push({ id: uuidv4(), data });
      return currentData;
    },
    resetData: () => {
      currentData = [...initialData];
      return currentData;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`Server Running on port ${url}`));
