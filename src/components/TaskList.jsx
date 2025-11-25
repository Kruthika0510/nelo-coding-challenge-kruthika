import TaskItem from './TaskItem.jsx';

const TaskList = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Tasks</h2>
          <p className="text-sm text-slate-500">Manage and track current work items.</p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600">
          {tasks.length} showing
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center text-sm text-slate-500">
          No tasks match the current filters. Try adjusting your search or create a new task.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task.id)}
              onToggleStatus={() => onToggleStatus(task.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskList;

