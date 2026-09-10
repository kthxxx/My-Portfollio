import Link from "next/link";
export default function NotFound(){return <main className="case"><div className="case-top"><span>KEITH.OS</span><span>ERROR</span><span>404</span></div><h1>FILE NOT<br/>FOUND.</h1><div className="case-copy"><p>The requested path does not exist in this system.</p><Link className="terminal-back" href="/">&gt; cd /home ↵</Link></div></main>}
