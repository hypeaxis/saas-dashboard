import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const demoEmail = process.env.DEMO_EMAIL ?? "demo@taskmaster.dev";
const demoPassword = process.env.DEMO_PASSWORD ?? "taskmaster123";

const providers: NextAuthOptions["providers"] = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                return null;
            }

            if (credentials.email === demoEmail && credentials.password === demoPassword) {
                return {
                    id: "demo-user",
                    email: demoEmail,
                    name: "TaskMaster Demo",
                };
            }

            return null;
        },
    }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.unshift(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

export const authOptions: NextAuthOptions = {
    providers,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) {
                token.sub = user.id;
            }

            return token;
        },
    },
};