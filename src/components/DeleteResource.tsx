"use client";

import { deleteResource } from "@/lib/actions/prompts";
import { AlertDialog, Button } from "@heroui/react";
import { Delete } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteResource({ promptId }: { promptId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const response: any = await deleteResource(promptId);
    if (response.success) {
      toast.success("Successfully deleted!");
      router.refresh();
    } else {
      toast.error("Could not delete: " + response.error);
    }
  };

  return (
    <AlertDialog>
      {/* Trigger Button */}
      <Button variant="danger-soft" size="sm">
        <Delete />
      </Button>
      
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete resource permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete this resource and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={handleDelete}>
                Delete Resource
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}