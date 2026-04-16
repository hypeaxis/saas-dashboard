import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "src/components/auth/LoginForm";
import { authOptions } from "src/lib/auth";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-surface text-foreground">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,88,190,0.12),transparent_45%),radial-gradient(circle_at_85%_70%,rgba(146,71,0,0.08),transparent_35%)]" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 lg:px-10">
                <section className="grid w-full items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-6 pt-4">
                        <p className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">TaskMaster</p>
                        <h1 className="max-w-xl text-balance">Control tasks with architectural clarity.</h1>
                        <p className="max-w-lg body-md text-muted-foreground">
                            Sign in to access your dashboard, synchronize task flow, and keep delivery momentum visible across your team.
                        </p>
                    </div>

                    <div className="surface-card rounded-lg p-6 md:p-8">
                        <div className="mb-6 space-y-2">
                            <p className="label-sm text-muted-foreground">Secure Login</p>
                            <h2 className="headline-md">Welcome back</h2>
                            <p className="body-md text-muted-foreground">Use your credentials or Google account to continue.</p>
                        </div>

                        <LoginForm />
                    </div>
                </section>
            </div>
        </main>
    );
}