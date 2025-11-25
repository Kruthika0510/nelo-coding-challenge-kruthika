const PRIORITY_STYLES = {
  high: 'border-rose-100 bg-rose-50 text-rose-600',
  medium: 'border-amber-100 bg-amber-50 text-amber-600',
  low: 'border-emerald-100 bg-emerald-50 text-emerald-600',
};

const STATUS_STYLES = {
  completed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-slate-100 text-slate-600',
};

const formatDate = (value) => {
  if (!value) return 'No due date';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
};

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <article className="rounded-2xl border border-slate-100 p-5 shadow-[0_15px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-900">{task.title}</h3>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                PRIORITY_STYLES[task.priority]
              }`}
            >
              {task.priority}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                STATUS_STYLES[task.completed ? 'completed' : 'pending']
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{task.description}</p>
          <p className="mt-3 text-sm font-medium text-slate-700">Due {formatDate(task.dueDate)}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onToggleStatus}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Mark {task.completed ? 'Pending' : 'Complete'}
          </button>
          <button
            onClick={onEdit}
            className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskItem;

