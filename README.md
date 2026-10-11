# Pseudo Code Visualizer & Quiz System (Quiz 8)

A responsive, offline-ready web application built with **HTML5, CSS3, and Vanilla JavaScript**, styled with a **Xiaomi laptop UI / Mi Code / HyperOS minimalist dark aesthetic**.

---

## 🚀 Key Highlights & Features

1. **Complete 20-Question Pseudo-Code Assessment**:
   - **Q1–Q10**: Basic Operators, Modulus (`17 % 5`), Integer Division (`DIV`/`MOD`), Relational/Boolean expressions, Bitwise AND/OR, Shift operators (`<<`, `>>`), and in-place variable swap.
   - **Q11–Q12**: `WHILE` loops with counter tracing and step-2 termination checking.
   - **Q13–Q14**: `FOR` loops with summation accumulator (`SUM = SUM + I`) and product accumulator (`P = P * I`).
   - **Q15–Q18**: Array operations: 0-indexed lookup (`A[2]`), in-place array element updates, single-element swap (`SWAP(A[1], A[2])`), and iterative pairwise array swap.
   - **Q19**: Operator precedence (`A + B * C` vs `(A + B) * C`).
   - **Q20**: Combined Bitwise XOR (`A ^ B`) and compound boolean conditionals (`IF X > 5 AND A < 10`).

2. **Dual View Modes (Google Forms Style & Focus Card Mode)**:
   - **Focus Card Mode**: One question per card with Next, Previous, and Clear Choice buttons.
   - **Forms Flow Mode**: Clean, continuous Google Forms layout with all 20 cards scrollable.
   - **Question Matrix Sidebar**: Instant jump to any question with live status tags (Answered, Current, Unanswered).

3. **Side-Panel Interactive Code Visualizer**:
   - **Array Swap Animations**: Graphical boxes that highlight and swap positions with animated CSS transforms.
   - **Loop Trace Gauges**: Visual accumulators tracking running values (`SUM`, `P`, `I`) iteration-by-iteration.
   - **Bitwise Registers**: Real-time binary bit-grid displaying registers `A`, `B`, and bitwise operation results.
   - **Playback Controls**: Step Forward, Step Backward, Play/Pause, First Step, Last Step, Scrubbing Slider, and Speed Selector (0.5x, 1x, 2x).
   - **Live Variables Watch & Synchronized Code Highlighter**: Highlights the exact line in execution.

4. **Detailed Scoring & Review Answers Page**:
   - Conic-gradient dynamic Score Dial with Pass/Fail status (60% threshold).
   - Filterable Review Cards: View All, Correct Only, or Incorrect Only.
   - In-depth logic explanation and formatted **Trace Tables** for all loop and array operations.
   - One-click "Replay in Visualizer" button for every question from the review screen.
   - "Print / Save PDF Report" button for instant offline archiving.

5. **Companion Python Console CLI**:
   - `quiz_app.py` for terminal-based question assessment and step-by-step tracing (Q10 to Q20).

---

## 📁 File Structure

```
pseudo-code-quiz/
├── index.html        # Clean HTML5 structure with Google Forms layout & drawer modal
├── style.css         # Modern Xiaomi laptop UI, glassmorphic dark theme, responsive CSS
├── questions.js      # All 20 questions with trace tables, options, and visualizer definitions
├── script.js         # Core quiz logic, state management, timer, and animation engine
├── quiz_app.py       # Companion Python console CLI application
└── README.md         # Documentation and instructions
```

---

## 💻 How to Run

### 1. Web Application (Recommended)
Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari):
- Double-click `index.html` in File Explorer, or
- Run via local server if desired:
  ```bash
  # Using Node.js npx serve
  npx serve .
  ```
- **Works 100% offline**: No external CDN scripts, font downloads, or CSS frameworks required.

### 2. Companion Python Console CLI
Run directly in your terminal:
```bash
python quiz_app.py
```

---

## ⌨️ Keyboard Shortcuts
- `1`, `2`, `3`, `4` or `A`, `B`, `C`, `D`: Select corresponding option
- `ArrowRight`: Navigate to next question (in Focus Card mode)
- `ArrowLeft`: Navigate to previous question (in Focus Card mode)
- `Esc`: Close visualizer drawer or modal
