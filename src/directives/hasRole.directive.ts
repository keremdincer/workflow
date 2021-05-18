import { SchemaDirectiveVisitor, ForbiddenError } from "apollo-server";
import { defaultFieldResolver } from "graphql";

export class HasRoleDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    const roles = this.args.roles

    field.resolve = (...args) => {
      const [, , context] = args
      const userRoles = context.currentUser?.roles || []

      if (roles.some(r => userRoles.indexOf(r) !== -1)) {
        return resolve.apply(this, args)
      }

      throw new ForbiddenError("You are not authorized to perform this request.")
    }
  }
}