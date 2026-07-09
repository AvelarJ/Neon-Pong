# Expedition & Stabilization Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Stabilize the project, ensure multi-machine compatibility (specifically for a Mac target), and provide clear documentation for cross-device testing.

**Architecture:**
1.  **Diagnostic Phase**: Utilize sub-agents to perform a deep dive into dependencies and configuration errors.
2.  **Stabilization Phase**: Fix specific build issues, resolve environment mismatches, and clean up "derailed" code.
3.  **Verification Phase**: Implement triple-point verification (Build check, Lint/Type pass, Fresh install simulation).
4.  **Documentation**: Create a clear readme for the target machine's transition.

**Tech Stack:** Expo SDK 50+, React Native, TypeScript, CocoaPods/Xcode tools.

---

## Initial Diagnostics & Cleanup
The first phase uses sub-agents or intensive search to find and fix "derailment" symptoms (dependency conflicts, invalid paths, old Expo patterns).

### Task 1: Dependency Audit
Establish a clear baseline of the current environment and identify missing/conflicting packages.

**Files:**
- Modify: `package.json`
- Modify: `app.json` / `app.config.js`

**Step 1: Check installation status**
Run: `npm list --depth=0` (or similar based on package manager)
Verify that all primary dependencies are correctly installed and not flagged as invalid.

**Step 2: Resolve dependency conflicts**
Analyze any peer-dependency warnings or missing scripts in `package.json`. Update if necessary to match the current Expo version requirements.

**Step 3: Verification**
Run: `npx expo install --check` (or equivalent)
Expected: No warnings/errors regarding incompatible versions.

### Task 2: Configuration Hardening
Ensure all paths and configurations are relative to the project root to support cross-machine portability.

**Files:**
- Modify: `app.json`
- Modify: `.env, .env.example` (Create or update)

**Step 1: Check path validity**
Identify any absolute file system paths in config files and replace them with relative paths (`./`).

**Step 2: Define environment variables**
Ensure all required keys are present in `.env.example`.

### Task 3: Codebase Integrity Scan
Use a sub-agent to scan the code for common "derailment" signs (e.g., broken imports, outdated Expo modules).

**Files:**
- Explore: All terms related to core logic.

**Step 1: Script check**
Run: `npx expo lint` (if configured) or similar linter.
Ensure no "dead code" or basic syntax errors are present in core navigation/entry points.

### Task 4: The Triple Verification Gate
Before finalizing, the project must pass three distinct checks to ensure it is stable for your remote macbook.

**Step 1: Static Analysis Pass**
Run TypeScript compiler (`npx tsc`) and Linting.
Expected: 0 errors.

**Step 2: Build Integrity Check**
Run build/bundle command (e.g., `npx expo export` or a local bundle)
Expected: Success, no warnings about missing assets.

**Step 3: Clean-Install Simulation**
Delete `node_modules` and `package-lock.json` (or `yarn.lock`), then re-install from scratch.
Run build again.
Expected: Consistent success across installations.

### Task 5: Create "xcode-readme" Instructions
Create the manual for the user to follow on their secondary device.

**Files:**
- Create: `xcode-readme.md` (or similar as requested)

**Content Structure:**
1. Prerequisites (Node version, CocoaPods, Xcode tools).
2. Clone & Init commands.
3. Build/Link steps for the Mac project.
4. Running in simulation vs physical device instructions.

---

## Verification Checklist
- [ ] **Validation 1**: `npm install` successfully completes on a "fresh" environment path.
- [ ] **Validation 2**: Expo build scripts run without timeout or configuration errors.
- [ ] **Validation 3**: Xcode project (if applicable) opens and compiles in the local simulator.

---
#### Additional Notes:
- If any automated check fails during subagent execution, revert to just the specific step that failed and re-evaluate the error.
- Ensure the `xcode-readme` specifically mentions how to handle `.env` files on the new machine.

*Ensure triple verification is completed before declaring the task finished.*

**Plan ready for implementation.**

Follow this plan using `subagent-driven-development` to ensure comprehensive execution.
