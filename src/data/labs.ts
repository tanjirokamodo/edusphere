import type { LabCategory, LabDef, Localized } from "@/types";

/** XP for completing a lab for the first time. Repeats earn nothing. */
export const LAB_XP = 30;

export const labCategories: LabCategory[] = ["biology", "physics", "chemistry", "earth", "general"];

export const labCategoryLabels: Record<LabCategory, Localized> = {
  biology: { en: "Biology Lab", te: "జీవశాస్త్ర ల్యాబ్" },
  physics: { en: "Physics Lab", te: "భౌతికశాస్త్ర ల్యాబ్" },
  chemistry: { en: "Chemistry Lab", te: "రసాయనశాస్త్ర ల్యాబ్" },
  earth: { en: "Earth Science", te: "భూ విజ్ఞానం" },
  general: { en: "General Science", te: "సాధారణ సైన్స్" },
};

const both = ["7-9", "10-12"] as const;
const L = (en: string, te: string): Localized => ({ en, te });

/*
 * Teacher-curated demo labs. Each lab is a simplified classroom model, not a
 * measurement of the real world. Only experiments that are safe at home and in
 * class are included: no fire, no chemicals, no hot liquids.
 */
export const labs: LabDef[] = [
  {
    id: "lab-plant-growth",
    title: L("Plant Growth Lab", "మొక్కల పెరుగుదల ల్యాబ్"),
    description: L(
      "Change light, water and soil, and see what a plant needs to grow.",
      "వెలుతురు, నీరు, మట్టిని మార్చి, మొక్క పెరగడానికి ఏమి కావాలో చూడండి.",
    ),
    category: "biology",
    difficulty: "easy",
    bands: [...both],
    languages: ["en", "te"],
    minutes: 15,
    tone: "teal",
    featured: true,
    objectives: [
      L("Say what plants need to grow.", "మొక్కలు పెరగడానికి ఏమి కావాలో చెప్పండి."),
      L("Name the five growth stages.", "ఐదు ఎదుగుదల దశల పేర్లు చెప్పండి."),
      L("Explain why different plants need different care.", "వేర్వేరు మొక్కలకు వేర్వేరు సంరక్షణ ఎందుకు కావాలో వివరించండి."),
    ],
    instructions: {
      "7-9": [
        L("Pick a plant for Pot A.", "కుండీ A కోసం ఒక మొక్కను ఎంచుకోండి."),
        L("Press Start and watch the plant grow.", "స్టార్ట్ నొక్కి మొక్క పెరగడం చూడండి."),
        L("Turn the sun and water up or down. What happens?", "సూర్యకాంతి, నీటిని పెంచండి లేదా తగ్గించండి. ఏమి జరుగుతుంది?"),
        L("Turn on Compare and try different conditions in Pot B.", "కంపేర్ ఆన్ చేసి కుండీ B లో వేరే పరిస్థితులు ప్రయత్నించండి."),
      ],
      "10-12": [
        L("Choose a plant and set the light, water and soil.", "ఒక మొక్కను ఎంచుకుని వెలుతురు, నీరు, మట్టిని సెట్ చేయండి."),
        L("Turn on Compare, set Pot B differently, and predict which grows better.", "కంపేర్ ఆన్ చేసి కుండీ B ని వేరుగా సెట్ చేసి, ఏది బాగా పెరుగుతుందో ఊహించండి."),
        L("Run both pots and check your prediction.", "రెండు కుండీలను నడిపి మీ ఊహను పరిశీలించండి."),
        L("Change only one condition at a time to find what limits growth.", "పెరుగుదలను ఏది అడ్డుకుంటుందో తెలుసుకోవడానికి ఒక్కసారికి ఒక పరిస్థితిని మాత్రమే మార్చండి."),
      ],
    },
    tasks: [
      { id: "grow", title: L("Grow a plant until it is mature", "ఒక మొక్కను పూర్తిగా ఎదిగే వరకు పెంచండి"), bands: [...both] },
      { id: "change", title: L("Change the light or water while it grows", "మొక్క పెరుగుతుండగా వెలుతురు లేదా నీటిని మార్చండి"), bands: [...both] },
      { id: "compare", title: L("Compare two pots with different conditions", "వేర్వేరు పరిస్థితులతో రెండు కుండీలను పోల్చండి"), bands: [...both] },
      { id: "predict", title: L("Make a prediction, then check it", "ఒక ఊహ చేసి, దాన్ని పరిశీలించండి"), bands: ["10-12"] },
    ],
  },
  {
    id: "lab-water-cycle",
    title: L("Water Cycle Lab", "జలచక్ర ల్యాబ్"),
    description: L(
      "Heat the water, build a cloud and make it rain. Then put the stages in order.",
      "నీటిని వేడి చేసి, మేఘాన్ని తయారు చేసి, వర్షం కురిపించండి. తర్వాత దశలను క్రమంలో పెట్టండి.",
    ),
    category: "earth",
    difficulty: "easy",
    bands: [...both],
    languages: ["en", "te"],
    minutes: 12,
    tone: "sky",
    objectives: [
      L("Name evaporation, condensation, precipitation and collection.", "బాష్పీభవనం, సాంద్రీకరణ, అవపాతం, సేకరణ పేర్లు చెప్పండి."),
      L("Explain what the sun does in the water cycle.", "జలచక్రంలో సూర్యుడు ఏమి చేస్తాడో వివరించండి."),
      L("Put the four stages in the right order.", "నాలుగు దశలను సరైన క్రమంలో పెట్టండి."),
    ],
    instructions: {
      "7-9": [
        L("Press Start and watch the water rise, make a cloud and fall as rain.", "స్టార్ట్ నొక్కి నీరు పైకి లేచి, మేఘంగా మారి, వర్షంగా పడటం చూడండి."),
        L("Tap the cloud when it is full to make it rain.", "మేఘం నిండినప్పుడు దాన్ని తట్టి వర్షం కురిపించండి."),
        L("Pick a label, then tap where it belongs on the picture.", "ఒక లేబుల్ ఎంచుకుని, చిత్రంలో అది ఎక్కడ ఉండాలో అక్కడ తట్టండి."),
        L("Put the four stages in order, 1 to 4.", "నాలుగు దశలను 1 నుండి 4 వరకు క్రమంలో పెట్టండి."),
      ],
      "10-12": [
        L("Run the simulation and change the sun's strength. Watch how each stage speeds up or slows down.", "సిమ్యులేషన్ నడిపి సూర్యుని బలాన్ని మార్చండి. ప్రతి దశ ఎలా వేగంగా లేదా నెమ్మదిగా మారుతుందో చూడండి."),
        L("Tap the cloud to cool it and see condensation turn into rain.", "మేఘాన్ని తట్టి చల్లబరిచి, సాంద్రీకరణ వర్షంగా మారడం చూడండి."),
        L("Place each label on the diagram. Drag it or tap to place it.", "ప్రతి లేబుల్‌ను రేఖాచిత్రంలో ఉంచండి. లాగండి లేదా తట్టి ఉంచండి."),
        L("Arrange the four stages in order without hints.", "సూచనలు లేకుండా నాలుగు దశలను క్రమంలో అమర్చండి."),
      ],
    },
    tasks: [
      { id: "stages", title: L("Watch all four stages happen", "నాలుగు దశలూ జరగడం చూడండి"), bands: [...both] },
      { id: "labels", title: L("Put all four labels in the right place", "నాలుగు లేబుళ్లనూ సరైన చోట ఉంచండి"), bands: [...both] },
      { id: "order", title: L("Arrange the four stages in order", "నాలుగు దశలను క్రమంలో అమర్చండి"), bands: [...both] },
      { id: "sun", title: L("Change the sun's strength and notice what changes", "సూర్యుని బలాన్ని మార్చి ఏమి మారుతుందో గమనించండి"), bands: ["10-12"] },
    ],
  },
  {
    id: "lab-states-of-matter",
    title: L("States of Matter Lab", "పదార్థ స్థితుల ల్యాబ్"),
    description: L(
      "Heat and cool water and watch its tiny particles change how they move.",
      "నీటిని వేడి చేసి, చల్లబరిచి, దాని సూక్ష్మ కణాల కదలిక ఎలా మారుతుందో చూడండి.",
    ),
    category: "chemistry",
    difficulty: "medium",
    bands: [...both],
    languages: ["en", "te"],
    minutes: 15,
    tone: "indigo",
    objectives: [
      L("Tell solids, liquids and gases apart by how their particles behave.", "కణాల ప్రవర్తన ఆధారంగా ఘన, ద్రవ, వాయు పదార్థాలను వేరు చేయండి."),
      L("Explain how temperature changes particle movement.", "ఉష్ణోగ్రత కణాల కదలికను ఎలా మారుస్తుందో వివరించండి."),
      L("Name melting, freezing, evaporation and condensation.", "కరగడం, గడ్డకట్టడం, బాష్పీభవనం, సాంద్రీకరణ పేర్లు చెప్పండి."),
    ],
    instructions: {
      "7-9": [
        L("Slide the temperature or tap Heat and Cool.", "ఉష్ణోగ్రతను జరపండి లేదా హీట్, కూల్ నొక్కండి."),
        L("Watch the tiny particles. Are they packed, sliding or flying?", "సూక్ష్మ కణాలను చూడండి. అవి దగ్గరగా ఉన్నాయా, జారుతున్నాయా, ఎగురుతున్నాయా?"),
        L("Find the solid, the liquid and the gas.", "ఘన, ద్రవ, వాయు స్థితులను కనుగొనండి."),
        L("Open Compare to see all three side by side.", "మూడింటినీ పక్కపక్కనే చూడటానికి కంపేర్ తెరవండి."),
      ],
      "10-12": [
        L("Change the temperature slowly and note where the state changes.", "ఉష్ణోగ్రతను నెమ్మదిగా మార్చి, స్థితి ఎక్కడ మారుతుందో గమనించండి."),
        L("Link particle speed and spacing to each state.", "కణాల వేగాన్ని, దూరాన్ని ప్రతి స్థితితో ముడిపెట్టండి."),
        L("Make water melt, freeze, evaporate and condense.", "నీరు కరగడం, గడ్డకట్టడం, ఆవిరవ్వడం, తిరిగి ద్రవంగా మారడం చూపించండి."),
        L("Use Compare to explain why a gas fills its container.", "వాయువు తన పాత్రను ఎందుకు నింపుతుందో వివరించడానికి కంపేర్ వాడండి."),
      ],
    },
    tasks: [
      { id: "states", title: L("Visit solid, liquid and gas", "ఘన, ద్రవ, వాయు స్థితులను చూడండి"), bands: [...both] },
      { id: "compare", title: L("Open the compare view", "కంపేర్ వ్యూ తెరవండి"), bands: [...both] },
      { id: "changes", title: L("Make water melt, freeze, evaporate and condense", "నీరు కరగడం, గడ్డకట్టడం, ఆవిరవ్వడం, ద్రవంగా మారడం చూపించండి"), bands: ["10-12"] },
    ],
  },
];

export function findLab(id: string): LabDef | undefined {
  return labs.find((l) => l.id === id);
}

export function tasksForBand(lab: LabDef, band: "7-9" | "10-12") {
  return lab.tasks.filter((t) => t.bands.includes(band));
}
