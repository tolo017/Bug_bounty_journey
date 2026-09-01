export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface BookLesson {
  title: string;
  author: string;
  chapterLesson: string;
  whatTheyAreDoing: string;
  detailedExplanation: string;
  practicalExample: string;
  howToAdapt: string;
  takeaway: string;
}

export interface CreatorLesson {
  creatorName: string;
  channelOrWebsite: string;
  lessonTitle: string;
  broadExplanation: string;
  methodologyOverview: string;
  stepByStepWalkthrough: string[];
  practicalCommand: string;
  specificVideoUrl: string;
}

export interface RealWorldHuntingGuide {
  targetDiscoveryDorks: string[];
  reconFilterStrategy: string;
  realWorldTriageTips: string;
  bypassTricks: string;
}

export interface WhereToHuntAndAiAutomation {
  targetProgramLinks: { name: string; url: string; platform: string }[];
  aiAutomatedHuntingWorkflow: string;
  automatedScrapersAndDorks: string[];
}

export interface StudentVdpEvaluation {
  prompt: string;
  titleInput: string;
  cvssInput: string;
  descriptionInput: string;
  stepsInput: string;
  remediationInput: string;
  evaluated: boolean;
  score: string;
  feedback: string;
}

export interface DayLesson {
  id: string; // e.g. "week-1-monday"
  weekIndex: number; // 0 to 11 (Week 1 to 12)
  dayName: string; // e.g. "Monday"
  title: string; // e.g. "DOM Clobbering & Document Object Manipulation"
  durationMinutes: number;
  unlocked: boolean;
  completed: boolean;
  competency: string; // e.g. "Client-Side Security"

  // Expanded Beginner-Friendly Sections
  theory: {
    title: string;
    duration: string; // e.g. "30 Mins"
    beginnerAnalogy: { story: string; realWorldComparison: string }; // Simple real-world story
    chatGptPromptStrategy: string; // ChatGPT & AI prompt strategy for bug bounty
    recommendedBooks: BookLesson[]; // Detailed book chapter lessons with practicals & adaptations
    creatorLessons: CreatorLesson[]; // Detailed YouTube creator & website lessons with specific video URLs
    howToDoRealWorldHunting: RealWorldHuntingGuide; // Real World Hunting Field Guide
    whereToHuntAndAiAutomation: WhereToHuntAndAiAutomation; // Active Hunting Scopes & AI Automation
    whatYouAreDoing: string; // Detailed breakdown of researcher actions
    vulnerabilityOrigin: string; // How the vulnerability comes about (Root Cause)
    pentesterFocus: string; // What to look for as a pentester
    payloadCrafting: string; // How to come up with and construct payloads
    burpSuiteSetup: string; // How to set up Burp Suite (Proxy, Match/Replace, Extensions)
    blueTeamDefense: string; // What defenders look for, prevention & secure coding
    developerMindset: string; // Developer mindset assumption
    psychologicalError: string; // Cognitive bias / error
    attackVectors: string; // Attack vector execution chain
    usefulResources: { name: string; url: string; category: string }[]; // External specs & cheat sheets
    industryInsight: string; // Industry insight & fun fact placed at the bottom
  };
  digitalArena: {
    title: string;
    duration: string; // "90 Mins"
    stepByStepTutorial: string[]; // Step-by-step tutorial inside the Playground Area
    labLink: string; // PortSwigger lab reference
    instructions: string;
    interactiveConsolePlaceholder: string;
    correctFlag: string;
    flagSubmitted: string;
    flagVerified: boolean;
  };
  automation: {
    title: string;
    duration: string; // "30 Mins"
    pythonScript: string; // Python script (Automate Boring Stuff / Black Hat Python style)
    bashScript: string; // Bash script
    pythonExplanation: string;
    bashExplanation: string;
    vdpReportTemplate: {
      title: string;
      cvssVector: string;
      cvssScore: number;
      description: string;
      stepsToReproduce: string;
      remediation: string;
    };
    studentVdpTestingConsole: StudentVdpEvaluation; // Interactive student VDP evaluator after every lesson
    dailyAssignment: {
      title: string;
      objective: string;
      tasks: string[];
      deliverable: string;
    };
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
