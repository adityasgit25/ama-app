import NextAuth from "next-auth";
import { authOptions } from "./options";

// NextAuth takes options as the input
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};