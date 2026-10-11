/**
 * Pseudo Code Visualizer & Quiz System - Question Bank (20 Questions)
 * Topics:
 * - Q1-Q10: Basic operators, arithmetic, modulus, bitwise, comparison & logic
 * - Q11-Q12: While loops & termination values
 * - Q13-Q14: For loops & accumulators (Sum / Product)
 * - Q15-Q18: Array indexing, updating, swap, and iterative swap
 * - Q19: Operator Precedence
 * - Q20: Bitwise XOR + Conditional Logic
 */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "Modulus Operator Evaluation",
    category: "Basic Operators",
    difficulty: "Easy",
    prompt: "What will be printed as the output of the following pseudo-code?",
    code: `START
    A = 17
    B = 5
    RES = A % B
    PRINT RES
END`,
    options: [
      { id: "A", text: "2" },
      { id: "B", text: "3" },
      { id: "C", text: "3.4" },
      { id: "D", text: "0" }
    ],
    correctAnswer: "A",
    explanation: "The modulus operator (%) returns the remainder of integer division. When 17 is divided by 5, the quotient is 3 with a remainder of 2 (17 = 5 * 3 + 2). Thus, RES is assigned the value 2.",
    traceTable: [
      { step: "1", line: "A = 17", a: "17", b: "-", res: "-", output: "-" },
      { step: "2", line: "B = 5", a: "17", b: "5", res: "-", output: "-" },
      { step: "3", line: "RES = 17 % 5", a: "17", b: "5", res: "2", output: "-" },
      { step: "4", line: "PRINT RES", a: "17", b: "5", res: "2", output: "2" }
    ],
    visualizer: {
      type: "operator_eval",
      title: "Division & Modulus Breakdown",
      initialVars: { A: 17, B: 5, RES: 0 },
      steps: [
        {
          line: 2,
          desc: "Initialize A = 17 (dividend)",
          vars: { A: 17, B: "-", RES: "-" },
          highlight: ["A"],
          visualData: { quotient: null, remainder: null, expression: "A = 17" }
        },
        {
          line: 3,
          desc: "Initialize B = 5 (divisor)",
          vars: { A: 17, B: 5, RES: "-" },
          highlight: ["B"],
          visualData: { quotient: null, remainder: null, expression: "B = 5" }
        },
        {
          line: 4,
          desc: "Calculate 17 % 5: 17 = (5 × 3) + 2. Remainder is 2.",
          vars: { A: 17, B: 5, RES: 2 },
          highlight: ["RES"],
          visualData: { dividend: 17, divisor: 5, quotient: 3, remainder: 2, expression: "17 = (5 × 3) + 2 → RES = 2" }
        },
        {
          line: 5,
          desc: "PRINT RES outputs 2 to the screen.",
          vars: { A: 17, B: 5, RES: 2 },
          highlight: ["output"],
          visualData: { output: "2", expression: "Output: 2" }
        }
      ]
    }
  },
  {
    id: 2,
    title: "Integer Division vs Modulus",
    category: "Basic Operators",
    difficulty: "Easy",
    prompt: "Evaluate the output of the following pseudo-code involving DIV (integer division) and MOD:",
    code: `START
    X = 23 DIV 4
    Y = 23 MOD 4
    RESULT = X + Y
    PRINT RESULT
END`,
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "8" },
      { id: "C", text: "10" },
      { id: "D", text: "5" }
    ],
    correctAnswer: "B",
    explanation: "23 DIV 4 calculates the integer quotient, discarding decimals: 23 / 4 = 5. 23 MOD 4 calculates the remainder: 23 - (4 * 5) = 3. Therefore, RESULT = 5 + 3 = 8.",
    traceTable: [
      { step: "1", line: "X = 23 DIV 4", x: "5", y: "-", result: "-", output: "-" },
      { step: "2", line: "Y = 23 MOD 4", x: "5", y: "3", result: "-", output: "-" },
      { step: "3", line: "RESULT = 5 + 3", x: "5", y: "3", result: "8", output: "-" },
      { step: "4", line: "PRINT RESULT", x: "5", y: "3", result: "8", output: "8" }
    ],
    visualizer: {
      type: "operator_eval",
      title: "Integer Quotient and Remainder",
      initialVars: { X: 0, Y: 0, RESULT: 0 },
      steps: [
        {
          line: 2,
          desc: "23 DIV 4 computes the integer quotient: floor(23 / 4) = 5",
          vars: { X: 5, Y: "-", RESULT: "-" },
          highlight: ["X"],
          visualData: { dividend: 23, divisor: 4, quotient: 5, remainder: null, expression: "X = 23 DIV 4 = 5" }
        },
        {
          line: 3,
          desc: "23 MOD 4 computes the remainder: 23 - (4 × 5) = 3",
          vars: { X: 5, Y: 3, RESULT: "-" },
          highlight: ["Y"],
          visualData: { dividend: 23, divisor: 4, quotient: 5, remainder: 3, expression: "Y = 23 MOD 4 = 3" }
        },
        {
          line: 4,
          desc: "Sum X and Y: 5 + 3 = 8",
          vars: { X: 5, Y: 3, RESULT: 8 },
          highlight: ["RESULT"],
          visualData: { expression: "RESULT = 5 + 3 = 8" }
        },
        {
          line: 5,
          desc: "PRINT RESULT outputs 8",
          vars: { X: 5, Y: 3, RESULT: 8 },
          highlight: ["output"],
          visualData: { output: "8", expression: "Output: 8" }
        }
      ]
    }
  },
  {
    id: 3,
    title: "Relational & Boolean Logic",
    category: "Basic Operators",
    difficulty: "Medium",
    prompt: "What will be the boolean value printed by the following pseudo-code?",
    code: `START
    P = 15
    Q = 25
    FLAG = (P < Q) AND (Q >= 30 OR P != 10)
    PRINT FLAG
END`,
    options: [
      { id: "A", text: "TRUE" },
      { id: "B", text: "FALSE" },
      { id: "C", text: "NULL" },
      { id: "D", text: "ERROR" }
    ],
    correctAnswer: "A",
    explanation: "Evaluating step by step: 1. (P < Q) => (15 < 25) which is TRUE. 2. (Q >= 30) => (25 >= 30) is FALSE. 3. (P != 10) => (15 != 10) is TRUE. 4. (FALSE OR TRUE) resolves to TRUE. 5. Finally, TRUE AND TRUE resolves to TRUE.",
    traceTable: [
      { step: "1", line: "P=15, Q=25", p: "15", q: "25", expr1: "-", expr2: "-", flag: "-" },
      { step: "2", line: "(P < Q)", p: "15", q: "25", expr1: "TRUE", expr2: "-", flag: "-" },
      { step: "3", line: "(Q >= 30 OR P != 10)", p: "15", q: "25", expr1: "TRUE", expr2: "FALSE OR TRUE = TRUE", flag: "-" },
      { step: "4", line: "FLAG = TRUE AND TRUE", p: "15", q: "25", expr1: "TRUE", expr2: "TRUE", flag: "TRUE" }
    ],
    visualizer: {
      type: "logic_gate",
      title: "Boolean Expression Tree",
      initialVars: { P: 15, Q: 25, FLAG: null },
      steps: [
        {
          line: 2,
          desc: "Assign P = 15, Q = 25",
          vars: { P: 15, Q: 25, FLAG: "-" },
          highlight: ["vars"],
          visualData: { leftBranch: "P < Q", rightBranch: "Q >= 30 OR P != 10", result: null }
        },
        {
          line: 4,
          desc: "Evaluate left operand: 15 < 25 → TRUE",
          vars: { P: 15, Q: 25, FLAG: "-" },
          highlight: ["left"],
          visualData: { leftBranch: "TRUE", rightBranch: "...", result: null }
        },
        {
          line: 4,
          desc: "Evaluate right operand: (25 >= 30 [FALSE]) OR (15 != 10 [TRUE]) → TRUE",
          vars: { P: 15, Q: 25, FLAG: "-" },
          highlight: ["right"],
          visualData: { leftBranch: "TRUE", rightBranch: "TRUE", result: null }
        },
        {
          line: 5,
          desc: "Evaluate AND: TRUE AND TRUE → TRUE. Print TRUE",
          vars: { P: 15, Q: 25, FLAG: "TRUE" },
          highlight: ["FLAG", "output"],
          visualData: { leftBranch: "TRUE", rightBranch: "TRUE", result: "TRUE", output: "TRUE" }
        }
      ]
    }
  },
  {
    id: 4,
    title: "Logical NOT & Operator Precedence",
    category: "Basic Operators",
    difficulty: "Medium",
    prompt: "Determine the final value of RES in the pseudo-code snippet below:",
    code: `START
    A = TRUE
    B = FALSE
    RES = NOT(A AND B) AND (NOT(B) OR A)
    PRINT RES
END`,
    options: [
      { id: "A", text: "FALSE" },
      { id: "B", text: "TRUE" },
      { id: "C", text: "UNDEFINED" },
      { id: "D", text: "NULL" }
    ],
    correctAnswer: "B",
    explanation: "1. (A AND B) = (TRUE AND FALSE) = FALSE. Therefore, NOT(A AND B) = NOT(FALSE) = TRUE. 2. NOT(B) = NOT(FALSE) = TRUE. (TRUE OR TRUE) = TRUE. 3. RES = TRUE AND TRUE = TRUE.",
    traceTable: [
      { step: "1", line: "A=TRUE, B=FALSE", part1: "-", part2: "-", res: "-" },
      { step: "2", line: "NOT(A AND B)", part1: "NOT(FALSE) = TRUE", part2: "-", res: "-" },
      { step: "3", line: "NOT(B) OR A", part1: "TRUE", part2: "TRUE OR TRUE = TRUE", res: "-" },
      { step: "4", line: "RES = TRUE AND TRUE", part1: "TRUE", part2: "TRUE", res: "TRUE" }
    ],
    visualizer: {
      type: "logic_gate",
      title: "Logical Expression Evaluation",
      initialVars: { A: "TRUE", B: "FALSE", RES: null },
      steps: [
        {
          line: 2,
          desc: "A = TRUE, B = FALSE",
          vars: { A: "TRUE", B: "FALSE", RES: "-" },
          visualData: { expr1: "NOT(A AND B)", expr2: "NOT(B) OR A" }
        },
        {
          line: 4,
          desc: "A AND B is FALSE; NOT(FALSE) evaluates to TRUE",
          vars: { A: "TRUE", B: "FALSE", RES: "-" },
          visualData: { expr1: "TRUE", expr2: "NOT(B) OR A" }
        },
        {
          line: 4,
          desc: "NOT(B) is TRUE; TRUE OR TRUE evaluates to TRUE",
          vars: { A: "TRUE", B: "FALSE", RES: "-" },
          visualData: { expr1: "TRUE", expr2: "TRUE" }
        },
        {
          line: 5,
          desc: "TRUE AND TRUE evaluates to TRUE. Printed output is TRUE.",
          vars: { A: "TRUE", B: "FALSE", RES: "TRUE" },
          visualData: { expr1: "TRUE", expr2: "TRUE", final: "TRUE", output: "TRUE" }
        }
      ]
    }
  },
  {
    id: 5,
    title: "Bitwise AND & Bitwise OR",
    category: "Basic Operators",
    difficulty: "Medium",
    prompt: "What will be printed as the output of this bitwise arithmetic pseudo-code?",
    code: `START
    A = 12
    B = 10
    C = (A & B) + (A | B)
    PRINT C
END`,
    options: [
      { id: "A", text: "22" },
      { id: "B", text: "20" },
      { id: "C", text: "18" },
      { id: "D", text: "24" }
    ],
    correctAnswer: "A",
    explanation: "Converting to 4-bit binary: A = 12 = 1100₂, B = 10 = 1010₂. Bitwise AND (A & B): 1100 & 1010 = 1000₂ = 8. Bitwise OR (A | B): 1100 | 1010 = 1110₂ = 14. Therefore C = 8 + 14 = 22.",
    traceTable: [
      { step: "1", line: "A=12 (1100₂), B=10 (1010₂)", and_val: "-", or_val: "-", c: "-" },
      { step: "2", line: "A & B = 1100 & 1010", and_val: "8 (1000₂)", or_val: "-", c: "-" },
      { step: "3", line: "A | B = 1100 | 1010", and_val: "8", or_val: "14 (1110₂)", c: "-" },
      { step: "4", line: "C = 8 + 14", and_val: "8", or_val: "14", c: "22" }
    ],
    visualizer: {
      type: "bitwise_xor",
      title: "Bitwise Register Operations",
      initialVars: { A: 12, B: 10, C: 0 },
      steps: [
        {
          line: 2,
          desc: "A = 12 in binary is 1100₂",
          vars: { A: 12, B: "-", C: "-" },
          visualData: { aBin: "1100", bBin: "----", andBin: "----", orBin: "----" }
        },
        {
          line: 3,
          desc: "B = 10 in binary is 1010₂",
          vars: { A: 12, B: 10, C: "-" },
          visualData: { aBin: "1100", bBin: "1010", andBin: "----", orBin: "----" }
        },
        {
          line: 4,
          desc: "A & B: 1100 & 1010 = 1000₂ = 8",
          vars: { A: 12, B: 10, "A&B": 8 },
          visualData: { aBin: "1100", bBin: "1010", andBin: "1000 (8)", orBin: "----" }
        },
        {
          line: 4,
          desc: "A | B: 1100 | 1010 = 1110₂ = 14. Add them: 8 + 14 = 22.",
          vars: { A: 12, B: 10, C: 22 },
          visualData: { aBin: "1100", bBin: "1010", andBin: "1000 (8)", orBin: "1110 (14)", sum: "8 + 14 = 22" }
        },
        {
          line: 5,
          desc: "PRINT C outputs 22",
          vars: { A: 12, B: 10, C: 22 },
          visualData: { output: "22" }
        }
      ]
    }
  },
  {
    id: 6,
    title: "Bitwise Left and Right Shifts",
    category: "Basic Operators",
    difficulty: "Medium",
    prompt: "What will be printed when the following shift operations execute?",
    code: `START
    VAL = 6
    SHIFT_LEFT = VAL << 2
    SHIFT_RIGHT = VAL >> 1
    RES = SHIFT_LEFT - SHIFT_RIGHT
    PRINT RES
END`,
    options: [
      { id: "A", text: "21" },
      { id: "B", text: "24" },
      { id: "C", text: "18" },
      { id: "D", text: "27" }
    ],
    correctAnswer: "A",
    explanation: "VAL = 6 (binary 000110₂). Left shifting by 2 bits multiplies by 2² (4): 6 << 2 = 6 * 4 = 24 (011000₂). Right shifting by 1 bit performs integer division by 2¹: 6 >> 1 = 6 / 2 = 3 (000011₂). Then, RES = 24 - 3 = 21.",
    traceTable: [
      { step: "1", line: "VAL = 6", val: "6", left: "-", right: "-", res: "-" },
      { step: "2", line: "SHIFT_LEFT = 6 << 2", val: "6", left: "24", right: "-", res: "-" },
      { step: "3", line: "SHIFT_RIGHT = 6 >> 1", val: "6", left: "24", right: "3", res: "-" },
      { step: "4", line: "RES = 24 - 3", val: "6", left: "24", right: "3", res: "21" }
    ],
    visualizer: {
      type: "operator_eval",
      title: "Bit Shift Visualizer",
      initialVars: { VAL: 6, SHIFT_LEFT: 0, SHIFT_RIGHT: 0, RES: 0 },
      steps: [
        {
          line: 2,
          desc: "VAL = 6 (binary 00000110₂)",
          vars: { VAL: 6, SHIFT_LEFT: "-", SHIFT_RIGHT: "-" },
          visualData: { binary: "0000 0110", value: 6 }
        },
        {
          line: 3,
          desc: "Shift left by 2 positions: 6 × 4 = 24 (binary 00011000₂)",
          vars: { VAL: 6, SHIFT_LEFT: 24, SHIFT_RIGHT: "-" },
          visualData: { binary: "0001 1000", value: 24, shift: "<< 2" }
        },
        {
          line: 4,
          desc: "Shift right by 1 position: 6 ÷ 2 = 3 (binary 00000011₂)",
          vars: { VAL: 6, SHIFT_LEFT: 24, SHIFT_RIGHT: 3 },
          visualData: { binary: "0000 0011", value: 3, shift: ">> 1" }
        },
        {
          line: 5,
          desc: "RES = 24 - 3 = 21. PRINT RES outputs 21.",
          vars: { VAL: 6, SHIFT_LEFT: 24, SHIFT_RIGHT: 3, RES: 21 },
          visualData: { output: "21", expression: "24 - 3 = 21" }
        }
      ]
    }
  },
  {
    id: 7,
    title: "Compound Modulus & Arithmetic",
    category: "Basic Operators",
    difficulty: "Easy",
    prompt: "Calculate the exact output of the pseudo-code below:",
    code: `START
    N = 45
    RES = (N % 7) * 3 + (N % 5)
    PRINT RES
END`,
    options: [
      { id: "A", text: "9" },
      { id: "B", text: "12" },
      { id: "C", text: "15" },
      { id: "D", text: "6" }
    ],
    correctAnswer: "A",
    explanation: "First, N % 7: 45 / 7 is 6 with remainder 3 (7 * 6 = 42). So (N % 7) = 3. Next, 3 * 3 = 9. Then, N % 5: 45 / 5 is 9 with remainder 0. So (N % 5) = 0. Finally, 9 + 0 = 9.",
    traceTable: [
      { step: "1", line: "N = 45", n: "45", mod7: "-", mod5: "-", res: "-" },
      { step: "2", line: "N % 7", n: "45", mod7: "3", mod5: "-", res: "-" },
      { step: "3", line: "N % 5", n: "45", mod7: "3", mod5: "0", res: "-" },
      { step: "4", line: "RES = (3 * 3) + 0", n: "45", mod7: "3", mod5: "0", res: "9" }
    ],
    visualizer: {
      type: "operator_eval",
      title: "Expression Evaluation",
      initialVars: { N: 45, RES: 0 },
      steps: [
        {
          line: 2,
          desc: "N = 45 initialized",
          vars: { N: 45, RES: "-" },
          visualData: { expression: "N = 45" }
        },
        {
          line: 3,
          desc: "Calculate 45 % 7: 45 = (7 × 6) + 3 → Remainder = 3",
          vars: { N: 45, "N%7": 3 },
          visualData: { expression: "45 % 7 = 3" }
        },
        {
          line: 3,
          desc: "Multiply by 3: 3 × 3 = 9. Then 45 % 5 = 0. RES = 9 + 0 = 9.",
          vars: { N: 45, RES: 9 },
          visualData: { expression: "(3 × 3) + 0 = 9" }
        },
        {
          line: 4,
          desc: "PRINT RES outputs 9",
          vars: { N: 45, RES: 9 },
          visualData: { output: "9" }
        }
      ]
    }
  },
  {
    id: 8,
    title: "Conditional Multi-branch Selection",
    category: "Basic Operators",
    difficulty: "Easy",
    prompt: "What grade will be assigned to GRADE according to this pseudo-code?",
    code: `START
    SCORE = 72
    IF SCORE >= 80 THEN
        GRADE = "A"
    ELSE IF SCORE >= 60 THEN
        GRADE = "B"
    ELSE
        GRADE = "C"
    ENDIF
    PRINT GRADE
END`,
    options: [
      { id: "A", text: "\"A\"" },
      { id: "B", text: "\"B\"" },
      { id: "C", text: "\"C\"" },
      { id: "D", text: "\"PASS\"" }
    ],
    correctAnswer: "B",
    explanation: "SCORE is 72. The first condition (SCORE >= 80) evaluates to (72 >= 80) which is FALSE. Execution moves to the ELSE IF branch (SCORE >= 60): (72 >= 60) is TRUE. Thus GRADE is set to 'B' and subsequent branches are skipped.",
    traceTable: [
      { step: "1", line: "SCORE = 72", score: "72", cond1: "-", cond2: "-", grade: "-" },
      { step: "2", line: "IF SCORE >= 80", score: "72", cond1: "72 >= 80 (FALSE)", cond2: "-", grade: "-" },
      { step: "3", line: "ELSE IF SCORE >= 60", score: "72", cond1: "FALSE", cond2: "72 >= 60 (TRUE)", grade: "\"B\"" },
      { step: "4", line: "PRINT GRADE", score: "72", cond1: "FALSE", cond2: "TRUE", grade: "\"B\"" }
    ],
    visualizer: {
      type: "operator_eval",
      title: "Decision Branch Flow",
      initialVars: { SCORE: 72, GRADE: "" },
      steps: [
        {
          line: 2,
          desc: "SCORE is set to 72",
          vars: { SCORE: 72, GRADE: "-" },
          visualData: { activeBranch: "Init" }
        },
        {
          line: 3,
          desc: "Evaluate 72 >= 80: FALSE. Flow skips to ELSE IF.",
          vars: { SCORE: 72, GRADE: "-" },
          visualData: { activeBranch: "Check 1: Failed" }
        },
        {
          line: 5,
          desc: "Evaluate 72 >= 60: TRUE! Entering this block.",
          vars: { SCORE: 72, GRADE: "-" },
          visualData: { activeBranch: "Check 2: Matched" }
        },
        {
          line: 6,
          desc: "GRADE = 'B' assigned. End of IF-ELSE construct.",
          vars: { SCORE: 72, GRADE: "B" },
          visualData: { activeBranch: "GRADE = 'B'", output: "B" }
        }
      ]
    }
  },
  {
    id: 9,
    title: "Counting with Modulus in Loop",
    category: "Basic Operators",
    difficulty: "Medium",
    prompt: "What will be the final printed value of COUNT?",
    code: `START
    COUNT = 0
    FOR K = 10 TO 20 DO
        IF K % 3 == 0 THEN
            COUNT = COUNT + 1
        ENDIF
    ENDFOR
    PRINT COUNT
END`,
    options: [
      { id: "A", text: "3" },
      { id: "B", text: "4" },
      { id: "C", text: "5" },
      { id: "D", text: "2" }
    ],
    correctAnswer: "A",
    explanation: "The loop checks every integer K from 10 to 20 inclusive: K=10 (10%3=1), K=11 (11%3=2), K=12 (12%3=0 -> count=1), K=13 (1), K=14 (2), K=15 (15%3=0 -> count=2), K=16 (1), K=17 (2), K=18 (18%3=0 -> count=3), K=19 (1), K=20 (2). There are exactly 3 multiples of 3 (12, 15, 18). COUNT = 3.",
    traceTable: [
      { step: "1", line: "K=10..11", k: "10, 11", condition: "10%3!=0, 11%3!=0", count: "0" },
      { step: "2", line: "K=12", k: "12", condition: "12%3==0 (TRUE)", count: "1" },
      { step: "3", line: "K=13..14", k: "13, 14", condition: "No match", count: "1" },
      { step: "4", line: "K=15", k: "15", condition: "15%3==0 (TRUE)", count: "2" },
      { step: "5", line: "K=16..17", k: "16, 17", condition: "No match", count: "2" },
      { step: "6", line: "K=18", k: "18", condition: "18%3==0 (TRUE)", count: "3" },
      { step: "7", line: "K=19..20", k: "19, 20", condition: "No match", count: "3" }
    ],
    visualizer: {
      type: "loop_accumulator",
      title: "Multiples Count Tracker",
      initialVars: { COUNT: 0, K: 10 },
      steps: [
        {
          line: 2,
          desc: "Initialize COUNT = 0",
          vars: { COUNT: 0, K: "-" },
          visualData: { loopProgress: "Start", matches: [] }
        },
        {
          line: 4,
          desc: "K = 12: 12 % 3 == 0. Found multiple! COUNT becomes 1.",
          vars: { COUNT: 1, K: 12 },
          visualData: { loopProgress: "K = 12", matches: [12] }
        },
        {
          line: 4,
          desc: "K = 15: 15 % 3 == 0. Found multiple! COUNT becomes 2.",
          vars: { COUNT: 2, K: 15 },
          visualData: { loopProgress: "K = 15", matches: [12, 15] }
        },
        {
          line: 4,
          desc: "K = 18: 18 % 3 == 0. Found multiple! COUNT becomes 3.",
          vars: { COUNT: 3, K: 18 },
          visualData: { loopProgress: "K = 18", matches: [12, 15, 18] }
        },
        {
          line: 8,
          desc: "Loop completes for K=20. Final COUNT = 3.",
          vars: { COUNT: 3, K: "Done" },
          visualData: { loopProgress: "Done", matches: [12, 15, 18], output: "3" }
        }
      ]
    }
  },
  {
    id: 10,
    title: "Variable Swap Without Temporary Variable",
    category: "Basic Operators",
    difficulty: "Medium",
    prompt: "What will be the final values of A and B printed by the pseudo-code?",
    code: `START
    A = 15
    B = 9
    A = A + B
    B = A - B
    A = A - B
    PRINT "A=", A, "B=", B
END`,
    options: [
      { id: "A", text: "A= 9 B= 15" },
      { id: "B", text: "A= 15 B= 9" },
      { id: "C", text: "A= 24 B= 6" },
      { id: "D", text: "A= 0 B= 24" }
    ],
    correctAnswer: "A",
    explanation: "This is the classic arithmetic swap algorithm: 1. A = 15 + 9 = 24. 2. B = 24 - 9 = 15 (B now holds initial A). 3. A = 24 - 15 = 9 (A now holds initial B). Therefore, A = 9, B = 15.",
    traceTable: [
      { step: "1", line: "A = 15, B = 9", a: "15", b: "9", description: "Initial assignments" },
      { step: "2", line: "A = A + B", a: "24", b: "9", description: "A holds the sum (15 + 9 = 24)" },
      { step: "3", line: "B = A - B", a: "24", b: "15", description: "B becomes original A (24 - 9 = 15)" },
      { step: "4", line: "A = A - B", a: "9", b: "15", description: "A becomes original B (24 - 15 = 9)" }
    ],
    visualizer: {
      type: "operator_eval",
      title: "Arithmetic In-Place Swap",
      initialVars: { A: 15, B: 9 },
      steps: [
        {
          line: 2,
          desc: "Initial values: A = 15, B = 9",
          vars: { A: 15, B: 9 },
          visualData: { state: "Init", expression: "A=15, B=9" }
        },
        {
          line: 4,
          desc: "Step 1: A = A + B = 15 + 9 = 24",
          vars: { A: 24, B: 9 },
          visualData: { state: "Summed", expression: "A = 24 (Sum of both)" }
        },
        {
          line: 5,
          desc: "Step 2: B = A - B = 24 - 9 = 15 (B now has original A)",
          vars: { A: 24, B: 15 },
          visualData: { state: "B swapped", expression: "B = 15" }
        },
        {
          line: 6,
          desc: "Step 3: A = A - B = 24 - 15 = 9 (A now has original B)",
          vars: { A: 9, B: 15 },
          visualData: { state: "Complete swap", expression: "A = 9, B = 15" }
        },
        {
          line: 7,
          desc: "PRINT A= 9 B= 15",
          vars: { A: 9, B: 15 },
          visualData: { output: "A= 9 B= 15" }
        }
      ]
    }
  },
  {
    id: 11,
    title: "While Loop: Sequence Printing",
    category: "Loops & Iteration",
    difficulty: "Easy",
    prompt: "What will be printed to the output console by the following while loop?",
    code: `START
    I = 1
    WHILE I <= 5 DO
        PRINT I
        I = I + 1
    ENDWHILE
END`,
    options: [
      { id: "A", text: "1 2 3 4 5" },
      { id: "B", text: "1 2 3 4" },
      { id: "C", text: "0 1 2 3 4 5" },
      { id: "D", text: "1 2 3 4 5 6" }
    ],
    correctAnswer: "A",
    explanation: "The loop starts at I = 1. In each iteration, I is printed and then incremented by 1. When I reaches 5, 5 is printed and I becomes 6. At the check 6 <= 5, the condition evaluates to FALSE, terminating the loop. The printed numbers are 1 2 3 4 5.",
    traceTable: [
      { step: "Init", line: "I = 1", i: "1", condition: "1 <= 5 (TRUE)", printed: "1", next_i: "2" },
      { step: "Iter 2", line: "WHILE", i: "2", condition: "2 <= 5 (TRUE)", printed: "2", next_i: "3" },
      { step: "Iter 3", line: "WHILE", i: "3", condition: "3 <= 5 (TRUE)", printed: "3", next_i: "4" },
      { step: "Iter 4", line: "WHILE", i: "4", condition: "4 <= 5 (TRUE)", printed: "4", next_i: "5" },
      { step: "Iter 5", line: "WHILE", i: "5", condition: "5 <= 5 (TRUE)", printed: "5", next_i: "6" },
      { step: "Exit", line: "WHILE", i: "6", condition: "6 <= 5 (FALSE)", printed: "-", next_i: "Loop ends" }
    ],
    visualizer: {
      type: "while_counter",
      title: "While Loop Execution Trace",
      initialVars: { I: 1 },
      steps: [
        {
          line: 2,
          desc: "Initialize loop counter I = 1",
          vars: { I: 1 },
          visualData: { counter: 1, max: 5, printedOutput: [] }
        },
        {
          line: 4,
          desc: "Iteration 1: Condition (1 <= 5) TRUE. PRINT 1. Increment I to 2.",
          vars: { I: 2 },
          visualData: { counter: 2, max: 5, printedOutput: [1] }
        },
        {
          line: 4,
          desc: "Iteration 2: Condition (2 <= 5) TRUE. PRINT 2. Increment I to 3.",
          vars: { I: 3 },
          visualData: { counter: 3, max: 5, printedOutput: [1, 2] }
        },
        {
          line: 4,
          desc: "Iteration 3: Condition (3 <= 5) TRUE. PRINT 3. Increment I to 4.",
          vars: { I: 4 },
          visualData: { counter: 4, max: 5, printedOutput: [1, 2, 3] }
        },
        {
          line: 4,
          desc: "Iteration 4: Condition (4 <= 5) TRUE. PRINT 4. Increment I to 5.",
          vars: { I: 5 },
          visualData: { counter: 5, max: 5, printedOutput: [1, 2, 3, 4] }
        },
        {
          line: 4,
          desc: "Iteration 5: Condition (5 <= 5) TRUE. PRINT 5. Increment I to 6.",
          vars: { I: 6 },
          visualData: { counter: 6, max: 5, printedOutput: [1, 2, 3, 4, 5] }
        },
        {
          line: 6,
          desc: "Loop check: 6 <= 5 is FALSE. Loop exits. Final output: 1 2 3 4 5",
          vars: { I: 6 },
          visualData: { counter: 6, max: 5, printedOutput: [1, 2, 3, 4, 5], finished: true }
        }
      ]
    }
  },
  {
    id: 12,
    title: "While Loop: Step Increment & Termination",
    category: "Loops & Iteration",
    difficulty: "Medium",
    prompt: "What value of I will be printed AFTER the while loop finishes execution?",
    code: `START
    I = 2
    WHILE I <= 10 DO
        I = I + 2
    ENDWHILE
    PRINT I
END`,
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "12" },
      { id: "C", text: "8" },
      { id: "D", text: "14" }
    ],
    correctAnswer: "B",
    explanation: "Follow the iterations carefully: Iteration 1: I=2 (<=10) -> I becomes 4. Iteration 2: I=4 (<=10) -> I becomes 6. Iteration 3: I=6 (<=10) -> I becomes 8. Iteration 4: I=8 (<=10) -> I becomes 10. Iteration 5: I=10 (<=10 is TRUE!) -> I becomes 10 + 2 = 12. Next check: 12 <= 10 is FALSE, loop terminates. PRINT I prints 12.",
    traceTable: [
      { step: "Init", line: "I = 2", i_before: "2", condition: "2 <= 10 (TRUE)", i_after: "4" },
      { step: "Iter 2", line: "I = I + 2", i_before: "4", condition: "4 <= 10 (TRUE)", i_after: "6" },
      { step: "Iter 3", line: "I = I + 2", i_before: "6", condition: "6 <= 10 (TRUE)", i_after: "8" },
      { step: "Iter 4", line: "I = I + 2", i_before: "8", condition: "8 <= 10 (TRUE)", i_after: "10" },
      { step: "Iter 5", line: "I = I + 2", i_before: "10", condition: "10 <= 10 (TRUE)", i_after: "12" },
      { step: "Exit", line: "PRINT I", i_before: "12", condition: "12 <= 10 (FALSE)", i_after: "Prints 12" }
    ],
    visualizer: {
      type: "while_counter",
      title: "Step-2 Counter Trace",
      initialVars: { I: 2 },
      steps: [
        {
          line: 2,
          desc: "Initialize I = 2",
          vars: { I: 2 },
          visualData: { counter: 2, limit: 10, stepSize: 2 }
        },
        {
          line: 4,
          desc: "I=2 <= 10 (TRUE) → I = 2 + 2 = 4",
          vars: { I: 4 },
          visualData: { counter: 4, limit: 10, stepSize: 2 }
        },
        {
          line: 4,
          desc: "I=4 <= 10 (TRUE) → I = 4 + 2 = 6",
          vars: { I: 6 },
          visualData: { counter: 6, limit: 10, stepSize: 2 }
        },
        {
          line: 4,
          desc: "I=6 <= 10 (TRUE) → I = 6 + 2 = 8",
          vars: { I: 8 },
          visualData: { counter: 8, limit: 10, stepSize: 2 }
        },
        {
          line: 4,
          desc: "I=8 <= 10 (TRUE) → I = 8 + 2 = 10",
          vars: { I: 10 },
          visualData: { counter: 10, limit: 10, stepSize: 2 }
        },
        {
          line: 4,
          desc: "I=10 <= 10 (TRUE!) → I = 10 + 2 = 12",
          vars: { I: 12 },
          visualData: { counter: 12, limit: 10, stepSize: 2 }
        },
        {
          line: 6,
          desc: "Check: 12 <= 10 is FALSE. Loop ends. PRINT I prints 12.",
          vars: { I: 12 },
          visualData: { counter: 12, limit: 10, output: "12", finished: true }
        }
      ]
    }
  },
  {
    id: 13,
    title: "FOR Loop: Summation Accumulator",
    category: "Loops & Iteration",
    difficulty: "Easy",
    prompt: "What is the final value of SUM printed after the FOR loop completes?",
    code: `START
    SUM = 0
    FOR I = 1 TO 5 DO
        SUM = SUM + I
    ENDFOR
    PRINT SUM
END`,
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "15" },
      { id: "C", text: "20" },
      { id: "D", text: "25" }
    ],
    correctAnswer: "B",
    explanation: "The variable SUM accumulates the integers from 1 to 5: SUM = 0 + 1 + 2 + 3 + 4 + 5 = 15. The formula for the sum of first n positive integers is n*(n+1)/2 = 5*6/2 = 15.",
    traceTable: [
      { step: "Init", line: "SUM = 0", i: "-", prev_sum: "-", added: "-", sum: "0" },
      { step: "I = 1", line: "SUM = SUM + I", i: "1", prev_sum: "0", added: "1", sum: "1" },
      { step: "I = 2", line: "SUM = SUM + I", i: "2", prev_sum: "1", added: "2", sum: "3" },
      { step: "I = 3", line: "SUM = SUM + I", i: "3", prev_sum: "3", added: "3", sum: "6" },
      { step: "I = 4", line: "SUM = SUM + I", i: "4", prev_sum: "6", added: "4", sum: "10" },
      { step: "I = 5", line: "SUM = SUM + I", i: "5", prev_sum: "10", added: "5", sum: "15" }
    ],
    visualizer: {
      type: "loop_accumulator",
      title: "Sum Accumulator Visualizer",
      initialVars: { SUM: 0, I: 1 },
      steps: [
        {
          line: 2,
          desc: "Initialize accumulator SUM = 0",
          vars: { SUM: 0, I: "-" },
          visualData: { currentVal: 0, target: 15, items: [] }
        },
        {
          line: 4,
          desc: "Iteration 1 (I=1): SUM = 0 + 1 = 1",
          vars: { SUM: 1, I: 1 },
          visualData: { currentVal: 1, target: 15, items: [1] }
        },
        {
          line: 4,
          desc: "Iteration 2 (I=2): SUM = 1 + 2 = 3",
          vars: { SUM: 3, I: 2 },
          visualData: { currentVal: 3, target: 15, items: [1, 2] }
        },
        {
          line: 4,
          desc: "Iteration 3 (I=3): SUM = 3 + 3 = 6",
          vars: { SUM: 6, I: 3 },
          visualData: { currentVal: 6, target: 15, items: [1, 2, 3] }
        },
        {
          line: 4,
          desc: "Iteration 4 (I=4): SUM = 6 + 4 = 10",
          vars: { SUM: 10, I: 4 },
          visualData: { currentVal: 10, target: 15, items: [1, 2, 3, 4] }
        },
        {
          line: 4,
          desc: "Iteration 5 (I=5): SUM = 10 + 5 = 15",
          vars: { SUM: 15, I: 5 },
          visualData: { currentVal: 15, target: 15, items: [1, 2, 3, 4, 5] }
        },
        {
          line: 6,
          desc: "Loop ends. PRINT SUM outputs 15.",
          vars: { SUM: 15, I: "Done" },
          visualData: { currentVal: 15, target: 15, items: [1, 2, 3, 4, 5], output: "15" }
        }
      ]
    }
  },
  {
    id: 14,
    title: "FOR Loop: Factorial Product Accumulator",
    category: "Loops & Iteration",
    difficulty: "Medium",
    prompt: "What will be printed as the final value of P?",
    code: `START
    P = 1
    FOR I = 1 TO 4 DO
        P = P * I
    ENDFOR
    PRINT P
END`,
    options: [
      { id: "A", text: "10" },
      { id: "B", text: "24" },
      { id: "C", text: "12" },
      { id: "D", text: "120" }
    ],
    correctAnswer: "B",
    explanation: "The variable P is multiplied by each value of I from 1 to 4: P = 1 * 1 = 1, then P = 1 * 2 = 2, then P = 2 * 3 = 6, and finally P = 6 * 4 = 24. This calculates 4! (4 factorial) = 24.",
    traceTable: [
      { step: "Init", line: "P = 1", i: "-", prev_p: "-", multiplier: "-", p: "1" },
      { step: "I = 1", line: "P = P * 1", i: "1", prev_p: "1", multiplier: "1", p: "1" },
      { step: "I = 2", line: "P = P * 2", i: "2", prev_p: "1", multiplier: "2", p: "2" },
      { step: "I = 3", line: "P = P * 3", i: "3", prev_p: "2", multiplier: "3", p: "6" },
      { step: "I = 4", line: "P = P * 4", i: "4", prev_p: "6", multiplier: "4", p: "24" }
    ],
    visualizer: {
      type: "loop_accumulator",
      title: "Factorial Product Multiplier",
      initialVars: { P: 1, I: 1 },
      steps: [
        {
          line: 2,
          desc: "Initialize product P = 1",
          vars: { P: 1, I: "-" },
          visualData: { currentVal: 1, target: 24, items: [] }
        },
        {
          line: 4,
          desc: "I = 1: P = 1 × 1 = 1",
          vars: { P: 1, I: 1 },
          visualData: { currentVal: 1, target: 24, items: ["×1"] }
        },
        {
          line: 4,
          desc: "I = 2: P = 1 × 2 = 2",
          vars: { P: 2, I: 2 },
          visualData: { currentVal: 2, target: 24, items: ["×1", "×2"] }
        },
        {
          line: 4,
          desc: "I = 3: P = 2 × 3 = 6",
          vars: { P: 6, I: 3 },
          visualData: { currentVal: 6, target: 24, items: ["×1", "×2", "×3"] }
        },
        {
          line: 4,
          desc: "I = 4: P = 6 × 4 = 24",
          vars: { P: 24, I: 4 },
          visualData: { currentVal: 24, target: 24, items: ["×1", "×2", "×3", "×4"] }
        },
        {
          line: 6,
          desc: "Loop ends. PRINT P outputs 24.",
          vars: { P: 24, I: "Done" },
          visualData: { currentVal: 24, target: 24, items: ["×1", "×2", "×3", "×4"], output: "24" }
        }
      ]
    }
  },
  {
    id: 15,
    title: "Array 0-Indexed Access",
    category: "Array Operations",
    difficulty: "Easy",
    prompt: "In standard 0-indexed pseudo-code, what is the output of the following?",
    code: `START
    A = [10, 20, 30, 40, 50]
    PRINT A[2]
END`,
    options: [
      { id: "A", text: "20" },
      { id: "B", text: "30" },
      { id: "C", text: "10" },
      { id: "D", text: "40" }
    ],
    correctAnswer: "B",
    explanation: "In 0-indexed arrays, indices correspond to: A[0] = 10, A[1] = 20, A[2] = 30, A[3] = 40, A[4] = 50. Therefore, A[2] accesses the third element, which is 30.",
    traceTable: [
      { index: "0", value: "10", accessed: "No" },
      { index: "1", value: "20", accessed: "No" },
      { index: "2", value: "30", accessed: "YES (A[2] -> 30)" },
      { index: "3", value: "40", accessed: "No" },
      { index: "4", value: "50", accessed: "No" }
    ],
    visualizer: {
      type: "array_index",
      title: "Array Index Lookup",
      initialVars: { "A[2]": 30 },
      steps: [
        {
          line: 2,
          desc: "Initialize Array A with 5 items: [10, 20, 30, 40, 50]",
          array: [10, 20, 30, 40, 50],
          targetIndex: null
        },
        {
          line: 3,
          desc: "Locate index 2: A[0]=10, A[1]=20, A[2]=30. Element 30 is highlighted.",
          array: [10, 20, 30, 40, 50],
          targetIndex: 2
        },
        {
          line: 3,
          desc: "PRINT A[2] returns 30.",
          array: [10, 20, 30, 40, 50],
          targetIndex: 2,
          output: "30"
        }
      ]
    }
  },
  {
    id: 16,
    title: "Array In-Place Updates",
    category: "Array Operations",
    difficulty: "Medium",
    prompt: "What will be the final state of array A after executing the updates?",
    code: `START
    A = [10, 20, 30]
    A[1] = A[1] + 5
    A[2] = A[2] - 10
    PRINT A
END`,
    options: [
      { id: "A", text: "[10, 25, 20]" },
      { id: "B", text: "[15, 20, 20]" },
      { id: "C", text: "[10, 25, 30]" },
      { id: "D", text: "[15, 25, 20]" }
    ],
    correctAnswer: "A",
    explanation: "Initial array is [10, 20, 30]. A[1] is initially 20; after A[1] = 20 + 5, A[1] becomes 25. A[2] is initially 30; after A[2] = 30 - 10, A[2] becomes 20. A[0] remains unchanged at 10. The updated array is [10, 25, 20].",
    traceTable: [
      { step: "Init", line: "A = [10, 20, 30]", a0: "10", a1: "20", a2: "30", result: "[10, 20, 30]" },
      { step: "Update 1", line: "A[1] = A[1] + 5", a0: "10", a1: "25", a2: "30", result: "[10, 25, 30]" },
      { step: "Update 2", line: "A[2] = A[2] - 10", a0: "10", a1: "25", a2: "20", result: "[10, 25, 20]" }
    ],
    visualizer: {
      type: "array_update",
      title: "Array Element Modification",
      initialVars: {},
      steps: [
        {
          line: 2,
          desc: "Array created: [10, 20, 30]",
          array: [10, 20, 30],
          modifiedIndex: null
        },
        {
          line: 3,
          desc: "A[1] = 20 + 5 = 25. Element at index 1 updated to 25.",
          array: [10, 25, 30],
          modifiedIndex: 1
        },
        {
          line: 4,
          desc: "A[2] = 30 - 10 = 20. Element at index 2 updated to 20.",
          array: [10, 25, 20],
          modifiedIndex: 2
        },
        {
          line: 5,
          desc: "PRINT A outputs [10, 25, 20]",
          array: [10, 25, 20],
          modifiedIndex: null,
          output: "[10, 25, 20]"
        }
      ]
    }
  },
  {
    id: 17,
    title: "Array Element Swap",
    category: "Array Operations",
    difficulty: "Medium",
    prompt: "What is the content of array A after executing the SWAP command?",
    code: `START
    A = [1, 2, 3, 4]
    SWAP(A[1], A[2])
    PRINT A
END`,
    options: [
      { id: "A", text: "[2, 1, 3, 4]" },
      { id: "B", text: "[1, 3, 2, 4]" },
      { id: "C", text: "[1, 2, 4, 3]" },
      { id: "D", text: "[4, 3, 2, 1]" }
    ],
    correctAnswer: "B",
    explanation: "In 0-indexed array [1, 2, 3, 4], element at index 1 is 2, and element at index 2 is 3. SWAP(A[1], A[2]) exchanges the values between index 1 and index 2. Index 1 receives 3, and index 2 receives 2. The array becomes [1, 3, 2, 4].",
    traceTable: [
      { step: "Init", line: "A = [1, 2, 3, 4]", idx0: "1", idx1: "2", idx2: "3", idx3: "4", state: "[1, 2, 3, 4]" },
      { step: "Swap", line: "SWAP(A[1], A[2])", idx0: "1", idx1: "3 (was 2)", idx2: "2 (was 3)", idx3: "4", state: "[1, 3, 2, 4]" }
    ],
    visualizer: {
      type: "array_swap",
      title: "Interactive Array Box Swap",
      initialVars: {},
      steps: [
        {
          line: 2,
          desc: "Initial array: [1, 2, 3, 4]",
          array: [1, 2, 3, 4],
          swapIndices: []
        },
        {
          line: 3,
          desc: "Identify elements to swap: Index 1 (value 2) and Index 2 (value 3)",
          array: [1, 2, 3, 4],
          swapIndices: [1, 2],
          animating: true
        },
        {
          line: 3,
          desc: "Swapped! Values exchange positions: Index 1 is now 3, Index 2 is now 2.",
          array: [1, 3, 2, 4],
          swapIndices: [1, 2],
          animating: false
        },
        {
          line: 4,
          desc: "PRINT A displays [1, 3, 2, 4]",
          array: [1, 3, 2, 4],
          swapIndices: [],
          output: "[1, 3, 2, 4]"
        }
      ]
    }
  },
  {
    id: 18,
    title: "While Loop Pairwise Array Swap",
    category: "Array Operations",
    difficulty: "Advanced",
    prompt: "What is the final array A printed after the while loop finishes?",
    code: `START
    A = [8, 15, 16, 23]
    I = 0
    WHILE I < 4 DO
        SWAP(A[I], A[I + 1])
        I = I + 2
    ENDWHILE
    PRINT A
END`,
    options: [
      { id: "A", text: "[15, 8, 23, 16]" },
      { id: "B", text: "[8, 16, 15, 23]" },
      { id: "C", text: "[23, 16, 15, 8]" },
      { id: "D", text: "[15, 8, 16, 23]" }
    ],
    correctAnswer: "A",
    explanation: "Let's trace step by step: 1. Start: A = [8, 15, 16, 23], I = 0. 2. Iteration 1 (I=0): I < 4 is TRUE. SWAP(A[0], A[1]) swaps 8 and 15 -> A becomes [15, 8, 16, 23]. I = 0 + 2 = 2. 3. Iteration 2 (I=2): I < 4 is TRUE. SWAP(A[2], A[3]) swaps 16 and 23 -> A becomes [15, 8, 23, 16]. I = 2 + 2 = 4. 4. Check I < 4: 4 < 4 is FALSE. Loop ends. Final array: [15, 8, 23, 16].",
    traceTable: [
      { iter: "1 (I=0)", check: "0 < 4 (TRUE)", swap: "SWAP(A[0], A[1])", arrayAfter: "[15, 8, 16, 23]", nextI: "2" },
      { iter: "2 (I=2)", check: "2 < 4 (TRUE)", swap: "SWAP(A[2], A[3])", arrayAfter: "[15, 8, 23, 16]", nextI: "4" },
      { iter: "End (I=4)", check: "4 < 4 (FALSE)", swap: "-", arrayAfter: "[15, 8, 23, 16]", nextI: "Exits loop" }
    ],
    visualizer: {
      type: "array_swap",
      title: "Pairwise Iterative Array Swap",
      initialVars: { I: 0 },
      steps: [
        {
          line: 2,
          desc: "Initialize A = [8, 15, 16, 23], I = 0",
          array: [8, 15, 16, 23],
          vars: { I: 0 },
          swapIndices: []
        },
        {
          line: 5,
          desc: "Iteration 1 (I=0): Swap A[0] (8) and A[1] (15)",
          array: [8, 15, 16, 23],
          vars: { I: 0 },
          swapIndices: [0, 1],
          animating: true
        },
        {
          line: 5,
          desc: "First swap complete: [15, 8, 16, 23]. Increment I by 2: I = 2.",
          array: [15, 8, 16, 23],
          vars: { I: 2 },
          swapIndices: [0, 1],
          animating: false
        },
        {
          line: 5,
          desc: "Iteration 2 (I=2): Swap A[2] (16) and A[3] (23)",
          array: [15, 8, 16, 23],
          vars: { I: 2 },
          swapIndices: [2, 3],
          animating: true
        },
        {
          line: 6,
          desc: "Second swap complete: [15, 8, 23, 16]. Increment I by 2: I = 4.",
          array: [15, 8, 23, 16],
          vars: { I: 4 },
          swapIndices: [2, 3],
          animating: false
        },
        {
          line: 8,
          desc: "Check: 4 < 4 is FALSE. Loop ends. PRINT A outputs [15, 8, 23, 16].",
          array: [15, 8, 23, 16],
          vars: { I: 4 },
          swapIndices: [],
          output: "[15, 8, 23, 16]"
        }
      ]
    }
  },
  {
    id: 19,
    title: "Arithmetic Operator Precedence",
    category: "Precedence & Logic",
    difficulty: "Medium",
    prompt: "What will be printed as the values of X and Y?",
    code: `START
    A = 10
    B = 5
    C = 2
    X = A + B * C
    Y = (A + B) * C
    PRINT "X=", X, "Y=", Y
END`,
    options: [
      { id: "A", text: "X= 20 Y= 30" },
      { id: "B", text: "X= 30 Y= 20" },
      { id: "C", text: "X= 20 Y= 25" },
      { id: "D", text: "X= 30 Y= 30" }
    ],
    correctAnswer: "A",
    explanation: "Multiplication (*) has higher precedence than addition (+). For X = A + B * C: B * C is evaluated first (5 * 2 = 10), then A + 10 = 10 + 10 = 20. For Y = (A + B) * C: Parentheses have the highest precedence, so (A + B) is evaluated first (10 + 5 = 15), then 15 * 2 = 30. Hence X = 20, Y = 30.",
    traceTable: [
      { step: "Init", line: "A=10, B=5, C=2", a: "10", b: "5", c: "2", x: "-", y: "-" },
      { step: "X calculation", line: "X = 10 + (5 * 2)", a: "10", b: "5", c: "2", x: "10 + 10 = 20", y: "-" },
      { step: "Y calculation", line: "Y = (10 + 5) * 2", a: "10", b: "5", c: "2", x: "20", y: "15 * 2 = 30" }
    ],
    visualizer: {
      type: "operator_eval",
      title: "Precedence Tree Comparison",
      initialVars: { A: 10, B: 5, C: 2, X: 0, Y: 0 },
      steps: [
        {
          line: 2,
          desc: "Variables: A = 10, B = 5, C = 2",
          vars: { A: 10, B: 5, C: 2, X: "-", Y: "-" },
          visualData: { xExpr: "A + B * C", yExpr: "(A + B) * C" }
        },
        {
          line: 5,
          desc: "Calculate X: Multiplication first → 5 * 2 = 10, then 10 + 10 = 20",
          vars: { A: 10, B: 5, C: 2, X: 20, Y: "-" },
          visualData: { xExpr: "10 + 10 = 20", yExpr: "(A + B) * C" }
        },
        {
          line: 6,
          desc: "Calculate Y: Parentheses first → (10 + 5) = 15, then 15 * 2 = 30",
          vars: { A: 10, B: 5, C: 2, X: 20, Y: 30 },
          visualData: { xExpr: "X = 20", yExpr: "15 * 2 = 30 → Y = 30" }
        },
        {
          line: 7,
          desc: "PRINT outputs: X= 20 Y= 30",
          vars: { A: 10, B: 5, C: 2, X: 20, Y: 30 },
          visualData: { output: "X= 20 Y= 30" }
        }
      ]
    }
  },
  {
    id: 20,
    title: "Bitwise XOR & Compound Logical Conditional",
    category: "Precedence & Logic",
    difficulty: "Advanced",
    prompt: "What will be printed as the output of this combined bitwise and logical conditional pseudo-code?",
    code: `START
    A = 5
    B = 3
    X = A ^ B
    IF (X > 5 AND A < 10) THEN
        PRINT X + A
    ELSE
        PRINT X - A
    ENDIF
END`,
    options: [
      { id: "A", text: "11" },
      { id: "B", text: "1" },
      { id: "C", text: "8" },
      { id: "D", text: "14" }
    ],
    correctAnswer: "A",
    explanation: "1. Calculate bitwise XOR: A = 5 (101₂), B = 3 (011₂). 5 ^ 3 = 110₂ = 6. So X = 6. 2. Evaluate IF condition: (X > 5 AND A < 10) => (6 > 5 AND 5 < 10) => (TRUE AND TRUE) => TRUE. 3. Since the condition is TRUE, the THEN branch executes: PRINT X + A = 6 + 5 = 11.",
    traceTable: [
      { step: "1", line: "A = 5, B = 3", a: "5 (101₂)", b: "3 (011₂)", x: "-", cond: "-", output: "-" },
      { step: "2", line: "X = 5 ^ 3", a: "5", b: "3", x: "6 (110₂)", cond: "-", output: "-" },
      { step: "3", line: "IF (6 > 5 AND 5 < 10)", a: "5", b: "3", x: "6", cond: "TRUE AND TRUE = TRUE", output: "-" },
      { step: "4", line: "PRINT X + A (6 + 5)", a: "5", b: "3", x: "6", cond: "TRUE", output: "11" }
    ],
    visualizer: {
      type: "bitwise_xor",
      title: "XOR Gate and Branching Execution",
      initialVars: { A: 5, B: 3, X: 0 },
      steps: [
        {
          line: 2,
          desc: "A = 5 (binary 101₂), B = 3 (binary 011₂)",
          vars: { A: 5, B: 3, X: "-" },
          visualData: { aBin: "101", bBin: "011", xorBin: "---" }
        },
        {
          line: 4,
          desc: "Bitwise XOR: 101₂ ^ 011₂ = 110₂ = 6. Therefore X = 6.",
          vars: { A: 5, B: 3, X: 6 },
          visualData: { aBin: "101", bBin: "011", xorBin: "110 (6)" }
        },
        {
          line: 5,
          desc: "Check condition: (6 > 5 [TRUE]) AND (5 < 10 [TRUE]) → Entire condition is TRUE!",
          vars: { A: 5, B: 3, X: 6 },
          visualData: { condition: "6 > 5 AND 5 < 10", evalResult: "TRUE", branchTaken: "THEN" }
        },
        {
          line: 6,
          desc: "Execute THEN block: PRINT X + A = 6 + 5 = 11.",
          vars: { A: 5, B: 3, X: 6, OUTPUT: 11 },
          visualData: { expression: "6 + 5 = 11", output: "11" }
        }
      ]
    }
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { QUIZ_QUESTIONS };
}
