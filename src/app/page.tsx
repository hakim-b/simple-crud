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

function Home() {
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

      <UsersTable />
    </div>
  );
}

export default Home;
