export default function BudgetCard({ item, onEdit, onDelete }) {
  const limit = Number(item?.limit ?? 0);
  const spent = Number(item?.spent ?? 0);
  const remaining = Number(item?.remaining ?? limit - spent);
  const percent = Number(item?.percentage ?? 0);
  const status = item?.status ?? "safe";

  const statusConfig = {
    safe: {
      label: "Safe",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
      bar: "bg-emerald-500",
    },
    warning: {
      label: "Warning",
      badge: "bg-amber-100 text-amber-800 border-amber-200",
      bar: "bg-amber-500",
    },
    exceeded: {
      label: "Exceeded",
      badge: "bg-red-100 text-red-800 border-red-200",
      bar: "bg-red-500",
    },
  };

  const current = statusConfig[status] || statusConfig.safe;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 capitalize">
          {item?.category ?? "Uncategorized"}
        </h3>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${current.badge}`}
          >
            {current.label}
          </span>

          {/* Edit */}
          <button
            onClick={() => onEdit?.(item)}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete?.(item._id)}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Values */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Limit</span>
          <span className="font-medium text-slate-800">
            ₹{limit.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Spent</span>
          <span className="font-medium text-slate-800">
            ₹{spent.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Remaining</span>
          <span
            className={`font-medium ${
              remaining < 0 ? "text-red-600" : "text-slate-800"
            }`}
          >
            ₹{remaining.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${current.bar}`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          />
        </div>

        <p className="mt-1 text-right text-xs text-slate-500">
          {percent}% used
        </p>

        {percent > 100 && (
          <p className="mt-1 text-right text-xs text-red-600 font-medium">
            Overspent by ₹{Math.abs(remaining).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}