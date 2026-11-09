import type { AgeBand, BadgeDef, Localized, QuizQuestion, SubjectId, Topic } from "@/types";

const same = (s: string): Localized => ({ en: s, te: s });
const L = (en: string, te: string): Localized => ({ en, te });

/* ---------- Topics (progress indicators) ---------- */
export const subjectTopics: Record<SubjectId, Record<AgeBand, Topic[]>> = {
  mathematics: {
    "7-9": [
      { title: L("Addition and Subtraction", "కూడికలు, తీసివేతలు"), lessons: 6, completed: 6 },
      { title: L("Multiplication Tables", "ఎక్కాలు"), lessons: 8, completed: 5 },
      { title: L("2D Shapes", "ద్విమితీయ ఆకారాలు"), lessons: 5, completed: 2 },
    ],
    "10-12": [
      { title: L("Fractions and Decimals", "భిన్నాలు, దశాంశాలు"), lessons: 8, completed: 6 },
      { title: L("Ratio and Percentages", "నిష్పత్తి, శాతాలు"), lessons: 7, completed: 3 },
      { title: L("Introduction to Algebra", "బీజగణిత పరిచయం"), lessons: 9, completed: 1 },
    ],
  },
  science: {
    "7-9": [
      { title: L("Living and Non-living Things", "సజీవ, నిర్జీవ వస్తువులు"), lessons: 5, completed: 5 },
      { title: L("States of Matter", "పదార్థ స్థితులు"), lessons: 6, completed: 3 },
      { title: L("Our Solar System", "మన సౌర కుటుంబం"), lessons: 7, completed: 1 },
    ],
    "10-12": [
      { title: L("Photosynthesis and Plant Life", "కిరణజన్య సంయోగక్రియ, మొక్కల జీవనం"), lessons: 8, completed: 5 },
      { title: L("Electricity and Circuits", "విద్యుత్తు, వలయాలు"), lessons: 9, completed: 4 },
      { title: L("Forces and Motion", "బలాలు, చలనం"), lessons: 8, completed: 0 },
    ],
  },
};

/* ---------- Quizzes ---------- */
export const quizzes: Record<SubjectId, Record<AgeBand, QuizQuestion[]>> = {
  mathematics: {
    "7-9": [
      {
        id: "m79-1",
        prompt: L("What is 24 + 18?", "24 + 18 ఎంత?"),
        options: ["32", "42", "44", "52"].map(same),
        answer: 1,
        explanation: L(
          "Add the tens first (20 + 10 = 30), then the ones (4 + 8 = 12). 30 + 12 = 42.",
          "ముందు పదులను కలపండి (20 + 10 = 30), తర్వాత ఒకట్లను (4 + 8 = 12). 30 + 12 = 42.",
        ),
      },
      {
        id: "m79-2",
        prompt: L("How many sides does a hexagon have?", "షడ్భుజికి ఎన్ని భుజాలు ఉంటాయి?"),
        options: ["5", "6", "7", "8"].map(same),
        answer: 1,
        explanation: L("“Hexa” means six, so a hexagon has 6 sides.", "'హెక్సా' అంటే ఆరు, కాబట్టి షడ్భుజికి 6 భుజాలు ఉంటాయి."),
      },
      {
        id: "m79-3",
        prompt: L("What comes next? 5, 10, 15, 20, __", "తర్వాత ఏది వస్తుంది? 5, 10, 15, 20, __"),
        options: ["22", "25", "30", "35"].map(same),
        answer: 1,
        explanation: L("The pattern adds 5 each time, so 20 + 5 = 25.", "ప్రతిసారీ 5 కలుస్తోంది, కాబట్టి 20 + 5 = 25."),
      },
      {
        id: "m79-4",
        prompt: L(
          "There are 3 plates with 4 laddus on each plate. How many laddus are there in all?",
          "3 పళ్ళెల్లో ఒక్కో దానిలో 4 లడ్డూలు ఉన్నాయి. మొత్తం ఎన్ని లడ్డూలు ఉన్నాయి?",
        ),
        options: ["7", "12", "10", "16"].map(same),
        answer: 1,
        explanation: L("3 groups of 4 is 3 × 4 = 12.", "4 చొప్పున 3 గుంపులు అంటే 3 × 4 = 12."),
      },
    ],
    "10-12": [
      {
        id: "m1012-1",
        prompt: L("What is 3/4 of 24?", "24లో 3/4 వంతు ఎంత?"),
        options: ["6", "12", "18", "20"].map(same),
        answer: 2,
        explanation: L("24 ÷ 4 = 6, and 6 × 3 = 18.", "24 ÷ 4 = 6, 6 × 3 = 18."),
      },
      {
        id: "m1012-2",
        prompt: L("Solve for x: x + 7 = 15", "x విలువ కనుగొనండి: x + 7 = 15"),
        options: ["6", "7", "8", "22"].map(same),
        answer: 2,
        explanation: L("Subtract 7 from both sides: x = 15 − 7 = 8.", "రెండు వైపులా 7 తీసివేయండి: x = 15 − 7 = 8."),
      },
      {
        id: "m1012-3",
        prompt: L("What is 20% of 150?", "150లో 20% ఎంత?"),
        options: ["20", "25", "30", "35"].map(same),
        answer: 2,
        explanation: L("10% of 150 is 15, so 20% is 30.", "150లో 10% = 15, కాబట్టి 20% = 30."),
      },
      {
        id: "m1012-4",
        prompt: L(
          "What is the area of a rectangle that is 8 cm long and 5 cm wide?",
          "8 సెం.మీ. పొడవు, 5 సెం.మీ. వెడల్పు ఉన్న దీర్ఘచతురస్రం వైశాల్యం ఎంత?",
        ),
        options: [L("13 cm²", "13 చ.సెం.మీ."), L("26 cm²", "26 చ.సెం.మీ."), L("40 cm²", "40 చ.సెం.మీ."), L("45 cm²", "45 చ.సెం.మీ.")],
        answer: 2,
        explanation: L("Area = length × width = 8 × 5 = 40 cm².", "వైశాల్యం = పొడవు × వెడల్పు = 8 × 5 = 40 చ.సెం.మీ."),
      },
    ],
  },
  science: {
    "7-9": [
      {
        id: "s79-1",
        prompt: L("Which of these is a living thing?", "వీటిలో సజీవి ఏది?"),
        options: [L("Stone", "రాయి"), L("Tree", "చెట్టు"), L("Chair", "కుర్చీ"), L("Cloud", "మేఘం")],
        answer: 1,
        explanation: L(
          "Living things grow, need food and water, and make new living things.",
          "సజీవులు పెరుగుతాయి, వాటికి ఆహారం, నీరు కావాలి, తమలాంటి వాటిని పుట్టిస్తాయి.",
        ),
      },
      {
        id: "s79-2",
        prompt: L("What happens to water when it freezes?", "నీరు గడ్డకట్టినప్పుడు ఏమవుతుంది?"),
        options: [
          L("It becomes ice", "మంచుగా మారుతుంది"),
          L("It becomes steam", "ఆవిరిగా మారుతుంది"),
          L("It disappears", "మాయమవుతుంది"),
          L("It turns into sand", "ఇసుకగా మారుతుంది"),
        ],
        answer: 0,
        explanation: L(
          "Cooling water below 0 °C turns it from a liquid into solid ice.",
          "నీటిని 0 °C కంటే తక్కువకు చల్లబరిస్తే అది ద్రవం నుండి ఘన మంచుగా మారుతుంది.",
        ),
      },
      {
        id: "s79-3",
        prompt: L("Which part of a plant takes in water from the soil?", "మొక్కలో నేల నుండి నీటిని గ్రహించే భాగం ఏది?"),
        options: [L("Leaves", "ఆకులు"), L("Flowers", "పువ్వులు"), L("Roots", "వేర్లు"), L("Fruits", "పండ్లు")],
        answer: 2,
        explanation: L(
          "Roots hold the plant in place and absorb water and minerals.",
          "వేర్లు మొక్కను నేలలో నిలబెడతాయి, నీరు, ఖనిజాలను గ్రహిస్తాయి.",
        ),
      },
      {
        id: "s79-4",
        prompt: L("Which planet do we live on?", "మనం ఏ గ్రహంపై నివసిస్తున్నాం?"),
        options: [L("Mars", "అంగారకుడు"), L("Earth", "భూమి"), L("Venus", "శుక్రుడు"), L("Jupiter", "గురుడు")],
        answer: 1,
        explanation: L(
          "We live on Earth, the third planet from the Sun.",
          "మనం సూర్యుని నుండి మూడవ గ్రహమైన భూమిపై నివసిస్తున్నాం.",
        ),
      },
    ],
    "10-12": [
      {
        id: "s1012-1",
        prompt: L("Which gas do plants take in for photosynthesis?", "కిరణజన్య సంయోగక్రియ కోసం మొక్కలు ఏ వాయువును గ్రహిస్తాయి?"),
        options: [L("Oxygen", "ఆక్సిజన్"), L("Carbon dioxide", "కార్బన్ డయాక్సైడ్"), L("Nitrogen", "నైట్రోజన్"), L("Hydrogen", "హైడ్రోజన్")],
        answer: 1,
        explanation: L(
          "Plants use sunlight to turn carbon dioxide and water into food and oxygen.",
          "మొక్కలు సూర్యరశ్మిని ఉపయోగించి కార్బన్ డయాక్సైడ్, నీటి నుండి ఆహారం, ఆక్సిజన్ తయారు చేస్తాయి.",
        ),
      },
      {
        id: "s1012-2",
        prompt: L("Which material is a good conductor of electricity?", "విద్యుత్తును బాగా ప్రసరింపజేసే పదార్థం ఏది?"),
        options: [L("Rubber", "రబ్బరు"), L("Wood", "చెక్క"), L("Copper", "రాగి"), L("Plastic", "ప్లాస్టిక్")],
        answer: 2,
        explanation: L(
          "Metals such as copper let electric current flow easily.",
          "రాగి వంటి లోహాలు విద్యుత్ ప్రవాహాన్ని సులభంగా అనుమతిస్తాయి.",
        ),
      },
      {
        id: "s1012-3",
        prompt: L("Which force pulls objects towards the Earth?", "వస్తువులను భూమి వైపు లాగే బలం ఏది?"),
        options: [L("Friction", "ఘర్షణ"), L("Gravity", "గురుత్వాకర్షణ"), L("Magnetism", "అయస్కాంతత్వం"), L("Buoyancy", "ఉత్ప్లావకత")],
        answer: 1,
        explanation: L(
          "Gravity pulls everything that has mass towards the centre of the Earth.",
          "గురుత్వాకర్షణ ద్రవ్యరాశి ఉన్న ప్రతిదాన్నీ భూమి కేంద్రం వైపు లాగుతుంది.",
        ),
      },
      {
        id: "s1012-4",
        prompt: L("At what temperature does pure water boil at sea level?", "సముద్ర మట్టం వద్ద స్వచ్ఛమైన నీరు ఏ ఉష్ణోగ్రత వద్ద మరుగుతుంది?"),
        options: ["50 °C", "90 °C", "100 °C", "120 °C"].map(same),
        answer: 2,
        explanation: L("Pure water boils at 100 °C at sea level.", "సముద్ర మట్టం వద్ద స్వచ్ఛమైన నీరు 100 °C వద్ద మరుగుతుంది."),
      },
    ],
  },
};

/* ---------- Achievement badges ---------- */
export const badgeDefs: BadgeDef[] = [
  { id: "first-steps", title: L("First Steps", "మొదటి అడుగులు"), description: L("Finish your first practice.", "మీ మొదటి సాధనను పూర్తి చేయండి."), minXp: 10 },
  { id: "quiz-climber", title: L("Quiz Climber", "క్విజ్ క్లైంబర్"), description: L("Earn 50 XP from practice.", "సాధన ద్వారా 50 XP సంపాదించండి."), minXp: 50 },
  { id: "bookworm", title: L("Bookworm", "పుస్తకప్రియుడు"), description: L("Read 3 books.", "3 పుస్తకాలు చదవండి.") },
  { id: "number-ninja", title: L("Number Ninja", "సంఖ్యల వీరుడు"), description: L("Finish a maths topic.", "ఒక గణిత అంశాన్ని పూర్తి చేయండి.") },
  { id: "curious-scientist", title: L("Curious Scientist", "జిజ్ఞాసువైన శాస్త్రవేత్త"), description: L("Finish a science topic.", "ఒక సైన్స్ అంశాన్ని పూర్తి చేయండి.") },
  { id: "lab-explorer", title: L("Lab Explorer", "ల్యాబ్ అన్వేషకుడు"), description: L("Complete a virtual lab.", "ఒక వర్చువల్ ల్యాబ్‌ను పూర్తి చేయండి."), minLabs: 1 },
  { id: "junior-scientist", title: L("Junior Scientist", "జూనియర్ శాస్త్రవేత్త"), description: L("Complete 3 virtual labs.", "3 వర్చువల్ ల్యాబ్‌లను పూర్తి చేయండి."), minLabs: 3 },
  { id: "week-streak", title: L("7-Day Streak", "7 రోజుల వరుస"), description: L("Learn 7 days in a row.", "వరుసగా 7 రోజులు నేర్చుకోండి."), minStreak: 7 },
];
