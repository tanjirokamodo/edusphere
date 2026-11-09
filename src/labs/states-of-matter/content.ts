import type { AgeBand, Localized } from "@/types";
import type { LabQuestionBank } from "../types";
import type { MatterProcess, MatterState } from "./model";

const L = (en: string, te: string): Localized => ({ en, te });

export const stateNames: Record<MatterState, Localized> = {
  solid: L("Solid (ice)", "ఘనం (మంచు)"),
  liquid: L("Liquid (water)", "ద్రవం (నీరు)"),
  gas: L("Gas (steam)", "వాయువు (ఆవిరి)"),
};

export const processNames: Record<MatterProcess, Localized> = {
  melting: L("Melting", "కరగడం"),
  freezing: L("Freezing", "గడ్డకట్టడం"),
  evaporation: L("Evaporation", "బాష్పీభవనం"),
  condensation: L("Condensation", "సాంద్రీకరణ"),
};

export const stateExplain: Record<MatterState, Record<AgeBand, Localized>> = {
  solid: {
    "7-9": L(
      "The tiny particles are packed tightly in a pattern. They can only wiggle in place. A solid keeps its shape.",
      "సూక్ష్మ కణాలు ఒక క్రమంలో దగ్గరదగ్గరగా ఉంటాయి. అవి ఉన్న చోటే కదులుతాయి. ఘనపదార్థం తన ఆకారాన్ని నిలుపుకుంటుంది.",
    ),
    "10-12": L(
      "Strong attractions hold the particles in fixed places in a regular pattern. They vibrate but do not swap places. With less heat energy the vibrations are smaller.",
      "బలమైన ఆకర్షణ కణాలను క్రమమైన నమూనాలో స్థిర స్థానాల్లో ఉంచుతుంది. అవి కంపిస్తాయి కానీ చోట్లు మార్చుకోవు. వేడి శక్తి తక్కువైతే కంపనాలు చిన్నవిగా ఉంటాయి.",
    ),
  },
  liquid: {
    "7-9": L(
      "The particles are close together but can slide past each other. A liquid flows and takes the shape of its container.",
      "కణాలు దగ్గరగా ఉంటాయి కానీ ఒకదానిపై ఒకటి జారగలవు. ద్రవం ప్రవహిస్తుంది, పాత్ర ఆకారాన్ని తీసుకుంటుంది.",
    ),
    "10-12": L(
      "The particles are still close, but they have enough energy to slide past one another. That is why a liquid flows but keeps almost the same volume.",
      "కణాలు ఇంకా దగ్గరగానే ఉంటాయి, కానీ ఒకదానిపై ఒకటి జారేంత శక్తి వాటికి ఉంటుంది. అందుకే ద్రవం ప్రవహిస్తుంది కానీ దాదాపు అదే ఘనపరిమాణాన్ని ఉంచుకుంటుంది.",
    ),
  },
  gas: {
    "7-9": L(
      "The particles are far apart and zoom around. A gas spreads out to fill its whole container.",
      "కణాలు దూరదూరంగా ఉండి వేగంగా తిరుగుతాయి. వాయువు తన పాత్రనంతా నింపేలా వ్యాపిస్తుంది.",
    ),
    "10-12": L(
      "The particles have so much energy that the attractions between them barely matter. They fly in all directions and spread out until they fill the container.",
      "కణాలకు చాలా శక్తి ఉండటంతో వాటి మధ్య ఆకర్షణ దాదాపు పనిచేయదు. అవి అన్ని దిశల్లో ఎగురుతూ పాత్రనంతా నింపేవరకు వ్యాపిస్తాయి.",
    ),
  },
};

export const processExplain: Record<MatterProcess, Localized> = {
  melting: L(
    "Heat gives the particles energy to break out of their fixed places. A solid turns into a liquid.",
    "వేడి కణాలకు స్థిర స్థానాల నుండి బయటపడే శక్తిని ఇస్తుంది. ఘనం ద్రవంగా మారుతుంది.",
  ),
  freezing: L(
    "Cooling slows the particles until they lock into a pattern. A liquid turns into a solid.",
    "చల్లబడితే కణాలు నెమ్మదించి ఒక నమూనాలో స్థిరపడతాయి. ద్రవం ఘనంగా మారుతుంది.",
  ),
  evaporation: L(
    "The particles speed up enough to escape the liquid and spread out. A liquid turns into a gas.",
    "కణాలు ద్రవం నుండి బయటపడి వ్యాపించేంత వేగం పొందుతాయి. ద్రవం వాయువుగా మారుతుంది.",
  ),
  condensation: L(
    "Cooling slows the gas particles so they stick together. A gas turns back into a liquid.",
    "చల్లబడితే వాయు కణాలు నెమ్మదించి ఒకదానికొకటి అతుక్కుంటాయి. వాయువు తిరిగి ద్రవంగా మారుతుంది.",
  ),
};

export const arrangement: Record<MatterState, Localized> = {
  solid: L("Packed in a pattern", "ఒక క్రమంలో దగ్గరగా"),
  liquid: L("Close, but not in a pattern", "దగ్గరగా, కానీ క్రమం లేదు"),
  gas: L("Far apart", "దూరదూరంగా"),
};

export const movement: Record<MatterState, Localized> = {
  solid: L("Wiggle in place", "ఉన్న చోటే కదులుతాయి"),
  liquid: L("Slide past each other", "ఒకదానిపై ఒకటి జారతాయి"),
  gas: L("Zoom in every direction", "అన్ని దిశల్లో వేగంగా తిరుగుతాయి"),
};

export const ui = {
  temperature: L("Temperature", "ఉష్ణోగ్రత"),
  degrees: L("°C", "°C"),
  heat: L("Heat", "వేడి చేయండి"),
  cool: L("Cool", "చల్లబరచండి"),
  presets: L("Jump to", "ఇక్కడికి వెళ్లండి"),
  presetSolid: L("Ice", "మంచు"),
  presetLiquid: L("Water", "నీరు"),
  presetGas: L("Steam", "ఆవిరి"),
  state: L("State", "స్థితి"),
  nowDoing: L("Happening now", "ఇప్పుడు జరుగుతోంది"),
  arrangement: L("Particle arrangement", "కణాల అమరిక"),
  movement: L("Particle movement", "కణాల కదలిక"),
  energy: L("Particle speed", "కణాల వేగం"),
  rule: L(
    "Hotter water: the particles move faster. Colder water: they move slower.",
    "నీరు వేడెక్కితే కణాలు వేగంగా కదులుతాయి. చల్లబడితే నెమ్మదిగా కదులుతాయి.",
  ),
  rule1012: L(
    "More heat energy means faster particles. Changes of state happen at 0 °C (melting and freezing) and 100 °C (evaporation and condensation) for water.",
    "ఎక్కువ వేడి శక్తి అంటే వేగవంతమైన కణాలు. నీటికి స్థితి మార్పులు 0 °C (కరగడం, గడ్డకట్టడం), 100 °C (బాష్పీభవనం, సాంద్రీకరణ) వద్ద జరుగుతాయి.",
  ),
  compare: L("Compare all three", "మూడింటినీ పోల్చండి"),
  single: L("One box", "ఒక పెట్టె"),
  compareNote: L(
    "Same particles, three temperatures. Look at the spacing and the speed.",
    "అవే కణాలు, మూడు ఉష్ణోగ్రతలు. దూరాన్ని, వేగాన్ని గమనించండి.",
  ),
  seen: L("States you have seen", "మీరు చూసిన స్థితులు"),
  seenChanges: L("Changes you have made", "మీరు చేసిన మార్పులు"),
  tryThis79: L(
    "Use Ice, Water and Steam to find each state. Then drag the slider slowly.",
    "ప్రతి స్థితిని కనుగొనడానికి మంచు, నీరు, ఆవిరి నొక్కండి. తర్వాత స్లైడర్‌ను నెమ్మదిగా జరపండి.",
  ),
  tryThis1012: L(
    "Cool the water past 0 °C and heat it past 100 °C. What changes about the spacing and the speed?",
    "నీటిని 0 °C కంటే తక్కువకు చల్లబరచి, 100 °C కంటే ఎక్కువకు వేడి చేయండి. దూరం, వేగం ఎలా మారుతున్నాయి?",
  ),
  tryThis: L("Try this", "ఇది ప్రయత్నించండి"),
  boxLabel: L(
    "Box of water particles. The dots show how the particles are arranged and moving.",
    "నీటి కణాల పెట్టె. చుక్కలు కణాలు ఎలా అమరి ఉన్నాయో, ఎలా కదులుతున్నాయో చూపిస్తాయి.",
  ),
};

export const questions: LabQuestionBank = {
  "7-9": [
    {
      prompt: L("Which state has particles packed tightly that only wiggle?", "ఏ స్థితిలో కణాలు దగ్గరదగ్గరగా ఉండి కేవలం కదులుతాయి?"),
      options: [L("Solid", "ఘనం"), L("Liquid", "ద్రవం"), L("Gas", "వాయువు"), L("None of them", "ఏదీ కాదు")],
      answer: 0,
      explanation: L("In a solid the particles stay in a pattern and just wiggle.", "ఘనంలో కణాలు ఒక క్రమంలో ఉండి కేవలం కదులుతాయి."),
    },
    {
      prompt: L("What happens to the particles when water is heated?", "నీటిని వేడి చేస్తే కణాలకు ఏమి జరుగుతుంది?"),
      options: [
        L("They move faster", "అవి వేగంగా కదులుతాయి"),
        L("They stop moving", "అవి కదలడం ఆగిపోతాయి"),
        L("They disappear", "అవి మాయమవుతాయి"),
        L("They get bigger", "అవి పెద్దవవుతాయి"),
      ],
      answer: 0,
      explanation: L("More heat means the particles have more energy and move faster.", "వేడి ఎక్కువైతే కణాలకు శక్తి ఎక్కువై వేగంగా కదులుతాయి."),
    },
    {
      prompt: L("What do we call ice turning into water?", "మంచు నీరుగా మారడాన్ని ఏమంటారు?"),
      options: [
        L("Melting", "కరగడం"),
        L("Freezing", "గడ్డకట్టడం"),
        L("Evaporation", "బాష్పీభవనం"),
        L("Condensation", "సాంద్రీకరణ"),
      ],
      answer: 0,
      explanation: L("A solid turning into a liquid is melting.", "ఘనం ద్రవంగా మారడాన్ని కరగడం అంటారు."),
    },
  ],
  "10-12": [
    {
      prompt: L("Why does a gas spread out to fill its whole container?", "వాయువు తన పాత్రనంతా నింపేలా ఎందుకు వ్యాపిస్తుంది?"),
      options: [
        L("Its particles move fast and are not held in place", "దాని కణాలు వేగంగా కదులుతాయి, ఒకే చోట పట్టి ఉండవు"),
        L("Its particles are packed in a pattern", "దాని కణాలు ఒక క్రమంలో దగ్గరగా ఉంటాయి"),
        L("Its particles stop moving", "దాని కణాలు కదలడం ఆగిపోతాయి"),
        L("It has no particles", "దానికి కణాలు ఉండవు"),
      ],
      answer: 0,
      explanation: L("Gas particles have a lot of energy and barely attract each other.", "వాయు కణాలకు ఎక్కువ శక్తి ఉంటుంది, అవి ఒకదానినొకటి దాదాపు ఆకర్షించుకోవు."),
    },
    {
      prompt: L("Steam cools below 100 °C. What happens?", "ఆవిరి 100 °C కంటే తక్కువకు చల్లబడితే ఏమి జరుగుతుంది?"),
      options: [
        L("It condenses into liquid water", "అది సాంద్రీకరణ చెంది ద్రవ నీరుగా మారుతుంది"),
        L("It melts", "అది కరుగుతుంది"),
        L("It freezes straight away", "అది వెంటనే గడ్డకడుతుంది"),
        L("It stays steam forever", "అది ఎప్పటికీ ఆవిరిగానే ఉంటుంది"),
      ],
      answer: 0,
      explanation: L("Cooling slows the gas particles so they stick together as a liquid.", "చల్లబడితే వాయు కణాలు నెమ్మదించి ద్రవంగా అతుక్కుంటాయి."),
    },
    {
      prompt: L("Which sentence links temperature and particle movement?", "ఉష్ణోగ్రతను, కణాల కదలికను కలిపే వాక్యం ఏది?"),
      options: [
        L("Higher temperature means particles have more energy and move faster", "ఉష్ణోగ్రత ఎక్కువైతే కణాలకు శక్తి ఎక్కువై వేగంగా కదులుతాయి"),
        L("Higher temperature makes particles stop", "ఉష్ణోగ్రత ఎక్కువైతే కణాలు ఆగిపోతాయి"),
        L("Temperature does not affect particles", "ఉష్ణోగ్రత కణాలపై ప్రభావం చూపదు"),
        L("Lower temperature makes particles faster", "ఉష్ణోగ్రత తగ్గితే కణాలు వేగంగా కదులుతాయి"),
      ],
      answer: 0,
      explanation: L("Temperature is a measure of how much the particles move.", "ఉష్ణోగ్రత అంటే కణాలు ఎంత కదులుతున్నాయో తెలిపే కొలత."),
    },
    {
      prompt: L("How is a liquid different from a solid?", "ద్రవం ఘనం కంటే ఎలా భిన్నంగా ఉంటుంది?"),
      options: [
        L("Liquid particles can slide past each other; solid particles stay in fixed places", "ద్రవ కణాలు ఒకదానిపై ఒకటి జారగలవు; ఘన కణాలు స్థిర స్థానాల్లో ఉంటాయి"),
        L("Liquid particles are always far apart", "ద్రవ కణాలు ఎప్పుడూ దూరదూరంగా ఉంటాయి"),
        L("Solid particles move faster than liquid ones", "ఘన కణాలు ద్రవ కణాల కంటే వేగంగా కదులుతాయి"),
        L("There is no difference", "ఏ తేడా లేదు"),
      ],
      answer: 0,
      explanation: L("Both have particles close together, but only in a liquid can they move around each other.", "రెండింటిలోనూ కణాలు దగ్గరగా ఉంటాయి, కానీ ద్రవంలోనే అవి ఒకదానిచుట్టూ ఒకటి కదలగలవు."),
    },
  ],
};
