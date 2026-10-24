
import { useState } from "react";
import {
  ArrowRight,
  Award,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Coins,
  Flame,
  Gamepad2,
  Gift,
  Home,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Wallet,
  Zap,
  Video,
  Filter,
} from "lucide-react";

import {
  levelData,
  levelRoadmap,
  earningFeatures,
  getXPProgress,
  getRemainingXP,
} from "./data/levelData";

import "./App.css";

const earningIcons = {
  "daily-challenge": ClipboardList,
  "refer-earn": Users,
  "watch-earn": Video,
};

const earningTones = {
  "daily-challenge": "green",
  "refer-earn": "orange",
  "watch-earn": "purple",
};

const activities = [
  {
    title: "Referral Bonus",
    sub: "Demo activity",
    value: "+20 XP",
    icon: Users,
    tone: "green",
  },
  {
    title: "Daily Mission Completed",
    sub: "Demo activity",
    value: "+50 XP",
    icon: ClipboardList,
    tone: "orange",
  },
  {
    title: "Mini Game Win",
    sub: "Demo activity",
    value: "+75 XP",
    icon: Gamepad2,
    tone: "violet",
  },
  {
    title: "XP Catcher Reward",
    sub: "Demo activity",
    value: "+25 XP",
    icon: Coins,
    tone: "gold",
  },
  {
    title: "Streak Bonus",
    sub: "Demo activity",
    value: "+25 XP",
    icon: Flame,
    tone: "red",
  },
];

export default function App() {
  const [xp, setXp] = useState(levelData.currentXP);
  const [ves, setVes] = useState(35);
  const [gems, setGems] = useState(12);

  const [game, setGame] = useState("ready");
  const [score, setScore] = useState(0);

  const [info, setInfo] = useState(false);
  const [activityFilter, setActivityFilter] = useState(false);

  const progress = getXPProgress(
    xp,
    levelData.requiredXP
  );

  const xpRemaining = getRemainingXP(
    xp,
    levelData.requiredXP
  );

  function startGame() {
    setScore(0);
    setGame("playing");
  }

  function catchCoin() {
    if (game !== "playing") return;

    const nextScore = score + 1;

    setScore(nextScore);

    if (nextScore >= 10) {
      setGame("complete");
    }
  }

  function claimReward() {
    if (game !== "complete") return;

    setXp((currentXP) =>
      Math.min(
        currentXP + levelData.gameRewardXP,
        levelData.requiredXP
      )
    );

    // This is a demo game, so it does not award real VEs.
    setGame("ready");
    setScore(0);
  }

  function jumpTo(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <main className="app-shell" id="home">
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          aria-label="Veloop rewards home"
        >
          <span className="brand-mark">V</span>
          <span>
            VELOOP <small>REWARDS</small>
          </span>
        </a>

        <nav
          className="desktop-nav"
          aria-label="Main navigation"
        >
          <a className="active" href="#home">
            <Home size={15} /> Home
          </a>

          <a href="#earn">
            <Zap size={15} /> Earn
          </a>

          <a href="#rewards">
            <Gift size={15} /> Rewards
          </a>

          <a href="#activity">
            <Wallet size={15} /> Wallet
          </a>
        </nav>

        <div className="top-actions">
          <button
            className="icon-btn"
            aria-label="Notifications"
            onClick={() => alert("You're all caught up!")}
          >
            <Bell size={18} />
            <i className="notification-dot" />
          </button>

          <button
            className="profile-button"
            onClick={() => setInfo(!info)}
            aria-expanded={info}
          >
            <span className="avatar">H</span>

            <span className="profile-copy">
              <b>Hi, Velooper!</b>
              <small>
                Level {String(levelData.currentLevel).padStart(2, "0")} member
              </small>
            </span>
          </button>
        </div>
      </header>

      <div className="page-wrap">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">
              <Sparkles size={14} /> YOUR REWARDS JOURNEY
            </p>

            <h1>
              Good Morning, Velooper!{" "}
              <span className="wave">✦</span>
            </h1>

            <p className="subhead">
              Level up your journey and unlock rewards as you progress.
            </p>
          </div>

          <button
            className="outline-btn"
            onClick={() => jumpTo("earn")}
          >
            Explore ways to earn <ArrowRight size={16} />
          </button>
        </section>

        {/* Level overview */}
        <section
          className="overview-grid"
          aria-label="Level overview"
        >
          <article className="panel level-panel">
            <div className="panel-top">
              <span className="eyebrow">YOUR LEVEL</span>

              <button
                className="quiet-icon"
                onClick={() => setInfo(!info)}
                aria-label="About levels"
              >
                <CircleHelp size={17} />
              </button>
            </div>

            <div className="level-main">
              <div className="hex-badge">
                <span>LEVEL</span>
                <strong>
                  {String(levelData.currentLevel).padStart(2, "0")}
                </strong>
              </div>

              <div className="xp-total">
                <strong>
                  {xp.toLocaleString()} <small>XP</small>
                </strong>

                <span>
                  {xpRemaining.toLocaleString()} XP to reach Level{" "}
                  {String(levelData.nextLevel).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="XP progress"
              />
            </div>

            <div className="progress-label">
              <span>{xp.toLocaleString()} XP</span>
              <span>
                {levelData.requiredXP.toLocaleString()} XP
              </span>
            </div>

            <p className="muted">
              {Math.round(progress)}% progress to the next level
            </p>

            {info && (
              <p className="info-note">
                Earn XP through available activities. Reward amounts
                on this prototype are demo values.
              </p>
            )}
          </article>

          <article className="panel boost-panel">
            <div className="panel-top">
              <span className="eyebrow">
                <Zap size={14} /> TODAY'S BOOST
              </span>

              <span className="live-pill">DEMO</span>
            </div>

            <div className="boost-stats">
              <div>
                <Zap className="gold-icon" />
                <small>XP Earned</small>
                <strong>{xp.toLocaleString()} XP</strong>
              </div>

              <div>
                <ClipboardList className="blue-icon" />
                <small>Tasks Done</small>
                <strong>Demo</strong>
              </div>

              <div>
                <Flame className="red-icon" />
                <small>Streak</small>
                <strong>Demo</strong>
              </div>
            </div>
          </article>

          <article
            className="panel reward-summary"
            id="rewards"
          >
            <div className="panel-top">
              <span className="eyebrow">
                NEXT LEVEL REWARD
              </span>

              <Gift size={18} className="gold-icon" />
            </div>

            <div className="reward-display">
              <div className="treasure">♛</div>

              <div>
                <strong>
                  {levelData.nextLevelReward.amount}{" "}
                  <small>{levelData.nextLevelReward.type}</small>
                </strong>

                <p>
                  Reward at Level {String(levelData.nextLevel).padStart(2, "0")}
                </p>
              </div>
            </div>

            <div className="reward-footer">
              <span>
                <ShieldCheck size={15} /> Unlock at Level{" "}
                {String(levelData.nextLevel).padStart(2, "0")}
              </span>

              <button
                className="small-gold-btn"
                onClick={() => jumpTo("roadmap")}
              >
                View levels <ArrowRight size={14} />
              </button>
            </div>
          </article>
        </section>

        {/* Earning opportunities */}
        <section className="content-grid">
          <div className="main-column">
            <section className="panel earn-panel" id="earn">
              <div className="section-head">
                <div>
                  <p className="eyebrow">
                    YOUR NEXT OPPORTUNITY
                  </p>

                  <h2>Earn More</h2>

                  <p className="muted">
                    Explore activities and see what's coming next.
                  </p>
                </div>

                <button
                  className="round-arrow"
                  onClick={() => jumpTo("activity")}
                  aria-label="View recent activity"
                >
                  <ArrowRight size={18} />
                </button>
              </div>

              <div className="earn-grid">
                {earningFeatures.map((feature) => {
                  const Icon =
                    earningIcons[feature.id] || Gift;

                  const tone =
                    earningTones[feature.id] || "blue";

                  return (
                    <button
                      className="earn-card"
                      key={feature.id}
                      onClick={() =>
                        alert(
                          `${feature.title} is coming soon. Real reward rules are not connected yet.`
                        )
                      }
                    >
                      <span className={`earn-icon ${tone}`}>
                        <Icon size={20} />
                      </span>

                      <span className="earn-text">
                        <b>{feature.title}</b>
                        <small>{feature.description}</small>
                        <em>{feature.status}</em>
                      </span>

                      <ChevronRight
                        className="earn-chevron"
                        size={16}
                      />
                    </button>
                  );
                })}

                <button
                  className="earn-card"
                  onClick={() => jumpTo("game")}
                >
                  <span className="earn-icon blue">
                    <Coins size={20} />
                  </span>

                  <span className="earn-text">
                    <b>XP Catcher</b>
                    <small>Catch coins in a mini-game.</small>
                    <em>Play Demo</em>
                  </span>

                  <ChevronRight
                    className="earn-chevron"
                    size={16}
                  />
                </button>
              </div>
            </section>

            {/* XP Catcher demo game */}
            <section className="panel game-panel" id="game">
              <div className="section-head">
                <div>
                  <p className="eyebrow">
                    <Gamepad2 size={14} /> PLAY • ENGAGE • PROGRESS
                  </p>

                  <h2>XP Catcher</h2>

                  <p className="muted">
                    Catch 10 coins to complete the demo challenge.
                  </p>
                </div>

                <span className="demo-pill">DEMO GAME</span>
              </div>

              <div
                className={`game-arena ${
                  game === "complete" ? "game-won" : ""
                }`}
              >
                {game === "ready" && (
                  <>
                    <div className="coin-orbit">
                      <Coins size={48} />
                      <Sparkles size={16} />
                    </div>

                    <h3>Ready to catch?</h3>

                    <p>
                      Start the game and tap 10 coins to finish.
                    </p>

                    <button
                      className="gold-button"
                      onClick={startGame}
                    >
                      <Play size={16} fill="currentColor" />
                      Start Game
                    </button>
                  </>
                )}

                {game === "playing" && (
                  <>
                    <div className="game-score">
                      <span>YOUR SCORE</span>

                      <strong>
                        {score}
                        <small> / 10</small>
                      </strong>
                    </div>

                    <div className="coin-rain">
                      {Array.from({ length: 10 }, (_, i) => (
                        <button
                          key={i}
                          className={`falling-coin coin-${i}`}
                          onClick={catchCoin}
                          aria-label={`Catch coin ${i + 1}`}
                        >
                          <Coins size={24} />
                        </button>
                      ))}
                    </div>

                    <p>Tap any coin to catch it!</p>
                  </>
                )}

                {game === "complete" && (
                  <>
                    <div className="trophy-mark">
                      <Trophy size={38} />
                    </div>

                    <p className="eyebrow">
                      CHALLENGE COMPLETE!
                    </p>

                    <h3>Outstanding!</h3>

                    <div className="final-score">
                      +{levelData.gameRewardXP}
                      <small> Demo XP</small>
                    </div>

                    <p>
                      You caught all 10 coins. Your demo XP reward
                      is ready to claim.
                    </p>

                    <button
                      className="gold-button"
                      onClick={claimReward}
                    >
                      <Gift size={16} /> Claim Demo Reward
                    </button>

                    <button
                      className="text-action"
                      onClick={startGame}
                    >
                      <RotateCcw size={14} /> Play Again
                    </button>
                  </>
                )}
              </div>

              <div className="game-foot">
                <span>
                  <Coins size={15} /> Catch 10 coins
                </span>

                <span>
                  <Zap size={15} /> +{levelData.gameRewardXP} XP on claim
                </span>

                <span>
                  <ShieldCheck size={15} /> Demo only
                </span>
              </div>
            </section>

            {/* Level roadmap from levelData.js */}
            <section
              className="panel roadmap-panel"
              id="roadmap"
            >
              <div className="section-head">
                <div>
                  <p className="eyebrow">KEEP CLIMBING</p>

                  <h2>Level Roadmap</h2>

                  <p className="muted">
                    Track your milestones and upcoming rewards.
                  </p>
                </div>

                <button
                  className="quiet-icon"
                  onClick={() => setInfo(!info)}
                  aria-label="Roadmap information"
                >
                  <CircleHelp size={17} />
                </button>
              </div>

              <div className="roadmap">
                {levelRoadmap.map((item) => {
                  const isCurrent = item.status === "current";

                  const statusLabel = {
                    completed: "Completed",
                    current: "Current",
                    next: "Next Goal",
                    locked: "Locked",
                  }[item.status] || item.status;

                  return (
                    <div
                      className={`roadmap-item ${
                        isCurrent ? "current" : ""
                      }`}
                      key={item.level}
                    >
                      <span className="roadmap-line" />

                      <span className="roadmap-badge">
                        {item.status === "completed" ? (
                          <Check size={17} />
                        ) : (
                          String(item.level).padStart(2, "0")
                        )}
                      </span>

                      <b>
                        Level{" "}
                        {String(item.level).padStart(2, "0")}
                      </b>

                      <small>{item.name}</small>

                      <em>{statusLabel}</em>

                      <small>{item.reward}</small>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="side-column">
            <section className="panel level-up-card">
              <div className="eyebrow">
                <Sparkles size={14} /> NEXT LEVEL
              </div>

              <p>Keep progressing toward your next milestone.</p>

              <div className="big-medal">
                <Award size={52} />

                <strong>
                  {String(levelData.nextLevel).padStart(2, "0")}
                </strong>

                <span>LEVEL</span>
              </div>

              <h3>{levelData.nextLevelName || "Next Level"}</h3>

              <p className="muted">
                {xpRemaining.toLocaleString()} XP remaining
              </p>

              <div className="reward-pair">
                <div>
                  <span className="mini-coin">V</span>
                  <b>
                    {levelData.nextLevelReward.amount}{" "}
                    {levelData.nextLevelReward.type}
                  </b>
                </div>
              </div>

              <ul className="benefits">
                <li>
                  <Check size={14} /> Reach your next level
                </li>

                <li>
                  <Check size={14} /> Track your XP progress
                </li>

                <li>
                  <Check size={14} /> Explore upcoming activities
                </li>
              </ul>

              <button
                className="gold-button full"
                onClick={() => jumpTo("rewards")}
              >
                View Rewards <ArrowRight size={16} />
              </button>
            </section>

            {/* Recent activity */}
            <section className="panel activity-panel" id="activity">
              <div className="section-head compact">
                <div>
                  <p className="eyebrow">YOUR PROGRESS</p>
                  <h2>Recent Activity</h2>
                </div>

                <button
                  className="quiet-icon"
                  onClick={() => setActivityFilter(!activityFilter)}
                  aria-label="Toggle activity filter"
                >
                  <Filter size={16} />
                </button>
              </div>

              {activityFilter && (
                <p className="info-note">
                  Showing the first three demo activities.
                </p>
              )}

              <div className="activity-list">
                {activities
                  .slice(0, activityFilter ? 3 : 5)
                  .map(
                    ({
                      title,
                      sub,
                      value,
                      icon: Icon,
                      tone,
                    }) => (
                      <div
                        className="activity-item"
                        key={title}
                      >
                        <span className={`activity-icon ${tone}`}>
                          <Icon size={18} />
                        </span>

                        <span className="activity-copy">
                          <b>{title}</b>
                          <small>{sub}</small>
                        </span>

                        <span className="activity-value">
                          {value}
                        </span>
                      </div>
                    )
                  )}
              </div>

              <button
                className="text-action activity-more"
                onClick={() => setActivityFilter(!activityFilter)}
              >
                {activityFilter ? "Show all activity" : "View less"}
                <ArrowRight size={14} />
              </button>

              <div className="summary-box">
                <b>Demo Summary</b>

                <div>
                  <span>
                    <i className="xp-dot">XP</i>
                    <strong>{xp.toLocaleString()} XP</strong>
                    <small>Current XP</small>
                  </span>

                  <span>
                    <i className="ve-dot">V</i>
                    <strong>{ves} VEs</strong>
                    <small>Demo balance</small>
                  </span>

                  <span>
                    <i className="gem-dot">◆</i>
                    <strong>{gems}</strong>
                    <small>Demo gems</small>
                  </span>
                </div>
              </div>
            </section>
          </aside>
        </section>

        <footer className="footer">
          <span>
            VELOOP Rewards · Gamified Level Progression Hub
          </span>

          <span>Prototype UI · Demo values only</span>
        </footer>
      </div>
    </main>
  );
}



