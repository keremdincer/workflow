import { createApplication } from 'graphql-modules'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import { schemaDirectives } from './directives'
import { userModule } from './modules/user/user.module'
import { authenticationModule } from './modules/authentication/authentication.module'
import { projectModule } from './modules/project/project.module'
import { corporationModule } from './modules/corporation/corporation.module'
import { itemModule } from './modules/item/item.module'
import { shippingModule } from './modules/shipping/shipping.module'

const application = createApplication({
  modules: [
    userModule,
    authenticationModule,
    projectModule,
    corporationModule,
    itemModule,
    shippingModule,
  ],
})

export const schema = application.createSchemaForApollo()
SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives)
