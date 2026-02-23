import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import type { UserRole } from './types';

// Re-export types so importing options also registers type augmentations
import './types';

export const authOptions: NextAuthOptions = {
  // ---------------------------------------------------------------------------
  // Adapter – Drizzle + SQLite (better-sqlite3)
  // ---------------------------------------------------------------------------
  adapter: DrizzleAdapter(db) as NextAuthOptions['adapter'],

  // ---------------------------------------------------------------------------
  // Providers
  // ---------------------------------------------------------------------------
  providers: [
    // ---- Credentials (dev / testing) ----------------------------------------
    // In production, replace with a proper password hash check (e.g. bcrypt).
    // For local development this simply verifies that a user with the given
    // email exists in the database and returns it.
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'twoj@email.pl' },
        password: { label: 'Hasło', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        });

        if (!user) return null;

        // DEV: skip password verification – in production add bcrypt.compare()
        // if (!await bcrypt.compare(credentials.password, user.passwordHash)) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: (user.role as UserRole) || 'member',
        };
      },
    }),

    // ---- Email / Magic Link (placeholder) -----------------------------------
    // Uncomment and configure when ready to send real emails via Resend or
    // Nodemailer. You will also need to set EMAIL_SERVER_* and EMAIL_FROM
    // environment variables.
    //
    // import EmailProvider from 'next-auth/providers/email';
    //
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: Number(process.env.EMAIL_SERVER_PORT),
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM || 'Aga · Joga Kundalini <noreply@jogakundalini.pl>',
    // }),
    //
    // --- OR with Resend (simpler) ---
    //
    // import { Resend } from 'resend';
    // EmailProvider({
    //   sendVerificationRequest: async ({ identifier: email, url }) => {
    //     const resend = new Resend(process.env.RESEND_API_KEY);
    //     await resend.emails.send({
    //       from: 'Aga · Joga Kundalini <noreply@jogakundalini.pl>',
    //       to: email,
    //       subject: 'Zaloguj się – Joga Kundalini',
    //       html: `<p>Kliknij <a href="${url}">tutaj</a>, aby się zalogować.</p>`,
    //     });
    //   },
    // }),
  ],

  // ---------------------------------------------------------------------------
  // Session – JWT (no server-side session table needed)
  // ---------------------------------------------------------------------------
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ---------------------------------------------------------------------------
  // Callbacks
  // ---------------------------------------------------------------------------
  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in, `user` is provided – persist role & id into token
      if (user) {
        token.role = (user.role as UserRole) || 'member';
        token.userId = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.userId;
      }
      return session;
    },
  },

  // ---------------------------------------------------------------------------
  // Custom pages
  // ---------------------------------------------------------------------------
  pages: {
    signIn: '/account/login',
  },

  // ---------------------------------------------------------------------------
  // Misc
  // ---------------------------------------------------------------------------
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
