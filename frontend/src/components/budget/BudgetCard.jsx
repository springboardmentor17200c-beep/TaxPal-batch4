/**
 * BudgetCard – shows one category: Limit, Spent, Remaining, status badge, progress bar.
 

 * Status: green (< 80%), yellow (80–100%), red (over limit).
 */
export default function BudgetCard({ item }) {
  const limit = Number(item?.limit ?? 0);
  const spent = Number(item?.spent ?? 0);
  const remaining = Math.max(0, limit - spent);
  const percent = limit > 0 ? Math.min(100, (spent / limit) * 100) : 0;

  const getStatus = () => {
    if (percent >= 100) return { label: "Over budget", color: "red" };
    if (percent >= 80) return { label: "Warning", color: "yellow" };
    return { label: "On track", color: "green" };
  };

  const status = getStatus();

  const badgeClass = {
    green: "bg-emerald-100 text-emerald-800 border-emerald-200",
    yellow: "bg-amber-100 text-amber-800 border-amber-200",
    red: "bg-red-100 text-red-800 border-red-200",
  }[status.color];

  const barClass = {
    green: "bg-emerald-500",
    yellow: "bg-amber-500",
    red: "bg-red-500",
  }[status.color];

  return (
    <div className="budget-card rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 capitalize">
          {item?.category ?? "Uncategorized"}
        </h3>
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
        >
          {status.label}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Limit</span>
          <span className="font-medium text-slate-800">
            ${limit.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Spent</span>
          <span className="font-medium text-slate-800">
            ${spent.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Remaining</span>
          <span className="font-medium text-slate-800">
            ${remaining.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-300 ${barClass}`}
            style={{ width: `${Math.min(100, percent)}%` }}
          />
        </div>
        <p className="mt-1 text-right text-xs text-slate-500">
          {percent.toFixed(0)}% used
        </p>
      </div>
    </div>
  );
}
