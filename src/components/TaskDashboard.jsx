import { useEffect, useMemo, useRef, useState } from 'react';
import TaskFilters from './TaskFilters.jsx';
import TaskForm from './TaskForm.jsx';
import TaskList from './TaskList.jsx';
import useDebounce from '../hooks/useDebounce.js';

const TaskDashboard = ({ onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const tasksRef = useRef(tasks);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    const logPendingTasks = () => {
      const pendingTasks = tasksRef.current.filter((task) => !task.completed);
      const titles = pendingTasks.map((task) => task.title).join(', ') || 'None';
      console.info('[Task Mail Automation]', {
        pendingCount: pendingTasks.length,
        titles,
        timestamp: new Date().toISOString(),
      });
    };

    const intervalId = window.setInterval(logPendingTasks, 20 * 60 * 1000);
    logPendingTasks();
    return () => window.clearInterval(intervalId);
  }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;
    return { total: tasks.length, completed, pending };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === 'all' ? true : statusFilter === 'completed' ? task.completed : !task.completed;
      const matchesPriority = priorityFilter === 'all' ? true : task.priority === priorityFilter;
      const matchesSearch = query
        ? `${task.title} ${task.description}`.toLowerCase().includes(query)
        : true;

      return matchesStatus && matchesPriority && matchesSearch;
    });
  }, [tasks, statusFilter, priorityFilter, debouncedSearch]);

  const handleSubmitTask = (formData) => {
    if (editingTask) {
      setTasks((prev) => prev.map((task) => (task.id === editingTask.id ? { ...task, ...formData } : task)));
      setEditingTask(null);
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      ...formData,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Delete this task? This cannot be undone.')) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
    }
  };

  const handleToggleStatus = (taskId) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  };

  const handleCancelEdit = () => setEditingTask(null);

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-10">
      <header className="rounded-4xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-1 shadow-[0_25px_80px_rgba(15,23,42,0.35)]">
        <div className="rounded-[2rem] bg-slate-900/60 p-6 text-white backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-indigo-300">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold leading-tight">Task Manager</h1>
              <p className="mt-1 text-sm text-slate-300">Plan, organize, and track your work effortlessly.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl bg-white/5 px-4 py-2 text-xs text-slate-300">
                {new Intl.DateTimeFormat('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                }).format(new Date())}
              </div>
              <button
                onClick={onLogout}
                className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 text-center sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 shadow-inner shadow-black/10">
              <p className="text-xs uppercase tracking-wide text-slate-300">Total</p>
              <p className="text-2xl font-semibold text-white">{stats.total}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200/30 bg-emerald-500/10 px-3 py-4 shadow-inner shadow-emerald-900/20">
              <p className="text-xs uppercase tracking-wide text-emerald-200">Completed</p>
              <p className="text-2xl font-semibold text-emerald-100">{stats.completed}</p>
            </div>
            <div className="rounded-2xl border border-amber-200/30 bg-amber-500/10 px-3 py-4 shadow-inner shadow-amber-900/20">
              <p className="text-xs uppercase tracking-wide text-amber-200">Pending</p>
              <p className="text-2xl font-semibold text-amber-100">{stats.pending}</p>
            </div>
          </div>
        </div>
      </header>

      <TaskForm editingTask={editingTask} onCancelEdit={handleCancelEdit} onSubmit={handleSubmitTask} />
      <TaskFilters
        priorityFilter={priorityFilter}
        searchValue={searchTerm}
        statusFilter={statusFilter}
        onPriorityChange={setPriorityFilter}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
      />
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onEdit={setEditingTask}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
};

export default TaskDashboard;

