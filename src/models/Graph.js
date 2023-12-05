class Graph {
  constructor() {
    this.graph = new Map();
  }

  addVertex(vertex) {
    this.graph.set(vertex, { neighbors: [], visited: false });
  }

  addEdge(vertex, prerequisites) {
    if (!this.graph.has(vertex)) {
      console.error("Nonexistent discipline!");
      return;
    }
    prerequisites.forEach((prerequisite) => {
      if (this.graph.has(prerequisite)) {
        this.graph.get(vertex).neighbors.push(prerequisite);
      } else {
        console.error(
          `Prerequisite '${prerequisite}' for '${vertex}' does not exist!`
        );
      }
    });
  }

  dfs(vertex, order) {
    this.graph.get(vertex).visited = true;
    this.graph.get(vertex).neighbors.forEach((neighbor) => {
      if (!this.graph.get(neighbor).visited) {
        this.dfs(neighbor, order);
      }
    });
    order.push(vertex);
  }

  topologicalSort() {
    const order = [];
    this.graph.forEach((value, vertex) => {
      if (!value.visited) {
        this.dfs(vertex, order);
      }
    });
    return order.reverse(); // Reverse to get topological order
  }

  canTakeCourse(coursesTaken, course) {
    const prerequisites = this.graph.get(course).neighbors;
    return prerequisites.every((prerequisite) =>
      coursesTaken.includes(prerequisite)
    );
  }

  planSemester(coursesTaken, maxCourses) {
    const availableCourses = [];

    const topologicalOrder = this.topologicalSort();

    for (const course of topologicalOrder) {
      if (
        !coursesTaken.includes(course) &&
        this.canTakeCourse(coursesTaken, course)
      ) {
        availableCourses.push(course);
        if (availableCourses.length === maxCourses) {
          break;
        }
      }
    }

    return availableCourses;
  }

  planSequences(coursesTaken, maxCoursesPerSemester) {
    const sequences = [];
    let remainingCourses = [...this.graph.keys()];

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
}

export default Graph;