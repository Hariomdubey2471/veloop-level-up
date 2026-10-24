import { useState } from "react";
import styles from "./LevelRoadmap.module.css";

export default function LevelRoadmap({ levels }) {
  const [selectedLevel, setSelectedLevel] = useState(4);

  const selected = levels.find(
    (item) => item.level === selectedLevel
  );

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div>
          <p className={styles.eyebrow}>YOUR JOURNEY</p>
          <h2>Level Progression</h2>
          <p className={styles.subtitle}>
            Every milestone brings you closer to new rewards.
          </p>
        </div>

        <span className={styles.counter}>
          {levels.filter((item) => item.status === "completed").length}
          {" / "}
          {levels.length} milestones
        </span>
      </div>

      <div className={styles.roadmap}>
        {levels.map((item, index) => (
          <div className={styles.levelWrapper} key={item.level}>
            <button
              type="button"
              className={[
                styles.level,
                styles[item.status],
                selectedLevel === item.level ? styles.selected : "",
              ].join(" ")}
              onClick={() => setSelectedLevel(item.level)}
              aria-pressed={selectedLevel === item.level}
              aria-label={`Level ${item.level}: ${item.status}`}
            >
              <span className={styles.number}>
                {item.status === "completed"
                  ? "✓"
                  : item.status === "locked"
                  ? "🔒"
                  : String(item.level).padStart(2, "0")}
              </span>

              <strong>
                Level {String(item.level).padStart(2, "0")}
              </strong>

              <span className={styles.reward}>
                {item.reward}
              </span>

              <span className={styles.status}>
                {item.status === "current"
                  ? "YOU ARE HERE"
                  : item.status === "next"
                  ? "NEXT GOAL"
                  : item.status.toUpperCase()}
              </span>
            </button>

            {index < levels.length - 1 && (
              <div
                className={[
                  styles.connector,
                  item.status === "completed"
                    ? styles.connectorComplete
                    : "",
                ].join(" ")}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className={styles.details} aria-live="polite">
          <div>
            <span className={styles.detailsLabel}>SELECTED MILESTONE</span>
            <h3>Level {String(selected.level).padStart(2, "0")}</h3>
            <p>{selected.reward}</p>
          </div>

          <span className={styles.detailsStatus}>
            {selected.status === "current"
              ? "Your current level"
              : selected.status === "completed"
              ? "Milestone completed"
              : selected.status === "next"
              ? "Your next goal"
              : "Future milestone"}
          </span>
        </div>
      )}
    </section>
  );
}