import type { Metadata } from "next";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
export const metadata: Metadata = { title: "Terminal" };
export default function TerminalPage(){ return <InteractiveTerminal /> }
