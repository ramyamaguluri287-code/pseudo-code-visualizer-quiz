#!/usr/bin/env python3
"""
Pseudo Code Quiz 8 - Python Console App Companion
Interactive CLI for evaluating Pseudo Code questions with step-by-step trace tables.
"""

import sys
import time

QUESTIONS = [
    {
        "id": 10,
        "title": "Variable Swap Without Temporary Variable",
        "code": """START
    A = 15
    B = 9
    A = A + B
    B = A - B
    A = A - B
    PRINT "A=", A, "B=", B
END""",
        "options": {
            "A": "A= 9 B= 15",
            "B": "A= 15 B= 9",
            "C": "A= 24 B= 6",
            "D": "A= 0 B= 24"
        },
        "correct": "A",
        "explanation": "A=15+9=24; B=24-9=15 (original A); A=24-15=9 (original B). Swap without temp variable.",
        "trace": [
            ("Step 1 (Init)", "A=15, B=9"),
            ("Step 2 (A = A + B)", "A=24, B=9"),
            ("Step 3 (B = A - B)", "A=24, B=15"),
            ("Step 4 (A = A - B)", "A=9, B=15")
        ]
    },
    {
        "id": 11,
        "title": "While Loop: Sequence Printing",
        "code": """START
    I = 1
    WHILE I <= 5 DO
        PRINT I
        I = I + 1
    ENDWHILE
END""",
        "options": {
            "A": "1 2 3 4 5",
            "B": "1 2 3 4",
            "C": "0 1 2 3 4 5",
            "D": "1 2 3 4 5 6"
        },
        "correct": "A",
        "explanation": "I prints 1, 2, 3, 4, 5. When I becomes 6, 6 <= 5 is False, terminating the loop.",
        "trace": [
            ("Iter 1", "I=1, Condition: 1<=5 (True), Prints 1, Next I=2"),
            ("Iter 2", "I=2, Condition: 2<=5 (True), Prints 2, Next I=3"),
            ("Iter 3", "I=3, Condition: 3<=5 (True), Prints 3, Next I=4"),
            ("Iter 4", "I=4, Condition: 4<=5 (True), Prints 4, Next I=5"),
            ("Iter 5", "I=5, Condition: 5<=5 (True), Prints 5, Next I=6"),
            ("Exit", "I=6, Condition: 6<=5 (False), Loop Terminates")
        ]
    },
    {
        "id": 12,
        "title": "While Loop: Step Increment & Termination Value",
        "code": """START
    I = 2
    WHILE I <= 10 DO
        I = I + 2
    ENDWHILE
    PRINT I
END""",
        "options": {
            "A": "10",
            "B": "12",
            "C": "8",
            "D": "14"
        },
        "correct": "B",
        "explanation": "I increments by 2: 2 -> 4 -> 6 -> 8 -> 10 -> 12. At 12 <= 10 (False), loop exits and prints 12.",
        "trace": [
            ("Iter 1", "I=2, Condition 2<=10 (True), I becomes 4"),
            ("Iter 2", "I=4, Condition 4<=10 (True), I becomes 6"),
            ("Iter 3", "I=6, Condition 6<=10 (True), I becomes 8"),
            ("Iter 4", "I=8, Condition 8<=10 (True), I becomes 10"),
            ("Iter 5", "I=10, Condition 10<=10 (True), I becomes 12"),
            ("Exit", "I=12, Condition 12<=10 (False) -> Prints 12")
        ]
    },
    {
        "id": 13,
        "title": "FOR Loop: Summation Accumulator",
        "code": """START
    SUM = 0
    FOR I = 1 TO 5 DO
        SUM = SUM + I
    ENDFOR
    PRINT SUM
END""",
        "options": {
            "A": "10",
            "B": "15",
            "C": "20",
            "D": "25"
        },
        "correct": "B",
        "explanation": "SUM = 0 + 1 + 2 + 3 + 4 + 5 = 15.",
        "trace": [
            ("I = 1", "SUM = 0 + 1 = 1"),
            ("I = 2", "SUM = 1 + 2 = 3"),
            ("I = 3", "SUM = 3 + 3 = 6"),
            ("I = 4", "SUM = 6 + 4 = 10"),
            ("I = 5", "SUM = 10 + 5 = 15")
        ]
    },
    {
        "id": 14,
        "title": "FOR Loop: Factorial Product Accumulator",
        "code": """START
    P = 1
    FOR I = 1 TO 4 DO
        P = P * I
    ENDFOR
    PRINT P
END""",
        "options": {
            "A": "10",
            "B": "24",
            "C": "12",
            "D": "120"
        },
        "correct": "B",
        "explanation": "P = 1 * 1 * 2 * 3 * 4 = 24 (4 factorial).",
        "trace": [
            ("I = 1", "P = 1 * 1 = 1"),
            ("I = 2", "P = 1 * 2 = 2"),
            ("I = 3", "P = 2 * 3 = 6"),
            ("I = 4", "P = 6 * 4 = 24")
        ]
    },
    {
        "id": 15,
        "title": "Array 0-Indexed Access",
        "code": """START
    A = [10, 20, 30, 40, 50]
    PRINT A[2]
END""",
        "options": {
            "A": "20",
            "B": "30",
            "C": "10",
            "D": "40"
        },
        "correct": "B",
        "explanation": "A[0]=10, A[1]=20, A[2]=30. Element at index 2 is 30.",
        "trace": [
            ("Index 0", "A[0] = 10"),
            ("Index 1", "A[1] = 20"),
            ("Index 2", "A[2] = 30  <-- Accessed Element"),
            ("Index 3", "A[3] = 40"),
            ("Index 4", "A[4] = 50")
        ]
    },
    {
        "id": 16,
        "title": "Array In-Place Updates",
        "code": """START
    A = [10, 20, 30]
    A[1] = A[1] + 5
    A[2] = A[2] - 10
    PRINT A
END""",
        "options": {
            "A": "[10, 25, 20]",
            "B": "[15, 20, 20]",
            "C": "[10, 25, 30]",
            "D": "[15, 25, 20]"
        },
        "correct": "A",
        "explanation": "A[1] = 20 + 5 = 25; A[2] = 30 - 10 = 20. Updated array: [10, 25, 20].",
        "trace": [
            ("Initial Array", "[10, 20, 30]"),
            ("Update A[1]", "20 + 5 = 25 -> [10, 25, 30]"),
            ("Update A[2]", "30 - 10 = 20 -> [10, 25, 20]")
        ]
    },
    {
        "id": 17,
        "title": "Array Element Swap",
        "code": """START
    A = [1, 2, 3, 4]
    SWAP(A[1], A[2])
    PRINT A
END""",
        "options": {
            "A": "[2, 1, 3, 4]",
            "B": "[1, 3, 2, 4]",
            "C": "[1, 2, 4, 3]",
            "D": "[4, 3, 2, 1]"
        },
        "correct": "B",
        "explanation": "A[1] is 2 and A[2] is 3. Swapping gives [1, 3, 2, 4].",
        "trace": [
            ("Initial", "[1, 2, 3, 4]"),
            ("SWAP(A[1], A[2])", "Index 1 (2) and Index 2 (3) swap positions"),
            ("Result", "[1, 3, 2, 4]")
        ]
    },
    {
        "id": 18,
        "title": "While Loop Pairwise Array Swap",
        "code": """START
    A = [8, 15, 16, 23]
    I = 0
    WHILE I < 4 DO
        SWAP(A[I], A[I + 1])
        I = I + 2
    ENDWHILE
    PRINT A
END""",
        "options": {
            "A": "[15, 8, 23, 16]",
            "B": "[8, 16, 15, 23]",
            "C": "[23, 16, 15, 8]",
            "D": "[15, 8, 16, 23]"
        },
        "correct": "A",
        "explanation": "I=0: Swap A[0] and A[1] -> [15, 8, 16, 23]. I=2: Swap A[2] and A[3] -> [15, 8, 23, 16].",
        "trace": [
            ("I = 0", "Swap A[0] (8) and A[1] (15) -> [15, 8, 16, 23], I becomes 2"),
            ("I = 2", "Swap A[2] (16) and A[3] (23) -> [15, 8, 23, 16], I becomes 4"),
            ("I = 4", "Condition 4 < 4 is False. Loop terminates.")
        ]
    },
    {
        "id": 19,
        "title": "Arithmetic Operator Precedence",
        "code": """START
    A = 10
    B = 5
    C = 2
    X = A + B * C
    Y = (A + B) * C
    PRINT "X=", X, "Y=", Y
END""",
        "options": {
            "A": "X= 20 Y= 30",
            "B": "X= 30 Y= 20",
            "C": "X= 20 Y= 25",
            "D": "X= 30 Y= 30"
        },
        "correct": "A",
        "explanation": "X = 10 + (5 * 2) = 20 (multiplication first). Y = (10 + 5) * 2 = 15 * 2 = 30 (parentheses first).",
        "trace": [
            ("Calculate X", "X = 10 + (5 * 2) = 10 + 10 = 20"),
            ("Calculate Y", "Y = (10 + 5) * 2 = 15 * 2 = 30")
        ]
    },
    {
        "id": 20,
        "title": "Bitwise XOR & Compound Logical Conditional",
        "code": """START
    A = 5
    B = 3
    X = A ^ B
    IF (X > 5 AND A < 10) THEN
        PRINT X + A
    ELSE
        PRINT X - A
    ENDIF
END""",
        "options": {
            "A": "11",
            "B": "1",
            "C": "8",
            "D": "14"
        },
        "correct": "A",
        "explanation": "X = 5 ^ 3 = 101_2 ^ 011_2 = 110_2 = 6. Condition (6 > 5 AND 5 < 10) is True. Executes THEN: 6 + 5 = 11.",
        "trace": [
            ("Bitwise XOR", "5 ^ 3 = 6"),
            ("Evaluate IF", "(6 > 5 is True) AND (5 < 10 is True) -> True"),
            ("Branch Execution", "THEN branch executes: X + A = 6 + 5 = 11")
        ]
    }
]

def clear_screen():
    print("\033[2J\033[H", end="")

def run_quiz():
    clear_screen()
    print("=" * 65)
    print("      PSEUDO CODE QUIZ 8 - CONSOLE ASSESSMENT SYSTEM")
    print("=" * 65)
    print(f"Total Questions: {len(QUESTIONS)} (Q10 to Q20)")
    print("Passing Score: 70%")
    print("Press Enter to begin...")
    input()

    score = 0
    total = len(QUESTIONS)
    results = []

    for idx, q in enumerate(QUESTIONS):
        clear_screen()
        print("=" * 65)
        print(f" QUESTION {idx + 1} of {total}  [ID: Q{q['id']}] - {q['title']}")
        print("=" * 65)
        print("\nPSEUDO CODE:")
        print("-" * 35)
        for line in q["code"].split("\n"):
            print(f"  {line}")
        print("-" * 35)

        print("\nOPTIONS:")
        for opt_key, opt_val in q["options"].items():
            print(f"  [{opt_key}] {opt_val}")

        user_choice = ""
        while user_choice not in ["A", "B", "C", "D"]:
            try:
                user_choice = input("\nYour Answer (A/B/C/D): ").strip().upper()
            except (KeyboardInterrupt, EOFError):
                print("\nExiting quiz...")
                sys.exit(0)

        is_correct = (user_choice == q["correct"])
        if is_correct:
            score += 1
            print("\n>>> \033[92m[CORRECT!]\033[0m")
        else:
            print(f"\n>>> \033[91m[INCORRECT]\033[0m Correct answer was: [{q['correct']}] {q['options'][q['correct']]}")

        print(f"\nEXPLANATION:\n{q['explanation']}")
        print("\nSTEP TRACE TABLE:")
        for step_label, step_info in q["trace"]:
            print(f"  • {step_label:<18} : {step_info}")

        results.append((q, user_choice, is_correct))
        print("\nPress Enter for next question...")
        input()

    # Final Summary Screen
    clear_screen()
    percent = round((score / total) * 100)
    passed = percent >= 70

    print("=" * 65)
    print("                     FINAL RESULTS")
    print("=" * 65)
    print(f"  Final Score  : {score} / {total}")
    print(f"  Percentage   : {percent}%")
    if passed:
        print("  Status       : \033[92mPASSED (Excellent!)\033[0m")
    else:
        print("  Status       : \033[91mNEEDS REVIEW\033[0m")
    print("=" * 65)

    print("\nQUESTION BREAKDOWN:")
    for q, ans, ok in results:
        status_sym = "\033[92m✓\033[0m" if ok else "\033[91m✗\033[0m"
        print(f"  {status_sym} Q{q['id']:<2}: Your Answer [{ans}] | Correct [{q['correct']}] - {q['title']}")

    print("\nThank you for completing Pseudo Code Quiz 8!")

if __name__ == "__main__":
    run_quiz()
