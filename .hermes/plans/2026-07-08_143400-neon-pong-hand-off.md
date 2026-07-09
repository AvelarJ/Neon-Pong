## Project Hand-Off Guide: Neon Pong (Save Point)

### 🟢 OVERVIEW & CURRENT STATUS
**Goal:** Build a fully playable "Neon Pong" game in React Native Expo, featuring user touch control, basic AI opponent, scoring, and polished UI elements.
**Current State:** **Midway through Phase 2.** We have successfully initialized the project environment (`expo-av`, `lucide-react-native` installed) and completed foundational components (Paddles, Scoreboard). The primary state remaining is that the user paddle is implemented but the ball movement loop/physics integration has not been fully established.
**Last Action Taken:** Progress was made on implementing horizontal touch control for the user's blue paddle (`App.tsx` modification).

---

### 📚 ARCHITECTURE & DEPENDENCIES
*   **Structure:** `src/components`, `src/constants`, `src/hooks`. (Established by Task 1).
*   **Styling/Colors:** Defined in `src/constants/gameConfig.ts` using Neon Blue (`#4ae7d1`), Neon Red (`#ea194e`), and Neon Yellow (`#fecd1f`) on a black background (`#000000`).
*   **Core Mechanism:** The game relies on a `requestAnimationFrame` loop (Target for Task 6/Hook). State management should favor hooks like `useRef` for high-frequency values (position, speed) to optimize performance in React Native.

### ✅ COMPLETED TASKS (Bookmark Points)

*   **Task 1: Project Initialization & Setup:** Expo project initialized; dependencies installed ($\checkmark$).
*   **Task 2: Constants & Styles Defined:** Global constants for colors/game settings are centralized ($\checkmark$ in `src/constants/gameConfig.ts`).
*   **Task 3 - Task 5:** Basic layout, renderable paddles (User/Opponent), and user touch control logic placed in `App.tsx` are established. Paddles can be seen on screen, and the blue paddle should follow finger movement at the bottom center of the device window.

### 🆘 WHERE TO PICK UP - IMMEDIATE NEXT STEPS
**Objective:** Finish Phase 2: Core Game Engine & Rendering by implementing the physics loop.

**Immediate Task:** **Task 6: Implement Ball Movement & Physics Loop.**
1.  **Location:** `src/hooks/useGameLoop.ts` and modification to `App.tsx`.
2.  **Action:** The primary block is translating the existing UI components (paddles, scores) into a virtual "game board" that supports physics simulation. You must implement the game loop using `requestAnimationFrame` in this hook. This loop needs to:
    *   Manage and update the ball's position (`ballX`, `ballY`).
    *   Handle wall collision (bouncing off screen edges).

**Subsequent Tasks:** After Task 6 passes, the next logical step is **Task 7 (AI Opponent)**, followed by critical physics logic like **Task 8 (Paddle Collision Detection)**.

---

### 📝 RESUMPTION WORKFLOW: A STEP-BY-STEP GUIDE
If you pick this project up later, follow these steps to restore context and resume work without asking clarifying questions:

1.  **Review Plan:** Re-read `.hermes/plans/2026-07-08_143400-neon-pong-implementation.md` for the comprehensive TDD breakdown.
2.  **Verify Setup:** Run `npm install` to ensure all dependencies are present and correct. The basic structure is clean.
3.  **Test Engine:** Focus development entirely on implementing the physics loop in `src/hooks/useGameLoop.ts`.
4.  **Development Principle:** **Do not attempt Phase 3 or 4 first.** Stick to completing Task 6 (Ball Movement). Writing failing tests and then minimal code *is* the best way forward here; do not try to implement all features at once.

---

### ✨ DETAILED CHECKLIST FOR RESUMPTION
| Feature | Status | Files/Notes | Action Needed |
| :--- | :---: | :--- | :--- |
| **Basic Layout** | Completed | `App.tsx`, Constants | None. |
| **User Control (Paddle)** | Partially Done | `App.tsx` (`onTouchMove`) | Verify `PanResponder`/`onTouchMove` handler is clean and stable across devices. (Task 5) |
| **Ball Movement/Physics** | Pending | `src/hooks/useGameLoop.ts` | **PRIORITY #1: Implement game loop, ball movement, and wall bounces.** (Task 6) |
| **AI Opponent** | Pending | `App.tsx`, Game Loop Logic | Build AI logic that tracks the current `ballX`. (Task 7) |
| **Collisions/Scoring** | Pending | Collision handlers in game loop.| Implement ball-to-paddle and point-scoring logic. (Tasks 8 & 9) |

***[END OF HANDOFF GUIDE - DO NOT EDIT]***