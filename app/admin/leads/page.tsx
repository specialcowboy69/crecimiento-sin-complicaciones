import type { Metadata } from "next";
import { AdminLeadsPanel } from "./AdminLeadsPanel";

export const metadata: Metadata = {
  title: "Panel de leads",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLeadsPage() {
  return <AdminLeadsPanel />;
}
