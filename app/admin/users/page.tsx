"use client";

import { AdminDataTable, ColumnDef } from "@/components/admin/AdminDataTable";
import { ShieldCheck, ShieldAlert, Clock } from "lucide-react";

interface AdminUserItem {
  _id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Showroom Manager" | "Catalog Curator" | "Concierge Specialist";
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
  twoFactorEnabled: boolean;
  avatarColor: string;
}

const DEMO_ADMIN_USERS: AdminUserItem[] = [
  {
    _id: "usr-01",
    name: "Mohsin Ali",
    email: "mohsin@decorium.com",
    role: "Super Admin",
    status: "Active",
    lastActive: "Just now",
    twoFactorEnabled: true,
    avatarColor: "bg-stone-800 text-white dark:bg-stone-200 dark:text-black",
  },
  {
    _id: "usr-02",
    name: "Elena Rostova",
    email: "elena.r@decorium.com",
    role: "Showroom Manager",
    status: "Active",
    lastActive: "14 mins ago",
    twoFactorEnabled: true,
    avatarColor: "bg-[#1c1b1b] text-white dark:bg-[#f4f0ef] dark:text-[#121212]",
  },
  {
    _id: "usr-03",
    name: "Aarav Sharma",
    email: "aarav.s@decorium.com",
    role: "Catalog Curator",
    status: "Active",
    lastActive: "1 hour ago",
    twoFactorEnabled: false,
    avatarColor: "bg-emerald-800 text-emerald-100 dark:bg-emerald-300 dark:text-emerald-950",
  },
  {
    _id: "usr-04",
    name: "Sophia Chen",
    email: "sophia.c@decorium.com",
    role: "Concierge Specialist",
    status: "Invited",
    lastActive: "Pending invite",
    twoFactorEnabled: false,
    avatarColor: "bg-amber-800 text-amber-100 dark:bg-amber-300 dark:text-amber-950",
  },
  {
    _id: "usr-05",
    name: "Matteo Ricci",
    email: "matteo.r@decorium.com",
    role: "Showroom Manager",
    status: "Active",
    lastActive: "Yesterday",
    twoFactorEnabled: true,
    avatarColor: "bg-stone-700 text-white dark:bg-stone-300 dark:text-black",
  },
  {
    _id: "usr-06",
    name: "Vikram Malhotra",
    email: "vikram.m@decorium.com",
    role: "Catalog Curator",
    status: "Suspended",
    lastActive: "3 days ago",
    twoFactorEnabled: false,
    avatarColor: "bg-red-900 text-red-100 dark:bg-red-300 dark:text-red-950",
  },
  {
    _id: "usr-07",
    name: "Hannah Abbott",
    email: "hannah.a@decorium.com",
    role: "Concierge Specialist",
    status: "Active",
    lastActive: "2 hours ago",
    twoFactorEnabled: true,
    avatarColor: "bg-blue-800 text-blue-100 dark:bg-blue-300 dark:text-blue-950",
  },
  {
    _id: "usr-08",
    name: "Marcus Vance",
    email: "marcus.v@decorium.com",
    role: "Showroom Manager",
    status: "Active",
    lastActive: "5 hours ago",
    twoFactorEnabled: true,
    avatarColor: "bg-purple-800 text-purple-100 dark:bg-purple-300 dark:text-purple-950",
  },
];

export default function AdminUsersPage() {
  const columns: ColumnDef<AdminUserItem>[] = [
    {
      key: "name",
      header: "USER IDENTITY",
      className: "min-w-[260px]",
      render: (user) => {
        const initials = user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3.5">
            <div className={`size-10 rounded-lg flex items-center justify-center font-semibold text-xs font-label-caps ${user.avatarColor} border border-[#c4c7c7]/30 dark:border-[#2e2e2e] shrink-0`}>
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-hanken-grotesk text-body-md font-semibold text-[#1c1b1b] dark:text-[#f4f0ef] block truncate">
                {user.name}
              </span>
              <span className="font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e] block truncate">
                {user.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: "role",
      header: "ACCESS ROLE",
      className: "min-w-[200px]",
      render: (user) => (
        <span className="inline-block px-2.5 py-1 border border-[#c4c7c7]/40 dark:border-[#2e2e2e] rounded font-label-caps text-[10px] uppercase text-[#1c1b1b] dark:text-[#f4f0ef]">
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "USER STATUS",
      className: "w-32",
      render: (user) => {
        const statusConfig = {
          Active: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
          Invited: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-500/20",
          Suspended: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-500/20",
        };

        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-caps text-[10px] uppercase border ${statusConfig[user.status]}`}>
            <span className="size-1.5 rounded-full bg-current" />
            {user.status}
          </span>
        );
      },
    },
    {
      key: "lastActive",
      header: "LAST ACTIVITY",
      className: "min-w-[150px]",
      render: (user) => (
        <span className="inline-flex items-center gap-1.5 font-body-sm text-xs text-[#5d5f5f] dark:text-[#8e8e8e]">
          <Clock className="size-3.5 shrink-0" />
          {user.lastActive}
        </span>
      ),
    },
    {
      key: "twoFactorEnabled",
      header: "SECURITY (2FA)",
      className: "w-32",
      render: (user) => (
        <span className={`inline-flex items-center gap-1.5 font-label-caps text-[10px] uppercase ${
          user.twoFactorEnabled ? "text-emerald-600 dark:text-emerald-400" : "text-[#5d5f5f] dark:text-[#8e8e8e]"
        }`}>
          {user.twoFactorEnabled ? (
            <>
              <ShieldCheck className="size-3.5" />
              Enabled
            </>
          ) : (
            <>
              <ShieldAlert className="size-3.5" />
              Disabled
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <AdminDataTable
      title="ADMIN USERS & ROLES"
      subtitle="Manage internal team access, showroom manager credentials, catalog curators, and concierge permission roles."
      searchPlaceholder="Search team members by name, email, or access role..."
      addItemLabel="Invite User"
      columns={columns}
      data={DEMO_ADMIN_USERS}
      itemsPerPage={8}
      onAddItem={() => alert("Invite User Modal Triggered")}
    />
  );
}
