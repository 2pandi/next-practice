import { connectDB } from "@/components/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
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
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);

/** JWT 방식이 아니라 session 방식을 사용하고 싶을 때
 * next-auth는 기본적으로 JWT 방식이 사용된다.
 * 하지만 session 방식을 사용해서 로그인을 유지하고 싶을 때는
 * DB adapter를 설치하여 사용하면 된다.
 *
 * authOptions에 adapter 항목을 추가하고 MongoDBAdapter 함수에 DB connect 값을 넣어주면 된다.
 * (꼭 mongoDB adapter가 아니라도 redis 등 다른 DB의 adapter로도 구성 가능)
 *
 * 로그인 진행하면 Database에 accounts, sessions, users 항목이 추가됨
 * accounts: 가입된 유저 계정 정보(계정당 1개 document)
 *    -> 같은 사람(같은 이메일)이라도 구글 계정과 깃헙 계정 별도 document 생성
 * sessions: 현재 로그인한 계정 세션 정보 - sessionToken, userId, expires
 *    -> document 삭제하면 세션 정보 없어서 로그인 풀림
 * users: 가입된 유저 정보(인당 1개 document)
 *    -> 같은 이메일이면 하나의 document 생성(같은 유저로 간주)
 */
