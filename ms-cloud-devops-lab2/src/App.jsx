import { useEffect, useState } from "react";

export default function App() {
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // name -> { count, last }

  useEffect(() => {
    let stopped = false;
    async function ask() {
      try {
        const res = await fetch("/whoami", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const name = (await res.text()).trim();
        if (stopped) return;
        setCurrent(name);
        setError(null);
        setAnswers((prev) => ({
          ...prev,
          [name]: { count: (prev[name]?.count ?? 0) + 1, last: new Date() },
        }));
      } catch (e) {
        if (!stopped) setError(e.message === "Failed to fetch" ? "No answer from the server" : e.message);
      }
    }
    ask();
    const id = setInterval(ask, 1000);
    return () => {
      stopped = true;
      clearInterval(id);
    };
  }, []);

  const rows = Object.entries(answers).sort((a, b) => b[1].count - a[1].count);
  const total = rows.reduce((n, [, v]) => n + v.count, 0);

  return (
    <main>
      <header>
        <h1>hello-app</h1>
        <p className="sub">Asks <code>/whoami</code> once a second and shows who answered.</p>
      </header>

      <section className={`answer ${error ? "bad" : ""}`} aria-live="polite">
        <span className="label">{error ? "Request failed" : "Answered by"}</span>
        <span className="name">{error ?? current ?? "waiting…"}</span>
        {error && <span className="hint">Check the Service: kubectl get endpointslices</span>}
      </section>

      <section>
        <h2>Answers so far</h2>
        {rows.length === 0 ? (
          <p className="empty">No answers yet. Keep this tab open.</p>
        ) : (
          <table>
            <thead>
              <tr><th>Pod / container</th><th>Answers</th><th>Share</th><th>Last answer</th></tr>
            </thead>
            <tbody>
              {rows.map(([name, v]) => (
                <tr key={name} className={name === current && !error ? "now" : ""}>
                  <td className="mono">{name}</td>
                  <td>{v.count}</td>
                  <td>
                    <span className="bar"><i style={{ width: `${(v.count / total) * 100}%` }} /></span>
                    {Math.round((v.count / total) * 100)}%
                  </td>
                  <td>{v.last.toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
