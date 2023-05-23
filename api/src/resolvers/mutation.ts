import { MutationResolvers } from "../generated/graphql";

const mutation: MutationResolvers = {
  sendMessage: async (parent, args, {}) => {
    // console.log("MUTE");
    console.log(args.msg);
    return !!args.msg;
  }
};
export default mutation;
