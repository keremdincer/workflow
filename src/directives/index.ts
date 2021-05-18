import { AuthDirective } from "./auth.directive";
import { HasRoleDirective } from "./hasRole.directive";

export const schemaDirectives = {
  auth: AuthDirective,
  hasRole: HasRoleDirective
}