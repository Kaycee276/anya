import NextAuth from "next-auth";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, profile }) {
      try {
        await fetch("http://localhost:3001/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            githubId: (profile as GithubProfile)?.id?.toString(),
          }),
        });
      } catch (error) {
        console.error("Error syncing user to backend:", error);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
