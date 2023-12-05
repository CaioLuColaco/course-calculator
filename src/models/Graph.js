class Graph {
  constructor() {
    this.graph = new Map();
  }

  addVertex(vertex) {
    this.graph.set(vertex, []);
  }

  addEdge(vertex, prerequisites) {
    if (!this.graph.has(vertex)) {
      console.error("Nonexistent discipline!");
      return;
    }
    prerequisites.forEach((prerequisite) => {
      if (this.graph.has(prerequisite)) {
        this.graph.get(vertex).push(prerequisite);
      } else {
        console.error(
          `Prerequisite '${prerequisite}' for '${vertex}' does not exist!`
        );
      }
    });
  }

  canTakeCourse(coursesTaken, course) {
    const prerequisites = this.graph.get(course);
    if (!prerequisites) {
      // Discipline does not exist in the graph (could be a discipline without prerequisites)
      return true;
    }

    return prerequisites.every((prerequisite) =>
      coursesTaken.includes(prerequisite)
    );
  }

  dfs(vertex, visited, stack) {
    visited[vertex] = true;

    const neighbors = this.graph.get(vertex);
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        this.dfs(neighbor, visited, stack);
      }
    }

    stack.push(vertex);
  }

  topologicalSort() {
    const visited = {};
    const stack = [];

    for (const vertex of this.graph.keys()) {
      if (!visited[vertex]) {
        this.dfs(vertex, visited, stack);
      }
    }

    return stack.reverse();
  }

  planSemester(coursesTaken, maxCourses) {
    const availableCourses = [];

    for (const [course, prerequisites] of this.graph.entries()) {
      if (
        !coursesTaken.includes(course) &&
        this.canTakeCourse(coursesTaken, course)
      ) {
        const canTake = prerequisites.every((prerequisite) =>
          coursesTaken.includes(prerequisite)
        );
        if (canTake) {
          availableCourses.push(course);
          if (availableCourses.length === maxCourses) {
            break;
          }
        }
      }
    }

    return availableCourses;
  }

  planSequences(coursesTaken, maxCoursesPerSemester) {
    const sequences = [];
    let remainingCourses = this.topologicalSort();

    while (remainingCourses.length > 0) {
      const semesterPlan = this.planSemester(
        coursesTaken,
        maxCoursesPerSemester
      );
      if (semesterPlan.length === 0) {
        // Unable to plan more semesters
        break;
      }
      sequences.push(semesterPlan);
      coursesTaken.push(...semesterPlan);
      remainingCourses = remainingCourses.filter(
        (course) => !coursesTaken.includes(course)
      );
    }

    return sequences;
  }

  planEnrollment(coursesTaken, maxCoursesPerSemester) {
    const sequences = this.planSequences(coursesTaken, maxCoursesPerSemester);
    return sequences;
  }
}

export default Graph;
