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

export interface TextbookReference {
  bookTitle: string;
  author: string;
  chapter: string;
  authorMethodology: string;
  adviceToSolveOrBypass: string;
}

export interface RedTeamPerspective {
  discoveryAndWeaponization: string;
  burpSuiteExecutionSteps: string[];
  jsDeconstructionGuide: {
    sourceMappingAndDevTools: string;
    deobfuscationTechnique: string;
    sinkAndSourceIdentification: string;
    apiEndpointAndKeyMining: string;
    clientSideLogicBypass: string;
  };
}

export interface BlueTeamPerspective {
  logAnalysisExamples: {
    serverType: "Nginx" | "Apache" | "AWS CloudWatch" | "Application Log";
    logSnippet: string;
    anomalyExplanation: string;
  }[];
  indicatorsOfCompromise: string[];
  remediationCodeSnippet: {
    language: string;
    description: string;
    secureCode: string;
  };
}

export interface AutomationWorkshop {
  toolType: "Python" | "Bash" | "Nuclei YAML";
  scriptName: string;
  code: string;
  lineByLineExplanation: string[];
}

export interface PortSwiggerGuide {
  directLabUrl: string;
  strategicSolvingGuide: string[];
}

export interface DigitalPlaygroundLab {
  title: string;
  mode: "Terminal Simulation" | "Mock DevTools" | "Raw Code Editor";
  instructions: string;
  initialCodeOrConsole: string;
  expectedInputOrFlag: string;
  hints: string[];
  correctFeedback: string;
}

export interface IntegrationPortfolio {
  githubAssetName: string;
  githubAssetType: string;
  githubAssetDescription: string;
  githubCodeOrMarkdown: string;
  linkedInTemplate: string;
}

export interface DayLesson {
  id: string; // e.g. "week-1-monday"
  weekIndex: number; // 0 to 11
  dayName: string; // e.g. "Monday"
  title: string;
  durationMinutes: number;
  unlocked: boolean;
  completed: boolean;
  competency: string;

  // Master Integration Badges
  burpToolingUsed: string;
  portSwiggerLabLink: string;

  // Exact 8-Part Dual-Perspective Deep-Dive Architecture
  architecture: {
    section1_RootCause: {
      foundationalArchitecture: string;
      codingMistakeAndLogicFailure: string;
      protocolAndCodeLevelImpact: string;
    };
    section2_TextbookCrossReference: {
      textbookList: TextbookReference[];
      overallResolutionStrategy: string;
    };
    section3_RedTeamPerspective: RedTeamPerspective;
    section4_BlueTeamPerspective: BlueTeamPerspective;
    section5_AutomationWorkshop: AutomationWorkshop;
    section6_PortSwiggerGuide: PortSwiggerGuide;
    section7_DigitalPlayground: DigitalPlaygroundLab;
    section8_PortfolioIntegration: IntegrationPortfolio;
  };

  // Backwards compatibility theory and automation fields
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
  id: string;
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
