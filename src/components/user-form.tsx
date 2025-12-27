"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { createUser, updateUser } from "~/actions/users";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "~/db/schema";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email(),
});

type UserFormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  user?: User;
}

function UserForm({ user }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
    },
  });

  const onSubmit = async (values: UserFormValues) => {
    setLoading(true);

    try {
      const userData = {
        ...values,
        password: "defaultPassword123", // Placeholder password
      };

      if (user) {
        await updateUser({ id: user.id, ...userData });
      } else {
        await createUser(userData);
      }

      form.reset();
      toast.success(`User ${user ? "updated" : "created"} successfully!`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to ${user ? "update" : "create"} user: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@example.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <LoaderIcon className="size-4 animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
