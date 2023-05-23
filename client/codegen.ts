import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/graphql",
  documents: "src/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      // локальная схема на клиенте
      schema: "src/graphql/client-schema.graphql",
      preset: "client",
      presetConfig: {
        // чтобы фрагменты встраивались в типы без указания на то, что они фрагменты
        fragmentMasking: false
      }
    }
  }
};

export default config;
