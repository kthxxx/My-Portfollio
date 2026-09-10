"use client";

import Link from "next/link";
import { FormEvent, KeyboardEvent, useRef, useState } from "react";
import {
  contact,
  creativeAreas,
  profile,
  projects,
  skillGroups,
} from "@/data/portfolio-data";

const commandNames = [
  "help", "whoami", "about", "education", "projects", "creative",
  "skills", "contact", "socials", "github", "linkedin", "resume",
  "clear", "history", "date", "pwd", "ls", "cat", "theme",
  "coffee", "hello", "sudo", "matrix", "vim", "exit",
];

type Entry = { command: string; output: string };

function contactOutput() {
  return [
    `Email: ${contact.email}`,
    `GitHub: ${contact.github ?? "TODO: ADD GITHUB"}`,
    `LinkedIn: ${contact.linkedin ?? "TODO: ADD LINKEDIN"}`,
    `Resume: ${contact.resume ?? "TODO: ADD RESUME"}`,
  ].join("\n");
}

function runCommand(raw: string, history: string[]): string {
  const [command = "", ...args] = raw.trim().toLowerCase().split(/\s+/);
  const target = args.join(" ");
  const files: Record<string, string> = {
    "about.txt": profile.bio.join("\n\n"),
    "education.txt": `${profile.school}\n${profile.degree}\nDates: TODO: ADD EDUCATION DATES`,
    "skills.txt": skillGroups
      .map((group) => `${group.label}: ${group.items.join(", ")}`)
      .join("\n"),
    "contact.txt": contactOutput(),
  };

  if (!command) return "";
  if (command === "help") return commandNames.join("  ");
  if (command === "whoami" || command === "about") {
    return `${profile.name}\n${profile.role}\n${profile.location}\n\n${profile.statement}`;
  }
  if (command === "education") return files["education.txt"];
  if (command === "projects") {
    return projects.map((project, index) =>
      `${String(index + 1).padStart(2, "0")}  ${project.name} — ${project.category}`
    ).join("\n");
  }
  if (command === "creative") {
    return creativeAreas.map((area) =>
      `${area.index}  ${area.title} — ${area.state}`
    ).join("\n");
  }
  if (command === "skills") return files["skills.txt"];
  if (["contact", "socials", "github", "linkedin", "resume"].includes(command)) {
    return contactOutput();
  }
  if (command === "history") {
    return history.map((item, index) => `${index + 1}  ${item}`).join("\n");
  }
  if (command === "date") return new Date().toString();
  if (command === "pwd") return "/home/keith";
  if (command === "ls") {
    if (target === "projects") return projects.map(({ slug }) => `${slug}/`).join("\n");
    if (target === "creative") {
      return creativeAreas
        .map(({ title }) => `${title.toLowerCase().replaceAll(" ", "-")}/`)
        .join("\n");
    }
    return "about.txt  education.txt  skills.txt  contact.txt  projects/  creative/";
  }
  if (command === "cat") {
    return files[target] ?? `cat: ${target || "missing operand"}: file not found`;
  }
  if (command === "coffee") return "Brewing ideas... coffee ready.";
  if (command === "hello") return "Kumusta! Welcome to Keith’s creative system.";
  if (command === "sudo") {
    return raw.toLowerCase().includes("hire keith")
      ? `Permission granted. Opening contact...\n${contact.email}`
      : "Keith is not in the sudoers file. This incident will be documented.";
  }
  if (command === "matrix") return "Wake up, Keith... the portfolio has you.";
  if (command === "vim") return "Vim opened. Exit instructions intentionally omitted.";
  if (command === "exit") return "Session remains open. The web is hard to leave.";
  if (command === "theme") return "Theme: phosphor / ink.";
  return `command not found: ${command}. Type 'help'.`;
}

export function InteractiveTerminal() {
  const [entries, setEntries] = useState<Entry[]>([
    { command: "whoami", output: runCommand("whoami", []) },
  ]);
  const [value, setValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(event?: FormEvent) {
    event?.preventDefault();
    const command = value.trim();
    if (!command) return;

    if (command.toLowerCase() === "clear") {
      setEntries([]);
    } else {
      setEntries((current) => [
        ...current,
        { command, output: runCommand(command, [...commandHistory, command]) },
      ]);
    }
    setCommandHistory((current) => [...current, command]);
    setValue("");
    setHistoryIndex(-1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      const match = commandNames.find((command) => command.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    }
    if (event.key === "ArrowUp" && commandHistory.length) {
      event.preventDefault();
      const next = historyIndex < 0
        ? commandHistory.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(commandHistory[next]);
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex + 1;
      if (next >= commandHistory.length) {
        setHistoryIndex(-1);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(commandHistory[next]);
      }
    }
  }

  return (
    <main className="terminal-page" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-head">
        <Link className="terminal-back" href="/">← INDEX</Link>
        <span>KEITH.OS / TERMINAL</span>
        <span>SESSION: GUEST</span>
      </div>
      <div className="terminal-wrap">
        <h1 className="terminal-title">TERMINAL</h1>
        <div className="terminal-output" aria-live="polite">
          {entries.map((entry, index) => (
            <div className="terminal-entry" key={`${entry.command}-${index}`}>
              <div><span className="prompt">keith@portfolio:~$</span> {entry.command}</div>
              <pre>{entry.output}</pre>
            </div>
          ))}
        </div>
        <form className="terminal-form" onSubmit={submit}>
          <label className="prompt" htmlFor="terminal-input">keith@portfolio:~$</label>
          <input
            id="terminal-input"
            ref={inputRef}
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
          />
          <span aria-hidden="true">█</span>
        </form>
      </div>
    </main>
  );
}
