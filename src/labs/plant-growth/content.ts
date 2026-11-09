import type { Localized } from "@/types";
import type { LabQuestionBank } from "../types";
import type { Factor, FactorState, Health, Level, PlantKind, SoilKind, Stage } from "./model";

const L = (en: string, te: string): Localized => ({ en, te });

export const plantNames: Record<PlantKind, Localized> = {
  sunflower: L("Sunflower", "పొద్దుతిరుగుడు"),
  fern: L("Fern", "ఫెర్న్"),
  cactus: L("Cactus", "బ్రహ్మజెముడు"),
};

export const plantFacts: Record<PlantKind, Localized> = {
  sunflower: L(
    "Sunflowers love bright sun and a medium amount of water.",
    "పొద్దుతిరుగుడుకు ప్రకాశవంతమైన ఎండ, మధ్యస్థ నీరు ఇష్టం.",
  ),
  fern: L(
    "Ferns like shade and damp soil, like a forest floor.",
    "ఫెర్న్‌లకు నీడ, తడి మట్టి ఇష్టం, అడవి నేల లాగా.",
  ),
  cactus: L(
    "A cactus stores water in its thick stem, so it needs only a little.",
    "బ్రహ్మజెముడు తన లావైన కాండంలో నీటిని నిల్వ చేసుకుంటుంది, కాబట్టి దానికి కొంచెం నీరు చాలు.",
  ),
};

export const soilNames: Record<SoilKind, Localized> = {
  sandy: L("Sandy", "ఇసుక నేల"),
  garden: L("Garden soil", "తోట మట్టి"),
  clay: L("Clay", "బంకమట్టి"),
};

export const soilNotes: Record<SoilKind, Localized> = {
  sandy: L("Water drains through quickly.", "నీరు త్వరగా ఇంకిపోతుంది."),
  garden: L("Holds some water and has plenty of food.", "కొంత నీటిని పట్టి ఉంచుతుంది, పోషకాలు ఎక్కువ."),
  clay: L("Holds water for a long time.", "నీటిని ఎక్కువసేపు పట్టి ఉంచుతుంది."),
};

export const sunLevels: Record<Level, Localized> = {
  0: L("No sun", "ఎండ లేదు"),
  1: L("Low", "తక్కువ"),
  2: L("Medium", "మధ్యస్థం"),
  3: L("Bright", "ప్రకాశవంతం"),
};

export const waterLevels: Record<Level, Localized> = {
  0: L("None", "లేదు"),
  1: L("A little", "కొంచెం"),
  2: L("Some", "కొంత"),
  3: L("Lots", "చాలా"),
};

export const stageNames: Record<Stage, Localized> = {
  0: L("Seed", "విత్తనం"),
  1: L("Germination", "మొలకెత్తడం"),
  2: L("Seedling", "మొలక"),
  3: L("Young plant", "చిన్న మొక్క"),
  4: L("Mature plant", "పూర్తిగా ఎదిగిన మొక్క"),
};

export const healthNames: Record<Health, Localized> = {
  thriving: L("Thriving", "బాగా పెరుగుతోంది"),
  good: L("Growing well", "చక్కగా ఎదుగుతోంది"),
  slow: L("Growing slowly", "నెమ్మదిగా పెరుగుతోంది"),
  struggling: L("Struggling", "ఇబ్బంది పడుతోంది"),
  noWater: L("Waiting for water", "నీటి కోసం ఎదురుచూస్తోంది"),
  noLight: L("No light: not growing", "వెలుతురు లేదు: పెరగడం లేదు"),
};

/** Short explanations for why a pot is doing well or badly. */
export const reasonText: Record<Factor, Record<Exclude<FactorState, "ok">, Localized>> = {
  sun: {
    low: L("This plant wants more light.", "ఈ మొక్కకు ఎక్కువ వెలుతురు కావాలి."),
    high: L("This plant likes less light.", "ఈ మొక్కకు తక్కువ వెలుతురు ఇష్టం."),
  },
  water: {
    low: L("It needs more water.", "దీనికి ఎక్కువ నీరు కావాలి."),
    high: L("Too much water. Roots need air too.", "నీరు ఎక్కువైంది. వేర్లకు గాలి కూడా కావాలి."),
  },
  soil: {
    low: L("This soil is not a good fit for this plant.", "ఈ మట్టి ఈ మొక్కకు సరిపోదు."),
    high: L("This soil is not a good fit for this plant.", "ఈ మట్టి ఈ మొక్కకు సరిపోదు."),
  },
};

export const allGood = L(
  "Light, water and soil all suit this plant.",
  "వెలుతురు, నీరు, మట్టి అన్నీ ఈ మొక్కకు సరిపోతాయి.",
);
export const noWaterWhy = L(
  "A seed needs water to wake up.",
  "విత్తనం మేల్కొనడానికి నీరు కావాలి.",
);
export const noLightWhy = L(
  "Without light a plant cannot make its food, so it stops growing.",
  "వెలుతురు లేకపోతే మొక్క ఆహారం తయారు చేసుకోలేదు, అందుకే పెరగడం ఆగుతుంది.",
);

/** Interface text used inside the workspace. */
export const ui = {
  potA: L("Pot A", "కుండీ A"),
  potB: L("Pot B", "కుండీ B"),
  plant: L("Plant", "మొక్క"),
  sun: L("Sunlight", "సూర్యకాంతి"),
  water: L("Water", "నీరు"),
  soil: L("Soil", "మట్టి"),
  stage: L("Growth stage", "ఎదుగుదల దశ"),
  compare: L("Compare with a second pot", "రెండో కుండీతో పోల్చండి"),
  fast: L("Fast forward", "వేగంగా"),
  done: L("Fully grown", "పూర్తిగా ఎదిగింది"),
  tryThis: L("Try this", "ఇది ప్రయత్నించండి"),
  hint79: L(
    "Change the sun or water while it grows and see what happens straight away.",
    "మొక్క పెరుగుతుండగా ఎండను లేదా నీటిని మార్చి వెంటనే ఏమి జరుగుతుందో చూడండి.",
  ),
  hint1012: L(
    "Change one thing at a time, so you know which change caused the difference.",
    "ఏ మార్పు వల్ల తేడా వచ్చిందో తెలియడానికి ఒక్కసారికి ఒక్కటే మార్చండి.",
  ),
  predictQ: L("Which pot will grow better?", "ఏ కుండీ బాగా పెరుగుతుంది?"),
  predictSame: L("About the same", "దాదాపు ఒకేలా"),
  predictWait: L(
    "Run both pots for a while to find out.",
    "తెలుసుకోవడానికి రెండు కుండీలను కాసేపు నడపండి.",
  ),
  predictRight: L("Your prediction was right!", "మీ ఊహ సరైనది!"),
  predictWrong: L(
    "Not this time. Look at what each plant needs.",
    "ఈసారి కాదు. ప్రతి మొక్కకు ఏమి కావాలో చూడండి.",
  ),
  predictNeedDiff: L(
    "Set Pot B differently from Pot A to make a prediction.",
    "ఊహ చేయడానికి కుండీ B ని కుండీ A కంటే వేరుగా సెట్ చేయండి.",
  ),
  ahead: L("is growing faster", "వేగంగా పెరుగుతోంది"),
  similar: L("Both pots are growing about the same.", "రెండు కుండీలు దాదాపు ఒకేలా పెరుగుతున్నాయి."),
  summary: L("Comparison", "పోలిక"),
};

export const questions: LabQuestionBank = {
  "7-9": [
    {
      prompt: L("Which three things help a plant grow?", "మొక్క పెరగడానికి ఏ మూడు విషయాలు సహాయపడతాయి?"),
      options: [
        L("Light, water and soil", "వెలుతురు, నీరు, మట్టి"),
        L("Candy, music and toys", "మిఠాయి, సంగీతం, బొమ్మలు"),
        L("Plastic and glue", "ప్లాస్టిక్, జిగురు"),
        L("Only sand", "కేవలం ఇసుక"),
      ],
      answer: 0,
      explanation: L(
        "Plants use light, water and the food in soil to grow.",
        "మొక్కలు పెరగడానికి వెలుతురు, నీరు, మట్టిలోని పోషకాలను వాడుకుంటాయి.",
      ),
    },
    {
      prompt: L("What happens to a seed that gets no water?", "నీరు అందని విత్తనానికి ఏమి జరుగుతుంది?"),
      options: [
        L("It does not wake up", "అది మేల్కొనదు"),
        L("It grows super fast", "అది చాలా వేగంగా పెరుగుతుంది"),
        L("It turns into a flower", "అది పువ్వుగా మారుతుంది"),
        L("It makes its own rain", "అది తన వర్షాన్ని తానే తయారు చేసుకుంటుంది"),
      ],
      answer: 0,
      explanation: L("A seed needs water to start growing.", "విత్తనం పెరగడం మొదలుపెట్టడానికి నీరు కావాలి."),
    },
    {
      prompt: L("Which growth stage comes after the seedling?", "మొలక తర్వాత వచ్చే ఎదుగుదల దశ ఏది?"),
      options: [
        L("Seed", "విత్తనం"),
        L("Young plant", "చిన్న మొక్క"),
        L("Germination", "మొలకెత్తడం"),
        L("Back to a seed", "మళ్లీ విత్తనం"),
      ],
      answer: 1,
      explanation: L(
        "The order is seed, germination, seedling, young plant, mature plant.",
        "క్రమం: విత్తనం, మొలకెత్తడం, మొలక, చిన్న మొక్క, పూర్తిగా ఎదిగిన మొక్క.",
      ),
    },
  ],
  "10-12": [
    {
      prompt: L(
        "Pot A has bright sun and enough water. Pot B has no sun. Which plant grows better, and why?",
        "కుండీ A కి ప్రకాశవంతమైన ఎండ, సరిపడా నీరు ఉన్నాయి. కుండీ B కి ఎండ లేదు. ఏ మొక్క బాగా పెరుగుతుంది, ఎందుకు?",
      ),
      options: [
        L("Pot A: leaves use light to make food", "కుండీ A: ఆకులు వెలుతురుతో ఆహారం తయారు చేస్తాయి"),
        L("Pot B: plants prefer the dark", "కుండీ B: మొక్కలకు చీకటి ఇష్టం"),
        L("Both grow the same", "రెండూ ఒకేలా పెరుగుతాయి"),
        L("Neither: plants never grow", "రెండూ కాదు: మొక్కలు ఎప్పుడూ పెరగవు"),
      ],
      answer: 0,
      explanation: L(
        "Leaves use light, water and air to make food. With no light the plant stops growing.",
        "ఆకులు వెలుతురు, నీరు, గాలిని వాడి ఆహారం తయారు చేస్తాయి. వెలుతురు లేకపోతే మొక్క పెరగడం ఆగుతుంది.",
      ),
    },
    {
      prompt: L("Why does a cactus need so little water?", "బ్రహ్మజెముడుకు చాలా తక్కువ నీరు ఎందుకు చాలు?"),
      options: [
        L("It stores water in its thick stem", "అది లావైన కాండంలో నీటిని నిల్వ చేసుకుంటుంది"),
        L("It does not need any food", "దానికి ఆహారం అవసరం లేదు"),
        L("It drinks through its flowers only", "అది పువ్వుల ద్వారా మాత్రమే తాగుతుంది"),
        L("It grows underwater", "అది నీటి అడుగున పెరుగుతుంది"),
      ],
      answer: 0,
      explanation: L(
        "Desert plants like cacti hold water inside their stems for dry times.",
        "బ్రహ్మజెముడు వంటి ఎడారి మొక్కలు ఎండిపోయే కాలం కోసం కాండంలో నీటిని దాచుకుంటాయి.",
      ),
    },
    {
      prompt: L(
        "A fern is in bright sun and dry sandy soil, and it is struggling. What should you change?",
        "ఒక ఫెర్న్ ప్రకాశవంతమైన ఎండలో, ఎండిన ఇసుక నేలలో ఉండి ఇబ్బంది పడుతోంది. దేన్ని మార్చాలి?",
      ),
      options: [
        L("Give it shade and more water", "నీడ, ఎక్కువ నీరు ఇవ్వాలి"),
        L("Give it even more sun", "ఇంకా ఎక్కువ ఎండ ఇవ్వాలి"),
        L("Take the soil away", "మట్టిని తీసేయాలి"),
        L("Change nothing", "ఏదీ మార్చకూడదు"),
      ],
      answer: 0,
      explanation: L(
        "Ferns like shade and damp soil, so more light and dry soil work against them.",
        "ఫెర్న్‌లకు నీడ, తడి మట్టి ఇష్టం, కాబట్టి ఎక్కువ వెలుతురు, ఎండిన మట్టి వాటికి హాని చేస్తాయి.",
      ),
    },
    {
      prompt: L(
        "You want to test whether water matters. What makes it a fair test?",
        "నీరు ముఖ్యమో కాదో పరీక్షించాలి. దాన్ని న్యాయమైన పరీక్షగా చేసేది ఏది?",
      ),
      options: [
        L("Change only the water and keep everything else the same", "నీటిని మాత్రమే మార్చి మిగతావన్నీ అలాగే ఉంచడం"),
        L("Change the water, light and soil together", "నీరు, వెలుతురు, మట్టిని కలిపి మార్చడం"),
        L("Use a different plant each time", "ప్రతిసారీ వేరే మొక్కను వాడటం"),
        L("Do not look at the plants", "మొక్కలను చూడకపోవడం"),
      ],
      answer: 0,
      explanation: L(
        "Changing one thing at a time shows which change caused the result.",
        "ఒక్కసారికి ఒక్కటే మార్చితే ఏ మార్పు వల్ల ఫలితం వచ్చిందో తెలుస్తుంది.",
      ),
    },
  ],
};
