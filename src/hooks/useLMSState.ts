import { useState, useEffect } from "react";
import { Week, DayLesson, BossLab, ChecklistItem } from "../types/curriculum";
import { generateDefaultCurriculum } from "../data/curriculum";

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  avatar: string; // e.g. "specter", "reaper", "ghost"
  name: string;
}

export interface GitHubSettings {
  token: string;
  username: string;
  repo: string;
}

export const AVATARS = [
  { id: "ghost", name: "Ghost Protagonist", desc: "Expert in silent client deconstruction and sneaky recons.", emoji: "🥷" },
  { id: "reaper", name: "Kernel Reaper", desc: "Low-level system exploits, port scanner enthusiast.", emoji: "💀" },
  { id: "phantom", name: "Memory Phantom", desc: "Specializes in business logic bypasses and race conditions.", emoji: "👻" },
  { id: "specter", name: "API Specter", desc: "Bolas, IDORs, and GraphQL schema reverse-engineering.", emoji: "👁️" }
];

export const useLMSState = () => {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [stats, setStats] = useState<UserStats>({
    xp: 0,
    level: 1,
    streak: 3, // Mock a 3-day starting streak
    avatar: "ghost",
    name: "Viper_0x"
  });
  const [gitHubSettings, setGitHubSettings] = useState<GitHubSettings>({
    token: "",
    username: "",
    repo: "bug-bounty-mastery-scripts"
  });
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [selectedDayId, setSelectedDayId] = useState<string>("week-1-monday");
  const [viewingBossLab, setViewingBossLab] = useState<boolean>(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedWeeks = localStorage.getItem("bbm_weeks");
    const savedStats = localStorage.getItem("bbm_stats");
    const savedGitHub = localStorage.getItem("bbm_github");

    if (savedWeeks) {
      try {
        setWeeks(JSON.parse(savedWeeks));
      } catch (e) {
        setWeeks(generateDefaultCurriculum());
      }
    } else {
      setWeeks(generateDefaultCurriculum());
    }

    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {}
    }

    if (savedGitHub) {
      try {
        setGitHubSettings(JSON.parse(savedGitHub));
      } catch (e) {}
    }
  }, []);

  // Sync to LocalStorage on modifications
  const saveStateToLocalStorage = (newWeeks: Week[], newStats: UserStats, newGitHub: GitHubSettings) => {
    localStorage.setItem("bbm_weeks", JSON.stringify(newWeeks));
    localStorage.setItem("bbm_stats", JSON.stringify(newStats));
    localStorage.setItem("bbm_github", JSON.stringify(newGitHub));
  };

  const updateStats = (updater: Partial<UserStats>) => {
    const updated = { ...stats, ...updater };
    setStats(updated);
    saveStateToLocalStorage(weeks, updated, gitHubSettings);
  };

  const updateGitHubSettings = (updater: Partial<GitHubSettings>) => {
    const updated = { ...gitHubSettings, ...updater };
    setGitHubSettings(updated);
    saveStateToLocalStorage(weeks, stats, updated);
  };

  // Add Experience Points (XP) & Handle Leveling
  const addXP = (amount: number, currentStats: UserStats): UserStats => {
    const totalXP = currentStats.xp + amount;
    const levelXP = 1000; // 1000 XP per level
    const newLevel = Math.floor(totalXP / levelXP) + 1;
    return {
      ...currentStats,
      xp: totalXP,
      level: newLevel
    };
  };

  // Check if a day's checklist is completed
  const isChecklistComplete = (checklist: ChecklistItem[]) => {
    return checklist.length > 0 && checklist.every((item) => item.completed);
  };

  // Strict Sequential Unlocking Logic
  const handleVerifyDayFlag = (weekIndex: number, dayId: string, flagInput: string) => {
    const updatedWeeks = [...weeks];
    const targetDay = updatedWeeks[weekIndex].days.find(d => d.id === dayId);

    if (!targetDay) return { success: false, message: "Lesson not found." };

    if (targetDay.digitalArena.correctFlag === flagInput.trim()) {
      targetDay.digitalArena.flagSubmitted = flagInput.trim();
      targetDay.digitalArena.flagVerified = true;

      // Attempt completion if other checklist metrics are met
      let completedStateChanged = false;
      if (!targetDay.completed && isChecklistComplete(targetDay.automation.checklist)) {
        targetDay.completed = true;
        completedStateChanged = true;
      }

      let updatedStats = stats;
      if (completedStateChanged) {
        updatedStats = addXP(300, updatedStats); // +300 XP for full day completion
        updatedStats.streak += 1;
      } else {
        updatedStats = addXP(100, updatedStats); // +100 XP for flag verify
      }

      // Check if we unlock the next day in line
      const currentDayIndex = updatedWeeks[weekIndex].days.findIndex(d => d.id === dayId);
      if (currentDayIndex !== -1 && targetDay.completed) {
        if (currentDayIndex < 5) {
          // Unlock Tuesday to Saturday in same week
          updatedWeeks[weekIndex].days[currentDayIndex + 1].unlocked = true;
        } else {
          // Saturday completed! Unlock Boss Lab of current week
          updatedWeeks[weekIndex].bossLab.completed = false; // reset/ensure setup
        }
      }

      setWeeks(updatedWeeks);
      setStats(updatedStats);
      saveStateToLocalStorage(updatedWeeks, updatedStats, gitHubSettings);

      return { success: true, message: "Flag verified! +100 XP earned." };
    } else {
      return { success: false, message: "Invalid flag. Check the parameters or inspect the simulation again." };
    }
  };

  // Toggle checklist item
  const handleToggleChecklist = (weekIndex: number, dayId: string, itemId: string) => {
    const updatedWeeks = [...weeks];
    const targetDay = updatedWeeks[weekIndex].days.find(d => d.id === dayId);
    if (!targetDay) return;

    targetDay.automation.checklist = targetDay.automation.checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );

    // If checklist completed and flag verified, set day completed
    let completedStateChanged = false;
    if (targetDay.digitalArena.flagVerified && isChecklistComplete(targetDay.automation.checklist)) {
      if (!targetDay.completed) {
        targetDay.completed = true;
        completedStateChanged = true;
      }
    } else {
      targetDay.completed = false;
    }

    let updatedStats = stats;
    if (completedStateChanged) {
      updatedStats = addXP(200, updatedStats); // Completion reward
      updatedStats.streak += 1;

      // Unlock next day
      const currentDayIndex = updatedWeeks[weekIndex].days.findIndex(d => d.id === dayId);
      if (currentDayIndex !== -1) {
        if (currentDayIndex < 5) {
          updatedWeeks[weekIndex].days[currentDayIndex + 1].unlocked = true;
        }
      }
    }

    setWeeks(updatedWeeks);
    setStats(updatedStats);
    saveStateToLocalStorage(updatedWeeks, updatedStats, gitHubSettings);
  };

  // Simulate or execute Git Commit action
  const handleMarkAsCommitted = (weekIndex: number, dayId: string) => {
    const updatedWeeks = [...weeks];
    const targetDay = updatedWeeks[weekIndex].days.find(d => d.id === dayId);
    if (!targetDay) return;

    if (!targetDay.automation.committed) {
      targetDay.automation.committed = true;
      const updatedStats = addXP(150, stats); // +150 XP for GitHub commit
      setWeeks(updatedWeeks);
      setStats(updatedStats);
      saveStateToLocalStorage(updatedWeeks, updatedStats, gitHubSettings);
    }
  };

  // Verify Boss Lab Flag
  const handleVerifyBossFlag = (weekIndex: number, flagInput: string) => {
    const updatedWeeks = [...weeks];
    const bossLab = updatedWeeks[weekIndex].bossLab;

    if (bossLab.correctFlag === flagInput.trim()) {
      bossLab.flagSubmitted = flagInput.trim();
      bossLab.flagVerified = true;

      // Unlocks are triggered when the VDP report is also filled in and submitted
      let updatedStats = addXP(500, stats); // +500 XP for boss flag

      // Let's trigger state sync
      setWeeks(updatedWeeks);
      setStats(updatedStats);
      saveStateToLocalStorage(updatedWeeks, updatedStats, gitHubSettings);
      return { success: true, message: "Boss Flag verified! Now complete and submit the Enterprise VDP Report." };
    } else {
      return { success: false, message: "Incorrect flag. Review your vulnerability exploit parameters." };
    }
  };

  // Submit VDP Report
  const handleSubmitVDPReport = (
    weekIndex: number,
    title: string,
    severity: "Low" | "Medium" | "High" | "Critical",
    description: string,
    remediation: string
  ) => {
    const updatedWeeks = [...weeks];
    const bossLab = updatedWeeks[weekIndex].bossLab;

    bossLab.vdpReport = {
      title,
      severity,
      description,
      remediation,
      submitted: true
    };

    if (bossLab.flagVerified) {
      bossLab.completed = true;
      updatedWeeks[weekIndex].completed = true;

      // Unlock Week index + 1
      if (weekIndex < 11) {
        updatedWeeks[weekIndex + 1].unlocked = true;
        // Unlock next week's Monday (which is the first day index 0)
        updatedWeeks[weekIndex + 1].days[0].unlocked = true;
      }
    }

    const updatedStats = addXP(400, stats); // +400 XP for reporting tasks
    setWeeks(updatedWeeks);
    setStats(updatedStats);
    saveStateToLocalStorage(updatedWeeks, updatedStats, gitHubSettings);

    return { success: true, message: "VDP Report Submitted successfully!" };
  };

  // Reset Progress completely
  const handleResetProgress = () => {
    const defaultWeeks = generateDefaultCurriculum();
    const defaultStats: UserStats = {
      xp: 0,
      level: 1,
      streak: 0,
      avatar: "ghost",
      name: "Viper_0x"
    };
    setWeeks(defaultWeeks);
    setStats(defaultStats);
    setSelectedWeekIndex(0);
    setSelectedDayId("week-1-monday");
    setViewingBossLab(false);
    localStorage.removeItem("bbm_weeks");
    localStorage.removeItem("bbm_stats");
  };

  // Calculate dynamic Job Readiness progress
  const getJobReadinessStats = () => {
    let totalPracticalPoints = 0; // max 40
    let totalCommitPoints = 0;    // max 30
    let totalReportPoints = 0;    // max 30

    let totalLessonsCount = 0;
    let completedFlagsCount = 0;
    let committedScriptsCount = 0;
    let checklistCompletedCount = 0;

    let totalBossLabs = 12;
    let verifiedBossFlags = 0;
    let submittedBossVDPs = 0;

    weeks.forEach((w) => {
      w.days.forEach((day) => {
        totalLessonsCount++;
        if (day.digitalArena.flagVerified) completedFlagsCount++;
        if (day.automation.committed) committedScriptsCount++;
        if (isChecklistComplete(day.automation.checklist)) checklistCompletedCount++;
      });

      if (w.bossLab.flagVerified) verifiedBossFlags++;
      if (w.bossLab.vdpReport.submitted) submittedBossVDPs++;
    });

    // 40% practical lab flags (Lessons + Boss Labs)
    const lessonsFlagWeight = 25; // 25% lessons flags
    const bossFlagWeight = 15;    // 15% boss flags
    const lessonsFlagProgress = totalLessonsCount ? (completedFlagsCount / totalLessonsCount) * lessonsFlagWeight : 0;
    const bossFlagProgress = (verifiedBossFlags / totalBossLabs) * bossFlagWeight;
    totalPracticalPoints = lessonsFlagProgress + bossFlagProgress;

    // 30% GitHub tool automation commits
    totalCommitPoints = totalLessonsCount ? (committedScriptsCount / totalLessonsCount) * 30 : 0;

    // 30% structured enterprise reporting (Checklists + Boss VDP)
    const checklistWeight = 15;
    const bossVDPWeight = 15;
    const checklistProgress = totalLessonsCount ? (checklistCompletedCount / totalLessonsCount) * checklistWeight : 0;
    const bossVDPProgress = (submittedBossVDPs / totalBossLabs) * bossVDPWeight;
    totalReportPoints = checklistProgress + bossVDPProgress;

    const totalReadinessScore = Math.min(100, Math.round(totalPracticalPoints + totalCommitPoints + totalReportPoints));

    // Dynamic competency mapping
    const competencyMap: Record<string, { completed: number; total: number }> = {};
    weeks.forEach((w) => {
      w.days.forEach((day) => {
        const comp = day.competency;
        if (!competencyMap[comp]) {
          competencyMap[comp] = { completed: 0, total: 0 };
        }
        competencyMap[comp].total++;
        if (day.completed) {
          competencyMap[comp].completed++;
        }
      });
    });

    const competenciesScores = Object.entries(competencyMap).map(([name, stats]) => {
      const percentage = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;
      return { name, score: percentage };
    });

    return {
      score: totalReadinessScore,
      practical: Math.round(totalPracticalPoints * (100 / 40)),
      commits: Math.round(totalCommitPoints * (100 / 30)),
      reports: Math.round(totalReportPoints * (100 / 30)),
      competencies: competenciesScores
    };
  };

  return {
    weeks,
    stats,
    gitHubSettings,
    selectedWeekIndex,
    selectedDayId,
    viewingBossLab,
    setWeeks,
    setStats,
    setGitHubSettings,
    setSelectedWeekIndex,
    setSelectedDayId,
    setViewingBossLab,
    updateStats,
    updateGitHubSettings,
    handleVerifyDayFlag,
    handleToggleChecklist,
    handleMarkAsCommitted,
    handleVerifyBossFlag,
    handleSubmitVDPReport,
    handleResetProgress,
    getJobReadinessStats,
  };
};
