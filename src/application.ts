import { createApplication } from "graphql-modules";
import { userModule } from "./modules/user/user.module";
import { authenticationModule } from './modules/authentication/authentication.module'
import { SchemaDirectiveVisitor } from "graphql-tools";
import { schemaDirectives } from "./directives";

const application = createApplication({
  modules: [
    userModule,
    authenticationModule
  ]
})

export const schema = application.createSchemaForApollo()
SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives)
