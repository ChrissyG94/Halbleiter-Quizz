<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Halbleiter – Richtig/Falsch Trainer</title>

  <!-- MathJax für Formelschreibweise (LaTeX in \( ... \) oder \[ ... \]) -->
  <script>
    window.MathJax = {
      tex: { inlineMath: [['\\(', '\\)'], ['$', '$']] },
      options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] }
    };
  </script>
  <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

  <style>
    :root {
      --bg: #0b1220;
      --card: rgba(255, 255, 255, 0.06);
      --card-border: rgba(255, 255, 255, 0.14);
      --text: rgba(255, 255, 255, 0.92);
      --muted: rgba(255, 255, 255, 0.72);
      --muted2: rgba(255, 255, 255, 0.55);
      --green: #22c55e;
      --red: #ef4444;
      --accent: #60a5fa;
      --shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      background: radial-gradient(1200px 800px at 20% 10%, rgba(96,165,250,0.18), transparent 55%),
                  radial-gradient(900px 700px at 85% 15%, rgba(34,197,94,0.14), transparent 60%),
                  radial-gradient(900px 700px at 55% 95%, rgba(239,68,68,0.10), transparent 60%),
                  var(--bg);
      color: var(--text);
      min-height: 100vh;
      padding: 36px 16px;
    }

    .wrap {
      max-width: 980px;
      margin: 0 auto;
    }

    header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }

    h1 {
      margin: 0;
      font-size: 26px;
      letter-spacing: 0.2px;
    }

    .subtitle {
      margin-top: 6px;
      color: var(--muted);
      font-size: 14px;
      max-width: 720px;
    }

    .pillrow {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }

    .pill {
      border: 1px solid var(--card-border);
      background: rgba(255,255,255,0.05);
      padding: 6px 10px;
      border-radius: 999px;
      font-size: 12px;
      color: var(--muted);
    }

    .card {
      border: 1px solid var(--card-border);
      background: linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.04));
      border-radius: 18px;
      padding: 18px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }

    .progresswrap {
      display: grid;
      gap: 6px;
      min-width: 240px;
    }

    .progressline {
      width: 100%;
      height: 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.10);
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.10);
    }

    .bar {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, rgba(96,165,250,0.95), rgba(34,197,94,0.95));
      border-radius: 999px;
      transition: width 220ms ease;
    }

    .progressmeta {
      font-size: 12px;
      color: var(--muted2);
      display: flex;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }

    .statement {
      font-size: 18px;
      line-height: 1.55;
      padding: 14px 12px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(0,0,0,0.14);
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 14px;
    }

    .btn {
      border: 1px solid rgba(255,255,255,0.16);
      background: rgba(255,255,255,0.06);
      color: var(--text);
      padding: 10px 14px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 14px;
      transition: transform 80ms ease, background 160ms ease, border-color 160ms ease;
      user-select: none;
    }

    .btn:hover { background: rgba(255,255,255,0.10); }
    .btn:active { transform: scale(0.98); }
    .btn[disabled] { opacity: 0.55; cursor: not-allowed; }

    .btn-true {
      border-color: rgba(34,197,94,0.45);
      background: rgba(34,197,94,0.16);
    }

    .btn-false {
      border-color: rgba(239,68,68,0.45);
      background: rgba(239,68,68,0.14);
    }

    .btn-next {
      margin-left: auto;
      border-color: rgba(96,165,250,0.50);
      background: rgba(96,165,250,0.16);
    }

    .result {
      margin-top: 14px;
      padding: 14px 12px;
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      display: none;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .tag .dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--accent);
      display: inline-block;
    }

    .tag.good { color: var(--green); }
    .tag.good .dot { background: var(--green); }

    .tag.bad { color: var(--red); }
    .tag.bad .dot { background: var(--red); }

    .explain {
      color: var(--muted);
      font-size: 14px;
      line-height: 1.55;
    }

    .correction {
      margin-top: 10px;
      padding: 10px 10px;
      border-left: 3px solid rgba(96,165,250,0.80);
      background: rgba(96,165,250,0.10);
      border-radius: 10px;
      color: var(--text);
      font-size: 14px;
    }

    .footerhint {
      margin-top: 16px;
      color: var(--muted2);
      font-size: 12px;
    }

    .end {
      display: none;
      margin-top: 14px;
      padding: 16px 14px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.14);
      background: rgba(0,0,0,0.18);
    }

    .end h2 {
      margin: 0 0 6px 0;
      font-size: 18px;
    }

    .end .score {
      font-size: 22px;
      font-weight: 800;
      margin: 6px 0 10px 0;
      color: rgba(255,255,255,0.92);
    }

    .end .motto {
      color: var(--muted);
      font-size: 14px;
    }

    .end .btn {
      margin-top: 12px;
    }

    @media (max-width: 520px) {
      .btn-next { margin-left: 0; width: 100%; }
      .actions { gap: 8px; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <div>
        <h1>Halbleiter – Richtig/Falsch Trainer</h1>
        <div class="subtitle">
          Eine Aussage, eine Entscheidung: <strong>Richtig</strong> oder <strong>Falsch</strong>. Danach bekommst du direkt die Lösung mit kurzer Erklärung – und (falls nötig) eine saubere Korrektur.
        </div>
      </div>
      <div class="pillrow">
        <div class="pill" id="pillSection">–</div>
        <div class="pill" id="pillIndex">Aussage 1</div>
        <div class="pill" id="pillScore">Score: 0</div>
      </div>
    </header>

    <div class="card">
      <div class="topbar">
        <div class="progresswrap">
          <div class="progressline"><div class="bar" id="bar"></div></div>
          <div class="progressmeta">
            <span id="progressLeft">Frage 1 von 4</span>
            <span id="progressRight">0% erledigt</span>
          </div>
        </div>
      </div>

      <div class="statement" id="question">–</div>

      <div class="actions">
        <button class="btn btn-true" id="btnTrue" onclick="answer(true)">Richtig</button>
        <button class="btn btn-false" id="btnFalse" onclick="answer(false)">Falsch</button>
        <button class="btn btn-next" id="btnNext" onclick="nextQuestion()" disabled>Nächste →</button>
      </div>

      <div class="result" id="result"></div>

      <div class="end" id="end">
        <h2>Fertig 🎉</h2>
        <div class="score" id="endScore">–</div>
        <div class="motto" id="endMotto">–</div>
        <button class="btn" onclick="restart()">Nochmal spielen</button>
      </div>

      <div class="footerhint">
        Tipp: Wenn du „Falsch“ wählst, formuliere die Aussage kurz korrekt um (1 Satz) – das bringt den größten Lerneffekt.
      </div>
    </div>
  </div>

  <script>
    // ✅ Fragen erweitern: Einfach weitere Objekte in dieses Array einfügen.
    // Formeln: Nutze LaTeX inline mit \( ... \), z.B. "Im Gleichgewicht gilt \\(J_{Drift} = -J_{Diff}\\)."
    const questions = [
      {
        section: "Intrinsisch/Extrinsisch",
        text: "Im intrinsischen Halbleiter gilt \(n = p\).",
        correct: true,
        explanation: "Elektronen und Löcher entstehen paarweise als Elektron-Loch-Paare. Deshalb sind Elektronen- und Lochdichte im intrinsischen Material gleich.",
        correction: "Merksatz: Intrinsisch bedeutet \(n=p=n_i\)."
      },
      {
        section: "Dotierung",
        text: "Dotierung verändert die Bandlücke \(E_g\).",
        correct: false,
        explanation: "Im Vorlesungsmodell verändert Dotierung die Besetzung (und damit die Lage des Fermi-Niveaus), nicht die Bandstruktur bzw. \(E_g\).",
        correction: "Korrektur: Dotierung verschiebt das Fermi-Niveau \(E_F\); die Bandlücke \(E_g\) bleibt (im Modell) unverändert."
      },
      {
        section: "Transport im Gleichgewicht",
        text: "Im thermischen Gleichgewicht gilt \(J_{Drift} = -J_{Diff}\).",
        correct: true,
        explanation: "Drift und Diffusion wirken entgegengesetzt und kompensieren sich: \(J_{gesamt}=J_{Drift}+J_{Diff}=0\).",
        correction: "Merksatz: Gleichgewicht heißt nicht ‘keine Bewegung’, sondern ‘keine Netto-Stromdichte’."
      },
      {
        section: "Direkt/Indirekt",
        text: "Ein indirekter Halbleiter kann kein Licht emittieren.",
        correct: false,
        explanation: "Emission ist prinzipiell möglich, aber deutlich ineffizient, weil zur Impulserhaltung typischerweise ein Phonon beteiligt sein muss.",
        correction: "Korrektur: Indirekte Halbleiter emittieren prinzipiell, aber viel weniger effizient als direkte."
      }
    ];

    let current = 0;
    let score = 0;
    let answered = false;

    function $(id) { return document.getElementById(id); }

    function renderMath() {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise();
      }
    }

    function updateHeader() {
      $("pillSection").innerText = questions[current]?.section ?? "–";
      $("pillIndex").innerText = `Aussage ${Math.min(current + 1, questions.length)} / ${questions.length}`;
      $("pillScore").innerText = `Score: ${score}`;

      const p = Math.round((current / questions.length) * 100);
      $("progressLeft").innerText = `Frage ${Math.min(current + 1, questions.length)} von ${questions.length}`;
      $("progressRight").innerText = `${p}% erledigt`;
      $("bar").style.width = `${p}%`;
    }

    function showQuestion() {
      answered = false;
      $("result").style.display = "none";
      $("result").innerHTML = "";
      $("end").style.display = "none";

      $("btnTrue").disabled = false;
      $("btnFalse").disabled = false;
      $("btnNext").disabled = true;

      $("question").innerHTML = questions[current].text;
      updateHeader();
      renderMath();
    }

    function answer(choice) {
      if (answered) return;
      answered = true;

      const q = questions[current];
      const ok = (choice === q.correct);
      if (ok) score += 1;

      $("pillScore").innerText = `Score: ${score}`;

      const tagClass = ok ? "tag good" : "tag bad";
      const tagText = ok ? "Deine Antwort ist korrekt" : "Deine Antwort ist nicht korrekt";
      const solutionText = q.correct ? "Richtig" : "Falsch";
      const dot = "<span class='dot'></span>";

      const corrBlock = q.correction
        ? `<div class='correction'><strong>${q.correct ? "Merksatz" : "Physikalisch richtige Formulierung"}:</strong><br>${q.correction}</div>`
        : "";

      $("result").innerHTML = `
        <div class='${tagClass}'>${dot}${tagText}</div>
        <div class='explain'><strong>Lösung:</strong> ${solutionText}<br><br>${q.explanation}</div>
        ${corrBlock}
      `;
      $("result").style.display = "block";

      $("btnTrue").disabled = true;
      $("btnFalse").disabled = true;
      $("btnNext").disabled = false;

      renderMath();
    }

    function finish() {
      // final progress
      $("bar").style.width = "100%";
      $("progressRight").innerText = "100% erledigt";

      const total = questions.length;
      $("endScore").innerText = `${score}/${total} richtig`;

      const ratio = score / total;
      let motto = "";
      if (ratio === 1) {
        motto = "Stark! Das sitzt richtig. Jetzt einmal die Banddiagramme skizzieren – dann bist du prüfungsbereit.";
      } else if (ratio >= 0.75) {
        motto = "Sehr gut! Kleine Lücken noch schließen: Schau dir besonders die Aussagen an, bei denen du unsicher warst.";
      } else if (ratio >= 0.5) {
        motto = "Guter Zwischenstand. Wiederhole gezielt: Banddiagramme + Drift/Diffusion + Dotierung (EF-Verschiebung).";
      } else {
        motto = "Alles gut – genau dafür ist das Tool da. Mach eine zweite Runde und schreibe bei jeder falschen Aussage die korrekte Formulierung hin.";
      }
      $("endMotto").innerText = motto;

      $("end").style.display = "block";
      $("btnNext").disabled = true;
    }

    function nextQuestion() {
      if (!answered) return;
      if (current < questions.length - 1) {
        current += 1;
        showQuestion();
      } else {
        // end
        $("question").innerHTML = "Du hast alle Aussagen bearbeitet.";
        $("result").style.display = "none";
        $("btnTrue").disabled = true;
        $("btnFalse").disabled = true;
        finish();
      }
    }

    function restart() {
      current = 0;
      score = 0;
      // reset progress
      $("bar").style.width = "0%";
      showQuestion();
    }

    // Start
    showQuestion();
  </script>
</body>
</html>
