"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { memo, useEffect, useState } from "react";
import { Check, Copy, Play } from "lucide-react";
import type { Portfolio } from "@/lib/types";

type Props = {
  snippets: Portfolio["snippets"];
  snippetKey: string;
  setSnippetKey: Dispatch<SetStateAction<string>>;
  termOut: string;
  runSnippet: () => void;
  onCopy: (text: string, message: string) => void;
};

const SNIPPETS: Record<string, string> = {
  "auth-guard": `// Verify a JWT and attach the authenticated user to the request
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new UnauthorizedException();

    try {
      request.user = await this.jwtService.verifyAsync(token);
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}`,
  "crud-service": `// User CRUD service used by admin / dashboard APIs
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {
    return this.userModel.find().select('-password').lean();
  }

  async create(dto: CreateUserDto) {
    const password = await bcrypt.hash(dto.password, 10);
    return this.userModel.create({ ...dto, password });
  }
}`,
  useDebounce: `// Debounce search inputs in React dashboards
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debouncedValue;
}`,
};

const KEYWORDS = new Set([
  "async", "await", "boolean", "catch", "class", "const", "constructor",
  "export", "extends", "false", "from", "if", "import", "new", "private",
  "public", "return", "throw", "true", "try", "typeof",
]);

function highlightLine(line: string) {
  const tokens = line.match(/\/\/.*|(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|@[\w$]+|\b(?:async|await|boolean|catch|class|const|constructor|export|extends|false|from|if|import|new|private|public|return|throw|true|try|typeof)\b|\b\d+\b|\b[A-Z][\w$]*\b/g);
  if (!tokens) return line;

  const pieces: ReactNode[] = [];
  let offset = 0;
  tokens.forEach((token, index) => {
    const start = line.indexOf(token, offset);
    if (start > offset) pieces.push(line.slice(offset, start));
    let color = "text-slate-300";
    if (token.startsWith("//")) color = "text-slate-500";
    else if (/^["'`]/.test(token)) color = "text-emerald-300";
    else if (token.startsWith("@")) color = "text-amber-300";
    else if (KEYWORDS.has(token)) color = "text-violet-300";
    else if (/^[A-Z]/.test(token)) color = "text-sky-300";
    else if (/^\d/.test(token)) color = "text-amber-300";
    pieces.push(<span key={`${index}-${start}`} className={color}>{token}</span>);
    offset = start + token.length;
  });
  if (offset < line.length) pieces.push(line.slice(offset));
  return pieces;
}

function InteractiveTerminalSection({ snippets, snippetKey, setSnippetKey, termOut, runSnippet, onCopy }: Props) {
  const [copied, setCopied] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false);
  const code = SNIPPETS[snippetKey] ?? "// Snippet not found";
  const lines = code.split("\n");

  useEffect(() => {
    setCopied(false);
    setShowTestResults(false);
  }, [snippetKey]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleRun = () => {
    setShowTestResults(true);
    runSnippet();
  };

  const handleCopy = () => {
    onCopy(code, "Code snippet copied to clipboard!");
    setCopied(true);
  };

  return (
    <section id="terminal" className="border-t border-slate-800/60 py-24 light:border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-brand-400">
            {"// Code Quality & Philosophy"}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How I write backend code</h2>
          <p className="mt-2 text-sm text-slate-300 light:text-slate-700">
            Patterns I use in Nest.js APIs and React dashboards. Run Snippet simulates execution.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 font-mono text-sm shadow-2xl">
          <div className="flex flex-col gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex shrink-0 items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs text-slate-400">smitraj@dev-workstation:~ / code-samples</span>
            </div>
            <div className="-mx-1 flex min-w-0 max-w-full gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:pb-0" role="tablist" aria-label="Code samples">
              {snippets.map((snippet) => (
                <button
                  key={snippet.key}
                  type="button"
                  role="tab"
                  aria-selected={snippetKey === snippet.key}
                  onClick={() => {
                    setSnippetKey(snippet.key);
                  }}
                  className={`shrink-0 whitespace-nowrap rounded-md border px-3 py-1 text-xs ${snippetKey === snippet.key ? "border-brand-500/30 bg-slate-800 font-semibold text-brand-400" : "border-transparent bg-slate-900 text-slate-400 hover:text-slate-200"}`}
                >
                  {snippet.file}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto px-3 py-5 sm:px-6">
            <pre className="min-w-max text-xs leading-6 sm:text-sm" aria-label={`${snippets.find((snippet) => snippet.key === snippetKey)?.file ?? "Code sample"} source`}>
              <code>{lines.map((line, index) => (
                <span key={index} className="grid grid-cols-[2rem_auto] sm:grid-cols-[2.5rem_auto]">
                  <span aria-hidden="true" className="select-none pr-3 text-right text-slate-600">{index + 1}</span>
                  <span className="whitespace-pre">{highlightLine(line)}{"\n"}</span>
                </span>
              ))}</code>
            </pre>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-800 bg-slate-900 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleRun} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500">
                <Play className="h-3.5 w-3.5 fill-current" /> Run Snippet Test
              </button>
              <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white">
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            <div aria-live="polite" className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-500" />
              <span>{termOut}</span>
            </div>
          </div>

          {showTestResults && (
            <div className="border-t border-slate-800 bg-[#080d16] px-4 py-4 sm:px-6" aria-live="polite">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Test results</p>
              <ul className="space-y-2 text-xs text-slate-300">
                {["rejects requests without a bearer token", "verifies the token with JwtService", "attaches the verified user to the request"].map((result) => (
                  <li key={result} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" /><span>{result}</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(InteractiveTerminalSection);
