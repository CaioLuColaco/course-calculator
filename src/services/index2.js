import Graph from "../models/Graph";
// Example usage
const curriculum = new Graph();

// Add vertices and edges (similar to the previous code)
const courseCurriculum = require("./courseCurriculum.json");
//create nodes
for (const course in courseCurriculum.disciplines) {
  curriculum.addVertex(course);
}
//create edges
for (const course in courseCurriculum.dependencies) {
  const dependencies = courseCurriculum.dependencies[course];
  if (dependencies?.length) {
    curriculum.addEdge(course, dependencies);
  }
}

// Function to plan enrollment
function planEnrollment(coursesTaken, maxCoursesPerSemester) {
  const sequences = curriculum.planSequences(
    coursesTaken,
    maxCoursesPerSemester
  );
  return sequences;
}

// Example call to the main function
// const coursesTaken = ["Physics 2", "Environmental Geotechnics"];
const coursesTaken = [];
const maxCoursesPerSemester = 5;

const enrollmentPlan = planEnrollment(coursesTaken, maxCoursesPerSemester);

console.log("Enrollment Plan:", enrollmentPlan);
