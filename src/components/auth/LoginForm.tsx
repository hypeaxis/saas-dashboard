"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "src/components/ui/button";

type LoginFormValues = {
    email: string;
    password: string;
};

const errorTextByCode: Record<string, string> = {
    CredentialsSignin: "Email hoặc mật khẩu không đúng.",
    AccessDenied: "Bạn đã từ chối quyền đăng nhập.",
    OAuthAccountNotLinked: "Tài khoản này chưa được liên kết với phương thức đăng nhập đã chọn.",
    OAuthSignin: "Không thể bắt đầu đăng nhập Google. Vui lòng thử lại.",
    OAuthCallback: "Có lỗi khi xử lý phản hồi từ Google.",
};

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [submitError, setSubmitError] = useState<string>("");
    const [isGoogleLoading, setGoogleLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        defaultValues: {
            email: "demo@taskmaster.dev",
            password: "taskmaster123",
        },
    });

    const authError = useMemo(() => {
        const code = searchParams.get("error");

        if (!code) {
            return "";
        }

        return errorTextByCode[code] ?? "Đăng nhập thất bại. Vui lòng thử lại.";
    }, [searchParams]);

    const onSubmit = handleSubmit(async (values) => {
        setSubmitError("");

        const result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: "/dashboard",
        });

        if (!result || result.error) {
            setSubmitError("Email hoặc mật khẩu không đúng.");
            return;
        }

        router.replace(result.url ?? "/dashboard");
        router.refresh();
    });

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        await signIn("google", { callbackUrl: "/dashboard" });
        setGoogleLoading(false);
    };

    return (
        <form className="space-y-5" onSubmit={onSubmit}>
            <div className="space-y-2">
                <label htmlFor="email" className="label-sm text-muted-foreground">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full rounded-sm bg-surface-container-low px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="name@company.com"
                    {...register("email", {
                        required: "Email là bắt buộc.",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không hợp lệ.",
                        },
                    })}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="label-sm text-muted-foreground">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full rounded-sm bg-surface-container-low px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    placeholder="••••••••"
                    {...register("password", {
                        required: "Password là bắt buộc.",
                        minLength: {
                            value: 6,
                            message: "Password cần tối thiểu 6 ký tự.",
                        },
                    })}
                />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            {(authError || submitError) && (
                <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{submitError || authError}</div>
            )}

            <div className="space-y-3 pt-1">
                <Button type="submit" className="cta-gradient w-full" disabled={isSubmitting || isGoogleLoading}>
                    {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                    Đăng nhập
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-surface-container-low text-foreground hover:bg-surface-container-high"
                    disabled={isSubmitting || isGoogleLoading}
                    onClick={handleGoogleSignIn}
                >
                    {isGoogleLoading && <Loader2 className="size-4 animate-spin" />}
                    Đăng nhập với Google
                </Button>
            </div>
        </form>
    );
}