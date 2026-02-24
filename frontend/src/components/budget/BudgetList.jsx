import BudgetCard from "./BudgetCard";

export default function BudgetList({
  progress = [],
  loading = false,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="budget-list">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Budget Progress
        </h2>
        <p className="text-slate-500">Loading budget progress...</p>
      </div>
    );
  }

  if (!progress || progress.length === 0) {
    return (
      <div className="budget-list">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">
          Budget Progress
        </h2>
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
          No budgets found for this month.
        </div>
      </div>
    );
  }

  return (
    <div className="budget-list">
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Budget Progress
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {progress.map((item) => (
          <BudgetCard
            key={`${item.category}-${item.month}`}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}