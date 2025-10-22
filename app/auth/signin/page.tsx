import { SignInForm } from "@/components/auth/signinForm";

export default function SignInPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your Monetize account
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
