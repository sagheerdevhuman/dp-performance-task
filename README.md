# 🚀 Senior Full Stack Engineer Performance Task
**The Knowledge House (TKH)**

---

## 👋 Welcome

You made it to the performance task! This is where we get to see you in action, working with real code in a real-world scenario. No whiteboard algorithms or trick questions – just you, an imperfect codebase, and a weekend to show us what you've got.

**What's this about?** You'll be diving into our Digital Pipeline codebase (a community platform connecting learners to tech education programs), conducting an audit, and shipping something meaningful. Think of it as a preview of what your day-to-day would look like on our team.

**Timebox:** Expect 4–6 hours of focused work.  
**Submission window:** Please submit within 48–72 hours of receiving the assignment (see Submission section below).
---

## 🧭 Purpose & Scope (Read Me First)
- This repo is an audit‑ready, interview‑safe snapshot of Digital Pipeline for the performance task.
- External services are mocked by default; no AWS, OAuth, or email credentials are required.
- Local development runs entirely offline with SQLite and safe defaults.
- Scope is intentionally narrow: prioritize audit findings and a small, meaningful improvement for community members or partner org admins.

---

## 📋 What We Need From You

### 1️⃣ **Codebase Audit** 
Time to put on your detective hat:
- Review the repository structure, dependencies, and core functionality
- Document at least **2–3 observations or recommendations**
  - Think: architecture improvements, security concerns, testing gaps, technical debt
  - Be specific – we want to see how you think about code at scale
  - *Consider the React/Node/Express/Sequelize stack as you review*

### 2️⃣ **Feature Build or Bug Fix** 
Show us your coding chops:
- Choose **one meaningful feature** to add OR a **core issue** to fix
- Make it count – pick something that demonstrates your problem-solving skills
- Implement your solution directly in the repo (no theoretical solutions!)
- *Bonus: Think about how your work impacts community members or partner organizations*

### 3️⃣ **Pull Request Submission** 
Your PR is your presentation. Make it shine with:

**Must-haves:**
- ✅ Working code for your chosen feature/fix
- ✅ Updated README (installation/setup, usage, testing instructions)
- ✅ Any other relevant documentation
- ✅ A **notes section** that includes:
  - What you built/fixed and why you chose it
  - Trade-offs or key decisions you made
  - AI tools used (if any) and how they helped
  - Why this matters to our users (not just how it works)

**PR Title Format:** `[Your Name] – Performance Task Submission`

After opening your PR, also send an email to `careers@theknowledgehouse.org` with subject: `Performance Task` and a link to your PR.

### 4️⃣ **Testing** (Optional but Impressive) 
Want to go above and beyond? We love that energy!
- Include unit and/or integration tests
- Show us you understand CI/CD and TDD practices
- *This isn't required, but it definitely catches our eye*

---

## ⏰ Timeline & Deadlines
- **Effort:** 4–6 hours (self‑paced)
- **Submission:** within 48–72 hours of assignment
- If time‑constrained, partial submissions are acceptable—document what you’d do next.

---

## 📊 How We'll Evaluate You (The Rubric)

Here's exactly what we're looking for and how much it matters:

| Category | What Makes Us Say "Nice!" | Weight |
|----------|---------------------------|---------|
| **Code Quality & Standards** 💎 | Clean, readable, maintainable code. Consistent style. Best practices that make other devs smile. | 25% |
| **Technical Execution** ⚙️ | Your feature/fix works smoothly. Repo builds without drama. Tests pass (if included). | 30% |
| **Documentation & Clarity** 📚 | Clear README updates. Another dev could pick this up and run with it. | 15% |
| **Problem-Solving & Judgment** 🧠 | Smart choice of feature/fix. Sound trade-offs. Meaningful audit observations. Shows product thinking. | 20% |
| **Use of AI Tools** 🤖 | Transparent, ethical, effective usage. Shows you can integrate AI like a pro. | 5% |
| **Git/GitHub Workflow** 📈 | Clean commit history. PR follows best practices. | 5% |

---

## 🚀 Getting Started

Here's your quickstart guide:

### Initial Setup
```bash
# 1. Clone the repo
git clone https://github.com/The-Knowledge-House/digital-pipeline-local.git

# 2. Run the magic setup script
./start-local.sh
```

**What this does for you:**
- Copies `.env.example` to `.env` for both apps (if missing)
- Installs all dependencies in `backend` and `frontend`
- Auto-creates a local SQLite database
- Bootstraps demo data on first run
- Starts the backend (`http://localhost:5001`) 
- Starts the frontend (`http://localhost:5173`)


‼️**NOTE: The repo takes a while to start when running `./start-local.sh`. Keep the frontend (`http://localhost:5173`) tab open in your browser after you run the start-local script, refresh it after a 1-2 minutes.**‼️

### Security & Safe Defaults
- `backend/.env.example` sets `SAFE_MODE=true` to disable external integrations.
- Email and file storage use mock providers by default (`EMAIL_PROVIDER=mock`, `STORAGE_PROVIDER=mock`).
- Database defaults to SQLite; no cloud DB required (`DB_DIALECT=sqlite`).
- No secrets are committed; `.env` files and `.sqlite` DBs are git‑ignored.

### Key Environment Flags (see `.env.example`)
- `SAFE_MODE=true`: runs in interview‑safe mode.
- `DB_DIALECT=sqlite`, `SQLITE_STORAGE=./dev.sqlite`: local database.
- `EMAIL_PROVIDER=mock`: captures emails to local artifacts.
- `STORAGE_PROVIDER=mock`: writes uploads to local folder.

### 🔑 Demo Accounts
Test with these pre-configured users:

| Role | Email | Password |
|------|-------|----------|
| **Member** | `john.doe@example.com` | `password123` |
| **Partner** | `jane.smith@example.com` | `password123` |
| **Admin** | `admin@example.com` | `admin123` |

### 💾 Data & Seeding
Need to know about the database:
- **Default:** SQLite (`backend/dev.sqlite`)
- **Auto-bootstrap:** Minimal demo data on first run
- **Clean slate:** Run `RESET_DEV_DB=always ./start-local.sh`
- **Rich dataset:** Want more data? `cd backend && npx sequelize db:seed:all`

Database schema: see `docs/ERD.md` (Mermaid) or `docs/schema.dbml` (DBML) to visualize in VS Code/GitHub or import into dbdiagram.io.

### Health & Logs
- Health endpoint: `http://localhost:5001/health` (or run `./check-health.sh`).
- Backend logs: `backend/.local-dev.log`
- Frontend logs: `frontend/.local-dev.log`

### Repo Structure (at a glance)
- `backend/`: Node/Express API, Sequelize models/migrations.
- `frontend/`: React + Vite app.
- `docs/`: ERD and DBML schema references.

### 🌐 Reference Sites
- **Live platform:** www.digitalpipeline.io
- **Staging environment:** staging.digitalpipeline.io

---

## 📞 Need Help?

This is a take-home task designed to mirror real-world conditions. You're encouraged to:
- ✅ Consult documentation
- ✅ Leverage AI tools (Gemini CLI offers free 1000 requests a day. Or whatever you're comfortable with!)
- ✅ Research solutions
- ✅ Use StackOverflow

Document what you used in your notes!

#### More Support
If you hit repo access issues or technical blockers:
- **Email:** careers@theknowledgehouse.org
- **Subject Line:** "Performance Task Submission Issue"
- **Response time:** We monitor this throughout the weekend

---

## 🧪 What to Work On (Ideas)
- Improve search/filter UX or performance for programs/events/resources.
- Strengthen validation or permissions for org admins (authZ boundaries).
- Enhance readability/maintainability in core components (home, listings, org detail).
- Add targeted tests demonstrating CI/CD or TDD practices.

Keep the change set focused and clearly explain why it benefits community members or partner orgs.

---

## 🛠️ Troubleshooting
- Ports in use? Change frontend port: `npm run dev -- --port 5174`.
- Backend not healthy? Check `backend/.local-dev.log` and `GET /health`.
- Reset local DB: `RESET_DEV_DB=always ./start-local.sh`.
- Node version: use an active LTS (v18+). If installs fail, clear `node_modules` and reinstall in `backend/` and `frontend/`.

---

## 💡 Pro Tips
- Solutions don't have to be perfect! We want to see your problem solving approach to ambiguity as a dev :)
- Start with the audit – it'll help you understand the codebase before diving into code
- Pick a feature/fix that showcases your strengths (search/filter improvements, data validation, permissions, UX enhancements are all fair game)
- Commit with clear messages
- Test locally before submitting
- Your PR description is part of the evaluation – make it thorough
- Remember: explain why your work matters, not just how it works

---

## 🎯 Final Reminders
- This is your chance to show us how you work, think, and communicate
- Quality over quantity – one solid contribution beats several rushed ones
- Have fun with it! We want to see your personality come through

**Good luck! We're excited to see what you build!** 🎉
