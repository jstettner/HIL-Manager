import { signInAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage, Message } from "@/components/ui/form";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Message>;
}) {
  const params = await searchParams;
  return (
    <div className="w-full h-full bg-black">
      <div className="h-full max-w-3/4 border-l border-r border-white bg-black mx-auto px-15 pt-30">
        <form className="flex-1 flex flex-col min-w-64">
          <h1 className="text-4xl">Sign In</h1>
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
            <Button type="submit" formAction={signInAction}>
              Sign In
            </Button>
            <FormMessage message={params} />
          </div>
        </form>
      </div>
    </div>
  );
}
