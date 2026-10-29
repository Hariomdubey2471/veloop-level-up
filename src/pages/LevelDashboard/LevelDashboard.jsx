import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  Bell,
  Check,
  ChevronRight,
  CircleHelp,
  Crown,
  Flame,
  Gem,
  Gift,
  Home,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
  X,
} from "lucide-react";

import "./LevelDashboard.module.css";

const levels = [
  { number: 1, name: "Starter", reward: "50 VEs", status: "completed" },
  { number: 2, name: "Explorer", reward: "100 VEs", status: "completed" },
  { number: 3, name: "Achiever", reward: "10 Gems", status: "completed" },
  { number: 4, name: "Pro Member", reward: "Current level", status: "current" },
  { number: 5, name: "Elite", reward: "500 VEs", status: "next" },
  { number: 6, name: "Champion", reward: "2 Spins", status: "locked" },
];

const badges = [
  {
    title: "First Steps",
    description: "Your journey begins",
    icon: Rocket,
    tone: "blue",
    status: "Unlocked",
  },
  {
    title: "XP Hunter",
    description: "Earned your first XP",
    icon: Zap,
    tone: "purple",
    status: "Unlocked",
  },
  {
    title: "Pro Member",
    description: "Reached level 4",
    icon: ShieldCheck,
    tone: "gold",
    status: "Unlocked",
  },
  {
    title: "Elite Status",
    description: "Reach level 5",
    icon: Crown,
    tone: "pink",
    status: "Locked",
  },
];

const activities = [
  {
    title: "Play & Earn",
    description: "Play games and collect XP",
    reward: "+25 XP",
    icon: Play,
    tone: "purple",
  },
  {
    title: "Complete Missions",
    description: "Finish tasks to level up",
    reward: "+50 XP",
    icon: Target,
    tone: "blue",
  },
  {
    title: "Daily Streak",
    description: "Come back every day",
    reward: "+30 XP",
    icon: Flame,
    tone: "orange",
  },
];

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="vl-section-heading">
      <div>
        {eyebrow && <span className="vl-eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function LevelDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Level Up");
  const [notice, setNotice] = useState("");

  const currentXP = 6420;
  const requiredXP = 8000;
  const progress = Math.min((currentXP / requiredXP) * 100, 100);
  const remainingXP = Math.max(requiredXP - currentXP, 0);

  const handleActivity = (title) => {
    setNotice(`${title} selected. Connect this action to your app's feature.`);
  };

  return (
    <div className="vl-app">
      {menuOpen && (
        <button
          className="vl-mobile-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside className={`vl-sidebar ${menuOpen ? "vl-sidebar-open" : ""}`}>
        <div className="vl-brand">
          <div className="vl-brand-mark">
            <Zap size={22} fill="currentColor" />
          </div>
          <div>
            <span className="vl-brand-name">VELOOP</span>
            <span className="vl-brand-caption">REWARDS CLUB</span>
          </div>
          <button
            className="vl-icon-button vl-close-menu"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <div className="vl-workspace">
          <div className="vl-workspace-avatar">V</div>
          <div className="vl-workspace-copy">
            <span>Workspace</span>
            <strong>My Rewards</strong>
          </div>
          <MoreHorizontal size={19} className="vl-muted-icon" />
        </div>

        <span className="vl-nav-label">MENU</span>
        <nav className="vl-navigation" aria-label="Main navigation">
          {[
            { name: "Overview", icon: Home },
            { name: "Level Up", icon: Trophy },
            { name: "Rewards", icon: Gift },
            { name: "Achievements", icon: Award },
          ].map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`vl-nav-item ${activeNav === name ? "vl-nav-active" : ""}`}
              onClick={() => {
                setActiveNav(name);
                setMenuOpen(false);
                if (name !== "Level Up") {
                  setNotice(`${name} selected. Connect this section to your app.`);
                } else {
                  setNotice("");
                }
              }}
            >
              <Icon size={18} />
              <span>{name}</span>
              {name === "Rewards" && <span className="vl-nav-count">3</span>}
              {name === "Level Up" && <span className="vl-nav-indicator" />}
            </button>
          ))}
        </nav>

        <div className="vl-sidebar-bottom">
          <div className="vl-sidebar-promo">
            <div className="vl-promo-icon">
              <Sparkles size={19} />
            </div>
            <strong>Every XP counts.</strong>
            <p>Small steps. Bigger rewards. Keep moving forward.</p>
            <div className="vl-promo-progress">
              <span style={{ width: `${progress}%` }} />
            </div>
            <span className="vl-promo-foot">{Math.round(progress)}% to your next level</span>
          </div>

          <button
            className="vl-help-link"
            onClick={() => setNotice("Help center selected. Connect your support page here.")}
          >
            <CircleHelp size={18} />
            <span>Help & Support</span>
            <ArrowUpRight size={15} />
          </button>

          <div className="vl-profile">
            <div className="vl-profile-avatar">H</div>
            <div className="vl-profile-copy">
              <strong>Pro Member</strong>
              <span>Level 04 · Explorer+</span>
            </div>
            <MoreHorizontal size={20} className="vl-muted-icon" />
          </div>
        </div>
      </aside>

      <main className="vl-main">
        <header className="vl-topbar">
          <div className="vl-topbar-left">
            <button
              className="vl-icon-button vl-menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>
            <div className="vl-breadcrumb">
              <span>Workspace</span>
              <ChevronRight size={15} />
              <strong>Level Up</strong>
            </div>
          </div>

          <div className="vl-topbar-right">
            <div className="vl-status-pill">
              <span className="vl-live-dot" />
              All systems active
            </div>
            <button
              className="vl-icon-button vl-notification"
              aria-label="Notifications"
              onClick={() => setNotice("You're all caught up on notifications.")}
            >
              <Bell size={19} />
              <span />
            </button>
            <div className="vl-top-avatar">H</div>
          </div>
        </header>

        <div className="vl-content">
          <section className="vl-welcome">
            <div>
              <div className="vl-welcome-kicker">
                <Sparkles size={14} />
                YOUR PERSONAL PROGRESS HUB
              </div>
              <h1>Level up your <span>game.</span></h1>
              <p>Every challenge brings you closer to something extraordinary.</p>
            </div>
            <div className="vl-welcome-date">
              <span className="vl-date-dot" />
              YOUR JOURNEY IS IN PROGRESS
            </div>
          </section>

          {notice && (
            <div className="vl-notice" role="status">
              <span>{notice}</span>
              <button onClick={() => setNotice("")} aria-label="Dismiss message">
                <X size={16} />
              </button>
            </div>
          )}

          <section className="vl-hero-card">
            <div className="vl-hero-grid" />
            <div className="vl-hero-content">
              <div className="vl-hero-label">
                <span className="vl-hero-label-dot" />
                CURRENT RANK
              </div>
              <div className="vl-hero-title-row">
                <h2>Pro Member</h2>
                <span className="vl-level-chip">
                  <Star size={13} fill="currentColor" />
                  LEVEL 04
                </span>
              </div>
              <p className="vl-hero-description">
                You’re building momentum. Keep it going and unlock your next big milestone.
              </p>

              <div className="vl-hero-xp">
                <div className="vl-xp-heading">
                  <div>
                    <span>YOUR EXPERIENCE POINTS</span>
                    <div className="vl-xp-value">
                      {currentXP.toLocaleString("en-IN")}
                      <span> / {requiredXP.toLocaleString("en-IN")} XP</span>
                    </div>
                  </div>
                  <div className="vl-xp-percent">
                    <strong>{Math.round(progress)}%</strong>
                    <span>COMPLETED</span>
                  </div>
                </div>
                <div
                  className="vl-progress-track"
                  role="progressbar"
                  aria-label="Level progress"
                  aria-valuemin={0}
                  aria-valuemax={requiredXP}
                  aria-valuenow={currentXP}
                >
                  <span style={{ width: `${progress}%` }}>
                    <i />
                  </span>
                </div>
                <div className="vl-xp-footer">
                  <span><Zap size={14} /> {currentXP.toLocaleString("en-IN")} XP earned</span>
                  <span>{remainingXP.toLocaleString("en-IN")} XP to Elite</span>
                </div>
              </div>

              <button className="vl-primary-button" onClick={() => handleActivity("Earn XP")}>
                Earn more XP <ArrowRight size={17} />
              </button>
            </div>

            <div className="vl-hero-art" aria-label="Pro Member level emblem">
              <div className="vl-orbit vl-orbit-one" />
              <div className="vl-orbit vl-orbit-two" />
              <div className="vl-art-spark vl-spark-one"><Sparkles size={19} /></div>
              <div className="vl-art-spark vl-spark-two"><Star size={15} fill="currentColor" /></div>
              <div className="vl-medal">
                <div className="vl-medal-inner">
                  <Crown size={49} strokeWidth={1.5} />
                  <span>PRO</span>
                </div>
              </div>
              <div className="vl-medal-caption">
                <span>YOUR CURRENT RANK</span>
                <strong>PRO MEMBER</strong>
              </div>
            </div>

            <div className="vl-hero-decoration vl-decoration-one" />
            <div className="vl-hero-decoration vl-decoration-two" />
          </section>

          <section className="vl-stats-grid" aria-label="Your statistics">
            <div className="vl-stat-card">
              <div className="vl-stat-top">
                <span className="vl-stat-icon vl-stat-purple"><Zap size={19} /></span>
                <span className="vl-stat-trend"><ArrowUpRight size={14} /> Active</span>
              </div>
              <span className="vl-stat-label">TOTAL XP EARNED</span>
              <strong className="vl-stat-value">6,420 <small>XP</small></strong>
              <span className="vl-stat-sub">Your progress so far</span>
            </div>

            <div className="vl-stat-card">
              <div className="vl-stat-top">
                <span className="vl-stat-icon vl-stat-gold"><Trophy size={19} /></span>
                <span className="vl-stat-neutral">4 of 6</span>
              </div>
              <span className="vl-stat-label">CURRENT LEVEL</span>
              <strong className="vl-stat-value">Level 04</strong>
              <span className="vl-stat-sub">Pro Member rank</span>
            </div>

            <div className="vl-stat-card">
              <div className="vl-stat-top">
                <span className="vl-stat-icon vl-stat-pink"><Award size={19} /></span>
                <span className="vl-stat-neutral">Keep going</span>
              </div>
              <span className="vl-stat-label">BADGES UNLOCKED</span>
              <strong className="vl-stat-value">3 <small>/ 4 shown</small></strong>
              <span className="vl-stat-sub">Your achievements</span>
            </div>

            <div className="vl-stat-card">
              <div className="vl-stat-top">
                <span className="vl-stat-icon vl-stat-blue"><Gem size={19} /></span>
                <span className="vl-stat-neutral">Next reward</span>
              </div>
              <span className="vl-stat-label">ELITE REWARD</span>
              <strong className="vl-stat-value">500 <small>VEs</small></strong>
              <span className="vl-stat-sub">Unlock at level 5</span>
            </div>
          </section>

          <section className="vl-section">
            <SectionHeading
              eyebrow="THE ROAD AHEAD"
              title="Your level journey"
              action={
                <span className="vl-section-counter">
                  <span>04</span> / 06 LEVELS
                </span>
              }
            />

            <div className="vl-roadmap-card">
              <div className="vl-roadmap-track" />
              <div className="vl-roadmap-grid">
                {levels.map((level) => (
                  <div className={`vl-level-item vl-level-${level.status}`} key={level.number}>
                    <div className="vl-level-node-wrap">
                      <div className="vl-level-node">
                        {level.status === "completed" ? (
                          <Check size={22} strokeWidth={2.5} />
                        ) : level.status === "current" ? (
                          <Crown size={25} />
                        ) : level.status === "next" ? (
                          <Star size={23} />
                        ) : (
                          <LockKeyhole size={19} />
                        )}
                      </div>
                      {level.status === "current" && <span className="vl-current-pulse" />}
                    </div>
                    <span className="vl-level-number">LEVEL {String(level.number).padStart(2, "0")}</span>
                    <strong className="vl-level-name">{level.name}</strong>
                    <span className="vl-level-reward">{level.reward}</span>
                    <span className="vl-level-status">
                      {level.status === "completed"
                        ? "Completed"
                        : level.status === "current"
                        ? "You are here"
                        : level.status === "next"
                        ? "Up next"
                        : "Locked"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="vl-roadmap-footer">
                <div className="vl-roadmap-footer-icon"><Target size={18} /></div>
                <div>
                  <strong>Elite is within reach.</strong>
                  <p>Earn {remainingXP.toLocaleString("en-IN")} more XP to unlock your next reward.</p>
                </div>
                <button
                  className="vl-text-button"
                  onClick={() => handleActivity("Level roadmap")}
                >
                  View goals <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>

          <section className="vl-section">
            <SectionHeading
              eyebrow="COLLECT YOUR WINS"
              title="Achievement badges"
              action={
                <button
                  className="vl-outline-button"
                  onClick={() => {
                    setActiveNav("Achievements");
                    setNotice("Achievements selected. Connect your achievements page here.");
                  }}
                >
                  All achievements <ArrowRight size={15} />
                </button>
              }
            />

            <div className="vl-badges-grid">
              {badges.map(({ title, description, icon: Icon, tone, status }, index) => (
                <article
                  className={`vl-badge-card vl-badge-${tone} ${status === "Locked" ? "vl-badge-locked" : ""}`}
                  key={title}
                >
                  <div className="vl-badge-card-top">
                    <span className="vl-badge-index">0{index + 1}</span>
                    <span className={`vl-badge-status ${status === "Unlocked" ? "vl-unlocked" : "vl-locked"}`}>
                      {status === "Unlocked" ? <Check size={12} /> : <LockKeyhole size={12} />}
                      {status}
                    </span>
                  </div>
                  <div className="vl-badge-art">
                    <div className="vl-badge-halo" />
                    <div className="vl-badge-medallion">
                      <div className="vl-badge-medallion-inner">
                        <Icon size={34} strokeWidth={1.8} />
                      </div>
                    </div>
                    <span className="vl-badge-star vl-badge-star-one"><Star size={12} fill="currentColor" /></span>
                    <span className="vl-badge-star vl-badge-star-two"><Sparkles size={13} /></span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <div className="vl-badge-bottom">
                    <span>{status === "Unlocked" ? "Achievement earned" : "Keep progressing"}</span>
                    <span className="vl-badge-bottom-icon">
                      {status === "Unlocked" ? <Check size={14} /> : <LockKeyhole size={13} />}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="vl-section vl-earn-section">
            <SectionHeading
              eyebrow="MAKE YOUR NEXT MOVE"
              title="Ways to earn XP"
              action={<span className="vl-small-note">MORE XP. MORE REWARDS.</span>}
            />

            <div className="vl-activities-grid">
              {activities.map(({ title, description, reward, icon: Icon, tone }) => (
                <article className="vl-activity-card" key={title}>
                  <div className={`vl-activity-icon vl-activity-${tone}`}>
                    <Icon size={23} />
                  </div>
                  <div className="vl-activity-content">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className="vl-activity-reward"><Zap size={13} /> {reward}</span>
                  </div>
                  <button
                    className="vl-activity-action"
                    onClick={() => handleActivity(title)}
                    aria-label={`Start ${title}`}
                  >
                    <ArrowUpRight size={19} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="vl-reward-banner">
            <div className="vl-reward-icon"><Gift size={28} /></div>
            <div className="vl-reward-copy">
              <span>YOUR NEXT BIG UNLOCK</span>
              <h2>Great things are just around the corner.</h2>
              <p>Reach Elite and claim your exclusive 500 VEs reward.</p>
            </div>
            <div className="vl-reward-side">
              <div className="vl-reward-amount"><Gem size={20} /> 500 <span>VEs</span></div>
              <button onClick={() => handleActivity("Next reward")}>
                Explore rewards <ArrowRight size={16} />
              </button>
            </div>
            <div className="vl-reward-glow" />
          </section>

          <footer className="vl-footer">
            <div className="vl-footer-brand">
              <span className="vl-footer-mark"><Zap size={15} fill="currentColor" /></span>
              <strong>VELOOP</strong>
              <span>Make every move count.</span>
            </div>
            <span className="vl-footer-copy">Your journey. Your rewards. Your pace.</span>
            <button onClick={() => setNotice("Help center selected. Connect your support page here.")}>
              Need help? <ArrowDownRight size={14} />
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default LevelDashboard;