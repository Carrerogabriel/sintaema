"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Icon, type IconName } from "../Icon";

/** Submit button that shows a pending label while the form action runs. */
export function SubmitButton({
  children,
  pendingLabel = "Salvando…",
  className = "btn-primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { pendingLabel?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={`${className} disabled:opacity-60`} {...props}>
      {pending ? pendingLabel : children}
    </button>
  );
}

/** Submit button that asks for confirmation first (used for deletions). */
export function ConfirmButton({
  message,
  children,
  className = "",
  title,
}: {
  message: string;
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      title={title}
      aria-label={title}
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
      className={`${className} disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

/** Success / error banner driven by ?ok= or ?erro= in the URL; fades out on its own. */
export function Flash() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const ok = params.get("ok");
  const error = params.get("erro");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ok && !error) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      const next = new URLSearchParams(params.toString());
      next.delete("ok");
      next.delete("erro");
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    }, 4000);
    return () => clearTimeout(timer);
  }, [ok, error, params, pathname, router]);

  if ((!ok && !error) || !visible) return null;
  return (
    <div
      role="status"
      className={`fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-fade-up items-center gap-3 rounded-2xl px-5 py-4 text-sm font-semibold shadow-2xl ${
        error ? "bg-red-600 text-white" : "bg-brand-navy text-white"
      }`}
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${error ? "bg-white/20" : "bg-brand-green"}`}>
        <Icon name={error ? "alert" : "check"} className="h-4 w-4" strokeWidth={2.5} />
      </span>
      {error ?? ok}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  text,
  action,
}: {
  icon: IconName;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-2xl border-2 border-dashed border-slate-200 bg-white/60 px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-sand text-brand-blue">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 font-display text-xl font-semibold uppercase text-brand-navy">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">{text}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
