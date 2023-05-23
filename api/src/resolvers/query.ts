import { QueryResolvers } from "../generated/graphql";

const query: QueryResolvers = {
  getMessage: (parent, args, {}) => {
    //console.log("123");
    return [];
  },
  getFive: () => 5
};
export default query;
