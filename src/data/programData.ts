// ============================================================
// Program Data Constants
// All curriculum, metrics, pod details, and rubric data in one
// easily updatable JSON-like module.
// ============================================================

export type Persona = 'student' | 'professor';

// ---------- Hero Metrics ----------
export const HERO_METRICS = [
  { value: '15-25+', unit: 'Yrs', label: 'Senior Architect Mentorship' },
  { value: '60-100', unit: '', label: 'Top Selected Interns' },
  { value: '10-12', unit: '', label: 'Autonomous Agile Pods (1:20)' },
  { value: '84.8', unit: '%', label: 'Final-Year 2026 Batch' },
  { value: '93.5', unit: '%', label: 'In-Person / Hybrid Demand' },
] as const;

// ---------- Employability Gap ----------
export const GAP_LEFT = [
  'Isolated syntax in local Jupyter notebooks',
  'Superficial Coursera/Udemy completion certificates',
  'Toy CRUD apps without auth or production DBs',
  'Zero Docker, CI/CD, or cloud deployment hygiene',
  'Solitary coding without Git branches or JIRA',
] as const;

export const GAP_RIGHT = [
  'Modular FastAPI/Spring Boot REST APIs with JWT & Pydantic',
  'Cloud Run / AWS ECS serverless deployments with GitHub Actions CI/CD',
  'Enterprise RAG (Pinecone, pgvector) + LangGraph Autonomous Agents',
  'Hardware integration (ESP32, ROS2, edge vision via YOLOv8/v11)',
  'Real client SOWs, RFPs, FinOps & Architect Defenses',
] as const;

// ---------- 6-Month Roadmap ----------
export interface RoadmapMonth {
  month: number;
  title: string;
  tech: string[];
  deliverable: string;
  color: string;
}

export const ROADMAP: RoadmapMonth[] = [
  {
    month: 1,
    title: 'Production Software, Cloud & Agile SDLC',
    tech: ['Enterprise Git', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'Docker', 'GCP Cloud Run', 'GitHub Actions CI/CD'],
    deliverable: 'Live containerized microservice deployed with automated CI/CD and Swagger docs.',
    color: '#38BDF8',
  },
  {
    month: 2,
    title: 'Applied ML & Industrial Computer Vision',
    tech: ['Pandas/NumPy', 'YOLOv8/v11', 'TensorRT (<50ms)', 'ONNX Runtime', 'C4 Architecture'],
    deliverable: 'Assembly defect & PPE safety compliance analyzer streaming real-time alerts.',
    color: '#818CF8',
  },
  {
    month: 3,
    title: 'Generative AI, Enterprise RAG & Autonomous Agents',
    tech: ['Vector DBs (Chroma/Pinecone/pgvector)', 'LangGraph', 'CrewAI', 'Ragas evaluation', 'RFP deconstruction'],
    deliverable: 'Enterprise multi-document RAG knowledge engine with autonomous research agent & guardrails.',
    color: '#10B981',
  },
  {
    month: 4,
    title: 'Physical AI, Edge Sensing & Cloud Robotics',
    tech: ['ESP32 DevKit', 'Raspberry Pi 4/5', 'MQTT', 'ROS2 Nodes', 'Voice-to-Action VLM Loop', 'Digital Twins'],
    deliverable: 'Cloud-LLM-driven physical robotic unit executing voice/vision-directed actions.',
    color: '#F59E0B',
  },
  {
    month: 5,
    title: 'Live SMB Client Incubation & Paid Delivery',
    tech: ['Real Client SOWs', 'SLAs', 'Performance Stipends', 'Agile Sprints', 'UAT Process'],
    deliverable: 'Feature-complete commercial SMB MVP live deployment & client UAT sign-off.',
    color: '#EC4899',
  },
  {
    month: 6,
    title: 'Architect Defense & Placement Grilling Engine',
    tech: ['System Design', 'FinOps/Security Audit', 'ATS STAR Resume', '4-Stage Mock Interviews (DSA, SysDesign, AI, HR)'],
    deliverable: 'Verified Technical Experience Letter, recruiter portfolio & direct architect referrals for top 15%.',
    color: '#EF4444',
  },
];

// ---------- Pod Roles ----------
export interface PodRole {
  role: string;
  count: string;
  tools: string;
  description: string;
  color: string;
}

export const POD_ROLES: PodRole[] = [
  {
    role: 'Pod Lead / Scrum Master',
    count: '1',
    tools: 'JIRA, Sprint Velocity, Client Demos',
    description: 'Orchestrates sprints, removes blockers, owns client communication and demo ceremonies.',
    color: '#F59E0B',
  },
  {
    role: 'Cloud & Backend Engineers',
    count: '2',
    tools: 'FastAPI, PostgreSQL, Docker, GCP/AWS',
    description: 'Build and deploy containerized microservices with automated CI/CD pipelines.',
    color: '#38BDF8',
  },
  {
    role: 'AI & GenAI Specialists',
    count: '2',
    tools: 'Vector DBs, RAG, LangGraph, Prompt Eng.',
    description: 'Design retrieval-augmented generation pipelines and autonomous AI agents.',
    color: '#818CF8',
  },
  {
    role: 'Physical AI & Edge Integrators',
    count: '1-2',
    tools: 'ESP32, ROS2, Sensors, Telemetry',
    description: 'Bridge cloud AI to physical hardware via MQTT, ROS2 nodes, and edge inference.',
    color: '#10B981',
  },
  {
    role: 'QA, Security & Docs Lead',
    count: '1',
    tools: 'Pytest, OpenAPI/Swagger, RFP Response',
    description: 'Ensures test coverage >80%, API documentation, security audits, and RFP artifacts.',
    color: '#EC4899',
  },
];

// ---------- Weekly Rhythm ----------
export const WEEKLY_RHYTHM = [
  { day: 'Monday', activity: 'Sprint Planning & JIRA Board Setup', type: 'planning' },
  { day: 'Tue–Thu', activity: 'Remote Async Coding & Slack Standups', type: 'dev' },
  { day: 'Wed Eve', activity: 'Veteran Industry Masterclass', type: 'learning' },
  { day: 'Friday', activity: 'Code Freeze & Automated PR Reviews', type: 'review' },
  { day: 'Saturday', activity: 'Full-Day In-Person Hub: Hardware Labs, Architecture Defenses, Live Demos, Mock Interviews', type: 'lab' },
] as const;

// ---------- Hardware Kit ----------
export interface HardwareItem {
  name: string;
  description: string;
  application: string;
}

export const HARDWARE_KIT: HardwareItem[] = [
  { name: 'ESP32 DevKit v1', description: 'Dual-core WiFi+BLE microcontroller', application: 'Edge sensor hub for IoT telemetry and MQTT streaming' },
  { name: 'Raspberry Pi 4/5 (8GB)', description: 'ARM-based single-board computer', application: 'Edge computer running YOLOv11 for defect classification' },
  { name: 'USB HD Camera', description: 'High-definition USB camera module', application: 'Real-time video analytics for industrial inspection' },
  { name: 'MPU6050 6-DOF IMU', description: 'Inertial measurement unit', application: 'Motion sensing for robotic arm positioning and vibration analysis' },
  { name: 'L298N Motor Driver', description: 'Dual H-bridge motor controller', application: 'Precision motor control for autonomous chassis navigation' },
  { name: 'Ultrasonic Sensors', description: 'HC-SR04 distance measurement', application: 'Obstacle detection and proximity sensing for autonomous navigation' },
];

// ---------- Enterprise Stack ----------
export const ENTERPRISE_STACK = [
  'GCP Cloud Run', 'AWS ECS', 'Vertex AI', 'Azure OpenAI',
  'GitHub Enterprise', 'JIRA', 'Pinecone', 'pgvector',
] as const;

// ---------- 5-Pillar Rubric ----------
export interface RubricPillar {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export const RUBRIC_PILLARS: RubricPillar[] = [
  { id: 'code', name: 'Code Quality & Git Rigor', description: '>80% unit tests, modular code, clean PRs, zero secrets in repo.', weight: 20 },
  { id: 'architecture', name: 'System & Architecture Design', description: 'C4 model diagrams, schema design, cost efficiency, security posture.', weight: 20 },
  { id: 'cloud', name: 'Live Cloud Deployment', description: 'Serverless latency benchmarks, automated CI/CD, zero-downtime deploys.', weight: 20 },
  { id: 'delivery', name: 'Client Delivery & Sprints', description: 'JIRA velocity tracking, on-time completion, SMB client acceptance.', weight: 20 },
  { id: 'defense', name: 'Executive Defense & Comms', description: 'Architecture defense before 15–25 yr architects, clear Q&A handling.', weight: 20 },
];

export const CREDENTIAL_TIERS = [
  { minScore: 0, maxScore: 69, tier: 'Incomplete', label: 'Below threshold — milestone criteria not met', color: '#64748B' },
  { minScore: 70, maxScore: 84, tier: 'Tier 1', label: 'Certificate of Industry Internship Experience', color: '#38BDF8' },
  { minScore: 85, maxScore: 94, tier: 'Tier 2', label: 'Verified Multi-Page Technical Experience Letter', color: '#10B981' },
  { minScore: 95, maxScore: 100, tier: 'Tier 3', label: 'Senior Architect Direct Recommendation Letter', color: '#F59E0B' },
] as const;

// ---------- Regional Footprint ----------
export const REGIONAL_HUBS = {
  nagpur: {
    name: 'Nagpur Hub',
    colleges: ['MKSSS Cummins College', 'St. Vincent Pallotti College', 'YCCE', 'KDK College'],
  },
  amravati: {
    name: 'Amravati Hub',
    colleges: ['Sipna COET', 'GCOEA', 'PR Pote Patil College', 'Prof Ram Meghe Institute'],
  },
} as const;

export const ROLLOUT_TIMELINE = [
  { phase: 'Weeks 1-2', activity: 'MoUs & College Outreach' },
  { phase: 'Weeks 3-4', activity: 'Diagnostic Screening Assessments' },
  { phase: 'Week 5', activity: 'Pod Provisioning & Kit Distribution' },
  { phase: 'Week 6', activity: 'Keynote Kickoff & Orientation' },
  { phase: 'Months 1-6', activity: 'Phased Execution & Delivery' },
] as const;

// ---------- FAQ ----------
export interface FAQItem {
  question: string;
  answer: string;
  audience: Persona | 'both';
}

export const FAQ_DATA: FAQItem[] = [
  { question: 'What are the eligibility requirements?', answer: 'Final-year BE/BTech students from CS, IT, AI/ML, E&TC, and Mechanical (robotics track). Minimum 6.0 CGPA recommended. A diagnostic screening assessment determines final selection.', audience: 'student' },
  { question: 'Is there a stipend?', answer: 'Yes — performance-linked project stipends are distributed upon successful client sign-off during Month 5 paid SMB delivery phase.', audience: 'student' },
  { question: 'Do I need my own hardware?', answer: 'No. Dedicated hardware kits (ESP32, Raspberry Pi, cameras, sensors) are provided per pod. You only need a laptop with Docker Desktop.', audience: 'student' },
  { question: 'How does capstone credit alignment work?', answer: 'The program is designed as a 6-month final-semester capstone internship. We execute formal MoUs with your institution aligning deliverables to university requirements.', audience: 'professor' },
  { question: 'How is attendance tracked?', answer: 'Daily async standups (Slack), weekly JIRA sprint velocity metrics, and mandatory Saturday in-person hub sessions. All tracked in real-time dashboards.', audience: 'professor' },
  { question: 'What is the evaluation rubric?', answer: 'A rigorous 5-pillar rubric: Code Quality (20%), Architecture Design (20%), Cloud Deployment (20%), Client Delivery (20%), and Executive Defense (20%).', audience: 'professor' },
  { question: 'Can multiple colleges participate?', answer: 'Absolutely. The program supports cohorts from multiple institutions in both Nagpur and Amravati hubs via regional MoU partnerships.', audience: 'professor' },
  { question: 'What happens after the program?', answer: 'Top performers receive Tier-3 architect recommendation letters, direct referrals to hiring partners, and a production-grade GitHub portfolio verified by senior architects.', audience: 'both' },
];
