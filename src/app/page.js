"use client";
import styles from "./page.module.css";
import { useState } from "react";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import CytoscapeComponent from "react-cytoscapejs";
import Graph from "../models/Graph";

export default function Home() {
  const [course, setCourse] = useState("ComputerScience");
  const [quantity, setQuantity] = useState("5");
  const [selectedNodes, setSelectedNodes] = useState([]);

  const curriculumData = require("../services/courseCurriculum.json");

  const nodes = Object.keys(curriculumData.disciplines).map((id, index) => ({
    data: { id, label: curriculumData.disciplines[id].label },
    position: {
      x: 150 + (index % 6) * 225,
      y: 40 + curriculumData.disciplines[id].semester * 100,
    },
    style: { fontSize: "14rem" },
  }));

  // Criar array de edges
  const edges = [];
  Object.keys(curriculumData.dependencies).forEach((source, sourceIndex) => {
    curriculumData.dependencies[source].forEach((target) => {
      const edge = {
        data: {
          source:
            nodes[nodes.findIndex((node) => node.data.id === source)].data.id,
          target:
            nodes[nodes.findIndex((node) => node.data.id === target)].data.id,
          label: `Edge from ${source} to ${target}`,
        },
      };
      edges.push(edge);
    });
  });

  const newElements = [...nodes, ...edges];
  const curriculum = new Graph();

  // Create nodes
  for (const course in curriculumData.disciplines) {
    curriculum.addVertex(course);
  }
  // Create edges
  for (const course in curriculumData.dependencies) {
    const dependencies = curriculumData.dependencies[course];
    if (dependencies?.length) {
      curriculum.addEdge(course, dependencies);
    }
  }

  const handleNodeSelection = (event) => {
    // Obtém os nós selecionados no evento
    const selected = event.cy.$(":selected");

    // Obtém os IDs dos nós selecionados
    const selectedIds = selected.map((node) => node.id());
    // console.log(selected.map((node) => node.id()));
    // Atualiza o estado dos nós selecionados
    console.log(">>>>>>", curriculum.planEnrollment(selectedIds, 5));
    setSelectedNodes(selectedIds);
  };

  return (
    <main className={styles.main}>
      <Menu
        course={course}
        setCourse={setCourse}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <p>Segure Shift para múltipla seleção</p>
      <CytoscapeComponent
        elements={newElements}
        cy={(cy) => {
          cy.on("select", handleNodeSelection);
        }}
        // stylesheet={[
        //   // {
        //   //   selector: "node",
        //   //   style: {
        //   //     color: 'black'
        //   //   },
        //   // },
        //   // {
        //   //   selector: "edge",
        //   //   style: {
        //   //     width: 15,
        //   //   },
        //   // },
        // ]}
      />
      <Footer />
    </main>
  );
}
