import { User } from ".prisma/client";
import { sign } from 'jsonwebtoken'

export class Token {
  static generate(user: User) {
    const token = sign({
      id: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + (5 * 60)
    }, process.env.JWT_SECRET!)

    return token
  }

  static refreshToken() {

  }
}