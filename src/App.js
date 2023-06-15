/** @format */

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faToggleOn,
  faToggleOff,
  faInfoCircle,
  // faSave,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";

const App = () => {
  const [sections, setSections] = useState([
    // ...section data...
    {
      id: 1,
      name: "Profile Summary",
      description: "This section provides a summary of your profile.",
      visible: true,
      showDescription: false,
    },
    {
      id: 2,
      name: "Academic and Cocurricular Achievements",
      description:
        "This section showcases your academic and cocurricular experiences.",
      visible: true,
      showDescription: false,
    },
    {
      id: 3,
      name: "Summer Internship Experience",
      description: "This section highlights your summer internship experience.",
      visible: true,
      showDescription: false,
    },
    {
      id: 4,
      name: "Work Experience",
      description: "This section displays your work experience.",
      visible: true,
      showDescription: false,
    },
    {
      id: 5,
      name: "Projects",
      description: "This section features your projects.",
      visible: true,
      showDescription: false,
    },
    {
      id: 6,
      name: "Certifications",
      description: "This section lists your certifications.",
      visible: true,
      showDescription: false,
    },
    {
      id: 7,
      name: "Leadership Positions",
      description: "This section showcases your leadership positions.",
      visible: true,
      showDescription: false,
    },
    {
      id: 8,
      name: "Extracurricular",
      description: "This section highlights your extracurricular activities.",
      visible: true,
      showDescription: false,
    },
    {
      id: 9,
      name: "Education",
      description: "This section provides information about your education.",
      visible: true,
      showDescription: false,
    },
  ]);
  const [draggedSection, setDraggedSection] = useState(null);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [editSectionId, setEditSectionId] = useState(null);

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event, section) => {
    setDraggedSection(section);
  };

  const drop = (event, targetSection) => {
    event.preventDefault();
    if (draggedSection !== null) {
      const updatedSections = [...sections];
      const draggedSectionIndex = updatedSections.findIndex(
        (section) => section.id === draggedSection.id
      );
      updatedSections.splice(draggedSectionIndex, 1);
      const targetSectionIndex = updatedSections.findIndex(
        (section) => section.id === targetSection.id
      );
      updatedSections.splice(targetSectionIndex + 1, 0, draggedSection);
      setSections(updatedSections);
      setDraggedSection(null);
      setSaveButtonEnabled(true);
    }
  };

  const toggleSection = (section) => {
    const updatedSections = [...sections];
    const targetSection = updatedSections.find((s) => s.id === section.id);
    targetSection.visible = !targetSection.visible;
    setSections(updatedSections);
    setSaveButtonEnabled(true);
  };

  const editSection = (section) => {
    setEditSectionId(section.id);
  };

  const saveSection = (section) => {
    const updatedSections = [...sections];
    const targetSection = updatedSections.find((s) => s.id === section.id);
    const sectionName = prompt(
      "Enter the new name for the section:",
      targetSection.name
    );
    if (sectionName !== null) {
      targetSection.name = sectionName;
      setSections(updatedSections);
      setSaveButtonEnabled(true);
      setEditSectionId(null);
    }
  };

  const showDescription = (section) => {
    const updatedSections = [...sections];
    const targetSection = updatedSections.find((s) => s.id === section.id);
    targetSection.showDescription = !targetSection.showDescription;
    setSections(updatedSections);
  };

  const saveChanges = () => {
    // Save functionality goes here
    setSaveButtonEnabled(false);
  };

  return (
    <div className="App">
      <h1 className="header">Select your Sections</h1>
      <div className="sections-container">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`section ${section.visible ? "" : "hidden"}`}
            onDrop={(event) => drop(event, section)}
            onDragOver={allowDrop}
          >
            <span
              className="drag-button"
              draggable="true"
              onDragStart={(event) => drag(event, section)}
            >
              ☰
            </span>
            {editSectionId === section.id ? (
              <>
                <input
                  type="text"
                  className="section-name-edit"
                  value={section.name}
                  onChange={(event) => {
                    const updatedSections = [...sections];
                    const targetSection = updatedSections.find(
                      (s) => s.id === section.id
                    );
                    targetSection.name = event.target.value;
                    setSections(updatedSections);
                    setSaveButtonEnabled(true);
                  }}
                />
                <button
                  className="save-button"
                  onClick={() => saveSection(section)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="section-name">{section.name}</span>
                <button
                  className="edit-button"
                  onClick={() => editSection(section)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </>
            )}

            <button
              className={`toggle-button ${section.visible ? "active" : ""}`}
              onClick={() => toggleSection(section)}
            >
              <FontAwesomeIcon
                icon={section.visible ? faToggleOn : faToggleOff}
              />
            </button>
            <button
              className="description-button"
              onClick={() => showDescription(section)}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
            {section.showDescription && (
              <div className="description">{section.description}</div>
            )}
          </div>
        ))}
      </div>
      <button
        className="save-button fixed-bottom"
        disabled={!saveButtonEnabled}
        onClick={saveChanges}
      >
        Save and Next
      </button>
    </div>
  );
};

export default App;