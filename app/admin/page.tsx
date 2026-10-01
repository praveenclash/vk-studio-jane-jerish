"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
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
  FileSpreadsheet,
  Lock,
  LogOut,
  PlusCircle,
  X,
  Send,
  Eye,
  EyeOff,
  ShieldCheck,
  User
} from "lucide-react";

interface WishRecord {
  id: number;
  name: string;
  message: string;
  created_at: string;
  likes: number;
}

export default function AdminPage() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Data state
  const [records, setRecords] = useState<WishRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  // Manual Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [submittingWish, setSubmittingWish] = useState(false);
  const [addError, setAddError] = useState("");
  const [addForm, setAddForm] = useState({
    name: "",
    message: "",
  });

  // Check login session on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("wedding_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchRecords();
    }
    setAuthChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const validUsernames = ["admin", "jane", "jerish", "vkstudio"];
    const validPasswords = ["janejerish2026", "admin123", "password123", "wedding2026"];

    const userClean = username.trim().toLowerCase();
    const passClean = password.trim();

    if (validUsernames.includes(userClean) && validPasswords.includes(passClean)) {
      sessionStorage.setItem("wedding_admin_auth", "true");
      setIsAuthenticated(true);
      fetchRecords();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f6e29f", "#ffffff"],
      });
    } else {
      setLoginError("Invalid username or password. Please check your credentials.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("wedding_admin_auth");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

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

  const handleManualAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.message.trim()) {
      setAddError("Please fill in both the guest name and blessing message.");
      return;
    }

    setSubmittingWish(true);
    setAddError("");

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh records
        await fetchRecords();

        // Broadcast to live website
        window.dispatchEvent(new CustomEvent("wedding_new_wish", { detail: data.data }));

        // Confetti celebration
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f6e29f", "#ffffff"],
        });

        // Close modal and reset form
        setShowAddModal(false);
        setAddForm({
          name: "",
          message: "",
        });

        setStatusMsg(`Successfully added wish from "${data.data.name}" to the SQL database!`);
        setTimeout(() => setStatusMsg(""), 5000);
      } else {
        setAddError(data.error || "Failed to save wish to database.");
      }
    } catch (err) {
      console.error(err);
      setAddError("Network error while connecting to SQL database.");
    } finally {
      setSubmittingWish(false);
    }
  };

  const exportCSV = () => {
    if (records.length === 0) {
      alert("No records to export.");
      return;
    }

    const headers = ["ID", "Name", "Blessing Message", "Likes", "Created At"];
    const rows = records.map((r) => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.message.replace(/"/g, '""')}"`,
      r.likes || 0,
      `"${r.created_at}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_wishes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = records.filter((r) => {
    return (
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.message.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalLikes = records.reduce((acc, curr) => acc + (curr.likes || 0), 0);

  // If initial auth check is in progress
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#0b0907] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0b0907] text-[#fcfbf7] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Card */}
          <div className="glass-panel-midnight-elevated rounded-3xl p-6 xs:p-8 sm:p-10 border border-[#d4af37]/35 shadow-2xl text-center">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src="/images/logo-gold.png"
                alt="JJ Monogram Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181410] border border-[#d4af37]/30 text-[#f6e29f] text-[10px] sm:text-xs font-cinzel font-semibold uppercase tracking-widest mb-3">
              <Lock className="w-3 h-3 text-[#d4af37]" />
              <span>Admin Security Portal</span>
            </div>

            <h1 className="font-serif-luxury text-2xl xs:text-3xl text-white font-normal mb-1 tracking-wide">
              Wedding Manager
            </h1>
            <p className="text-xs text-[#b8ab96] mb-6">
              Jane & Jerish • SQL Database & RSVP Control Panel
            </p>

            {/* Error banner */}
            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs text-left flex items-start gap-2 animate-fadeIn">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-cinzel font-semibold uppercase tracking-wider text-[#ded6ca] mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter username (e.g. admin)"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="admin-input w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl text-base sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-cinzel font-semibold uppercase tracking-wider text-[#ded6ca] mb-1.5">
                  Secret Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="admin-input w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-xl text-base sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 sm:py-3.5 rounded-full gold-gradient-bg text-black font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all min-h-11 flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Sign In to Dashboard
                </button>
              </div>

              {/* Quick default credential helper */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setUsername("admin");
                    setPassword("janejerish2026");
                  }}
                  className="text-[11px] text-[#d4af37] underline hover:text-[#f6e29f] transition-colors"
                >
                  Fill default credentials (admin / janejerish2026)
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-[#d4af37]/15">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-[#b8ab96] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Wedding Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#0b0907] text-[#fcfbf7] p-3 xs:p-4 sm:p-8 pt-[calc(env(safe-area-inset-top,0px)+0.75rem)]">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-8 pb-4 sm:pb-6 border-b border-[#d4af37]/25">
          <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className="rounded-xl bg-[#181410] border border-[#d4af37]/30 text-stone-300 hover:text-[#d4af37] shadow-sm transition-all w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0"
              title="Back to Wedding Website"
            >
              <ArrowLeft className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </Link>
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <img
                src="/images/logo-gold.png"
                alt="JJ Monogram"
                className="h-8 sm:h-9 w-auto object-contain hidden xs:block shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] shrink-0" />
                  <h1 className="font-serif-luxury text-base xs:text-xl sm:text-2xl md:text-3xl font-normal text-white leading-tight">
                    Wedding SQL Database & Wishes Manager
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-xs text-[#b8ab96] mt-1">
                  <span>Database:</span>
                  <code className="bg-[#181410] px-1.5 py-0.5 rounded font-mono text-[9px] sm:text-[10px] text-[#f6e29f] border border-[#d4af37]/20">wedding.db</code>
                  <span>•</span>
                  <span>Table:</span>
                  <code className="bg-[#181410] px-1.5 py-0.5 rounded font-mono text-[9px] sm:text-[10px] text-[#f6e29f] border border-[#d4af37]/20">wishes</code>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Add Manual Wish button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl gold-gradient-bg text-black text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all min-h-9 sm:min-h-10 touch-manipulation cursor-pointer whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Add Wish</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all w-9 h-9 sm:w-auto sm:min-h-10 touch-manipulation cursor-pointer shrink-0"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchRecords}
              className="rounded-xl bg-[#181410] border border-[#d4af37]/35 text-stone-300 hover:text-[#d4af37] shadow-sm transition-all w-9 h-9 sm:w-10 sm:min-h-10 flex items-center justify-center shrink-0 touch-manipulation cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? "animate-spin text-[#d4af37]" : ""}`} />
            </button>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 shadow-sm transition-all w-9 h-9 sm:w-10 sm:min-h-10 flex items-center justify-center shrink-0 touch-manipulation cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="glass-panel-midnight p-4 sm:p-5 rounded-2xl border border-[#d4af37]/25 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-[#ded6ca]">Total Wishes</span>
              <MessageSquareHeart className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
              {records.length}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#b8ab96] mt-0.5 sm:mt-1">Stored in MySQL database</div>
          </div>

          <div className="glass-panel-midnight p-4 sm:p-5 rounded-2xl border border-rose-500/30 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-rose-300">Total Reactions</span>
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-rose-400">
              {totalLikes}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#b8ab96] mt-0.5 sm:mt-1">Heart blessings received</div>
          </div>

          <div className="glass-panel-midnight p-4 sm:p-5 rounded-2xl border border-emerald-500/30 shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-1.5 sm:mb-2">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-emerald-400">SQL Status</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-emerald-400">
              Active
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#b8ab96] mt-0.5 sm:mt-1">wedding.db &bull; wishes</div>
          </div>
        </div>

        {/* Status Toast */}
        {statusMsg && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Search Toolbar */}
        <div className="glass-panel-midnight p-3.5 sm:p-4 rounded-2xl border border-[#d4af37]/25 shadow-sm mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4 text-[#d4af37]" />
            </div>
            <input
              type="text"
              placeholder="Search guest name or blessing message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="glass-panel-midnight rounded-2xl sm:rounded-3xl border border-[#d4af37]/25 shadow-sm overflow-hidden">
          <div className="sm:hidden px-4 py-2 bg-stone-900 border-b border-[#d4af37]/15 text-[10px] text-[#b8ab96] flex items-center justify-between">
            <span>Scroll horizontally to view table columns</span>
            <span>👉</span>
          </div>
          <div className="overflow-x-auto no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
            <table className="w-full text-left text-xs min-w-150">
              <thead className="bg-[#14100c] border-b border-[#d4af37]/25 text-[#ded6ca] font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                <tr>
                  <th className="py-3.5 px-4 font-cinzel">#ID</th>
                  <th className="py-3.5 px-4 font-cinzel">Guest Name</th>
                  <th className="py-3.5 px-4 font-cinzel">Blessing Message</th>
                  <th className="py-3.5 px-4 font-cinzel">Date & Time</th>
                  <th className="py-3.5 px-4 font-cinzel">Likes</th>
                  <th className="py-3.5 px-4 text-right font-cinzel">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d4af37]/15">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#b8ab96]">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
                        <span>Loading data from SQL database...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#b8ab96]">
                      No records found in database. Click &ldquo;Add Wish&rdquo; above to create one!
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r) => {
                    return (
                      <tr key={r.id} className="hover:bg-stone-900/60 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-medium text-[#d4af37]">
                          #{r.id}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-white">
                          {r.name}
                        </td>
                        <td className="py-3.5 px-4 max-w-sm text-[#cfc5b6] italic">
                          <p className="line-clamp-2" title={r.message}>
                            &ldquo;{r.message}&rdquo;
                          </p>
                        </td>
                        <td className="py-3.5 px-4 text-[#8f8272] whitespace-nowrap text-[11px]">
                          {r.created_at}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                            {r.likes || 0}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(r.id, r.name)}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
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
        <div className="mt-8 text-center text-xs text-[#8f8272]">
          <p>
            Connected to MySQL Database: <span className="font-mono text-[#d4af37]">railway</span> on Railway Cloud.
          </p>
        </div>
      </div>

      {/* MANUAL ADD WISH MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-lg glass-panel-midnight-elevated rounded-3xl border border-[#d4af37]/40 p-5 xs:p-6 sm:p-8 shadow-2xl relative my-8">
            {/* Close button */}
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <span className="text-[#d4af37] font-script text-xl block mb-0.5">Admin Action</span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-white font-normal">
                Add Wish Manually
              </h2>
              <p className="text-xs text-[#b8ab96] mt-1">
                Save a guest&apos;s blessing directly into the MySQL database.
              </p>
            </div>

            {/* Error banner */}
            {addError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleManualAddSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#ded6ca] mb-1">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh & Family"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="admin-input w-full px-3.5 py-2.5 rounded-xl text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#ded6ca] mb-1">
                  Wedding Blessing & Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Enter their wedding wishes for Jane & Jerish..."
                  value={addForm.message}
                  onChange={(e) => setAddForm({ ...addForm, message: e.target.value })}
                  className="admin-input w-full p-3 rounded-xl text-base sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-700 text-stone-300 hover:bg-white/5 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingWish}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl gold-gradient-bg text-black text-xs font-bold uppercase tracking-wider shadow hover:brightness-110 disabled:opacity-50 min-h-10 cursor-pointer"
                >
                  {submittingWish ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Save to Database
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
