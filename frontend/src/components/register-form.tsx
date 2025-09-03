import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

type RegisterFormProps = {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

export function RegisterForm({
  name,
  email,
  password,
  confirmPass,
  onChange,
  onSubmit,
  isLoading,
  className,
  ...props
}: RegisterFormProps & React.ComponentPropsWithoutRef<"form">) {
  return (
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.com"
            required
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPass">Confirm Password</Label>
          <Input
            id="confirmPass"
            name="confirmPass"
            type="password"
            required
            value={confirmPass}
            onChange={onChange}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          Create Account
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            OR
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}