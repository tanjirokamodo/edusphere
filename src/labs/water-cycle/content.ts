import type { AgeBand, Localized } from "@/types";
import type { LabQuestionBank } from "../types";
import type { SunLevel, WaterStage } from "./model";

const L = (en: string, te: string): Localized => ({ en, te });

export const stageNames: Record<WaterStage, Localized> = {
  evaporation: L("Evaporation", "బాష్పీభవనం"),
  condensation: L("Condensation", "సాంద్రీకరణ"),
  precipitation: L("Precipitation", "అవపాతం (వర్షం)"),
  collection: L("Collection", "సేకరణ"),
};

/** Short clue shown to 7-9 year olds on each label. */
export const stageClues: Record<WaterStage, Localized> = {
  evaporation: L("Water rises as vapour", "నీరు ఆవిరిగా పైకి వెళ్తుంది"),
  condensation: L("Vapour turns into cloud", "ఆవిరి మేఘంగా మారుతుంది"),
  precipitation: L("Water falls as rain", "నీరు వర్షంగా పడుతుంది"),
  collection: L("Water gathers in rivers and seas", "నీరు నదులు, సముద్రాలలో చేరుతుంది"),
};

export const stageExplain: Record<WaterStage, Record<AgeBand, Localized>> = {
  evaporation: {
    "7-9": L(
      "The sun warms the water. The water turns into a gas called water vapour and rises into the air.",
      "సూర్యుడు నీటిని వేడి చేస్తాడు. నీరు నీటి ఆవిరి అనే వాయువుగా మారి గాలిలోకి పైకి వెళ్తుంది.",
    ),
    "10-12": L(
      "Heat from the sun gives water particles enough energy to escape from the surface as invisible water vapour. A stronger sun makes this faster.",
      "సూర్యుని వేడి వల్ల నీటి కణాలకు ఉపరితలం నుండి బయటపడే శక్తి వస్తుంది, అవి కనిపించని నీటి ఆవిరిగా మారతాయి. సూర్యుడు బలంగా ఉంటే ఇది వేగంగా జరుగుతుంది.",
    ),
  },
  condensation: {
    "7-9": L(
      "High up, the air is cool. The water vapour cools and turns into tiny drops that make clouds.",
      "పైన గాలి చల్లగా ఉంటుంది. నీటి ఆవిరి చల్లబడి చిన్న చుక్కలుగా మారి మేఘాలను ఏర్పరుస్తుంది.",
    ),
    "10-12": L(
      "Rising vapour cools in the colder air. It changes back into tiny liquid droplets around specks of dust, and many droplets together make a cloud.",
      "పైకి వెళ్లిన ఆవిరి చల్లని గాలిలో చల్లబడుతుంది. అది దుమ్ము రేణువుల చుట్టూ చిన్న ద్రవ బిందువులుగా మారుతుంది, చాలా బిందువులు కలిసి మేఘం అవుతుంది.",
    ),
  },
  precipitation: {
    "7-9": L(
      "When a cloud gets full and heavy, the water falls as rain.",
      "మేఘం నిండి బరువెక్కినప్పుడు నీరు వర్షంగా కురుస్తుంది.",
    ),
    "10-12": L(
      "When cloud droplets join and grow too heavy to float, they fall as precipitation: rain, and in cold places also snow or hail.",
      "మేఘ బిందువులు కలిసి తేలలేనంత బరువెక్కినప్పుడు అవి అవపాతంగా పడతాయి: వర్షం, చల్లని చోట్ల మంచు లేదా వడగళ్లు కూడా.",
    ),
  },
  collection: {
    "7-9": L(
      "The rain runs into rivers, lakes and the sea. Then the sun can lift it up again.",
      "వర్షం నదులు, సరస్సులు, సముద్రంలోకి చేరుతుంది. అప్పుడు సూర్యుడు దాన్ని మళ్లీ పైకి లేపగలడు.",
    ),
    "10-12": L(
      "Water collects in rivers, lakes and oceans, and some soaks into the ground. No water is lost: it keeps moving around the cycle.",
      "నీరు నదులు, సరస్సులు, సముద్రాలలో చేరుతుంది, కొంత నేలలోకి ఇంకుతుంది. నీరు పోదు: అది చక్రంలో తిరుగుతూనే ఉంటుంది.",
    ),
  },
};

export const sunNames: Record<SunLevel, Localized> = {
  0: L("No sun: cold", "ఎండ లేదు: చలి"),
  1: L("Weak sun: cool", "బలహీన ఎండ: చల్లగా"),
  2: L("Medium sun: warm", "మధ్యస్థ ఎండ: వెచ్చగా"),
  3: L("Strong sun: hot", "బలమైన ఎండ: వేడిగా"),
};

export const ui = {
  sun: L("Sun and temperature", "సూర్యుడు మరియు ఉష్ణోగ్రత"),
  fast: L("Fast forward", "వేగంగా"),
  cloudTap: L(
    "Tap the cloud: cool it, or squeeze out rain when it is full",
    "మేఘాన్ని తట్టండి: చల్లబరచండి, లేదా నిండినప్పుడు వర్షం కురిపించండి",
  ),
  cloudLabel: L("Cloud. Tap to cool it or squeeze out rain.", "మేఘం. చల్లబరచడానికి లేదా వర్షం కురిపించడానికి తట్టండి."),
  stages: L("Stages", "దశలు"),
  nowHappening: L("Happening now", "ఇప్పుడు జరుగుతోంది"),
  nothing: L(
    "Press Start to set the water moving, or choose a stage to read about it.",
    "నీరు కదలడానికి స్టార్ట్ నొక్కండి, లేదా చదవడానికి ఒక దశను ఎంచుకోండి.",
  ),
  noSunNote: L(
    "With no sun nothing evaporates, so the cycle cannot start.",
    "ఎండ లేకపోతే ఏదీ ఆవిరి కాదు, కాబట్టి చక్రం మొదలవ్వదు.",
  ),
  lake: L("Water in the lake", "సరస్సులోని నీరు"),
  labelTitle: L("Label the diagram", "రేఖాచిత్రానికి లేబుళ్లు పెట్టండి"),
  labelHelp: L(
    "Drag a label onto the picture, or tap a label and then tap a spot.",
    "లేబుల్‌ను చిత్రంపైకి లాగండి, లేదా లేబుల్‌ను తట్టి, తర్వాత ఒక చోటును తట్టండి.",
  ),
  spot: L("Spot", "చోటు"),
  labelRight: L("Right!", "సరైనది!"),
  labelWrong: L("Not that spot. Think about where this happens.", "ఆ చోటు కాదు. ఇది ఎక్కడ జరుగుతుందో ఆలోచించండి."),
  labelsDone: L("Every label is in the right place!", "అన్ని లేబుళ్లు సరైన చోట ఉన్నాయి!"),
  selected: L("Selected", "ఎంచుకున్నది"),
  orderTitle: L("Put the stages in order", "దశలను క్రమంలో పెట్టండి"),
  orderHelp: L(
    "Tap the stages in the order they happen. Tap a slot to take a stage out.",
    "అవి జరిగే క్రమంలో దశలను తట్టండి. ఒక దశను తీసేయడానికి ఆ గడిని తట్టండి.",
  ),
  check: L("Check order", "క్రమాన్ని పరిశీలించండి"),
  clearOrder: L("Start again", "మళ్లీ మొదలు"),
  orderRight: L(
    "Correct! Evaporation, condensation, precipitation, collection. Then it starts again.",
    "సరైనది! బాష్పీభవనం, సాంద్రీకరణ, అవపాతం, సేకరణ. తర్వాత మళ్లీ మొదలవుతుంది.",
  ),
  orderPartial: L("in the right place. Take out the ones that look wrong and try again.", "సరైన చోట ఉన్నాయి. తప్పుగా అనిపించినవాటిని తీసేసి మళ్లీ ప్రయత్నించండి."),
  orderFill: L("Fill all four slots, then check.", "నాలుగు గడులు నింపి, తర్వాత పరిశీలించండి."),
  slot: L("Slot", "గడి"),
  empty: L("empty", "ఖాళీ"),
  tryThis79: L(
    "Watch the cloud fill up, then tap it when it is full.",
    "మేఘం నిండడం చూసి, నిండినప్పుడు దాన్ని తట్టండి.",
  ),
  tryThis1012: L(
    "Turn the sun down and up. Which stage speeds up or slows down? Why does the lake level change?",
    "ఎండను తగ్గించి, పెంచండి. ఏ దశ వేగంగా లేదా నెమ్మదిగా అవుతుంది? సరస్సు మట్టం ఎందుకు మారుతోంది?",
  ),
  tryThis: L("Try this", "ఇది ప్రయత్నించండి"),
};

export const questions: LabQuestionBank = {
  "7-9": [
    {
      prompt: L("What makes water rise into the air?", "నీరు గాలిలోకి పైకి వెళ్లడానికి కారణం ఏమిటి?"),
      options: [
        L("Heat from the sun", "సూర్యుని వేడి"),
        L("Cold snow", "చల్లని మంచు"),
        L("Dry sand", "ఎండిన ఇసుక"),
        L("A big spoon", "పెద్ద గరిటె"),
      ],
      answer: 0,
      explanation: L("The sun warms water so it turns into vapour.", "సూర్యుడు నీటిని వేడి చేస్తే అది ఆవిరిగా మారుతుంది."),
    },
    {
      prompt: L("Which stage turns water vapour into clouds?", "నీటి ఆవిరిని మేఘాలుగా మార్చే దశ ఏది?"),
      options: [
        L("Condensation", "సాంద్రీకరణ"),
        L("Collection", "సేకరణ"),
        L("Evaporation", "బాష్పీభవనం"),
        L("Sunshine", "ఎండ కాయడం"),
      ],
      answer: 0,
      explanation: L("Vapour cools high up and turns into tiny drops: condensation.", "ఆవిరి పైన చల్లబడి చిన్న చుక్కలుగా మారుతుంది: సాంద్రీకరణ."),
    },
    {
      prompt: L("Where does rain water go after it falls?", "వర్షపు నీరు పడిన తర్వాత ఎక్కడికి వెళ్తుంది?"),
      options: [
        L("Into rivers, lakes and the sea", "నదులు, సరస్సులు, సముద్రంలోకి"),
        L("Up to the moon", "చంద్రుని వద్దకు"),
        L("It disappears forever", "శాశ్వతంగా మాయమవుతుంది"),
        L("Into the clouds only", "కేవలం మేఘాల్లోకి"),
      ],
      answer: 0,
      explanation: L("Rain collects in rivers, lakes and the sea. Then the cycle starts again.", "వర్షం నదులు, సరస్సులు, సముద్రంలో చేరుతుంది. తర్వాత చక్రం మళ్లీ మొదలవుతుంది."),
    },
  ],
  "10-12": [
    {
      prompt: L("If the sun gets weaker, what happens to evaporation?", "సూర్యుడు బలహీనమైతే బాష్పీభవనానికి ఏమి జరుగుతుంది?"),
      options: [
        L("It slows down", "నెమ్మదిస్తుంది"),
        L("It speeds up", "వేగవంతమవుతుంది"),
        L("It stays exactly the same", "ఏమాత్రం మారదు"),
        L("It turns into rain", "వర్షంగా మారుతుంది"),
      ],
      answer: 0,
      explanation: L("Less heat means fewer water particles escape from the surface.", "వేడి తక్కువైతే ఉపరితలం నుండి తప్పించుకునే నీటి కణాలు తక్కువ."),
    },
    {
      prompt: L("Why does water vapour turn into droplets high in the sky?", "ఆకాశంలో పైన నీటి ఆవిరి బిందువులుగా ఎందుకు మారుతుంది?"),
      options: [
        L("The air is colder up there", "అక్కడ గాలి చల్లగా ఉంటుంది"),
        L("The air is hotter up there", "అక్కడ గాలి వేడిగా ఉంటుంది"),
        L("There is no air up there", "అక్కడ గాలి ఉండదు"),
        L("Birds push it together", "పక్షులు దాన్ని కలుపుతాయి"),
      ],
      answer: 0,
      explanation: L("Cooling makes vapour change back into liquid droplets.", "చల్లబడితే ఆవిరి తిరిగి ద్రవ బిందువులుగా మారుతుంది."),
    },
    {
      prompt: L("In the water cycle, what happens to the total amount of water?", "జలచక్రంలో మొత్తం నీటి పరిమాణానికి ఏమి జరుగుతుంది?"),
      options: [
        L("It is not lost: it keeps moving between sea, air, clouds and land", "అది పోదు: సముద్రం, గాలి, మేఘాలు, నేల మధ్య తిరుగుతూనే ఉంటుంది"),
        L("It slowly disappears", "నెమ్మదిగా మాయమవుతుంది"),
        L("It is made new each day", "ప్రతిరోజూ కొత్తగా తయారవుతుంది"),
        L("It all stays in the clouds", "అంతా మేఘాల్లోనే ఉంటుంది"),
      ],
      answer: 0,
      explanation: L("Water only changes place and form. It moves between the lake, the air, the cloud and the ground.", "నీరు చోటు, రూపం మాత్రమే మారుతుంది."),
    },
    {
      prompt: L("Which list shows the stages in the correct order?", "దశలు సరైన క్రమంలో ఉన్న జాబితా ఏది?"),
      options: [
        L("Evaporation, condensation, precipitation, collection", "బాష్పీభవనం, సాంద్రీకరణ, అవపాతం, సేకరణ"),
        L("Collection, condensation, evaporation, precipitation", "సేకరణ, సాంద్రీకరణ, బాష్పీభవనం, అవపాతం"),
        L("Precipitation, evaporation, collection, condensation", "అవపాతం, బాష్పీభవనం, సేకరణ, సాంద్రీకరణ"),
        L("Condensation, collection, precipitation, evaporation", "సాంద్రీకరణ, సేకరణ, అవపాతం, బాష్పీభవనం"),
      ],
      answer: 0,
      explanation: L("The water rises, forms clouds, falls as rain and collects again.", "నీరు పైకి వెళ్లి, మేఘాలు ఏర్పడి, వర్షంగా పడి, మళ్లీ చేరుతుంది."),
    },
  ],
};
