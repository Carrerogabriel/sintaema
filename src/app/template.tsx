/** Re-mounts on every navigation, giving each page a soft entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-[fade-in_0.2s_ease-out_both]">{children}</div>;
}
