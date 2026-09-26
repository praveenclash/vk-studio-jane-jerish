"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Database,
  Users,
  MessageSquareHeart,
  Download,
  Trash2,
  Search,
  ArrowLeft,
  RefreshCw,
  Heart,
  CheckCircle,
  XCircle,
  FileSpreadsheet
} from "lucide-react";

interface WishRecord {
  id: number;
  name: string;
  relation: string;
  message: string;
  attendance: string;
  guests_count: number;
  created_at: string;
  likes: number;
}

export default function AdminPage() {
  const [records, setRecords] = useState<WishRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [statusMsg, setStatusMsg] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/wishes");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setRecords(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete the entry from "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/wishes/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
        setStatusMsg(`Deleted entry #${id} successfully.`);
        setTimeout(() => setStatusMsg(""), 4000);
      } else {
        alert("Failed to delete entry.");
      }
    } catch (e) {
      console.error(e);
      alert("Error connecting to server.");
    }
  };

  const exportCSV = () => {
    if (records.length === 0) {
      alert("No records to export.");
      return;
    }

    const headers = ["ID", "Name", "Relation", "Attendance", "Guests Count", "Likes", "Created At", "Message"];
    const rows = records.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.relation.replace(/"/g, '""')}"`,
      r.attendance,
      r.guests_count || 1,
      r.likes || 0,
      `"${r.created_at}"`,
      `"${r.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_wishes_and_rsvp_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.message.toLowerCase().includes(search.toLowerCase()) ||
      r.relation.toLowerCase().includes(search.toLowerCase());

    if (filter === "attending") return matchesSearch && r.attendance === "attending";
    if (filter === "declined") return matchesSearch && r.attendance === "regretfully_decline";
    return matchesSearch;
  });

  const totalConfirmedGuests = records
    .filter((r) => r.attendance === "attending")
    .reduce((acc, curr) => acc + (curr.guests_count || 1), 0);

  const totalDeclined = records.filter((r) => r.attendance === "regretfully_decline").length;
  const totalLikes = records.reduce((acc, curr) => acc + (curr.likes || 0), 0);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#231f20] p-3 xs:p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-[#c5a059]/20">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#c5a059]/30 text-stone-700 hover:text-[#c5a059] shadow-sm transition-all min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0"
              title="Back to Wedding Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Database className="w-4 sm:w-5 h-4 sm:h-5 text-[#c5a059] shrink-0" />
                <h1 className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl font-bold text-[#231f20] leading-tight">
                  Wedding SQL Database & RSVP Manager
                </h1>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 break-all">
                Database: <code className="bg-stone-200/70 px-1 py-0.5 rounded font-mono text-[10px]">wedding.db</code> • Table: <code className="bg-stone-200/70 px-1 py-0.5 rounded font-mono text-[10px]">wishes</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={exportCSV}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all min-h-[40px] touch-manipulation"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export to Excel (CSV)
            </button>
            <button
              onClick={fetchRecords}
              className="p-2.5 rounded-xl bg-white border border-[#c5a059]/30 text-stone-700 hover:text-[#c5a059] shadow-sm transition-all min-w-[40px] min-h-[40px] flex items-center justify-center shrink-0 touch-manipulation"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#c5a059]/20 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Total Wishes</span>
              <MessageSquareHeart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c5a059]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#231f20]">
              {records.length}
            </div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 sm:mt-1">In database</div>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#c5a059]/20 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Attending</span>
              <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-emerald-700">
              {totalConfirmedGuests}
            </div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 sm:mt-1">Guests headcount</div>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#c5a059]/20 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Declined</span>
              <XCircle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-stone-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-stone-600">
              {totalDeclined}
            </div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 sm:mt-1">Sent love</div>
          </div>

          <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#c5a059]/20 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold">Reactions</span>
              <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-rose-500 fill-rose-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-rose-600">
              {totalLikes}
            </div>
            <div className="text-[10px] sm:text-[11px] text-stone-500 mt-0.5 sm:mt-1">Given by visitors</div>
          </div>
        </div>

        {/* Status Toast */}
        {statusMsg && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#c5a059]/20 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search name, relation, message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059]"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-semibold text-stone-500 shrink-0">Filter:</span>
            <div className="flex items-center gap-1.5">
              {["all", "attending", "declined"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all touch-manipulation min-h-[32px] ${
                    filter === tab
                      ? "bg-[#c5a059] text-white shadow-sm"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#c5a059]/20 shadow-sm overflow-hidden">
          <div className="sm:hidden px-4 py-2 bg-stone-50/80 border-b border-stone-100 text-[10px] text-stone-500 flex items-center justify-between">
            <span>Scroll horizontally to view details</span>
            <span>👉</span>
          </div>
          <div className="overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-[#faf7f2] border-b border-[#c5a059]/20 text-stone-600 font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">#ID</th>
                  <th className="py-3.5 px-4">Guest Name</th>
                  <th className="py-3.5 px-4">Relation</th>
                  <th className="py-3.5 px-4">RSVP Status</th>
                  <th className="py-3.5 px-4">Guests</th>
                  <th className="py-3.5 px-4">Blessing Message</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Likes</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-stone-400">
                      Loading data from SQL database...
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-stone-400">
                      No records found in database.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r) => {
                    const isAttending = r.attendance === "attending";
                    return (
                      <tr key={r.id} className="hover:bg-[#faf7f2]/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-medium text-stone-500">
                          #{r.id}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-[#231f20]">
                          {r.name}
                        </td>
                        <td className="py-3.5 px-4 text-stone-600">
                          <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                            {r.relation}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              isAttending
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-stone-100 text-stone-600 border border-stone-200"
                            }`}
                          >
                            {isAttending ? (
                              <>
                                <CheckCircle className="w-3 h-3" /> Attending
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Declined
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-stone-700">
                          {isAttending ? r.guests_count || 1 : "-"}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-stone-700 italic">
                          <p className="line-clamp-2" title={r.message}>
                            &ldquo;{r.message}&rdquo;
                          </p>
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                          {r.created_at}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-rose-600 font-semibold">
                            <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                            {r.likes || 0}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(r.id, r.name)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete entry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-stone-400">
          <p>
            Connected to SQLite Database: <span className="font-mono text-stone-600">wedding.db</span> in project root.
          </p>
        </div>
      </div>
    </div>
  );
}
