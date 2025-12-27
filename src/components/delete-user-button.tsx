"use client";

import { LoaderIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { deleteUser } from "~/actions/users";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteUserButtonProps {
  userId: number;
}

function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser(userId);
      toast.success("User deleted successfully!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      // Optionally, handle error and show a toast notification
      toast.error(`Failed to delete user: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            variant={"destructive"}
            size={"icon"}
          >
            <TrashIcon className="size-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={handleDelete}>
              {loading ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteUserButton;
