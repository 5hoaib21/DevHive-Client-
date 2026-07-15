"use client";

import React, { useState } from "react";
import { Trash2, Shield } from "lucide-react";
import toast from "react-hot-toast";
import { deleteUserAction, updateUserRoleAction } from "@/lib/actions/users";
import { getIdString, MongoId } from "@/types";

interface User {
  _id: MongoId;
  name: string;
  email: string;
  image?: string;
  role: "explorer" | "publisher" | "admin";
}

interface AdminUserTableProps {
  initialUsers: User[];
}

export default function AdminUserTable({ initialUsers }: AdminUserTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const rolePromise = updateUserRoleAction(userId, newRole).then((res) => {
      if (res.success) {
        setUsers((prev) => prev.map((u) => getIdString(u._id) === userId ? { ...u, role: newRole as "explorer" | "publisher" | "admin" } : u));
        return res.message || "Role updated!";
      } else throw new Error(res.message || "Failed to update role");
    });
    toast.promise(rolePromise, { loading: "Updating role...", success: (msg) => msg, error: (err) => err.message });
  };

  const handleDeleteUser = async (user: User) => {
    const userId = getIdString(user._id);
    const deletePromise = deleteUserAction(userId).then((res) => {
      if (res.success) {
        setUsers((prev) => prev.filter((u) => getIdString(u._id) !== userId));
        setDeleteConfirm(null);
        return res.message || "User deleted.";
      } else throw new Error(res.message || "Failed to delete");
    });
    toast.promise(deletePromise, { loading: "Deleting user...", success: (msg) => msg, error: (err) => err.message });
  };

  const roleColors: Record<string, string> = {
    explorer: "text-dh-teal",
    publisher: "text-dh-indigo",
    admin: "text-dh-orange",
  };

  return (
    <div className="bg-white border border-dh-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F1F3F9] border-b border-dh-border">
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Profile</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="text-right py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const userId = getIdString(user._id);
              const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
              return (
                <tr key={userId} className="border-b border-dh-border last:border-b-0 hover:bg-[#FAFBFF] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={user?.image || defaultAvatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover border border-dh-border"
                        onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }} />
                      <span className="font-medium text-gray-900">{user?.name || "User"}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{user?.email || "N/A"}</td>
                  <td className="py-3 px-4">
                    <select value={user?.role || "explorer"} onChange={(e) => handleRoleChange(userId, e.target.value)}
                      className={'dh-input w-auto text-xs font-semibold ' + (roleColors[user?.role] || '')}>
                      <option value="explorer">Explorer</option>
                      <option value="publisher">Publisher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {deleteConfirm === userId ? (
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleDeleteUser(user)} className="dh-btn dh-btn-danger text-xs px-2 py-1">Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} className="dh-btn dh-btn-ghost text-xs px-2 py-1">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(userId)} className="dh-btn dh-btn-ghost p-1.5 text-gray-400 hover:text-dh-danger">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
