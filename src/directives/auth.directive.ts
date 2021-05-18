import { SchemaDirectiveVisitor, AuthenticationError } from "apollo-server";
import { defaultFieldResolver } from "graphql";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = (...args) => {
      const [, , context] = args

      if (context.currentUser) {
        return resolve.apply(this, args)
      }

      throw new AuthenticationError("You are not authorized to perform this request.")
    }
  }
}