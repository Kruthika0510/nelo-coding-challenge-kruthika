import { useEffect, useState } from 'react';

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  dueDate: '',
};

const TaskForm = ({ editingTask, onSubmit, onCancelEdit }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  }, [editingTask]);

  const handleChange = (evt) => {
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.title.trim()) nextErrors.title = 'Title is required.';
    if (!formData.description.trim()) nextErrors.description = 'Description is required.';
    if (!formData.priority) nextErrors.priority = 'Priority is required.';
    if (!formData.dueDate) nextErrors.dueDate = 'Due date is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
    });

    if (!editingTask) {
      setFormData(EMPTY_FORM);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl shadow-slate-200/60">
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-slate-900">
          {editingTask ? 'Edit Task' : 'Add a New Task'}
        </h2>
        <p className="text-sm text-slate-500">
          {editingTask ? 'Update the details below.' : 'All fields are required to create a task.'}
        </p>
      </div>

      <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            placeholder="Launch marketing campaign"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            placeholder="Outline milestones, deliverables, and owners."
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="mt-1 text-xs text-rose-500">{errors.description}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {errors.priority && <p className="mt-1 text-xs text-rose-500">{errors.priority}</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="dueDate">
            Due Date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            value={formData.dueDate}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.dueDate && <p className="mt-1 text-xs text-rose-500">{errors.dueDate}</p>}
        </div>

        <div className="flex flex-wrap gap-3 md:col-span-2">
          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-2xl border border-slate-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:shadow focus:outline-none focus:ring-4 focus:ring-slate-100"
            >
              Cancel Edit
            </button>
          )}
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300/50"
          >
            {editingTask ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaskForm;

