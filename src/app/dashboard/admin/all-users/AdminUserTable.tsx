"use client";

import React, { useState } from "react";
import { Table, Chip, Select, ListBox, Button, AlertDialog } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteUserAction, updateUserRoleAction } from "@/lib/actions/users";
import { getIdString, MongoId } from "@/types";

interface User {
  _id: MongoId;
  name: string;
  email: string;
  image?: string;
  role: "user" | "creator" | "admin";
}

interface AdminUserTableProps {
  initialUsers: User[];
}

export default function AdminUserTable({ initialUsers }: AdminUserTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleRoleChange = async (userId: string, key: unknown) => {
    const newRole = typeof key === "object" && key !== null ? Array.from(key as Set<string>)[0] : (key as string);
    if (!newRole) return;

    const rolePromise = updateUserRoleAction(userId, newRole).then((res) => {
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) =>
            getIdString(u._id) === userId ? { ...u, role: newRole as "user" | "creator" | "admin" } : u
          )
        );
        return res.message || `Role updated to ${newRole}!`;
      } else {
        throw new Error(res.message || "Failed to update role");
      }
    });

    toast.promise(rolePromise, {
      loading: "Updating user role...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  const handleDeleteUser = async (user: User) => {
    const userId = getIdString(user._id);

    const deletePromise = deleteUserAction(userId).then((res) => {
      if (res.success) {
        setUsers((prev) => prev.filter((u) => getIdString(u._id) !== userId));
        return res.message || "User deleted permanently.";
      } else {
        throw new Error(res.message || "Failed to delete user");
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting user account...",
      success: (msg) => msg,
      error: (err) => err.message,
    });
  };

  return (
    <Table aria-label="User Management Table" className="bg-white text-zinc-800 shadow-none">
      <Table.ResizableContainer>
        <Table.Content aria-label="Table with resizable columns" className="min-w-[750px]">
          <Table.Header>
            <Table.Column
              isRowHeader
              defaultWidth="1.5fr"
              id="profile"
              minWidth={220}
              className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200"
            >
              PROFILE DETAILS <Table.ColumnResizer />
            </Table.Column>
            <Table.Column
              defaultWidth="1.5fr"
              id="email"
              minWidth={220}
              className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200"
            >
              EMAIL ADDRESS <Table.ColumnResizer />
            </Table.Column>
            <Table.Column
              defaultWidth="1.2fr"
              id="role"
              minWidth={160}
              className="text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200"
            >
              ROLE LEVEL <Table.ColumnResizer />
            </Table.Column>
            <Table.Column
              defaultWidth="0.6fr"
              id="actions"
              minWidth={80}
              className="text-right pr-6 text-zinc-700 font-bold bg-zinc-50 border-b border-zinc-200"
            >
              ACTIONS
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {users.map((user, index) => {
              const userId = getIdString(user._id);

              return (
                <Table.Row key={userId} className="border-b border-zinc-100 hover:bg-zinc-50/80 transition-colors">
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover border border-zinc-200"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                      />
                      <span className="font-semibold text-zinc-900 text-sm">
                        {user?.name || "User"}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-zinc-600 text-sm">{user?.email || "N/A"}</span>
                  </Table.Cell>

                  <Table.Cell>
                    <Select
                      className="w-full max-w-[130px]"
                      placeholder="Select role"
                      selectedKey={user?.role || "user"}
                      onSelectionChange={(key) => handleRoleChange(userId, key)}
                    >
                      <Select.Trigger className="h-8 min-h-8 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-700 text-xs font-medium">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-white border border-zinc-200 rounded-xl shadow-lg">
                        <ListBox>
                          <ListBox.Item
                            id="user"
                            textValue="User"
                            className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md"
                          >
                            User
                          </ListBox.Item>
                          <ListBox.Item
                            id="creator"
                            textValue="Creator"
                            className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md"
                          >
                            Creator
                          </ListBox.Item>
                          <ListBox.Item
                            id="admin"
                            textValue="Admin"
                            className="text-xs text-zinc-700 hover:bg-zinc-50 rounded-md"
                          >
                            Admin
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Table.Cell>

                  <Table.Cell className="text-right pr-6">
                    <AlertDialog>
                      <Button variant="danger-soft">
                        <Trash2 size={14} />
                      </Button>
                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading>Delete user permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p>
                                This will permanently delete <strong>{user?.name}</strong> and all of its
                                data. This action cannot be undone.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button slot="close" variant="tertiary">
                                Cancel
                              </Button>
                              <Button
                                slot="close"
                                variant="danger"
                                onClick={() => handleDeleteUser(user)}
                              >
                                Delete User
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}