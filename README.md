# Adaptive Study Space

Adaptive Study Space is a no-install, browser-based demonstration of an AI-based adaptive human-computer interaction. Open `index.html` in a current desktop browser.

## What adapts

The prototype presents the same instructional content in a concise or detailed layout. It learns from the user's explicit helpful and not helpful ratings at runtime, then recommends a layout on later visits.

The learning policy is a deliberately small and inspectable epsilon-greedy multi-armed bandit:

- Each layout has a trial count and a helpful-reward count.
- Estimated usefulness is `helpful ratings / ratings`.
- The layout with the higher estimate is normally recommended.
- With 15% probability, the other layout is shown for exploration.

This is a practical example of reinforcement learning, not an assessment of identity, intelligence, disability, or academic performance. It makes no hidden inferences. A user can override the layout, inspect the explanation, reset all learning, and change contrast at any time.

## Run and test

1. Open `index.html`.
2. Select **Show a concise view** or **Show more detail**.
3. Rate the active layout.
4. Open **Why this recommendation?** to inspect the reward counts and model policy.
5. Refresh the page to confirm the local preference persists.
6. Select **Reset local learning** to remove stored data.

## Files

- `index.html`: semantic interface structure and accessible controls.
- `styles.css`: responsive styles, keyboard-focus treatment, and high-contrast mode.
- `app.js`: local reinforcement-learning policy, UI rendering, feedback, and reset behavior.

## Privacy and limitations

All state is stored in the browser's local storage under `adaptive-study-space-v1`; no network calls occur. Ratings are sparse feedback, so the recommendation may be inaccurate, especially with few observations. The user override and reset controls are intentional safeguards.

## Sources used in the report

Gajos, K. Z., Weld, D. S., & Wobbrock, J. O. (2010). Automatically generating personalized user interfaces with Supple. *Artificial Intelligence, 174*(12-13), 910-950. https://doi.org/10.1016/j.artint.2010.05.005

International Organization for Standardization. (2019). *ISO 9241-210:2019 ergonomics of human-system interaction - Part 210: Human-centred design for interactive systems*. https://www.iso.org/standard/77520.html

National Institute of Standards and Technology. (2023). *Artificial intelligence risk management framework (AI RMF 1.0)* (NIST AI 100-1). https://doi.org/10.6028/NIST.AI.100-1

Shneiderman, B. (2020). Human-centered artificial intelligence: Reliable, safe & trustworthy. *International Journal of Human-Computer Interaction, 36*(6), 495-504. https://doi.org/10.1080/10447318.2020.1741118

## AI assistance disclosure

OpenAI's ChatGPT assisted with the initial code structure, explanatory copy, report drafting, and editing. The author reviewed, tested, and is responsible for the final source code and report.

## GitHub repository

The submission repository is https://github.com/Squreshi16772/adaptive-study-space-ai-hci. The accompanying ZIP contains the same project files.
