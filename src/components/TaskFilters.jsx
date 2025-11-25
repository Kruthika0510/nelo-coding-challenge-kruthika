const STATUS_OPTIONS = [
  { key: 'all', label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Pending' },
];

const PRIORITY_OPTIONS = [
  { key: 'all', label: 'All priorities' },
  { key: 'high', label: 'High' },
  { key: 'medium', label: 'Medium' },
  { key: 'low', label: 'Low' },
];

const TaskFilters = ({
  statusFilter,
  priorityFilter,
  searchValue,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}) => {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => onStatusChange(option.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-200 ${
                statusFilter === option.key
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100'
                  : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
          <div className="w-full md:max-w-xs">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(evt) => onPriorityChange(evt.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full md:max-w-sm">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Search
            </label>
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-3.5-3.5m0-6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                />
              </svg>
              <input
                type="search"
                placeholder="Search title or description..."
                value={searchValue}
                onChange={(evt) => onSearchChange(evt.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 pl-10 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskFilters;

