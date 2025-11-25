# Task Manager (React + Tailwind)

A single-page Task Manager built with React and Tailwind CSS to demonstrate a modern productivity dashboard with login, CRUD, filters, debounced search, and a mock automation loop — all on the frontend (no backend).

---

## 🚀 Setup

```bash
npm install
npm run dev
Then open the URL Vite prints in the terminal (usually:

http://localhost:5173
🛠 Tech Stack

Vite + React (hooks only)

Tailwind CSS

Custom hook for debounced search

sessionStorage for login/session persistence

Native crypto.randomUUID() for task IDs

✨ Features
🔐 Login & Session Management

Simple email/password login (simulated — any non-empty values work)

Session is stored in sessionStorage

Login is restored after refresh

Session automatically clears when the browser tab is closed

✅ Task Management (CRUD)

Create tasks with:

Title

Description

Priority

Due Date

Validate required fields before submission

Clear form after successful create

Tasks use unique IDs: crypto.randomUUID()

Edit tasks using a shared form with:

Pre-filled values

Cancel edit button

Delete with confirmation dialog

Toggle Complete / Pending status

🔍 Filtering & “Elastic” Search

Filters:

Status chips: All / Completed / Pending

Priority dropdown: All / Low / Medium / High

Search:

Case-insensitive

Matches partial substrings

Runs across both title and description

Uses a custom debounced search hook (~400 ms delay) to avoid excessive re-renders and give an “elastic search” feel

📧 Task Mail Automation (Simulated Cron)

A background setInterval runs every 20 minutes

Checks all tasks for ones still pending

Logs a mock “sending reminder email” message to the console, including the count and titles of pending tasks

(For demo, the interval can be temporarily reduced.)

🎨 UI / UX

Responsive single-page layout

Tailwind-based design:

Cards

Badges

Soft shadows

Gradients

Hover and focus states

Looks and feels like a modern task dashboard app

📂 Code Map

src/App.jsx – Session handling and switching between Login and Dashboard

src/components/Login.jsx – Login screen

src/components/TaskDashboard.jsx – Main dashboard logic and task state

src/components/TaskForm.jsx – Shared create/edit form with validation

src/components/TaskFilters.jsx – Status, priority, and search controls

src/components/TaskList.jsx – List wrapper for task items

src/components/TaskItem.jsx – Individual task card and actions

src/hooks/useDebounce.js – Reusable debounce hook for search

src/index.css & tailwind.config.js – Global styles and Tailwind config

📦 Build

For a production build:

npm run build
