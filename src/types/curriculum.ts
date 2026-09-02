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

export interface TheoreticalFoundation {
  breakdown: string;
  mappedBookChapters: { bookTitle: string; author: string; chapter: string; concept: string }[];
}

export interface VideoWalkthroughAnalysis {
  youtubeSearchTerms: string[];
  instructorSteps: {
    targetRecon: string;
    discoveryAndPayload: string;
    exploitation: string;
    mitigation: string;
  };
}

export interface CtfArenaTrack {
  environmentName: string;
  stepByStepLabGuide: string[];
  terminalPayload: string;
}

export interface AutomationAndReconArea {
  automationStrategy: string;
  nucleiTemplateCommand: string;
  ffufGobusterCommand: string;
  customPythonScript: string;
  customBashOneLiner: string;
}

export interface VdpReportWritingGuide {
  title: string;
  cvssVector: string;
  cvssScore: number;
  description: string;
  impact: string;
  stepsToReproduce: string;
  remediation: string;
}

export interface RealWorldCaseStudy {
  disclosedReportTitle: string;
  platform: string;
  bountyAwarded: string;
  targetCompany: string;
  hunterMethodology: string;
}

export interface LiveHuntingGrounds {
  curatedProgramLinks: { name: string; url: string; platform: string }[];
  searchDorks: string[];
  scopeInclusionTips: string;
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

  // Master Integration Hooks
  burpToolingUsed: string;
  portSwiggerLabLink: string;
  githubPushAsset: {
    name: string;
    type: "Python Tool" | "Nuclei/ffuf Config" | "Markdown Report" | "Automation Suite";
    description: string;
    codeOrContent: string;
  };
  linkedInMilestoneTemplate: string;

  // Exact 8-Part Architecture
  framework: {
    section1_TheoreticalFoundation: TheoreticalFoundation;
    section2_VideoWalkthroughAnalysis: VideoWalkthroughAnalysis;
    section3_CtfArenaTrack: CtfArenaTrack;
    section4_AutomationAndReconArea: AutomationAndReconArea;
    section5_VdpReportWritingGuide: VdpReportWritingGuide;
    section6_RealWorldCaseStudy: RealWorldCaseStudy;
    section7_LiveHuntingGrounds: LiveHuntingGrounds;
    section8_ExpertAuditNote: string;
  };

  theory: {
    title: string;
    duration: string;
    beginnerAnalogy?: { story: string; realWorldComparison: string };
    chatGptPromptStrategy?: string;
    recommendedBooks?: BookLesson[];
    creatorLessons?: CreatorLesson[];
    howToDoRealWorldHunting?: RealWorldHuntingGuide;
    whereToHuntAndAiAutomation?: WhereToHuntAndAiAutomation;
    whatYouAreDoing: string;
    vulnerabilityOrigin: string;
    pentesterFocus: string;
    payloadCrafting: string;
    burpSuiteSetup: string;
    blueTeamDefense: string;
    developerMindset?: string;
    psychologicalError?: string;
    usefulResources: { name: string; url: string; category: string }[];
    industryInsight: string;
  };
  digitalArena: {
    title: string;
    duration: string;
    stepByStepTutorial: string[];
    labLink: string;
    instructions: string;
    interactiveConsolePlaceholder: string;
    correctFlag: string;
    flagSubmitted: string;
    flagVerified: boolean;
  };
  automation: {
    title: string;
    duration: string;
    pythonScript: string;
    bashScript: string;
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
    studentVdpTestingConsole?: StudentVdpEvaluation;
    dailyAssignment?: {
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
