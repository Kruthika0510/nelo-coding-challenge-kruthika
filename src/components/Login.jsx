import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (evt) => {
    setFormData((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
    setError('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Email and password are required.');
      return;
    }

    onLogin(formData.email.trim());
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
            Task Flow
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-white">Sign in to continue</h1>
          <p className="mt-2 text-sm text-slate-300">Plan, prioritize, and stay on top of your work.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/30"
              placeholder="you@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-300"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/30"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-400/40"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

