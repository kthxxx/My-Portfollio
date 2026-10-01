"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type CaseStudyNotesData = { problem: string; approach: string; outcome: string };
const noteKeys = ["problem", "approach", "outcome"] as const;
const noteLabels = { problem: "Problem", approach: "Approach", outcome: "Outcome" } as const;

export function CaseStudyNotes({ notes }: { notes: CaseStudyNotesData }) {
  const [openNote, setOpenNote] = useState<(typeof noteKeys)[number]>("problem");
  const reduceMotion = useReducedMotion();
  return (
    <section className="case-notes" aria-label="Case study details">
      {noteKeys.map((key, index) => {
        const expanded = openNote === key;
        const triggerId = `case-note-trigger-${key}`;
        const panelId = `case-note-panel-${key}`;
        return (
          <div className={`case-note${expanded ? " expanded" : ""}`} key={key}>
            <h2>
              <button
                id={triggerId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenNote(key)}
              >
                <span className="case-note-index">0{index + 1}</span>
                <span>{noteLabels[key]}</span>
                <span className="case-note-symbol" aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
            </h2>
            <AnimatePresence initial={false}>
              {expanded && <motion.div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="case-note-panel"
                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.22, ease: "easeOut" }}
              ><p>{notes[key]}</p></motion.div>}
            </AnimatePresence>
          </div>
        );
      })}
    </section>
  );
}
