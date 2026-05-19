"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";

const COMMANDS = ["whoami", "skills", "experience", "contact", "help"] as const;

export function TerminalInput() {
  const tc = useTranslations("hero.terminalCommands");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [initialized, setInitialized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      if (!trimmed) return;

      const newHistory = [trimmed, ...history].slice(0, 20);
      setHistory(newHistory);
      setHistoryIndex(-1);

      let response: string;
      switch (trimmed) {
        case "whoami":
          response = tc("whoami");
          break;
        case "skills":
          response = tc("skills");
          break;
        case "experience":
          response = tc("experience");
          break;
        case "contact":
          response = tc("contact");
          break;
        case "help":
          response = tc("help");
          break;
        default:
          response = `Command not found: ${trimmed}. Type 'help' for available commands.`;
      }

      setOutput((prev) => [...prev.slice(-4), `> ${trimmed}`, response]);
      setInput("");
    },
    [tc, history]
  );

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      handleCommand("help");
    }
  }, [initialized, handleCommand]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="mx-auto w-full max-w-xl rounded-lg border border-border bg-card/50 p-4 font-mono text-sm backdrop-blur-sm"
    >
      <div className="mb-2 flex items-center gap-1.5 text-muted-foreground">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
      </div>
      <div className="space-y-1">
        {output.map((line, i) => (
          <p
            key={i}
            className={
              line.startsWith(">")
                ? "text-emerald-500 break-words"
                : "text-foreground/80 break-words"
            }
          >
            {line}
          </p>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2 min-w-0">
        <span className="text-emerald-500 shrink-0">
          pablo@dev:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 min-w-0 bg-transparent outline-none text-foreground caret-emerald-500"
          size={1}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-mono text-emerald-500/80 hover:border-emerald-500/60 hover:text-emerald-500 hover:bg-emerald-500/20 transition-colors duration-150"
            aria-label={`Run command: ${cmd}`}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}