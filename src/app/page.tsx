import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "~/components/ui/dialog";
import { UserPlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DialogContent, DialogHeader } from "~/components/ui/dialog";
import UsersTable from "~/components/users-table";
import UserForm from "~/components/user-form";
import { getUsers } from "~/actions/users";
import { Show } from "react-haiku";

async function Home() {
  const allUsers = await getUsers();

  return (
    <div className="flex flex-col gap-4 max-w-7xl mx-auto p-4 md:p-24">
      <h1 className="text-4xl font-bold">Basic Drizzle CRUD demo</h1>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add User <UserPlusIcon className="size-4" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add user</DialogTitle>
              <DialogDescription>
                Add new user to the database.
              </DialogDescription>{" "}
              <UserForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* @ts-expect-error react-haiku types are not fully compatible with React server components */}
      <Show>
        <Show.When isTrue={allUsers.length === 0}>
          <h2 className="text-3xl font-bold">NO USERS</h2>
        </Show.When>
        <Show.Else>
          <UsersTable />
        </Show.Else>
      </Show>
    </div>
  );
}

export default Home;
