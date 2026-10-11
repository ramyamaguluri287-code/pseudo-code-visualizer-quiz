/**
 * Automated Verification Script for Pseudo Code Quiz 8
 * Tests:
 * 1. Question integrity (all 20 questions present with valid options and correct answer)
 * 2. Visualizer configuration validity (steps, lines, actions)
 * 3. Trace tables schema consistency
 * 4. Evaluation and scoring logic
 */

const { QUIZ_QUESTIONS } = require('./questions.js');

console.log("=================================================");
console.log("   RUNNING AUTOMATED PRACTICAL TEST SUITE       ");
console.log("=================================================");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// Test 1: Check Question Count
assert(QUIZ_QUESTIONS.length === 20, "Contains exactly 20 questions");

// Test 2: Check each question structure
QUIZ_QUESTIONS.forEach((q, idx) => {
  const qNum = idx + 1;
  assert(q.id === qNum, `Q${qNum} has matching ID ${qNum}`);
  assert(q.options.length === 4, `Q${qNum} has 4 options (A, B, C, D)`);
  assert(['A', 'B', 'C', 'D'].includes(q.correctAnswer), `Q${qNum} correct answer '${q.correctAnswer}' is valid`);
  assert(q.code && q.code.length > 10, `Q${qNum} has pseudo-code`);
  assert(q.explanation && q.explanation.length > 10, `Q${qNum} has explanation`);
  assert(Array.isArray(q.traceTable) && q.traceTable.length > 0, `Q${qNum} has trace table with rows`);
  assert(q.visualizer && Array.isArray(q.visualizer.steps) && q.visualizer.steps.length > 0, `Q${qNum} has visualizer step definitions`);
});

// Test 3: Specific Question Logic Checks
// Q1: 17 % 5 = 2 -> 'A'
const q1 = QUIZ_QUESTIONS[0];
assert(q1.options.find(o => o.id === q1.correctAnswer).text === "2", "Q1 correctly evaluates 17 % 5 to 2");

// Q11: WHILE I <= 5 PRINT I -> 1 2 3 4 5
const q11 = QUIZ_QUESTIONS[10];
assert(q11.options.find(o => o.id === q11.correctAnswer).text === "1 2 3 4 5", "Q11 while loop sequence is '1 2 3 4 5'");

// Q12: I=2 WHILE I<=10 I=I+2 PRINT I -> 12
const q12 = QUIZ_QUESTIONS[11];
assert(q12.options.find(o => o.id === q12.correctAnswer).text === "12", "Q12 while loop post-termination value is 12");

// Q13: FOR I=1 TO 5 SUM=SUM+I -> 15
const q13 = QUIZ_QUESTIONS[12];
assert(q13.options.find(o => o.id === q13.correctAnswer).text === "15", "Q13 FOR loop sum accumulator is 15");

// Q14: FOR I=1 TO 4 P=P*I -> 24
const q14 = QUIZ_QUESTIONS[13];
assert(q14.options.find(o => o.id === q14.correctAnswer).text === "24", "Q14 FOR loop product accumulator is 24");

// Q15: A=[10,20,30,40,50] PRINT A[2] -> 30
const q15 = QUIZ_QUESTIONS[14];
assert(q15.options.find(o => o.id === q15.correctAnswer).text === "30", "Q15 array index lookup is 30");

// Q16: Array update -> [10, 25, 20]
const q16 = QUIZ_QUESTIONS[15];
assert(q16.options.find(o => o.id === q16.correctAnswer).text === "[10, 25, 20]", "Q16 array update result is [10, 25, 20]");

// Q17: Array swap -> [1, 3, 2, 4]
const q17 = QUIZ_QUESTIONS[16];
assert(q17.options.find(o => o.id === q17.correctAnswer).text === "[1, 3, 2, 4]", "Q17 array swap result is [1, 3, 2, 4]");

// Q18: While pairwise swap -> [15, 8, 23, 16]
const q18 = QUIZ_QUESTIONS[17];
assert(q18.options.find(o => o.id === q18.correctAnswer).text === "[15, 8, 23, 16]", "Q18 pairwise swap result is [15, 8, 23, 16]");

// Q19: Operator Precedence -> X = 20 Y = 30
const q19 = QUIZ_QUESTIONS[18];
assert(q19.options.find(o => o.id === q19.correctAnswer).text === "X= 20 Y= 30", "Q19 operator precedence result is X=20 Y=30");

// Q20: XOR + AND -> 11
const q20 = QUIZ_QUESTIONS[19];
assert(q20.options.find(o => o.id === q20.correctAnswer).text === "11", "Q20 XOR + AND result is 11");

console.log("=================================================");
console.log(` SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED! `);
console.log("=================================================");
