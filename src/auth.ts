import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    // async signIn(params) {
    //   console.log("sigin");
    //   console.log(params);
    //   console.log("siginee");
    //   return false;
    // },
    // async session({ session, token, user }) {
    //   // 세션에 유저 정보 저장
    //   console.log("===session=== 시작");
    //   console.log(session);
    //   console.log("===session=== 종료");
    //   console.log("===token=== 시작");
    //   console.log(token);
    //   console.log("===token=== 종료");
    //   console.log("===user=== 시작");
    //   console.log(user);
    //   console.log("===user=== 종료");
    //   return session;
    // },
  },
  secret: process.env.AUTH_SECRET,
});
