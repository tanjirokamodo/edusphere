import type { AgeBand, Localized, VideoCategory, VideoItem } from "@/types";

/*
 * Teacher-curated demo catalogue. Every title, description, creator and
 * transcript below is original sample content and every creator is fictional.
 *
 * Only `v-player-tour` has a media file (a short original clip made for this
 * demo, see /public/media). All other lessons have no `media`, so the player
 * shows a clear "sample file not included" placeholder instead of pretending to
 * play. Add `media: { src, type, captions }` to any entry to enable real
 * playback once licensed files exist.
 */

export const videoCategories: VideoCategory[] = [
  "mathematics",
  "science",
  "english",
  "telugu",
  "general-knowledge",
  "nature",
  "history-geography",
  "space",
  "stories",
  "computer-science",
];

export const videoCategoryLabels: Record<VideoCategory, Localized> = {
  mathematics: { en: "Mathematics", te: "గణితం" },
  science: { en: "Science", te: "సైన్స్" },
  english: { en: "English Learning", te: "ఇంగ్లీష్ లెర్నింగ్" },
  telugu: { en: "Telugu Learning", te: "తెలుగు లెర్నింగ్" },
  "general-knowledge": { en: "General Knowledge", te: "సాధారణ జ్ఞానం" },
  nature: { en: "Nature and Wildlife", te: "ప్రకృతి మరియు వన్యప్రాణులు" },
  "history-geography": { en: "History and Geography", te: "చరిత్ర మరియు భూగోళశాస్త్రం" },
  space: { en: "Space and Astronomy", te: "అంతరిక్షం మరియు ఖగోళశాస్త్రం" },
  stories: { en: "Stories and Literature", te: "కథలు మరియు సాహిత్యం" },
  "computer-science": { en: "Computer Science", te: "కంప్యూటర్ సైన్స్" },
};

const both: AgeBand[] = ["7-9", "10-12"];

export const videos: VideoItem[] = [
  {
    id: "v-solar",
    title: { en: "Journey Through the Solar System", te: "సౌర కుటుంబం ద్వారా ప్రయాణం" },
    description: {
      en: "Fly past all eight planets and find out why Earth is just right for life.",
      te: "ఎనిమిది గ్రహాలను దాటి వెళ్లి, భూమి జీవానికి ఎందుకు సరిగ్గా సరిపోతుందో తెలుసుకోండి.",
    },
    creator: "Ms. Kavya Rao",
    category: "space",
    durationSec: 720,
    languages: ["en", "te"],
    bands: both,
    tone: "indigo",
    sizeMb: 88,
    objectives: [
      { en: "Name the eight planets in order from the Sun.", te: "సూర్యుని నుండి వరుసగా ఎనిమిది గ్రహాల పేర్లు చెప్పండి." },
      { en: "Tell rocky planets and gas giants apart.", te: "రాతి గ్రహాలను, వాయు గ్రహాలను వేరు చేసి చెప్పండి." },
      { en: "Explain why Earth can support life.", te: "భూమిపై జీవం ఎందుకు సాధ్యమో వివరించండి." },
    ],
    transcript: {
      en: [
        "Welcome aboard! Today we travel outward from the Sun, past each planet in our solar system.",
        "The first four planets, Mercury, Venus, Earth and Mars, are small and rocky. Mercury is closest to the Sun, so it gets very hot in the day.",
        "Beyond Mars lie the giants. Jupiter and Saturn are mostly gas, and Uranus and Neptune are icy giants far from the Sun.",
        "Earth sits in a lucky spot: not too hot and not too cold, so water can stay liquid. That is one big reason life can grow here.",
      ],
      te: [
        "స్వాగతం! ఈ రోజు మనం సూర్యుని నుండి బయటికి, మన సౌర కుటుంబంలోని ప్రతి గ్రహాన్ని దాటుతూ ప్రయాణిస్తాం.",
        "మొదటి నాలుగు గ్రహాలు, బుధుడు, శుక్రుడు, భూమి, అంగారకుడు చిన్నవి, రాతితో ఉంటాయి. బుధుడు సూర్యునికి దగ్గరగా ఉండటంతో పగటిపూట చాలా వేడిగా ఉంటుంది.",
        "అంగారకుడి తర్వాత పెద్ద గ్రహాలు ఉన్నాయి. బృహస్పతి, శని ఎక్కువగా వాయువులతో ఉంటాయి. యురేనస్, నెప్ట్యూన్ సూర్యునికి దూరంగా ఉండే మంచు గ్రహాలు.",
        "భూమి అదృష్టమైన చోట ఉంది: మరీ వేడి కాదు, మరీ చల్లన కాదు, కాబట్టి నీరు ద్రవంగా ఉండగలదు. ఇక్కడ జీవం పెరగడానికి ఇదొక ముఖ్య కారణం.",
      ],
    },
    featured: true,
    popularity: 96,
    addedOn: "2026-09-12",
  },
  {
    id: "v-plants",
    title: { en: "How Do Plants Grow?", te: "మొక్కలు ఎలా పెరుగుతాయి?" },
    description: {
      en: "Follow a seed from the soil to a leafy plant and see what it needs to grow.",
      te: "విత్తనం మట్టిలో నుండి ఆకులతో కూడిన మొక్కగా ఎలా మారుతుందో, దానికి ఏమి కావాలో చూడండి.",
    },
    creator: "Mr. Arjun Menon",
    category: "science",
    durationSec: 480,
    languages: ["en", "te"],
    bands: both,
    tone: "rose",
    sizeMb: 52,
    objectives: [
      { en: "List what a seed needs to sprout.", te: "విత్తనం మొలకెత్తడానికి కావాల్సినవి చెప్పండి." },
      { en: "Name the main parts of a plant.", te: "మొక్కలోని ముఖ్య భాగాల పేర్లు చెప్పండి." },
      { en: "Describe how leaves make food from sunlight.", te: "ఆకులు సూర్యకాంతితో ఆహారాన్ని ఎలా తయారు చేస్తాయో వివరించండి." },
    ],
    transcript: {
      en: [
        "Every plant begins as a seed. Inside the seed is a tiny baby plant and a little packet of food.",
        "When a seed gets water and warmth, it wakes up. A root pushes down first, then a shoot pushes up towards the light.",
        "The roots drink water from the soil. The leaves catch sunlight and use it, with air and water, to make food for the plant.",
      ],
    },
    popularity: 91,
    addedOn: "2026-09-20",
  },
  {
    id: "v-fractions",
    title: { en: "Understanding Fractions", te: "భిన్నాలను అర్థం చేసుకుందాం" },
    description: {
      en: "Slice a pizza into equal parts and learn what halves, quarters and thirds mean.",
      te: "పిజ్జాను సమాన భాగాలుగా కోసి, సగం, పావు, మూడో వంతు అంటే ఏమిటో తెలుసుకోండి.",
    },
    creator: "Ms. Lakshmi Devi",
    category: "mathematics",
    durationSec: 600,
    languages: ["en"],
    bands: ["10-12"],
    tone: "teal",
    sizeMb: 66,
    objectives: [
      { en: "Read a fraction as parts of a whole.", te: "భిన్నాన్ని మొత్తంలోని భాగాలుగా చదవండి." },
      { en: "Compare simple fractions with the same bottom number.", te: "ఒకే హారం ఉన్న సరళ భిన్నాలను పోల్చండి." },
      { en: "Find a fraction of a small number.", te: "చిన్న సంఖ్యలో ఒక భిన్నాన్ని కనుగొనండి." },
    ],
    popularity: 84,
    addedOn: "2026-08-30",
  },
  {
    id: "v-tables",
    title: { en: "Learning Times Tables with Rhythm", te: "లయతో ఎక్కాలు నేర్చుకోండి" },
    description: {
      en: "Clap, count and chant your way through the 2, 5 and 10 times tables.",
      te: "చప్పట్లు కొడుతూ, లెక్కిస్తూ, పాడుతూ 2, 5, 10 ఎక్కాలు నేర్చుకోండి.",
    },
    creator: "Ms. Lakshmi Devi",
    category: "mathematics",
    durationSec: 360,
    languages: ["en", "te"],
    bands: ["7-9"],
    tone: "teal",
    sizeMb: 40,
    objectives: [
      { en: "Count in steps of 2, 5 and 10.", te: "2, 5, 10 చొప్పున లెక్కించండి." },
      { en: "Spot patterns in the answers.", te: "జవాబుల్లోని నమూనాలను గుర్తించండి." },
      { en: "Recall the tables without counting aloud.", te: "బిగ్గరగా లెక్కించకుండా ఎక్కాలను గుర్తు చేసుకోండి." },
    ],
    popularity: 78,
    addedOn: "2026-07-18",
  },
  {
    id: "v-water-cycle",
    title: { en: "The Water Cycle", te: "జలచక్రం" },
    description: {
      en: "Meet a drop of water as it rises, becomes a cloud and falls again as rain.",
      te: "ఒక నీటి బిందువు పైకి లేచి, మేఘంగా మారి, మళ్లీ వర్షంగా ఎలా కురుస్తుందో చూడండి.",
    },
    creator: "Mr. Arjun Menon",
    category: "science",
    durationSec: 420,
    languages: ["en", "te"],
    bands: ["7-9"],
    tone: "sky",
    sizeMb: 35,
    objectives: [
      { en: "Say what evaporation and condensation mean.", te: "బాష్పీభవనం, సాంద్రీకరణ అంటే ఏమిటో చెప్పండి." },
      { en: "Draw the water cycle in four steps.", te: "జలచక్రాన్ని నాలుగు దశల్లో గీయండి." },
      { en: "Explain why rain does not run out.", te: "వర్షం ఎందుకు అయిపోదో వివరించండి." },
    ],
    transcript: {
      en: [
        "Water is always moving. Sunshine warms the sea and the puddles, and the water rises into the air as a gas. This is evaporation.",
        "High up, the air is cool. The water gas cools and turns back into tiny drops that gather into clouds. This is condensation.",
        "When the drops in a cloud grow heavy, they fall as rain. The water runs into rivers and the sea, and the cycle starts again.",
      ],
    },
    popularity: 88,
    addedOn: "2026-10-05",
  },
  {
    id: "v-animals",
    title: { en: "Amazing Animals of India", te: "భారతదేశంలోని అద్భుత జంతువులు" },
    description: {
      en: "Meet tigers, one-horned rhinos, elephants and more, and learn where each one lives.",
      te: "పులులు, ఒంటికొమ్ము ఖడ్గమృగాలు, ఏనుగులు మరియు మరిన్నింటిని కలవండి; ప్రతిదీ ఎక్కడ నివసిస్తుందో తెలుసుకోండి.",
    },
    creator: "Mr. Ravi Teja",
    category: "nature",
    durationSec: 540,
    languages: ["en", "te"],
    bands: both,
    tone: "amber",
    sizeMb: 58,
    objectives: [
      { en: "Match animals to their habitats.", te: "జంతువులను వాటి నివాస ప్రాంతాలతో జతచేయండి." },
      { en: "Name three animals that need protection.", te: "రక్షణ అవసరమైన మూడు జంతువుల పేర్లు చెప్పండి." },
      { en: "Describe how people can help wildlife.", te: "వన్యప్రాణులకు ప్రజలు ఎలా సహాయం చేయవచ్చో వివరించండి." },
    ],
    popularity: 93,
    addedOn: "2026-10-10",
  },
  {
    id: "v-cs-intro",
    title: { en: "Introduction to Computer Science", te: "కంప్యూటర్ సైన్స్ పరిచయం" },
    description: {
      en: "Find out what a computer really does and write your first set of step-by-step instructions.",
      te: "కంప్యూటర్ నిజంగా ఏమి చేస్తుందో తెలుసుకుని, మీ మొదటి దశలవారీ సూచనలను రాయండి.",
    },
    creator: "Mr. Imran Qureshi",
    category: "computer-science",
    durationSec: 660,
    languages: ["en"],
    bands: ["10-12"],
    tone: "indigo",
    sizeMb: 70,
    objectives: [
      { en: "Explain what an algorithm is.", te: "అల్గోరిథం అంటే ఏమిటో వివరించండి." },
      { en: "Put steps in the right order.", te: "దశలను సరైన క్రమంలో పెట్టండి." },
      { en: "Spot a mistake in a set of instructions.", te: "సూచనల్లో తప్పును గుర్తించండి." },
    ],
    popularity: 80,
    addedOn: "2026-09-02",
  },
  {
    id: "v-grammar",
    title: { en: "Learn English Grammar", te: "ఇంగ్లీష్ వ్యాకరణం నేర్చుకోండి" },
    description: {
      en: "Nouns, verbs and adjectives made simple, with lots of short examples.",
      te: "నామవాచకాలు, క్రియలు, విశేషణాలను చిన్న ఉదాహరణలతో సులభంగా నేర్చుకోండి.",
    },
    creator: "Ms. Sneha Iyer",
    category: "english",
    durationSec: 480,
    languages: ["en"],
    bands: both,
    tone: "rose",
    sizeMb: 44,
    objectives: [
      { en: "Find the noun and verb in a sentence.", te: "వాక్యంలో నామవాచకం, క్రియను కనుగొనండి." },
      { en: "Use adjectives to describe things.", te: "వస్తువులను వర్ణించడానికి విశేషణాలను వాడండి." },
      { en: "Write a clear sentence of your own.", te: "మీ స్వంతంగా స్పష్టమైన వాక్యం రాయండి." },
    ],
    popularity: 72,
    addedOn: "2026-08-14",
  },
  {
    id: "v-telugu-stories",
    title: { en: "Telugu Stories for Children", te: "పిల్లల కోసం తెలుగు కథలు" },
    description: {
      en: "Three short Telugu stories told aloud, each with a little lesson at the end.",
      te: "చివర్లో చిన్న నీతితో కూడిన మూడు చిన్న తెలుగు కథలు.",
    },
    creator: "Ms. Padma Reddy",
    category: "telugu",
    durationSec: 600,
    languages: ["te"],
    bands: ["7-9"],
    tone: "amber",
    sizeMb: 62,
    objectives: [
      { en: "Retell a story in your own words.", te: "కథను మీ మాటల్లో మళ్లీ చెప్పండి." },
      { en: "Learn new Telugu words from the stories.", te: "కథల నుండి కొత్త తెలుగు పదాలు నేర్చుకోండి." },
      { en: "Say what each story teaches.", te: "ప్రతి కథ ఏమి నేర్పుతుందో చెప్పండి." },
    ],
    transcript: {
      te: [
        "ఒక అడవిలో ఒక చిన్న చీమ ఉండేది. అది రోజంతా కష్టపడి తినడానికి గింజలు సేకరించేది.",
        "ఒక రోజు పెద్ద వాన వచ్చింది. చీమ సేకరించిన గింజలతో హాయిగా ఇంట్లో ఉంది.",
        "నీతి: ముందుగా కష్టపడితే, తర్వాత సుఖంగా ఉండవచ్చు.",
      ],
    },
    story: true,
    popularity: 75,
    addedOn: "2026-09-25",
  },
  {
    id: "v-body",
    title: { en: "Discover the Human Body", te: "మానవ శరీరాన్ని తెలుసుకుందాం" },
    description: {
      en: "Take a tour of your heart, lungs, bones and muscles and see how they work as a team.",
      te: "మీ గుండె, ఊపిరితిత్తులు, ఎముకలు, కండరాలను చూసి అవి ఒక జట్టుగా ఎలా పనిచేస్తాయో తెలుసుకోండి.",
    },
    creator: "Dr. Anita Sharma",
    category: "science",
    durationSec: 660,
    languages: ["en", "te"],
    bands: both,
    tone: "rose",
    sizeMb: 74,
    objectives: [
      { en: "Name five major body parts and what they do.", te: "ఐదు ముఖ్య శరీర భాగాల పేర్లు, వాటి పనులు చెప్పండి." },
      { en: "Explain how the heart pumps blood.", te: "గుండె రక్తాన్ని ఎలా పంపుతుందో వివరించండి." },
      { en: "Say why exercise keeps the body strong.", te: "వ్యాయామం శరీరాన్ని ఎందుకు బలంగా ఉంచుతుందో చెప్పండి." },
    ],
    popularity: 89,
    addedOn: "2026-10-15",
  },
  {
    id: "v-electricity",
    title: { en: "Understanding Electricity", te: "విద్యుత్తును అర్థం చేసుకుందాం" },
    description: {
      en: "See how a battery, a wire and a bulb make a circuit and why a switch can turn it off.",
      te: "బ్యాటరీ, తీగ, బల్బు కలిసి వలయాన్ని ఎలా తయారు చేస్తాయో, స్విచ్ దాన్ని ఎలా ఆపుతుందో చూడండి.",
    },
    creator: "Mr. Imran Qureshi",
    category: "science",
    durationSec: 600,
    languages: ["en"],
    bands: ["10-12"],
    tone: "amber",
    sizeMb: 64,
    objectives: [
      { en: "Build a closed circuit on paper.", te: "కాగితంపై పూర్తి వలయాన్ని గీయండి." },
      { en: "Tell conductors from insulators.", te: "వాహకాలను, నిరోధకాలను వేరు చేసి చెప్పండి." },
      { en: "Describe simple electricity safety rules.", te: "విద్యుత్ భద్రతకు సంబంధించిన సరళ నియమాలను వివరించండి." },
    ],
    popularity: 70,
    addedOn: "2026-10-28",
  },
  {
    id: "v-mountains",
    title: { en: "How Mountains Are Formed", te: "పర్వతాలు ఎలా ఏర్పడతాయి" },
    description: {
      en: "Watch giant slabs of land push together to build the Himalayas, one slow centimetre at a time.",
      te: "భూమి యొక్క భారీ పలకలు ఒకదానినొకటి నెట్టుకుంటూ హిమాలయాలను ఎలా నిర్మించాయో చూడండి.",
    },
    creator: "Ms. Kavya Rao",
    category: "history-geography",
    durationSec: 540,
    languages: ["en", "te"],
    bands: ["10-12"],
    tone: "sky",
    sizeMb: 56,
    objectives: [
      { en: "Say what tectonic plates are.", te: "టెక్టోనిక్ పలకలు అంటే ఏమిటో చెప్పండి." },
      { en: "Name the main kinds of mountains.", te: "పర్వతాల ప్రధాన రకాల పేర్లు చెప్పండి." },
      { en: "Find the Himalayas on a map.", te: "పటంలో హిమాలయాలను కనుగొనండి." },
    ],
    popularity: 68,
    addedOn: "2026-10-22",
  },
  {
    id: "v-renewable",
    title: { en: "Introduction to Renewable Energy", te: "పునరుత్పాదక శక్తి పరిచయం" },
    description: {
      en: "Sun, wind and water can all make power. Learn how, and why it matters for our planet.",
      te: "సూర్యుడు, గాలి, నీరు అన్నీ శక్తిని ఇవ్వగలవు. ఎలాగో, ఇది మన గ్రహానికి ఎందుకు ముఖ్యమో తెలుసుకోండి.",
    },
    creator: "Mr. Ravi Teja",
    category: "general-knowledge",
    durationSec: 600,
    languages: ["en"],
    bands: ["10-12"],
    tone: "teal",
    sizeMb: 64,
    objectives: [
      { en: "Name three sources of renewable energy.", te: "పునరుత్పాదక శక్తి యొక్క మూడు వనరుల పేర్లు చెప్పండి." },
      { en: "Explain why fuels like coal run out.", te: "బొగ్గు వంటి ఇంధనాలు ఎందుకు అయిపోతాయో వివరించండి." },
      { en: "Suggest one way to save energy at home.", te: "ఇంట్లో శక్తిని ఆదా చేసే ఒక మార్గాన్ని సూచించండి." },
    ],
    popularity: 74,
    addedOn: "2026-10-30",
  },
  {
    id: "v-raindrop",
    title: { en: "The Little Raindrop's Journey", te: "చిన్న వానచుక్క ప్రయాణం" },
    description: {
      en: "A story about a raindrop who sets out to find the sea and meets new friends on the way.",
      te: "సముద్రాన్ని వెతుకుతూ బయలుదేరి, దారిలో కొత్త స్నేహితులను కలిసే ఒక వానచుక్క కథ.",
    },
    creator: "Ms. Padma Reddy",
    category: "stories",
    durationSec: 300,
    languages: ["en", "te"],
    bands: ["7-9"],
    tone: "sky",
    sizeMb: 30,
    objectives: [
      { en: "Follow the order of events in a story.", te: "కథలోని సంఘటనల క్రమాన్ని అనుసరించండి." },
      { en: "Say how the raindrop felt at the end.", te: "చివర్లో వానచుక్క ఎలా భావించిందో చెప్పండి." },
      { en: "Connect the story to the water cycle.", te: "కథను జలచక్రంతో కలపండి." },
    ],
    transcript: {
      en: [
        "High in a grey cloud, a little raindrop looked down and wondered, 'Where does the sea begin?'",
        "She fell past a swallow, a rooftop and a sleepy cow, and landed in a muddy stream.",
        "The stream carried her to a river, and the river carried her to the sea. 'I was part of it all along,' she smiled.",
      ],
    },
    story: true,
    popularity: 82,
    addedOn: "2026-10-18",
  },
  {
    id: "v-player-tour",
    title: { en: "Sample clip: How This Player Works", te: "నమూనా క్లిప్: ఈ ప్లేయర్ ఎలా పనిచేస్తుంది" },
    description: {
      en: "A short clip made for this demo. Use it to try play, volume, speed, captions and full screen.",
      te: "ఈ డెమో కోసం తయారు చేసిన చిన్న క్లిప్. ప్లే, వాల్యూమ్, వేగం, క్యాప్షన్లు, పూర్తి స్క్రీన్‌ను ప్రయత్నించండి.",
    },
    creator: "EduSphere Demo Team",
    category: "general-knowledge",
    durationSec: 23,
    languages: ["en", "te"],
    bands: both,
    tone: "teal",
    sizeMb: 1,
    objectives: [
      { en: "Play, pause and seek in a video.", te: "వీడియోను ప్లే, పాజ్ చేసి, కావాల్సిన చోటికి వెళ్లండి." },
      { en: "Turn captions on in English or Telugu.", te: "ఇంగ్లీష్ లేదా తెలుగులో క్యాప్షన్లు ఆన్ చేయండి." },
      { en: "Change the playback speed.", te: "ప్లేబ్యాక్ వేగాన్ని మార్చండి." },
    ],
    transcript: {
      en: [
        "Welcome to the EduSphere video player. Press the big play button to start.",
        "Use the bar to jump to any moment. Use the speed button to slow down or speed up.",
        "Turn on captions if you want to read along. That is all, happy learning!",
      ],
      te: [
        "ఎడ్యుస్ఫియర్ వీడియో ప్లేయర్‌కు స్వాగతం. ప్రారంభించడానికి పెద్ద ప్లే బటన్ నొక్కండి.",
        "ఏ క్షణానికైనా వెళ్లడానికి బార్‌ను వాడండి. వేగాన్ని తగ్గించడానికి లేదా పెంచడానికి స్పీడ్ బటన్ వాడండి.",
        "చదువుతూ వినాలంటే క్యాప్షన్లు ఆన్ చేయండి. అంతే, హాయిగా నేర్చుకోండి!",
      ],
    },
    media: {
      src: "/media/player-tour.webm",
      type: "video/webm",
      captions: [
        { lang: "en", src: "/media/player-tour.en.vtt" },
        { lang: "te", src: "/media/player-tour.te.vtt" },
      ],
    },
    popularity: 40,
    addedOn: "2026-11-02",
  },
];

export function findVideo(id: string): VideoItem | undefined {
  return videos.find((v) => v.id === id);
}

export function videoMinutes(v: VideoItem): number {
  return Math.max(1, Math.round(v.durationSec / 60));
}

/** 0:24 or 12:05 */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

/** Same category first, then same age band, then by popularity. */
export function relatedVideos(video: VideoItem, limit = 4): VideoItem[] {
  const score = (v: VideoItem) =>
    (v.category === video.category ? 4 : 0) +
    (v.bands.some((b) => video.bands.includes(b)) ? 1 : 0) +
    v.popularity / 1000;
  return videos
    .filter((v) => v.id !== video.id)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}
