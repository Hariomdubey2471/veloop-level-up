
export const levelData = {
  currentLevel: 4,
  currentLevelName: "Pro Member",
  currentXP: 6420,
  requiredXP: 8000,
  nextLevel: 5,
  nextLevelName: "Elite",

  nextLevelReward: {
    type: "VEs",
    amount: 500,
  },

  gameRewardXP: 25,
};

export const levelRoadmap = [
  {
    level: 1,
    name: "Starter",
    reward: "50 VEs",
    status: "completed",
  },
  {
    level: 2,
    name: "Explorer",
    reward: "100 VEs",
    status: "completed",
  },
  {
    level: 3,
    name: "Achiever",
    reward: "10 Gems",
    status: "completed",
  },
  {
    level: 4,
    name: "Pro Member",
    reward: "Current level",
    status: "current",
  },
  {
    level: 5,
    name: "Elite",
    reward: "500 VEs",
    status: "next",
  },
  {
    level: 6,
    name: "Champion",
    reward: "2 Spins",
    status: "locked",
  },
];

export const earningFeatures = [
  {
    id: "daily-challenge",
    title: "Daily Challenge",
    description: "Complete a daily mission to progress.",
    reward: "Demo: +50 XP",
    status: "Coming Soon",
  },
  {
    id: "refer-earn",
    title: "Refer & Earn",
    description: "Invite friends to discover VELOOP.",
    reward: "Reward rules pending",
    status: "Coming Soon",
  },
  {
    id: "watch-earn",
    title: "Watch & Earn",
    description: "Explore eligible viewing activities.",
    reward: "Reward rules pending",
    status: "Coming Soon",
  },
];

// Calculate XP progress percentage
export const getXPProgress = (xp, requiredXP) => {
  if (requiredXP <= 0) return 0;

  return Math.min(
    Math.max((xp / requiredXP) * 100, 0),
    100
  );
};

// Calculate XP remaining to reach the next level
export const getRemainingXP = (xp, requiredXP) => {
  return Math.max(requiredXP - xp, 0);
};
