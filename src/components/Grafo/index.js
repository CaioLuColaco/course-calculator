import { useState } from "react";
import Graph from "../../models/Graph.js";
import curriculumData from "../../services/courseCurriculum.json"
import styles from "./grafos.module.css"
import CytoscapeComponent from "react-cytoscapejs";
import ResponseGraph from "../ResponseGraph/index.js";

export default function Grafo({quantity}) {

    const [selectedNodes, setSelectedNodes] = useState([]);
    const [responseView, setResponseView] = useState(false);
    const [courses, setCourses] = useState(false);

    const nodes = Object.keys(curriculumData.disciplines).map((id, index) => ({
        data: { id, label: curriculumData.disciplines[id].label },
        position: {
            x: (index % 6) * 300,
            y: curriculumData.disciplines[id].semester * 100,
        },
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
        // console.log(">>>>>>", curriculum.planEnrollment(selectedIds, 5));
        setSelectedNodes(selectedIds);
    };

    const handleCalculate = () => {
        console.log(quantity)
        const grade = curriculum.planEnrollment(selectedNodes, quantity)
        console.log(">>>>>>", grade);
        setCourses(grade)
        setResponseView(true)
    }

    const cytoscapeStylesheet = [
        {
          selector: "node",
          style: {
            width: "label",
            height: "label",
            padding: "6px",
            shape: "round-rectangle",
            }
        },
        {
            selector: "node[label]",
            style: {
                label: "data(label)",
                "font-size": "12",
                color: "white",
                "text-halign": "center",
                "text-valign": "center"
            }
        },
        {
            selector: "edge",
            style: {
                width: 3,
                "line-color": "#bddedf",
                // "line-color": "#AAD8FF",
                // "target-arrow-color": "#6774cb",
                "target-arrow-shape": "triangle",
                "curve-style": "bezier"
            }
        }
    ]

    return (
        <div className={styles.grafoContainer}>
            { !responseView && (
                <div>
                    <p>Segure Shift para múltipla seleção</p>
                    <CytoscapeComponent
                        elements={newElements}
                        cy={(cy) => {
                            cy.on("select", handleNodeSelection);
                        }}
                        stylesheet={cytoscapeStylesheet}
                        pan={{ x: 250, y: 0 }}
                    />
                    <div className={styles.buttonCalculator}>
                        <button onClick={handleCalculate}>Calcular</button>
                    </div>
                </div>
            )
            }
            {responseView && <ResponseGraph semestres={courses}/>}
        </div>
    )
}