import { getUsers } from "~/actions/users";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import { For } from "react-haiku";
import { Button } from "./ui/button";
import { PencilIcon } from "lucide-react";
import DeleteUserButton from "./delete-user-button";
import {
  DialogContent,
  DialogHeader,
  Dialog,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import UserForm from "./user-form";

async function UsersTable() {
  const users = await getUsers();

  return (
    <>
      <Table>
        <TableCaption>A list of your recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For
            each={users}
            render={(user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant={"secondary"} size={"icon"}>
                        <PencilIcon className="size-4" />
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit user</DialogTitle>
                        <UserForm user={user}/>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <DeleteUserButton userId={user.id} />
                </TableCell>
              </TableRow>
            )}
          />
        </TableBody>
      </Table>
    </>
  );
}

export default UsersTable;
