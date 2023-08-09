import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      // Github에서 oauth app 등록하고 발급 받는 id와 secret
      clientId: process.env.NEXT_APP_GITHUB_ID!,
      clientSecret: process.env.NEXT_APP_GITHUB_SECRET!,
    }),
  ],
  // jwt 생성시 사용되는 암호(임의 입력)
  secret: process.env.NEXT_APP_AUTH_OPTION_SECRET,
};

export default NextAuth(authOptions);
