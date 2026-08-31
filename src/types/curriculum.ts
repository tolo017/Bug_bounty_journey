export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface DayLesson {
  id: string; // e.g. "week-1-monday"
  weekIndex: number; // 0 to 11 (Week 1 to 12)
  dayName: string; // e.g. "Monday"
  title: string; // e.g. "DOM Clobbering & JS Deconstruction"
  durationMinutes: number;
  unlocked: boolean;
  completed: boolean;
  competency: string; // e.g. "Client-Side Security"

  // Sections
  theory: {
    title: string;
    duration: string; // e.g. "30 Mins"
    content: string; // Markdown / Rich Text for theory explanation
    funAnalogy: string; // Beginner-friendly real-world fun analogy
    stepByStepTutorial: string[]; // Step-by-step practical tutorial guide
    developerMindset: string;
    psychologicalError: string;
    attackVectors: string;
  };
  digitalArena: {
    title: string;
    duration: string; // "90 Mins"
    labLink: string; // e.g. PortSwigger lab URL
    instructions: string;
    interactiveConsolePlaceholder: string;
    correctFlag: string;
    flagSubmitted: string;
    flagVerified: boolean;
  };
  automation: {
    title: string;
    duration: string; // "30 Mins"
    language: "python" | "bash";
    scriptTemplate: string;
    explanation: string;
    checklist: ChecklistItem[];
    committed: boolean;
    reported: boolean;
  };
}

export interface BossLab {
  id: string; // e.g. "week-1-boss"
  weekIndex: number;
  title: string;
  scenario: string;
  targetEnvironmentDescription: string;
  instructions: string;
  correctFlag: string;
  flagSubmitted: string;
  flagVerified: boolean;
  completed: boolean;
  vdpReport: {
    title: string;
    severity: "Low" | "Medium" | "High" | "Critical";
    description: string;
    remediation: string;
    submitted: boolean;
  };
}

export interface Week {
  weekNumber: number;
  title: string;
  unlocked: boolean;
  completed: boolean;
  days: DayLesson[];
  bossLab: BossLab;
}
