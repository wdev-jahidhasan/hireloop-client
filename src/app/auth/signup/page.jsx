"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import {
  Card,
  Input,
  Button,
  Separator,
} from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
        role
      });

      if (error) {
        setErrorMessage(error.message || "Something went wrong. Please try again.");
      } else {
        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/auth/signin");
        }, 2000);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border border-default-100 p-2">
        <Card.Header className="flex flex-col gap-1 items-center pt-6 pb-2 text-center">
          <Card.Title className="text-2xl font-bold tracking-tight text-white">
            Create an Account
          </Card.Title>
          <Card.Description className="text-small text-default-400">
            Sign up to get started with our platform
          </Card.Description>
        </Card.Header>

        <Card.Content className="px-6 py-4">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-danger-500/10 text-danger border border-danger-500/20 flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-success-500/10 text-success border border-success-500/20 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-slate-200">
                Full Name <span className="text-danger">*</span>
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 text-default-400 pointer-events-none w-4 h-4 z-10" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  variant="bordered"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email Address <span className="text-danger">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 text-default-400 pointer-events-none w-4 h-4 z-10" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="bordered"
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-slate-200">
                Password <span className="text-danger">*</span>
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 text-default-400 pointer-events-none w-4 h-4 z-10" />
                <Input
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
                  required
                  variant="bordered"
                  className="pl-9 pr-10"
                />
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-3.5 focus:outline-none cursor-pointer z-10"
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeOff className="w-4 h-4 text-default-400 hover:text-default-200 transition-colors" />
                  ) : (
                    <Eye className="w-4 h-4 text-default-400 hover:text-default-200 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Select Your Role</Label>
              <RadioGroup onChange={value => setRole(value)} defaultValue="seeker" name="role" orientation="horizontal">
                <Radio selected value="seeker">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    Job Seeker
                  </Radio.Content>
                </Radio>
                <Radio value="recruiter">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    Recruiter
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full font-medium mt-2"
              isLoading={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <Separator className="my-6 bg-default-100" />

          <div className="text-center text-small text-default-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="text-primary font-medium hover:underline transition-all"
            >
              Sign In
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}