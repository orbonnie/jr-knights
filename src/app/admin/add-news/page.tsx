"use client";

import { useState } from "react";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset!);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  return data.public_id as string;
}

function formatDisplayDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function PasswordGate({
  onAuthorized,
}: {
  onAuthorized: (password: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChecking(true);
    setError("");

    try {
      const res = await fetch("/api/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.status === 401) {
        setError("Incorrect password.");
        setChecking(false);
        return;
      }
      if (!res.ok) throw new Error();

      onAuthorized(password);
    } catch {
      setError("Something went wrong. Please try again.");
      setChecking(false);
    }
  };

  return (
    <section className="max-w-sm mx-auto py-24 px-6">
      <h1 className="font-display text-black-500 text-2xl tracking-widest mb-6 text-center">
        ADMIN ACCESS
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoFocus
          className="text-black-500 w-full border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          disabled={checking}
          className="w-full bg-royal-600 hover:bg-royal-700 text-white font-display tracking-widest uppercase py-3 rounded-md transition-colors disabled:opacity-50"
        >
          {checking ? "Checking..." : "Enter"}
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      </form>
    </section>
  );
}

// ---------- FORM ----------
export function AddNewsForm({ password }: { password: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [href, setHref] = useState("#");
  const [isoDate, setIsoDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please choose an image.");
      return;
    }

    setStatus("saving");
    setErrorMsg("");

    try {
      const publicId = await uploadImage(file);

      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          title,
          description,
          image: publicId,
          href: href || "/",
          date: formatDisplayDate(isoDate),
          isoDate,
        }),
      });

      if (res.status === 401) {
        setErrorMsg("Incorrect password(2).");
        setStatus("error");
        return;
      }
      if (!res.ok) throw new Error("Failed to save story");

      setStatus("done");
      setTitle("");
      setDescription("");
      setHref("");
      setIsoDate("");
      setFile(null);
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section className="max-w-xl mt-10 mx-auto p-16 px-6">
      <h1 className="font-display text-black-500 text-4xl tracking-widest mb-8 text-center">
        ADD NEWS STORY
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-black-500 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="text-black-500 w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black-500 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="text-black-500 w-full border border-gray-300 rounded-md px-3 py-2"
          />
          <p className="text-xs text-gray-400 mt-1">
            Wrap text in **double asterisks** to bold it.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-black-500 mb-1">
            Link (optional)
          </label>
          <input
            type="text"
            value={href}
            onChange={(e) => setHref(e.target.value)}
            placeholder="https://... or /roster"
            className="text-black-500 w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black-500 mb-1">
            Expiration Date
          </label>
          <input
            type="date"
            value={isoDate}
            onChange={(e) => setIsoDate(e.target.value)}
            required
            className="text-black-500 w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black-500 mb-1">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="text-black-500 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full bg-royal-600 hover:bg-royal-700 text-white font-display tracking-widest uppercase py-3 rounded-md transition-colors disabled:opacity-50"
        >
          {status === "saving" ? "Saving..." : "Add Story"}
        </button>

        {status === "done" && (
          <p className="text-green-600 text-sm text-center">Story added!</p>
        )}
        {errorMsg && (
          <p className="text-red-600 text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </section>
  );
}

// ---------- PAGE ----------
export default function AddNewsPage() {
  const [authorizedPassword, setAuthorizedPassword] = useState<string | null>(
    null,
  );

  if (!authorizedPassword) {
    return <PasswordGate onAuthorized={setAuthorizedPassword} />;
  }

  return <AddNewsForm password={authorizedPassword} />;
}
