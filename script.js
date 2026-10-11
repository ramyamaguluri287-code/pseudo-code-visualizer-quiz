/**
 * Pseudo Code Visualizer & Quiz System - Core Application Logic
 * Vanilla JavaScript (ES6+), Offline-ready, Zero External Libraries
 */

(function () {
  "use strict";

  // Application State
  const state = {
    questions: typeof QUIZ_QUESTIONS !== "undefined" ? QUIZ_QUESTIONS : [],
    userAnswers: {}, // { [questionId]: 'A' | 'B' | 'C' | 'D' }
    currentIndex: 0,
    viewMode: "single", // "single" | "all"
    isSubmitted: false,
    theme: "dark",
    startTime: null,
    elapsedSeconds: 0,
    timerInterval: null,
    reviewFilter: "all", // "all" | "correct" | "incorrect"

    // Visualizer State
    visualizer: {
      activeQuestionId: 1,
      currentStepIndex: 0,
      isPlaying: false,
      playTimer: null,
      speed: 1.0 // 0.5x, 1x, 2x
    }
  };

  // DOM Cache
  const dom = {
    // Header
    timerDisplay: document.getElementById("timerDisplay"),
    themeToggleBtn: document.getElementById("themeToggleBtn"),
    visualizerToggleBtn: document.getElementById("visualizerToggleBtn"),
    progressStrip: document.getElementById("progressStrip"),

    // Sidebar
    questionGrid: document.getElementById("questionGrid"),
    answeredCountBadge: document.getElementById("answeredCountBadge"),
    btnModeSingle: document.getElementById("btnModeSingle"),
    btnModeAll: document.getElementById("btnModeAll"),

    // Quiz Cards
    quizCardsContainer: document.getElementById("quizCardsContainer"),
    quizViewSection: document.getElementById("quizViewSection"),
    resultsViewSection: document.getElementById("resultsViewSection"),

    // Visualizer Drawer
    visualizerOverlay: document.getElementById("visualizerOverlay"),
    visPanel: document.getElementById("visPanel"),
    visCloseBtn: document.getElementById("visCloseBtn"),
    visTitle: document.getElementById("visTitle"),
    visCategory: document.getElementById("visCategory"),
    visCodeContainer: document.getElementById("visCodeContainer"),
    visStage: document.getElementById("visStage"),
    visStepDesc: document.getElementById("visStepDesc"),
    visWatchTableBody: document.getElementById("visWatchTableBody"),
    visSlider: document.getElementById("visSlider"),
    visStepCounter: document.getElementById("visStepCounter"),
    visBtnFirst: document.getElementById("visBtnFirst"),
    visBtnPrev: document.getElementById("visBtnPrev"),
    visBtnPlay: document.getElementById("visBtnPlay"),
    visBtnNext: document.getElementById("visBtnNext"),
    visBtnLast: document.getElementById("visBtnLast"),
    visSpeedSelect: document.getElementById("visSpeedSelect"),

    // Results & Review
    scoreNumber: document.getElementById("scoreNumber"),
    scorePercent: document.getElementById("scorePercent"),
    scoreDial: document.getElementById("scoreDial"),
    passFailBadge: document.getElementById("passFailBadge"),
    resultHeadline: document.getElementById("resultHeadline"),
    resultMessage: document.getElementById("resultMessage"),
    timeSpentMetric: document.getElementById("timeSpentMetric"),
    accuracyMetric: document.getElementById("accuracyMetric"),
    bestCategoryMetric: document.getElementById("bestCategoryMetric"),
    reviewCardsContainer: document.getElementById("reviewCardsContainer"),
    btnRetake: document.getElementById("btnRetake"),
    btnPrintReport: document.getElementById("btnPrintReport"),

    // Submit Modal
    submitModal: document.getElementById("submitModal"),
    modalUnansweredWarning: document.getElementById("modalUnansweredWarning"),
    btnCancelSubmit: document.getElementById("btnCancelSubmit"),
    btnConfirmSubmit: document.getElementById("btnConfirmSubmit")
  };

  /* ===================================================================
     Syntax Highlighter for Pseudo Code
     =================================================================== */
  function highlightPseudoCode(rawCode, activeLineNum = null) {
    const lines = rawCode.trim().split("\n");
    return lines
      .map((line, idx) => {
        const lineNum = idx + 1;
        const isActive = activeLineNum === lineNum;
        let formattedLine = escapeHtml(line);

        // Highlight strings
        formattedLine = formattedLine.replace(/(&quot;.*?&quot;|".*?")/g, '<span class="str">$1</span>');

        // Highlight Keywords
        const keywords = [
          "START", "END", "WHILE", "DO", "ENDWHILE", "FOR", "TO", "ENDFOR",
          "IF", "THEN", "ELSE", "ENDIF", "PRINT", "SWAP", "DIV", "MOD",
          "AND", "OR", "NOT", "TRUE", "FALSE"
        ];
        const kwRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
        formattedLine = formattedLine.replace(kwRegex, '<span class="kw">$1</span>');

        // Highlight Numbers
        formattedLine = formattedLine.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');

        // Highlight Operators
        formattedLine = formattedLine.replace(/([+\-*\/%^&|<>!=]+)/g, '<span class="op">$1</span>');

        return `
          <div class="code-line ${isActive ? "active-line" : ""}" data-line="${lineNum}">
            <span class="line-num">${lineNum}</span>
            <span class="line-content">${formattedLine}</span>
          </div>
        `;
      })
      .join("");
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ===================================================================
     Timer & Formatting Utilities
     =================================================================== */
  function startTimer() {
    state.startTime = Date.now();
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
      state.elapsedSeconds = Math.floor((Date.now() - state.startTime) / 1000);
      renderTimer();
    }, 1000);
    renderTimer();
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function formatSeconds(totalSecs) {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function renderTimer() {
    if (dom.timerDisplay) {
      dom.timerDisplay.textContent = formatSeconds(state.elapsedSeconds);
    }
  }

  /* ===================================================================
     Question Navigation Matrix (Sidebar)
     =================================================================== */
  function renderQuestionGrid() {
    if (!dom.questionGrid) return;
    dom.questionGrid.innerHTML = "";

    state.questions.forEach((q, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "grid-num-btn";
      btn.textContent = q.id;
      btn.title = `Question ${q.id}: ${q.title}`;

      const isAnswered = state.userAnswers[q.id] !== undefined;
      const isCurrent = state.viewMode === "single" && state.currentIndex === idx;

      if (isAnswered) btn.classList.add("answered");
      if (isCurrent) btn.classList.add("active");

      btn.addEventListener("click", () => {
        navigateToQuestion(idx);
      });

      dom.questionGrid.appendChild(btn);
    });

    updateProgressStats();
  }

  function updateProgressStats() {
    const answeredCount = Object.keys(state.userAnswers).length;
    const totalCount = state.questions.length;
    const percent = Math.round((answeredCount / totalCount) * 100);

    if (dom.answeredCountBadge) {
      dom.answeredCountBadge.textContent = `${answeredCount}/${totalCount}`;
    }
    if (dom.progressStrip) {
      dom.progressStrip.style.width = `${percent}%`;
    }
  }

  /* ===================================================================
     Render Quiz Questions (Single Card or All-in-one Google Forms Mode)
     =================================================================== */
  function renderQuizCards() {
    if (!dom.quizCardsContainer) return;
    dom.quizCardsContainer.innerHTML = "";

    const questionsToRender =
      state.viewMode === "single"
        ? [state.questions[state.currentIndex]]
        : state.questions;

    questionsToRender.forEach((q) => {
      const card = createQuestionCardElement(q);
      dom.quizCardsContainer.appendChild(card);
    });

    // Update sidebar grid indicators
    renderQuestionGrid();
  }

  function createQuestionCardElement(q) {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = `q-card-${q.id}`;
    if (state.userAnswers[q.id]) {
      card.classList.add("highlight-answered");
    }

    const selectedOption = state.userAnswers[q.id];

    card.innerHTML = `
      <div class="card-top-bar">
        <div class="q-badge-group">
          <span class="q-number-badge">QUESTION ${q.id} OF ${state.questions.length}</span>
          <span class="q-category-tag">${q.category}</span>
          <span class="q-difficulty-badge ${q.difficulty.toLowerCase()}">${q.difficulty}</span>
        </div>
        <div class="card-quick-actions">
          <button type="button" class="btn-card-action btn-open-vis" data-qid="${q.id}" title="Visualize execution animation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Visualize</span>
          </button>
        </div>
      </div>

      <div class="question-prompt">${q.prompt}</div>

      <div class="code-container">
        <div class="code-header-bar">
          <div class="code-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="code-language-tag">PSEUDO-CODE</span>
        </div>
        <div class="code-block-body">
          ${highlightPseudoCode(q.code)}
        </div>
      </div>

      <div class="options-grid">
        ${q.options
          .map(
            (opt) => `
          <label class="option-card ${selectedOption === opt.id ? "selected" : ""}" data-qid="${q.id}" data-optid="${opt.id}">
            <input type="radio" class="option-radio-input" name="q_${q.id}" value="${opt.id}" ${selectedOption === opt.id ? "checked" : ""}>
            <span class="option-letter-badge">${opt.id}</span>
            <span class="option-text">${escapeHtml(opt.text)}</span>
          </label>
        `
          )
          .join("")}
      </div>

      <div class="card-nav-bar">
        <div class="nav-btn-group">
          ${
            state.viewMode === "single" && state.currentIndex > 0
              ? `<button type="button" class="btn-secondary btn-prev-q">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  Previous
                </button>`
              : ""
          }
          ${
            state.userAnswers[q.id]
              ? `<button type="button" class="btn-outline btn-clear-q" data-qid="${q.id}">Clear Choice</button>`
              : ""
          }
        </div>
        <div class="nav-btn-group">
          ${
            state.viewMode === "single" && state.currentIndex < state.questions.length - 1
              ? `<button type="button" class="btn-primary btn-next-q">
                  Next
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>`
              : ""
          }
          ${
            state.viewMode === "all" || state.currentIndex === state.questions.length - 1
              ? `<button type="button" class="btn-accent btn-submit-trigger">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Submit Quiz
                </button>`
              : ""
          }
        </div>
      </div>
    `;

    // Bind card events
    card.querySelectorAll(".option-card").forEach((optCard) => {
      optCard.addEventListener("click", () => {
        const qid = parseInt(optCard.getAttribute("data-qid"), 10);
        const optId = optCard.getAttribute("data-optid");
        selectAnswer(qid, optId);
      });
    });

    const openVisBtn = card.querySelector(".btn-open-vis");
    if (openVisBtn) {
      openVisBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openVisualizer(q.id);
      });
    }

    const prevBtn = card.querySelector(".btn-prev-q");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (state.currentIndex > 0) navigateToQuestion(state.currentIndex - 1);
      });
    }

    const nextBtn = card.querySelector(".btn-next-q");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.currentIndex < state.questions.length - 1) {
          navigateToQuestion(state.currentIndex + 1);
        }
      });
    }

    const clearBtn = card.querySelector(".btn-clear-q");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        delete state.userAnswers[q.id];
        renderQuizCards();
      });
    }

    const submitBtn = card.querySelector(".btn-submit-trigger");
    if (submitBtn) {
      submitBtn.addEventListener("click", promptSubmitModal);
    }

    return card;
  }

  function selectAnswer(questionId, optionId) {
    state.userAnswers[questionId] = optionId;
    renderQuizCards();
  }

  function navigateToQuestion(targetIndex) {
    if (targetIndex < 0 || targetIndex >= state.questions.length) return;
    state.currentIndex = targetIndex;

    if (state.viewMode === "single") {
      renderQuizCards();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // In all mode, scroll directly to target card
      const targetCard = document.getElementById(`q-card-${state.questions[targetIndex].id}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        targetCard.classList.add("highlight-pulse");
        setTimeout(() => targetCard.classList.remove("highlight-pulse"), 1000);
      }
    }
    renderQuestionGrid();
  }

  /* ===================================================================
     Interactive Code Visualizer System
     =================================================================== */
  function openVisualizer(questionId) {
    const question = state.questions.find((q) => q.id === questionId);
    if (!question) return;

    state.visualizer.activeQuestionId = questionId;
    state.visualizer.currentStepIndex = 0;
    pauseVisualizer();

    if (dom.visTitle) dom.visTitle.textContent = `Q${question.id}: ${question.title}`;
    if (dom.visCategory) dom.visCategory.textContent = `${question.category} • ${question.visualizer.type.toUpperCase()}`;

    if (dom.visSlider) {
      dom.visSlider.min = 0;
      dom.visSlider.max = question.visualizer.steps.length - 1;
      dom.visSlider.value = 0;
    }

    renderVisualizerStep();

    if (dom.visualizerOverlay) {
      dom.visualizerOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeVisualizer() {
    pauseVisualizer();
    if (dom.visualizerOverlay) {
      dom.visualizerOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  function renderVisualizerStep() {
    const question = state.questions.find((q) => q.id === state.visualizer.activeQuestionId);
    if (!question || !question.visualizer) return;

    const steps = question.visualizer.steps;
    const stepIdx = state.visualizer.currentStepIndex;
    const currentStep = steps[stepIdx];

    // Update Step Slider & Counter
    if (dom.visSlider) dom.visSlider.value = stepIdx;
    if (dom.visStepCounter) dom.visStepCounter.textContent = `${stepIdx + 1} / ${steps.length}`;

    // Update Pseudo Code with line highlighting
    if (dom.visCodeContainer) {
      dom.visCodeContainer.innerHTML = highlightPseudoCode(question.code, currentStep.line);
    }

    // Update Step Description Callout
    if (dom.visStepDesc) {
      dom.visStepDesc.textContent = currentStep.desc;
    }

    // Update Live Variables Watch Table
    renderVariablesWatchTable(currentStep.vars || {});

    // Render Dynamic Graphical Stage based on type
    renderVisualizerStage(question.visualizer.type, currentStep);
  }

  function renderVariablesWatchTable(vars) {
    if (!dom.visWatchTableBody) return;
    const entries = Object.entries(vars);

    if (entries.length === 0) {
      dom.visWatchTableBody.innerHTML = `<tr><td colspan="2" style="text-align:center; color:var(--text-faint);">No active variables</td></tr>`;
      return;
    }

    dom.visWatchTableBody.innerHTML = entries
      .map(
        ([key, val]) => `
      <tr>
        <td class="var-name">${escapeHtml(key)}</td>
        <td>${escapeHtml(String(val))}</td>
      </tr>
    `
      )
      .join("");
  }

  function renderVisualizerStage(type, step) {
    if (!dom.visStage) return;
    dom.visStage.innerHTML = "";

    switch (type) {
      case "array_swap":
      case "array_index":
      case "array_update":
        renderArrayStage(step, type);
        break;

      case "loop_accumulator":
      case "while_counter":
        renderLoopStage(step);
        break;

      case "bitwise_xor":
        renderBitwiseStage(step);
        break;

      case "logic_gate":
        renderLogicGateStage(step);
        break;

      default:
        renderOperatorStage(step);
        break;
    }
  }

  // Visualizer 1: Array Box Animation Stage
  function renderArrayStage(step, type) {
    const container = document.createElement("div");
    container.className = "array-boxes-container";

    const arr = step.array || [10, 20, 30, 40, 50];
    const swapIndices = step.swapIndices || [];
    const targetIdx = step.targetIndex;
    const modifiedIdx = step.modifiedIndex;

    arr.forEach((val, idx) => {
      const boxWrapper = document.createElement("div");
      boxWrapper.className = "array-box-wrapper";

      const box = document.createElement("div");
      box.className = "array-box";
      box.textContent = val;

      if (swapIndices.includes(idx)) {
        box.classList.add(step.animating ? "swapping" : "highlight");
      }
      if (idx === targetIdx) {
        box.classList.add("highlight");
      }
      if (idx === modifiedIdx) {
        box.classList.add("updated");
      }

      const indexTag = document.createElement("span");
      indexTag.className = "array-index-tag";
      indexTag.textContent = `[${idx}]`;

      const pointerArrow = document.createElement("div");
      pointerArrow.className = "array-pointer-arrow";
      if (swapIndices.includes(idx)) {
        pointerArrow.textContent = idx === swapIndices[0] ? "▲ I" : "▲ I+1";
      } else if (idx === targetIdx) {
        pointerArrow.textContent = "▲ Target";
      } else {
        pointerArrow.textContent = "";
      }

      boxWrapper.appendChild(box);
      boxWrapper.appendChild(indexTag);
      boxWrapper.appendChild(pointerArrow);
      container.appendChild(boxWrapper);
    });

    dom.visStage.appendChild(container);

    if (step.output) {
      const outPill = document.createElement("div");
      outPill.className = "token-pill";
      outPill.style.marginTop = "1rem";
      outPill.style.background = "rgba(16, 185, 129, 0.2)";
      outPill.style.borderColor = "var(--accent-emerald)";
      outPill.innerHTML = `<strong>Output:</strong> ${escapeHtml(step.output)}`;
      dom.visStage.appendChild(outPill);
    }
  }

  // Visualizer 2: Loops & Accumulator Progress Stage
  function renderLoopStage(step) {
    const wrapper = document.createElement("div");
    wrapper.className = "loop-gauge-wrapper";

    const data = step.visualData || {};

    const accDisplay = document.createElement("div");
    accDisplay.className = "accumulator-display";

    // Circle Counter / Accumulator
    const valToShow = data.currentVal !== undefined ? data.currentVal : (data.counter !== undefined ? data.counter : (step.vars ? Object.values(step.vars)[0] : 0));
    const labelToShow = data.currentVal !== undefined ? "SUM / P" : (data.counter !== undefined ? "I (Counter)" : "Value");

    accDisplay.innerHTML = `
      <div class="acc-circle">
        <span class="acc-val">${escapeHtml(String(valToShow))}</span>
        <span class="acc-label">${labelToShow}</span>
      </div>
    `;

    // Token Stream / Printed history
    const stream = document.createElement("div");
    stream.className = "token-stream";

    const items = data.items || data.printedOutput || data.matches || [];
    if (items.length > 0) {
      items.forEach((item) => {
        const token = document.createElement("span");
        token.className = "token-pill";
        token.textContent = item;
        stream.appendChild(token);
      });
    }

    accDisplay.appendChild(stream);
    wrapper.appendChild(accDisplay);

    if (data.output || step.output) {
      const outPill = document.createElement("div");
      outPill.className = "token-pill";
      outPill.style.background = "rgba(16, 185, 129, 0.2)";
      outPill.style.borderColor = "var(--accent-emerald)";
      outPill.innerHTML = `<strong>Final Output:</strong> ${escapeHtml(data.output || step.output)}`;
      wrapper.appendChild(outPill);
    }

    dom.visStage.appendChild(wrapper);
  }

  // Visualizer 3: Bitwise Operations Stage
  function renderBitwiseStage(step) {
    const board = document.createElement("div");
    board.className = "bitwise-board";

    const data = step.visualData || {};

    board.innerHTML = `
      <div class="bit-row">
        <span class="bit-label">Register A (5):</span>
        <span class="bit-string">${data.aBin || "101"}</span>
      </div>
      <div class="bit-row">
        <span class="bit-label">Register B (3):</span>
        <span class="bit-string">${data.bBin || "011"}</span>
      </div>
      <div class="bit-row result">
        <span class="bit-label">Bitwise Op Result:</span>
        <span class="bit-string">${data.xorBin || data.andBin || data.orBin || "---"}</span>
      </div>
    `;

    if (data.expression || data.output) {
      const outPill = document.createElement("div");
      outPill.className = "token-pill";
      outPill.style.marginTop = "0.75rem";
      outPill.innerHTML = `<strong>Result:</strong> ${escapeHtml(data.expression || data.output)}`;
      board.appendChild(outPill);
    }

    dom.visStage.appendChild(board);
  }

  // Visualizer 4: Logic Gate & Decision Tree Stage
  function renderLogicGateStage(step) {
    const board = document.createElement("div");
    board.className = "bitwise-board";
    const data = step.visualData || {};

    board.innerHTML = `
      <div class="bit-row">
        <span class="bit-label">Sub-Expression 1:</span>
        <span class="bit-string">${escapeHtml(data.leftBranch || data.expr1 || "---")}</span>
      </div>
      <div class="bit-row">
        <span class="bit-label">Sub-Expression 2:</span>
        <span class="bit-string">${escapeHtml(data.rightBranch || data.expr2 || "---")}</span>
      </div>
      <div class="bit-row result">
        <span class="bit-label">Boolean Output:</span>
        <span class="bit-string">${escapeHtml(data.result || data.final || "---")}</span>
      </div>
    `;

    dom.visStage.appendChild(board);
  }

  // Visualizer 5: Operator & Arithmetic Breakdown
  function renderOperatorStage(step) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.gap = "0.75rem";

    const data = step.visualData || {};

    if (data.dividend !== undefined) {
      container.innerHTML = `
        <div style="font-family:var(--font-mono); font-size:1.1rem; color:var(--accent-cyan);">
          Dividend: <strong>${data.dividend}</strong> ÷ Divisor: <strong>${data.divisor}</strong>
        </div>
        <div style="display:flex; gap:1rem; margin-top:0.5rem;">
          <div class="token-pill">Quotient: <strong>${data.quotient !== null ? data.quotient : "-"}</strong></div>
          <div class="token-pill" style="border-color:var(--accent-amber); color:var(--accent-amber);">Remainder: <strong>${data.remainder !== null ? data.remainder : "-"}</strong></div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="token-pill" style="font-size:1.1rem; padding:0.6rem 1.25rem;">
          ${escapeHtml(data.expression || step.desc)}
        </div>
      `;
    }

    if (data.output) {
      const outPill = document.createElement("div");
      outPill.className = "token-pill";
      outPill.style.background = "rgba(16, 185, 129, 0.2)";
      outPill.style.borderColor = "var(--accent-emerald)";
      outPill.innerHTML = `<strong>Output:</strong> ${escapeHtml(data.output)}`;
      container.appendChild(outPill);
    }

    dom.visStage.appendChild(container);
  }

  // Visualizer Controls & Ticker
  function playVisualizer() {
    state.visualizer.isPlaying = true;
    if (dom.visBtnPlay) {
      dom.visBtnPlay.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
      dom.visBtnPlay.title = "Pause";
    }

    const intervalMs = Math.round(1200 / state.visualizer.speed);
    if (state.visualizer.playTimer) clearInterval(state.visualizer.playTimer);

    state.visualizer.playTimer = setInterval(() => {
      const question = state.questions.find((q) => q.id === state.visualizer.activeQuestionId);
      if (!question) return;

      if (state.visualizer.currentStepIndex < question.visualizer.steps.length - 1) {
        state.visualizer.currentStepIndex++;
        renderVisualizerStep();
      } else {
        pauseVisualizer();
      }
    }, intervalMs);
  }

  function pauseVisualizer() {
    state.visualizer.isPlaying = false;
    if (state.visualizer.playTimer) {
      clearInterval(state.visualizer.playTimer);
      state.visualizer.playTimer = null;
    }
    if (dom.visBtnPlay) {
      dom.visBtnPlay.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
      dom.visBtnPlay.title = "Play";
    }
  }

  function togglePlayVisualizer() {
    if (state.visualizer.isPlaying) {
      pauseVisualizer();
    } else {
      const question = state.questions.find((q) => q.id === state.visualizer.activeQuestionId);
      if (question && state.visualizer.currentStepIndex >= question.visualizer.steps.length - 1) {
        state.visualizer.currentStepIndex = 0;
      }
      playVisualizer();
    }
  }

  /* ===================================================================
     Quiz Submission & Scoring Engine
     =================================================================== */
  function promptSubmitModal() {
    const answeredCount = Object.keys(state.userAnswers).length;
    const totalCount = state.questions.length;
    const unansweredCount = totalCount - answeredCount;

    if (dom.modalUnansweredWarning) {
      if (unansweredCount > 0) {
        dom.modalUnansweredWarning.textContent = `Warning: You have ${unansweredCount} unanswered question(s). You can still submit, or return and complete them.`;
        dom.modalUnansweredWarning.style.display = "block";
      } else {
        dom.modalUnansweredWarning.style.display = "none";
      }
    }

    if (dom.submitModal) {
      dom.submitModal.classList.add("open");
    }
  }

  function submitQuiz() {
    if (dom.submitModal) dom.submitModal.classList.remove("open");
    stopTimer();
    state.isSubmitted = true;

    // Calculate Scores
    let score = 0;
    const total = state.questions.length;
    const categoryStats = {};

    state.questions.forEach((q) => {
      const userAns = state.userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) score++;

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { correct: 0, total: 0 };
      }
      categoryStats[q.category].total++;
      if (isCorrect) categoryStats[q.category].correct++;
    });

    const percent = Math.round((score / total) * 100);
    const isPass = percent >= 60; // 60% passing mark

    // Update Results UI
    if (dom.scoreNumber) dom.scoreNumber.textContent = score;
    if (dom.scorePercent) dom.scorePercent.textContent = `${percent}%`;

    // Conic gradient angle (360 * percent / 100)
    const angle = (percent / 100) * 360;
    if (dom.scoreDial) {
      dom.scoreDial.style.setProperty("--score-angle", `${angle}deg`);
    }

    if (dom.passFailBadge) {
      dom.passFailBadge.className = `pass-fail-badge ${isPass ? "passed" : "failed"}`;
      dom.passFailBadge.innerHTML = isPass
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> PASSED`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> NEEDS REVIEW`;
    }

    if (dom.resultHeadline) {
      dom.resultHeadline.textContent = isPass ? "Outstanding Performance!" : "Good Attempt!";
    }
    if (dom.resultMessage) {
      dom.resultMessage.textContent = isPass
        ? `You successfully solved ${score} out of ${total} pseudo-code evaluation problems. Inspect the trace tables below to review your answers.`
        : `You scored ${score} out of ${total}. Review the detailed trace tables and animated visualizer below to master these concepts.`;
    }

    if (dom.timeSpentMetric) dom.timeSpentMetric.textContent = formatSeconds(state.elapsedSeconds);
    if (dom.accuracyMetric) dom.accuracyMetric.textContent = `${percent}%`;

    // Best Category
    let bestCat = "-";
    let highestRatio = -1;
    for (const [cat, data] of Object.entries(categoryStats)) {
      const ratio = data.correct / data.total;
      if (ratio > highestRatio) {
        highestRatio = ratio;
        bestCat = cat;
      }
    }
    if (dom.bestCategoryMetric) dom.bestCategoryMetric.textContent = bestCat;

    // Switch Views
    if (dom.quizViewSection) dom.quizViewSection.style.display = "none";
    if (dom.resultsViewSection) dom.resultsViewSection.classList.add("active");

    renderReviewCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ===================================================================
     Review Answers & Trace Tables
     =================================================================== */
  function renderReviewCards() {
    if (!dom.reviewCardsContainer) return;
    dom.reviewCardsContainer.innerHTML = "";

    const filtered = state.questions.filter((q) => {
      const userAns = state.userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;
      if (state.reviewFilter === "correct") return isCorrect;
      if (state.reviewFilter === "incorrect") return !isCorrect;
      return true;
    });

    if (filtered.length === 0) {
      dom.reviewCardsContainer.innerHTML = `<div style="text-align:center; padding:3rem; color:var(--text-muted);">No questions match this filter.</div>`;
      return;
    }

    filtered.forEach((q) => {
      const userAns = state.userAnswers[q.id];
      const isCorrect = userAns === q.correctAnswer;

      const userOpt = q.options.find((o) => o.id === userAns);
      const correctOpt = q.options.find((o) => o.id === q.correctAnswer);

      const reviewCard = document.createElement("div");
      reviewCard.className = `review-card ${isCorrect ? "correct" : "incorrect"}`;

      reviewCard.innerHTML = `
        <div class="card-top-bar">
          <div class="q-badge-group">
            <span class="q-number-badge">QUESTION ${q.id}</span>
            <span class="q-category-tag">${q.category}</span>
            <span class="review-status-pill ${isCorrect ? "correct" : "incorrect"}">
              ${isCorrect ? "✓ CORRECT" : "✕ INCORRECT"}
            </span>
          </div>
          <button type="button" class="btn-card-action btn-review-vis" data-qid="${q.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            Replay in Visualizer
          </button>
        </div>

        <div class="question-prompt">${q.prompt}</div>

        <div class="code-container">
          <div class="code-header-bar">
            <span class="code-language-tag">PSEUDO-CODE LOGIC</span>
          </div>
          <div class="code-block-body">
            ${highlightPseudoCode(q.code)}
          </div>
        </div>

        <div class="answer-comparison-box">
          <div class="ans-item">
            <h5>Your Response</h5>
            <div class="ans-val ${isCorrect ? "user-correct" : "user-wrong"}">
              ${userOpt ? `${userOpt.id}) ${escapeHtml(userOpt.text)}` : "No Answer Selected"}
            </div>
          </div>
          <div class="ans-item">
            <h5>Correct Answer</h5>
            <div class="ans-val correct-ans">
              ${correctOpt.id}) ${escapeHtml(correctOpt.text)}
            </div>
          </div>
        </div>

        <div class="explanation-box">
          <h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Explanation & Logic
          </h4>
          <p>${escapeHtml(q.explanation)}</p>
        </div>

        ${generateTraceTableHtml(q.traceTable)}
      `;

      const visBtn = reviewCard.querySelector(".btn-review-vis");
      if (visBtn) {
        visBtn.addEventListener("click", () => openVisualizer(q.id));
      }

      dom.reviewCardsContainer.appendChild(reviewCard);
    });
  }

  function generateTraceTableHtml(traceTable) {
    if (!traceTable || traceTable.length === 0) return "";

    const columns = Object.keys(traceTable[0]);

    return `
      <div>
        <h5 style="font-size:0.78rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.4rem; font-family:var(--font-mono);">
          Step-by-Step Execution Trace Table
        </h5>
        <div class="trace-table-container">
          <table class="trace-table">
            <thead>
              <tr>
                ${columns.map((col) => `<th>${escapeHtml(col.replace(/_/g, " "))}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${traceTable
                .map(
                  (row) => `
                <tr>
                  ${columns.map((col) => `<td>${escapeHtml(String(row[col]))}</td>`).join("")}
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ===================================================================
     Event Handlers & Initialization
     =================================================================== */
  function initEvents() {
    // Theme toggle
    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.addEventListener("click", () => {
        state.theme = state.theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", state.theme);
      });
    }

    // Visualizer open/close
    if (dom.visualizerToggleBtn) {
      dom.visualizerToggleBtn.addEventListener("click", () => {
        const qid = state.questions[state.currentIndex]?.id || 1;
        openVisualizer(qid);
      });
    }
    if (dom.visCloseBtn) dom.visCloseBtn.addEventListener("click", closeVisualizer);
    if (dom.visualizerOverlay) {
      dom.visualizerOverlay.addEventListener("click", (e) => {
        if (e.target === dom.visualizerOverlay) closeVisualizer();
      });
    }

    // Visualizer controls
    if (dom.visBtnPlay) dom.visBtnPlay.addEventListener("click", togglePlayVisualizer);
    if (dom.visBtnFirst) {
      dom.visBtnFirst.addEventListener("click", () => {
        pauseVisualizer();
        state.visualizer.currentStepIndex = 0;
        renderVisualizerStep();
      });
    }
    if (dom.visBtnPrev) {
      dom.visBtnPrev.addEventListener("click", () => {
        pauseVisualizer();
        if (state.visualizer.currentStepIndex > 0) {
          state.visualizer.currentStepIndex--;
          renderVisualizerStep();
        }
      });
    }
    if (dom.visBtnNext) {
      dom.visBtnNext.addEventListener("click", () => {
        pauseVisualizer();
        const q = state.questions.find((x) => x.id === state.visualizer.activeQuestionId);
        if (q && state.visualizer.currentStepIndex < q.visualizer.steps.length - 1) {
          state.visualizer.currentStepIndex++;
          renderVisualizerStep();
        }
      });
    }
    if (dom.visBtnLast) {
      dom.visBtnLast.addEventListener("click", () => {
        pauseVisualizer();
        const q = state.questions.find((x) => x.id === state.visualizer.activeQuestionId);
        if (q) {
          state.visualizer.currentStepIndex = q.visualizer.steps.length - 1;
          renderVisualizerStep();
        }
      });
    }
    if (dom.visSlider) {
      dom.visSlider.addEventListener("input", (e) => {
        pauseVisualizer();
        state.visualizer.currentStepIndex = parseInt(e.target.value, 10);
        renderVisualizerStep();
      });
    }
    if (dom.visSpeedSelect) {
      dom.visSpeedSelect.addEventListener("change", (e) => {
        state.visualizer.speed = parseFloat(e.target.value);
        if (state.visualizer.isPlaying) {
          playVisualizer();
        }
      });
    }

    // View Mode Toggle (Single vs All Cards)
    if (dom.btnModeSingle) {
      dom.btnModeSingle.addEventListener("click", () => {
        state.viewMode = "single";
        dom.btnModeSingle.classList.add("active");
        if (dom.btnModeAll) dom.btnModeAll.classList.remove("active");
        renderQuizCards();
      });
    }
    if (dom.btnModeAll) {
      dom.btnModeAll.addEventListener("click", () => {
        state.viewMode = "all";
        dom.btnModeAll.classList.add("active");
        if (dom.btnModeSingle) dom.btnModeSingle.classList.remove("active");
        renderQuizCards();
      });
    }

    // Submit Modal Events
    if (dom.btnCancelSubmit) {
      dom.btnCancelSubmit.addEventListener("click", () => {
        if (dom.submitModal) dom.submitModal.classList.remove("open");
      });
    }
    if (dom.btnConfirmSubmit) {
      dom.btnConfirmSubmit.addEventListener("click", submitQuiz);
    }

    // Review Filters
    document.querySelectorAll(".filter-tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
        e.currentTarget.classList.add("active");
        state.reviewFilter = e.currentTarget.getAttribute("data-filter");
        renderReviewCards();
      });
    });

    // Retake Quiz
    if (dom.btnRetake) {
      dom.btnRetake.addEventListener("click", () => {
        state.userAnswers = {};
        state.currentIndex = 0;
        state.isSubmitted = false;
        state.elapsedSeconds = 0;
        state.startTime = Date.now();
        if (dom.resultsViewSection) dom.resultsViewSection.classList.remove("active");
        if (dom.quizViewSection) dom.quizViewSection.style.display = "block";
        startTimer();
        renderQuizCards();
      });
    }

    // Print / PDF Report
    if (dom.btnPrintReport) {
      dom.btnPrintReport.addEventListener("click", () => {
        window.print();
      });
    }

    // Global Keyboard Navigation
    window.addEventListener("keydown", (e) => {
      // Don't intercept if an input is focused
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

      if (e.key === "Escape") {
        closeVisualizer();
        if (dom.submitModal) dom.submitModal.classList.remove("open");
      }

      if (!state.isSubmitted) {
        if (e.key === "ArrowLeft" && state.viewMode === "single") {
          if (state.currentIndex > 0) navigateToQuestion(state.currentIndex - 1);
        } else if (e.key === "ArrowRight" && state.viewMode === "single") {
          if (state.currentIndex < state.questions.length - 1) navigateToQuestion(state.currentIndex + 1);
        } else if (["1", "2", "3", "4", "a", "b", "c", "d", "A", "B", "C", "D"].includes(e.key)) {
          const map = { "1": "A", "2": "B", "3": "C", "4": "D", "a": "A", "b": "B", "c": "C", "d": "D" };
          const letter = map[e.key.toLowerCase()] || e.key.toUpperCase();
          const curQ = state.questions[state.currentIndex];
          if (curQ) selectAnswer(curQ.id, letter);
        }
      }
    });
  }

  // Application Entry Point
  function init() {
    initEvents();
    startTimer();
    renderQuizCards();
  }

  // Launch when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
