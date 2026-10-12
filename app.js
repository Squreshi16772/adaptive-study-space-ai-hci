/* Adaptive Study Space: transparent epsilon-greedy reinforcement learning. */
(function () {
  "use strict";
  const KEY = "adaptive-study-space-v1";
  const EPSILON = 0.15;
  const fresh = () => ({ layouts: { concise: { trials: 0, reward: 0 }, detailed: { trials: 0, reward: 0 } }, current: null, lastAction: "No feedback has been recorded yet." });
  const $ = (id) => document.getElementById(id);
  const cards = $("cards"), badge = $("layoutBadge"), recommendation = $("recommendation");
  const panel = $("feedbackPanel"), prompt = $("feedbackPrompt"), explanation = $("explanation");
  const helpful = $("helpfulButton"), notHelpful = $("notHelpfulButton"), why = $("whyButton");
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch (_) { state = fresh(); }
  if (!state.layouts || !state.layouts.concise || !state.layouts.detailed) state = fresh();
  let ratedCurrent = false;
  const save = () => localStorage.setItem(KEY, JSON.stringify(state));
  const mean = (layout) => { const item = state.layouts[layout]; return item.trials ? item.reward / item.trials : null; };
  const pct = (layout) => mean(layout) === null ? "not yet rated" : Math.round(mean(layout) * 100) + "% helpful";
  const best = () => { const c = mean("concise"), d = mean("detailed"); if (c === null && d === null) return null; if (c === null) return "detailed"; if (d === null) return "concise"; return c >= d ? "concise" : "detailed"; };
  function update() {
    const choice = best();
    recommendation.textContent = choice ? "Current recommendation: " + choice + " view (" + pct(choice) + "). You can always choose another view." : "Choose a layout and tell the interface whether it helped. The model starts with no assumptions.";
    const c = state.layouts.concise, d = state.layouts.detailed;
    explanation.innerHTML = "<strong>Transparent model summary.</strong> The prototype uses an epsilon-greedy reinforcement-learning policy. Explicit ratings only: concise = " + c.reward + "/" + c.trials + " helpful (" + pct("concise") + "); detailed = " + d.reward + "/" + d.trials + " helpful (" + pct("detailed") + "). " + (choice ? "It currently recommends the " + choice + " view." : "There is not enough feedback for a recommendation.") + " It explores the other view 15% of the time. " + state.lastAction;
  }
  function choose() { const choice = best(); if (!choice) return Math.random() < 0.5 ? "concise" : "detailed"; const other = choice === "concise" ? "detailed" : "concise"; return Math.random() < EPSILON ? other : choice; }
  function setLayout(layout, source) {
    state.current = layout; ratedCurrent = false; cards.className = "cards " + layout; badge.textContent = layout + " view active"; panel.hidden = false;
    prompt.textContent = source === "model" ? "The model selected this " + layout + " view. Was it useful?" : "You selected this " + layout + " view. Was it useful?";
    helpful.disabled = false; notHelpful.disabled = false;
    state.lastAction = source === "model" ? "The model displayed the " + layout + " view." : "You manually selected the " + layout + " view; manual choice overrides the recommendation.";
    save(); update();
  }
  function rate(value) {
    if (!state.current || ratedCurrent) return;
    ratedCurrent = true; const item = state.layouts[state.current]; item.trials += 1; item.reward += value;
    state.lastAction = "You rated the " + state.current + " view as " + (value ? "helpful" : "not helpful") + ". The estimate was updated locally.";
    save(); update(); prompt.textContent = "Thanks. Your rating was saved only in this browser. Select a new view whenever you want to compare again."; helpful.disabled = true; notHelpful.disabled = true;
  }
  $("summaryButton").addEventListener("click", () => setLayout("concise", "user"));
  $("detailButton").addEventListener("click", () => setLayout("detailed", "user"));
  helpful.addEventListener("click", () => rate(1)); notHelpful.addEventListener("click", () => rate(0));
  $("contrastButton").addEventListener("click", (event) => { const enabled = document.body.classList.toggle("high-contrast"); event.currentTarget.setAttribute("aria-pressed", String(enabled)); event.currentTarget.textContent = enabled ? "Standard contrast" : "High contrast"; });
  why.addEventListener("click", () => { const open = explanation.hidden; explanation.hidden = !open; why.setAttribute("aria-expanded", String(open)); });
  $("resetButton").addEventListener("click", () => { localStorage.removeItem(KEY); state = fresh(); cards.className = "cards detailed"; badge.textContent = "Awaiting a choice"; panel.hidden = true; explanation.hidden = true; why.setAttribute("aria-expanded", "false"); update(); });
  update(); setLayout(choose(), "model");
})();
