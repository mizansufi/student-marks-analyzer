// Student Marks Analyzer - JavaScript Assignment

// Task 1: Store student details using suitable variables and data types.
const student = {
  name: "",
  rollNo: "",
  department: ""
};

// Task 3: Calculate total marks using a function.
function calculateTotal(marks) {
  return marks.reduce((total, mark) => total + mark, 0);
}

// Task 4: Calculate percentage. Each of the five subjects is out of 100.
function calculatePercentage(marks) {
  const total = calculateTotal(marks);
  return (total / (marks.length * 100)) * 100;
}

// Task 5: Find the highest mark.
function findHighest(marks) {
  return Math.max(...marks);
}

// Task 6: Find the lowest mark.
function findLowest(marks) {
  return Math.min(...marks);
}

// Bonus: Return a performance category based on percentage.
function getPerformance(percentage) {
  if (percentage >= 80) return "Excellent";
  if (percentage >= 60) return "Good";
  if (percentage >= 40) return "Average";
  return "Needs Improvement";
}

document.getElementById("analyzeBtn").addEventListener("click", function () {
  const error = document.getElementById("error");
  error.textContent = "";

  // Read student details from the form.
  student.name = document.getElementById("studentName").value.trim();
  student.rollNo = document.getElementById("rollNo").value.trim();
  student.department = document.getElementById("department").value.trim();

  // Task 2: Store the five subject marks in an array.
  const markInputs = document.querySelectorAll(".mark");
  const marks = Array.from(markInputs).map(input => input.value === "" ? NaN : Number(input.value));

  if (!student.name || !student.rollNo || !student.department) {
    error.textContent = "Please enter the student's name, roll number and department.";
    return;
  }

  if (marks.some(mark => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
    error.textContent = "Please enter a valid mark from 0 to 100 for all five subjects.";
    return;
  }

  const total = calculateTotal(marks);
  const percentage = calculatePercentage(marks);

  // Task 7: Count subjects with marks greater than or equal to 40.
  const subjectsPassed = marks.filter(mark => mark >= 40).length;

  // Task 8: Convert the name to uppercase and count its characters.
  const upperName = student.name.toUpperCase();
  const nameLength = student.name.length;

  // Task 9: Display the final performance report.
  document.getElementById("studentSummary").textContent =
    `${upperName}  |  Roll No: ${student.rollNo}  |  ${student.department}  |  Name characters: ${nameLength}`;
  document.getElementById("total").textContent = `${total}/500`;
  document.getElementById("percentage").textContent = `${percentage.toFixed(2)}%`;
  document.getElementById("highest").textContent = findHighest(marks);
  document.getElementById("lowest").textContent = findLowest(marks);
  document.getElementById("passed").textContent = `${subjectsPassed}/5`;

  const grade = getPerformance(percentage);
  const badge = document.getElementById("gradeBadge");
  badge.textContent = grade;
  badge.style.background = grade === "Needs Improvement" ? "#fff0f0" : grade === "Excellent" ? "#e8f7ef" : "#eef2ff";
  badge.style.color = grade === "Needs Improvement" ? "#b42332" : grade === "Excellent" ? "#16804a" : "#4169e1";

  const report = document.getElementById("report");
  report.hidden = false;
  report.scrollIntoView({ behavior: "smooth", block: "start" });
});
