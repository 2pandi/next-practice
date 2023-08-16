import { NextApiRequest, NextApiResponse } from "next";
import { DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { OAuthConfig } from "next-auth/providers";
import { GithubProfile } from "next-auth/providers/github";

interface AuthOptions {
  providers: OAuthConfig<GithubProfile>[];
  secret: string | undefined;
  adapter: Adapter;
}

export default class Session {
  private user: DefaultSession["user"] | null = null;
  private expires: string | null | undefined = null;

  constructor(
    private readonly req: NextApiRequest,
    private readonly res: NextApiResponse,
    private readonly authOptions: AuthOptions
  ) {
    this.init();
  }

  async init() {
    const session: DefaultSession | null = await getServerSession(
      this.req,
      this.res,
      this.authOptions
    );
    this.user = session?.user;
    this.expires = session?.expires;
  }

  async getUser() {
    if (!this.user) await this.init();
    return this.user;
  }
}
