# Neon Pong Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a React Native based "Neon Pong" game with a neon aesthetic, simple AI opponent, sound effects, and basic game state management (scoring, pause, reset).

**Architecture:** 
The game will use a `requestAnimationFrame` loop for physics updates and rendering within a single-screen component. Game state (ball position, paddle positions, scores) will be managed via React `useRef` or a custom hook to avoid excessive re-renders of the entire app tree during high-frequency movement updates, utilizing a Canvas-like approach with absolute positioned Views or an SVG layer for performance.

**Tech Stack:** 
- React Native (Expo recommended for rapid development/sounds)
- React Hooks (`useState`, `useEffect`, `useRef`)
- Expo AV (for sound effects)
- Lucide React Native (for the gear icon)

---

## Phase 1: Project Initialization & Setup

### Task 1: Initialize Expo Project
**Objective:** Create a fresh Expo project with the necessary dependencies.
**Files:** `package.json`
**Steps:**
1. Run `npx create-expo-app NeonPong --template blank`.
2. Install sound library: `npx expo install expo-av`.
3. Install icons: `npm install lucide-react-native`.
4. Set up folder structure: `/src/components`, `/src/constants`, `/src/hooks`.

### Task 2: Define Constants & Styles
**Objective:** Centralize the neon color palette and game dimensions.
**Files:** Create `src/constants/gameConfig.ts`
**Code:**
```typescript
export const COLORS = {
  BACKGROUND: '#000000',
  USER: '#4ae7d1', // Neon Blue
  OPPONENT: '#ea194e', // Neon Red
  BALL: '#fecd1f', // Neon Yellow
};

export const GAME_SETTINGS = {
  WINNING_SCORE: 7,
  PADDLE_WIDTH: 80,
  PADDLE_HEIGHT: 20,
  BALL_SIZE: 15,
  INITIAL_BALL_SPEED: 4,
};
```

---

## Phase 2: Core Game Engine & Rendering

### Task 3: Create Basic Game Layout (The Pitch)
**Objective:** Setup the black background and layout containers for scores.
**Files:** Modify `App.tsx`
**Step 1:** Implement a full-screen View with `backgroundColor: COLORS.BACKGROUND`.
**Step 2:** Add two absolute positioned `<Text>` elements for User Score (left) and Opponent Score (right).
**Verification:** Run app; see black screen with two colored scores on the sides.

### Task 4: Implement Paddle Components & Assets
**Objective:** Render the user and opponent paddles using the neon colors.
**Files:** Create `src/components/Paddle.tsx`
**Code:** Simple View component taking `color`, `top`, and `left` as props.
**Verification:** User paddle at bottom, opponent at top.

### Task 5: Implement User Touch Control
**Objective:** Move the user paddle horizontally based on touch position at the bottom of the screen.
**Files:** Modify `App.tsx`
**Step 1:** Use a `PanResponder` or simple `onTouchMove` handler to update `userPaddleX`.
**Step 2:** Ensure the paddle stays within screen bounds.
**Verification:** Move finger across bottom; blue paddle follows.

### Task 6: Implement Ball Movement & Physics Loop
**Objective:** Create a game loop that moves the ball and bounces off walls.
**Files:** Modify `App.tsx` / create `src/hooks/useGameLoop.ts`
**Step 1:** Use `requestAnimationFrame` to update `ballX` and `ballY`.
**Step 2:** Implement wall collision (top, bottom logic is handled by scores; sides bounce).
**Verification:** Ball moves diagonally across screen and bounces off left/right edges.

---

## Phase 3: Gameplay Logic & AI

### Task 7: Implement Simple AI for Opponent
**Objective:** The red paddle should follow the ball's X position with a slight delay or speed limit.
**Files:** Modify `App.tsx` / game loop logic.
**Step 1:** Update `opponentPaddleX` to move towards `ballX`.
**Step 2:** Limit AI speed so the user can actually win.
**Verification:** Red paddle moves automatically to track the ball.

### Task 8: Implement Paddle Collision Detection
**Objective:** Bounce ball off paddles and apply simple physics (angle change).
**Files:** Modify collision logic in game loop.
**Step 1:** Check if `ballY` reaches paddle vertical positions && `ballX` is within paddle width.
**Step 2:** Reverse `ballY` velocity on hit.
**Verification:** Ball bounces off blue and red paddles.

### Task 9: Implement Scoring and Win Condition
**Objective:** Update scores when ball passes a paddle; trigger Game Over at 7 points.
**Files:** Modify `App.tsx`
**Step 1:** If `ballY < 0`, User +1; if `ballY > screenHeight`, Opponent +1.
**Step 2:** Reset ball to center after score.
**Step 3:** Implement state `isGameOver` when either reaches 7.
**Verification:** Score increments correctly; game freezes/pops up at 7 points.

---

## Phase 4: Audio & UI Polishing

### Task 10: Integrate Sound Effects
**Objective:** Play distinct sounds for paddle hits and wall bounces.
**Files:** `src/hooks/useSounds.ts` (using `expo-av`)
**Step 1:** Load two short audio files (`hit.mp3`, `wall.mp3`).
**Step 2:** Call play functions in collision logic from Task 8 & 6.
**Verification:** Audible "ping" on collisions.

### Task 11: Implement Game Over Popup
**Objective:** Create a centered modal showing the winner and a restart button.
**Files:** Create `src/components/GameOver.tsx`
**Step 1:** Style as a neon-bordered box over the game.
**Step 2:** Add "Play Again" button that resets score and ball.
**Verification:** Popup appears at 7 points; clicking reset restarts game.

### Task 12: Implement Pause Menu (Gear Icon)
**Objective:** Add a gear icon top-right that toggles a menu with Resume/Reset.
**Files:** `src/components/PauseMenu.tsx`, modify `App.tsx`
**Step 1:** Use Lucide `Settings` icon positioned absolute top-right.
**Step 2:** Implement state `isPaused`. When true, stop game loop updates.
**Step 3:** Create menu overlay with "Resume" (set `isPaused` false) and "Reset" (reset score/ball).
**Verification:** Click gear -> Menu opens -> Game pauses -> Resume works -> Reset works.

---

## Final Validation Checklist
- [ ] User paddle: Neon Blue (#4ae7d1), touch controlled at bottom.
- [ ] Opponent paddle: Neon Red (#ea194e), simple AI.
- [ ] Ball: Neon Yellow (#fecd1f), bounces correctly.
- [ ] Scores: Matching colors, positioned left/right.
- [ ] Win condition: 7 points triggers Game Over popup.
- [ ] Audio: Sounds play on paddle/wall hits.
- [ ] Pause Menu: Gear icon top right, Resume and Reset buttons work.
- [ ] Aesthetics: Black background throughout.