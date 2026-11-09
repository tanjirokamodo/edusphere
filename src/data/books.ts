import type { AgeBand, Author, Book, Collection, Language, LibrarySubject, Localized } from "@/types";

/*
 * Demo library. Every book, author and cover here is fictional, original
 * placeholder content created for the EduSphere demonstration.
 */

const L = (en: string, te: string): Localized => ({ en, te });
const same = (s: string): Localized => ({ en: s, te: s });
const both: AgeBand[] = ["7-9", "10-12"];

export const subjectLabels: Record<LibrarySubject, Localized> = {
  mathematics: L("Mathematics", "గణితం"),
  science: L("Science", "సైన్స్"),
  english: L("English", "ఇంగ్లీష్"),
  telugu: L("Telugu", "తెలుగు"),
  "general-knowledge": L("General Knowledge", "సాధారణ విజ్ఞానం"),
  "computer-science": L("Computer Science", "కంప్యూటర్ సైన్స్"),
  stories: L("Stories and Literature", "కథలు, సాహిత్యం"),
};

export const librarySubjects = Object.keys(subjectLabels) as LibrarySubject[];

export const authors: Author[] = [
  { id: "a-padma", name: "Padma Rao", bio: L("A maths teacher with 20 years of classroom experience who loves turning numbers into games.", "20 ఏళ్ల బోధనానుభవం ఉన్న గణిత ఉపాధ్యాయురాలు; సంఖ్యలను ఆటలుగా మార్చడం ఆమెకు ఇష్టం.") },
  { id: "a-kavitha", name: "Dr. Kavitha Menon", bio: L("A biologist and science writer who explains how living things work in simple words.", "జీవులు ఎలా పనిచేస్తాయో సులభమైన మాటల్లో వివరించే జీవశాస్త్రవేత్త, సైన్స్ రచయిత్రి.") },
  { id: "a-suresh", name: "Dr. Suresh Varma", bio: L("A physics teacher who builds classroom experiments from everyday objects.", "రోజువారీ వస్తువులతో తరగతి ప్రయోగాలు చేసే భౌతికశాస్త్ర ఉపాధ్యాయుడు.") },
  { id: "a-grace", name: "Grace Thomas", bio: L("An English teacher who writes read-aloud stories and friendly grammar guides.", "గట్టిగా చదివే కథలు, సులభమైన వ్యాకరణ గైడ్‌లు రాసే ఇంగ్లీష్ ఉపాధ్యాయురాలు.") },
  { id: "a-murali", name: "Murali Mohan", bio: L("A Telugu teacher and poet who writes rhymes and readers for young learners.", "చిన్నారుల కోసం పద్యాలు, పాఠకాలు రాసే తెలుగు ఉపాధ్యాయుడు, కవి.") },
  { id: "a-radha", name: "Radha Krishnan", bio: L("A social studies teacher and traveller who collects fascinating facts about places.", "ప్రదేశాల గురించి ఆసక్తికర విషయాలు సేకరించే సాంఘిక శాస్త్ర ఉపాధ్యాయురాలు, ప్రయాణికురాలు.") },
  { id: "a-arjun", name: "Arjun Kumar", bio: L("A computer science teacher who helps children build their first programs.", "పిల్లలు తమ మొదటి ప్రోగ్రామ్‌లు రాసేలా సహాయపడే కంప్యూటర్ సైన్స్ ఉపాధ్యాయుడు.") },
  { id: "a-editorial", name: "EduSphere Editorial Team", bio: L("A team of teachers and editors who write original learning material for this demo.", "ఈ డెమో కోసం అసలు అభ్యాస సామగ్రిని రాసే ఉపాధ్యాయులు, సంపాదకుల బృందం.") },
];

export function findAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}

export const books: Book[] = [
  { id: "b-maths-magic", title: same("Maths Magic: Puzzles and Tricks"), authorId: "a-padma", subject: "mathematics", languages: ["en"], description: L("Mental-maths tricks, number puzzles and brain teasers you can try with just a pencil.", "ఒక పెన్సిల్‌తో మీరు ప్రయత్నించగల మానసిక గణిత చిట్కాలు, సంఖ్యల పజిళ్లు, బుర్రకు పని పెట్టే ప్రశ్నలు."), pages: 120, sizeMb: 14.8, tone: "teal", bands: both, popularity: 92 },
  { id: "b-fractions", title: L("Fractions in the Kitchen", "వంటగదిలో భిన్నాలు"), authorId: "a-padma", subject: "mathematics", languages: ["en", "te"], description: L("Learn halves, quarters and thirds by sharing rotis, cutting fruit and measuring ingredients.", "రొట్టెలు పంచుకోవడం, పండ్లు కోయడం, పదార్థాలు కొలవడం ద్వారా సగం, పావు, మూడో వంతు నేర్చుకోండి."), pages: 80, sizeMb: 11.2, tone: "amber", bands: ["7-9"], popularity: 70 },
  { id: "b-story-numbers", title: same("The Story of Numbers"), authorId: "a-editorial", subject: "mathematics", languages: ["en"], description: L("How people across the world invented counting, zero and the numbers we use today.", "ప్రపంచవ్యాప్తంగా ప్రజలు లెక్కింపు, సున్నా, ఈ రోజు వాడే సంఖ్యలను ఎలా కనుగొన్నారో తెలుసుకోండి."), pages: 140, sizeMb: 10.5, tone: "indigo", bands: ["10-12"], popularity: 61 },
  { id: "b-first-science", title: L("My First Book of Science", "నా మొదటి సైన్స్ పుస్తకం"), authorId: "a-kavitha", subject: "science", languages: ["en", "te"], description: L("Plants, animals, water and weather explained with simple experiments to try at home.", "ఇంట్లో చేసి చూడగల సులభమైన ప్రయోగాలతో మొక్కలు, జంతువులు, నీరు, వాతావరణం గురించి తెలుసుకోండి."), pages: 96, sizeMb: 12.4, tone: "rose", bands: ["7-9"], popularity: 88 },
  { id: "b-solar", title: L("Our Solar System", "మన సౌర కుటుంబం"), authorId: "a-suresh", subject: "science", languages: ["en", "te"], description: L("A guided tour of the Sun, the planets and the Moon with facts, diagrams and night-sky activities.", "సూర్యుడు, గ్రహాలు, చంద్రుడి గురించి వాస్తవాలు, చిత్రాలు, రాత్రి ఆకాశ కార్యకలాపాలతో మార్గదర్శక యాత్ర."), pages: 88, sizeMb: 16.3, tone: "indigo", bands: both, popularity: 95 },
  { id: "b-electricity", title: same("Electricity at Home"), authorId: "a-suresh", subject: "science", languages: ["en"], description: L("Understand circuits, switches and safety by building simple models from batteries and bulbs.", "బ్యాటరీలు, బల్బులతో సులభమైన నమూనాలు చేసి వలయాలు, స్విచ్‌లు, భద్రత గురించి తెలుసుకోండి."), pages: 104, sizeMb: 13.7, tone: "sky", bands: ["10-12"], popularity: 66 },
  { id: "b-read-aloud", title: same("Stories to Read Aloud"), authorId: "a-grace", subject: "english", languages: ["en"], description: L("Short, funny and thoughtful stories with new words to practise reading aloud.", "గట్టిగా చదివి సాధన చేయడానికి కొత్త పదాలతో చిన్న, సరదా, ఆలోచింపజేసే కథలు."), pages: 72, sizeMb: 9.8, tone: "amber", bands: ["7-9"], popularity: 74 },
  { id: "b-clear-sentences", title: same("Writing Clear Sentences"), authorId: "a-grace", subject: "english", languages: ["en"], description: L("A friendly guide to grammar, paragraphs and writing letters and short essays.", "వ్యాకరణం, పేరాలు, లేఖలు, చిన్న వ్యాసాలు రాయడానికి స్నేహపూర్వక గైడ్."), pages: 110, sizeMb: 8.9, tone: "sky", bands: ["10-12"], popularity: 52 },
  { id: "b-telugu-rhymes", title: L("A Garden of Telugu Rhymes", "తెలుగు పద్యాల తోట"), authorId: "a-murali", subject: "telugu", languages: ["te"], description: L("Playful Telugu rhymes about animals, seasons and festivals, with words to learn on every page.", "జంతువులు, రుతువులు, పండుగల గురించి ఆటపాటల తెలుగు పద్యాలు; ప్రతి పేజీలో నేర్చుకోవాల్సిన పదాలు."), pages: 64, sizeMb: 8.2, tone: "amber", bands: ["7-9"], popularity: 80 },
  { id: "b-telugu-reader", title: L("Telugu Reader for Class 6", "తెలుగు వెలుగు పాఠకం – 6వ తరగతి"), authorId: "a-murali", subject: "telugu", languages: ["te"], description: L("Essays, stories and poems in Telugu to build confident, independent reading.", "ఆత్మవిశ్వాసంతో స్వతంత్రంగా చదవడం పెంచుకోవడానికి తెలుగులో వ్యాసాలు, కథలు, పద్యాలు."), pages: 128, sizeMb: 9.6, tone: "amber", bands: ["10-12"], popularity: 58 },
  { id: "b-india-facts", title: L("Amazing Facts about India", "భారతదేశం గురించి అద్భుత విషయాలు"), authorId: "a-radha", subject: "general-knowledge", languages: ["en", "te"], description: L("Rivers, festivals, inventions and records that make India special.", "భారతదేశాన్ని ప్రత్యేకంగా నిలిపే నదులు, పండుగలు, ఆవిష్కరణలు, రికార్డులు."), pages: 90, sizeMb: 11.9, tone: "sky", bands: both, popularity: 85 },
  { id: "b-wonders", title: same("World Wonders Atlas"), authorId: "a-radha", subject: "general-knowledge", languages: ["en"], description: L("Maps and stories of mountains, deserts, oceans and cities from every continent.", "ప్రతి ఖండంలోని పర్వతాలు, ఎడారులు, సముద్రాలు, నగరాల మ్యాప్‌లు, కథలు."), pages: 150, sizeMb: 18.6, tone: "indigo", bands: ["10-12"], popularity: 63 },
  { id: "b-meet-computer", title: same("Meet the Computer"), authorId: "a-arjun", subject: "computer-science", languages: ["en"], description: L("Discover what is inside a computer and how it follows instructions, with unplugged activities.", "కంప్యూటర్ లోపల ఏముందో, అది సూచనలను ఎలా పాటిస్తుందో కంప్యూటర్ లేకుండా చేసే కార్యకలాపాలతో తెలుసుకోండి."), pages: 76, sizeMb: 10.1, tone: "teal", bands: ["7-9"], popularity: 60 },
  { id: "b-scratch", title: same("Coding Adventures with Scratch"), authorId: "a-arjun", subject: "computer-science", languages: ["en"], description: L("Build animations, quizzes and a simple game step by step using block coding.", "బ్లాక్ కోడింగ్‌తో యానిమేషన్లు, క్విజ్‌లు, ఒక సాధారణ ఆటను అంచెలంచెలుగా తయారు చేయండి."), pages: 132, sizeMb: 15.4, tone: "indigo", bands: ["10-12"], popularity: 78 },
  { id: "b-meena", title: L("Meena and the Missing Rain Clouds", "మీనా, కనిపించని వాన మేఘాలు"), authorId: "a-editorial", subject: "stories", languages: ["en", "te"], description: L("A curious girl investigates where the rain comes from in this story about clouds and patience.", "వాన ఎక్కడి నుండి వస్తుందో తెలుసుకోవాలనుకునే ఒక జిజ్ఞాసి అమ్మాయి కథ; మేఘాలు, ఓపిక గురించి."), pages: 60, sizeMb: 7.4, tone: "rose", bands: ["7-9"], popularity: 90 },
  { id: "b-star-boy", title: same("The Boy Who Mapped the Stars"), authorId: "a-editorial", subject: "stories", languages: ["en"], description: L("An adventure about a village boy who teaches himself the night sky and guides travellers home.", "రాత్రి ఆకాశాన్ని తానే నేర్చుకుని ప్రయాణికులకు దారి చూపే ఒక గ్రామ బాలుడి సాహస కథ."), pages: 148, sizeMb: 12.2, tone: "indigo", bands: ["10-12"], popularity: 72 },
  { id: "b-story-box", title: L("The Story Box", "కథల పెట్టె"), authorId: "a-murali", subject: "stories", languages: ["te"], description: L("A box of short Telugu tales about clever animals, kind neighbours and brave children.", "తెలివైన జంతువులు, మంచి పొరుగువారు, ధైర్యవంతులైన పిల్లల గురించి చిన్న తెలుగు కథల పెట్టె."), pages: 84, sizeMb: 9.2, tone: "amber", bands: ["7-9"], popularity: 68 },
  { id: "b-lighthouse", title: same("Letters from the Lighthouse"), authorId: "a-grace", subject: "stories", languages: ["en"], description: L("A mystery told through letters, as two friends solve the secret of an old lighthouse.", "ఇద్దరు స్నేహితులు పాత దీపస్తంభం రహస్యాన్ని ఛేదించే లేఖల రూపంలోని రహస్య కథ."), pages: 156, sizeMb: 13.3, tone: "sky", bands: ["10-12"], popularity: 64 },
];

export function findBook(id: string): Book | undefined {
  return books.find((b) => b.id === id);
}

export const collections: Collection[] = [
  { id: "c-science", title: L("Science Explorers", "సైన్స్ అన్వేషకులు"), description: L("Planets, circuits and the wonders around you.", "గ్రహాలు, విద్యుత్ వలయాలు, మన చుట్టూ ఉన్న అద్భుతాలు."), bookIds: ["b-first-science", "b-solar", "b-electricity"], tone: "indigo" },
  { id: "c-stories", title: L("Story Time", "కథల సమయం"), description: L("Adventures and mysteries to get lost in.", "మునిగిపోయేలా చేసే సాహసాలు, రహస్యాలు."), bookIds: ["b-meena", "b-story-box", "b-star-boy", "b-lighthouse"], tone: "rose" },
  { id: "c-number-lab", title: L("Number Lab", "సంఖ్యల ప్రయోగశాల"), description: L("Puzzles, tricks and the history of maths.", "పజిళ్లు, చిట్కాలు, గణిత చరిత్ర."), bookIds: ["b-maths-magic", "b-fractions", "b-story-numbers"], tone: "teal" },
  { id: "c-telugu", title: L("Learn Telugu", "తెలుగు నేర్చుకుందాం"), description: L("Rhymes, readers and tales in Telugu.", "తెలుగులో పద్యాలు, పాఠకాలు, కథలు."), bookIds: ["b-telugu-rhymes", "b-telugu-reader", "b-story-box"], tone: "amber" },
];

/** Label for a set of languages, matching the ContentLanguage badge used elsewhere. */
export function languageBadge(languages: Language[]): "English" | "Telugu" | "Bilingual" {
  if (languages.length > 1) return "Bilingual";
  return languages[0] === "te" ? "Telugu" : "English";
}
