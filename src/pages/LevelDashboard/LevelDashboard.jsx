import React from "react";
import "./LevelDashboard.css";

const activities = [
  { icon: "👥", title: "Referral Bonus", detail: "Demo activity", xp: "+20 XP", color: "green" },
  { icon: "📋", title: "Daily Mission Completed", detail: "Demo activity", xp: "+50 XP", color: "orange" },
  { icon: "🎮", title: "Mini Game Win", detail: "Demo activity", xp: "+75 XP", color: "purple" },
  { icon: "🪙", title: "XP Catcher Reward", detail: "Demo activity", xp: "+25 XP", color: "gold" },
  { icon: "🔥", title: "Streak Bonus", detail: "Demo activity", xp: "+25 XP", color: "red" },
];

const opportunities = [
  { icon: "▦", title: "Daily Challenges", detail: "Complete a daily mission to progress.", status: "Coming Soon", color: "green" },
  { icon: "♧", title: "Refer & Earn", detail: "Invite friends to discover VELOOP.", status: "Coming Soon", color: "orange" },
  { icon: "▣", title: "Watch & Earn", detail: "Explore eligible viewing activities.", status: "Coming Soon", color: "purple" },
  { icon: "◎", title: "XP Catcher", detail: "Catch coins in a mini-game.", status: "Play Demo", color: "blue" },
];

const levels = [
  { level: "01", name: "Starter", reward: "50 VEs", status: "COMPLETED" },
  { level: "02", name: "Explorer", reward: "100 VEs", status: "COMPLETED" },
  { level: "03", name: "Achiever", reward: "10 Gems", status: "COMPLETED" },
  { level: "04", name: "Pro Member", reward: "Current level", status: "CURRENT" },
  { level: "05", name: "Elite", reward: "500 VEs", status: "NEXT GOAL" },
  { level: "06", name: "Champion", reward: "2 Spins", status: "LOCKED" },
];

function Panel({ title, eyebrow, children, className = "" }) {
  return (
    <section className={`ld-panel ${className}`}>
      {eyebrow && <p className="ld-eyebrow">{eyebrow}</p>}
      {title && <h2 className="ld-panel-title">{title}</h2>}
      {children}
    </section>
  );
}

function Metric({ icon, label, value, color }) {
  return (
    <div className="ld-metric">
      <span className={`ld-metric-icon ${color}`}>{icon}</span>
      <span className="ld-metric-label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function LevelDashboard() {
  const currentLevel = 4;
  const currentXP = 6420;
  const nextLevelXP = 8000;
  const remainingXP = nextLevelXP - currentXP;
  const progress = Math.round((currentXP / nextLevelXP) * 100);

  return (
    <main className="ld-dashboard">
      <header className="ld-topbar">
        <a className="ld-brand" href="#level-home">
          <span className="ld-brand-mark">V</span>
          <span>
            <strong>VELOOP</strong>
            <small>REWARDS</small>
          </span>
        </a>

        <nav className="ld-nav" aria-label="Main navigation">
          <a className="active" href="#level-home">⌂ <span>Home</span></a>
          <a href="#opportunities">ϟ <span>Earn</span></a>
          <a href="#rewards">♔ <span>Rewards</span></a>
          <a href="#progress">▤ <span>Wallet</span></a>
        </nav>

        <div className="ld-profile">
          <span className="ld-avatar">H</span>
          <span>
            <strong>Hi, VELOOPer!</strong>
            <small>Level 04 member</small>
          </span>
        </div>
      </header>

      <div className="ld-content" id="level-home">
        <div className="ld-welcome">
          <div>
            <p className="ld-eyebrow">YOUR GAMIFIED JOURNEY</p>
            <h1>Level Dashboard</h1>
            <p>Level up your journey and unlock rewards as you progress.</p>
          </div>
          <span className="ld-member-chip">✦ Member Dashboard</span>
        </div>

        <div className="ld-overview">
          <Panel eyebrow="YOUR LEVEL" className="ld-level-card">
            <div className="ld-level-summary">
              <div className="ld-level-emblem">
                <small>LEVEL</small>
                <strong>{String(currentLevel).padStart(2, "0")}</strong>
              </div>
              <div className="ld-level-numbers">
                <strong>{currentXP.toLocaleString()} <small>XP</small></strong>
                <p>{remainingXP.toLocaleString()} XP to reach Level 05</p>
              </div>
            </div>

            <div
              className="ld-progress-track"
              role="progressbar"
              aria-label="Level progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span style={{ width: `${progress}%` }} />
            </div>

            <div className="ld-progress-labels">
              <span>{currentXP.toLocaleString()} XP</span>
              <span>{nextLevelXP.toLocaleString()} XP</span>
            </div>
            <p className="ld-muted">{progress}% progress to the next level</p>
          </Panel>

          <Panel eyebrow="ϟ TODAY'S BOOST" className="ld-boost-card">
            <span className="ld-demo-tag">DEMO</span>
            <div className="ld-metrics">
              <Metric icon="ϟ" label="XP Earned" value="6,420 XP" color="gold" />
              <Metric icon="▤" label="Tasks Done" value="Demo" color="blue" />
              <Metric icon="♨" label="Streak" value="Demo" color="red" />
            </div>
            <p className="ld-muted ld-boost-note">Keep engaging to grow your rewards.</p>
          </Panel>

          <Panel eyebrow="NEXT LEVEL REWARD" className="ld-reward-card">
            <div className="ld-reward-main">
              <div className="ld-crown">♛</div>
              <div>
                <strong className="ld-reward-amount">500 <small>VEs</small></strong>
                <p className="ld-muted">Reward at Level 05</p>
              </div>
            </div>
            <div className="ld-reward-footer">
              <span>♧ Unlock at Level 05</span>
              <a href="#roadmap">View levels ↗</a>
            </div>
          </Panel>
        </div>

        <div className="ld-main-grid">
          <div className="ld-main-column">
            <Panel
              eyebrow="YOUR NEXT OPPORTUNITY"
              title="Earn More"
              className="ld-opportunity-panel"
            >
              <p className="ld-panel-description">
                Explore activities and see what's coming next.
              </p>

              <div className="ld-opportunity-grid" id="opportunities">
                {opportunities.map((item) => (
                  <article className="ld-opportunity" key={item.title}>
                    <span className={`ld-opportunity-icon ${item.color}`}>
                      {item.icon}
                    </span>
                    <div className="ld-opportunity-copy">
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                      <span className={`ld-opportunity-status ${item.status === "Play Demo" ? "play" : ""}`}>
                        {item.status}
                      </span>
                    </div>
                    <span className="ld-chevron">›</span>
                  </article>
                ))}
              </div>
            </Panel>

            <Panel
              eyebrow="▣ PLAY · ENGAGE · PROGRESS"
              title="XP Catcher"
              className="ld-game-panel"
            >
              <div className="ld-game-heading">
                <p>Catch 10 coins to complete the demo challenge.</p>
                <span className="ld-demo-tag">DEMO GAME</span>
              </div>

              <div className="ld-game-stage">
                <div className="ld-game-coin">◎</div>
                <h3>Ready to catch?</h3>
                <p>Start the game and tap the coins to finish.</p>
                <button
                  className="ld-primary-button"
                  onClick={() => window.alert("Connect your XP Catcher game logic here.")}
                >
                  ▶ &nbsp; Start Game
                </button>
              </div>

              <div className="ld-game-rules">
                <span>◎ Catch 10 coins</span>
                <span>ϟ +25 XP on claim</span>
                <span>♧ Demo only</span>
              </div>
            </Panel>

            <Panel
              eyebrow="KEEP CLIMBING"
              title="Level Roadmap"
              className="ld-roadmap-panel"
            >
              <p className="ld-panel-description">
                Track your milestones and upcoming rewards.
              </p>

              <div className="ld-roadmap-grid" id="roadmap">
                {levels.map((item) => {
                  const completed = item.status === "COMPLETED";
                  const current = item.status === "CURRENT";

                  return (
                    <article
                      key={item.level}
                      className={`ld-roadmap-item ${completed ? "completed" : ""} ${current ? "current" : ""}`}
                    >
                      <div className="ld-roadmap-node">
                        {completed ? "✓" : item.level}
                      </div>
                      <span className="ld-roadmap-level">LEVEL {item.level}</span>
                      <h3>{item.name}</h3>
                      <span className={`ld-roadmap-status ${current ? "current-label" : ""}`}>
                        {item.status}
                      </span>
                      <p>{item.reward}</p>
                    </article>
                  );
                })}
              </div>
            </Panel>
          </div>

          <aside className="ld-side-column">
            <Panel className="ld-next-panel" eyebrow="✧ NEXT LEVEL">
              <p className="ld-next-intro">Keep progressing toward your next milestone.</p>

              <div className="ld-next-emblem">
                <span>♙</span>
                <strong>05</strong>
                <small>LEVEL</small>
              </div>

              <h3 className="ld-next-title">Elite</h3>
              <p className="ld-next-xp">{remainingXP.toLocaleString()} XP remaining</p>

              <div className="ld-next-reward">
                <span>V</span> 500 VEs
              </div>

              <ul className="ld-checklist">
                <li>✓ Reach your next level</li>
                <li>✓ Track your XP progress</li>
                <li>✓ Explore upcoming activities</li>
              </ul>

              <a className="ld-primary-button ld-rewards-button" href="#rewards">
                View Rewards &nbsp; →
              </a>
            </Panel>

            <Panel
              eyebrow="YOUR PROGRESS"
              title="Recent Activity"
              className="ld-activity-panel"
            >
              <div className="ld-activity-list" id="progress">
                {activities.map((activity) => (
                  <article className="ld-activity" key={activity.title}>
                    <span className={`ld-activity-icon ${activity.color}`}>
                      {activity.icon}
                    </span>
                    <div className="ld-activity-copy">
                      <h3>{activity.title}</h3>
                      <p>{activity.detail}</p>
                    </div>
                    <strong>{activity.xp}</strong>
                  </article>
                ))}
              </div>

              <a className="ld-text-link" href="#progress">
                View activity history →
              </a>

              <div className="ld-demo-summary">
                <p>Demo Summary</p>
                <div>
                  <span><b>ϟ</b><strong>6,420 XP</strong><small>Current XP</small></span>
                  <span><b>V</b><strong>35 VEs</strong><small>Demo balance</small></span>
                  <span><b>✦</b><strong>12</strong><small>Demo gems</small></span>
                </div>
              </div>
            </Panel>
          </aside>
        </div>

        <footer className="ld-footer">
          <span>VELOOP Rewards · Gamified Level Progression Hub</span>
          <span>Prototype UI · Demo values only</span>
        </footer>
      </div>
    </main>
  );
}