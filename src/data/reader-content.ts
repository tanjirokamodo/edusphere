import type { Language, ReaderPage } from "@/types";

/*
 * ORIGINAL demonstration text written for EduSphere. These are short sample
 * editions, not the full books, and no PDF or e-book file is involved.
 */
export const sampleContent: Record<string, Partial<Record<Language, ReaderPage[]>>> = {
  "b-solar": {
    en: [
      { heading: "The Sun, Our Star", paragraphs: ["The Sun is a huge ball of hot gas. It is so big that more than one million Earths could fit inside it.", "Sunlight takes about eight minutes to travel all the way to us."] },
      { heading: "The Inner Planets", paragraphs: ["Mercury, Venus, Earth and Mars are called the inner planets. They are small and rocky.", "Mercury is the closest planet to the Sun, but Venus is the hottest planet of all."] },
      { heading: "Our Home Planet", paragraphs: ["Earth is the only planet we know that has liquid water on its surface and living things. About seven-tenths of Earth is covered by oceans.", "Earth takes 365 days to go around the Sun. We call this one year."] },
      { heading: "The Giant Planets", paragraphs: ["Jupiter and Saturn are giant planets made mostly of gas. Jupiter is so large that all the other planets could fit inside it.", "Saturn is famous for its bright rings made of ice and rock."] },
      { heading: "The Moon and Beyond", paragraphs: ["Earth has one Moon. Some planets have many moons. Far beyond the planets, billions of stars shine in our galaxy, the Milky Way.", "Try spotting the Moon tonight and notice how its shape changes from day to day."] },
    ],
    te: [
      { heading: "సూర్యుడు, మన నక్షత్రం", paragraphs: ["సూర్యుడు వేడి వాయువులతో నిండిన పెద్ద గోళం. అతని లోపల పది లక్షలకు పైగా భూగోళాలు పట్టేంత పెద్దవాడు.", "సూర్యకాంతి మనకు చేరడానికి సుమారు ఎనిమిది నిమిషాలు పడుతుంది."] },
      { heading: "లోపలి గ్రహాలు", paragraphs: ["బుధుడు, శుక్రుడు, భూమి, అంగారకుడు లోపలి గ్రహాలు. ఇవి చిన్నవి, రాతితో ఏర్పడినవి.", "బుధుడు సూర్యునికి అత్యంత దగ్గరగా ఉంటాడు, కానీ శుక్రుడు అన్నింటికంటే వేడి గ్రహం."] },
      { heading: "మన నివాస గ్రహం", paragraphs: ["ద్రవ రూపంలో నీరు, జీవులు ఉన్నట్లు మనకు తెలిసిన ఏకైక గ్రహం భూమి. భూమిపై సుమారు డెబ్బై శాతం సముద్రాలతో కప్పబడి ఉంది.", "భూమి సూర్యుని చుట్టూ తిరగడానికి 365 రోజులు పడుతుంది. దీన్నే మనం ఒక సంవత్సరం అంటాం."] },
      { heading: "భారీ గ్రహాలు", paragraphs: ["గురుడు, శని ఎక్కువగా వాయువులతో ఏర్పడిన భారీ గ్రహాలు. గురుడు ఎంత పెద్దదంటే మిగిలిన గ్రహాలన్నీ అతని లోపల పట్టేస్తాయి.", "శని తన మంచు, రాళ్లతో ఏర్పడిన మెరిసే వలయాలకు ప్రసిద్ధి."] },
      { heading: "చంద్రుడు, ఆవల", paragraphs: ["భూమికి ఒకే చంద్రుడు ఉన్నాడు. కొన్ని గ్రహాలకు ఎన్నో చంద్రులు ఉంటాయి. గ్రహాలకు ఆవల మన పాలపుంత గెలాక్సీలో కోట్ల నక్షత్రాలు మెరుస్తున్నాయి.", "ఈ రాత్రి చంద్రుణ్ణి గమనించి, రోజురోజుకు అతని ఆకారం ఎలా మారుతుందో చూడండి."] },
    ],
  },
  "b-meena": {
    en: [
      { heading: "A Dry Summer", paragraphs: ["Meena lived in a small village where the summer had been very hot. The pond behind her house had shrunk to a muddy puddle.", "Every evening she looked at the empty sky and wondered, “Where have all the clouds gone?”"] },
      { heading: "A Question for Grandfather", paragraphs: ["Her grandfather smiled. “Clouds are made from water, Meena. The Sun warms the sea and the water rises as invisible vapour.", "High up, where it is cold, the vapour turns into tiny drops. Those drops make a cloud.” Meena listened carefully."] },
      { heading: "The Little Experiment", paragraphs: ["The next day, with her grandfather's help, Meena chilled a steel plate in the freezer and held it above a pot of steaming water.", "Tiny drops appeared on the plate. “Look!” she cried. “There is a small cloud in my hands!”"] },
      { heading: "Clouds Take Time", paragraphs: ["Her grandfather nodded. “Rain needs warm seas, rising air and a little patience. When the winds change, the clouds will come back.”", "Meena marked the days on her calendar."] },
      { heading: "The First Rain", paragraphs: ["Ten days later the wind turned. Grey clouds gathered over the fields, and the first fat raindrops fell on the dusty ground.", "Meena ran outside and laughed. Now she knew exactly how the rain was born."] },
    ],
    te: [
      { heading: "ఎండిన వేసవి", paragraphs: ["మీనా ఒక చిన్న గ్రామంలో ఉండేది. ఆ వేసవి చాలా వేడిగా ఉంది. ఇంటి వెనుక ఉన్న చెరువు ఎండిపోయి బురద గుంటలా మారింది.", "ప్రతి సాయంత్రం ఖాళీ ఆకాశం చూస్తూ “మేఘాలన్నీ ఎక్కడికి వెళ్లాయి?” అని ఆలోచించేది."] },
      { heading: "తాతయ్యకు ప్రశ్న", paragraphs: ["తాతయ్య నవ్వి, “మేఘాలు నీటితో తయారవుతాయి మీనా. సూర్యుడు సముద్రాన్ని వేడి చేస్తాడు, నీరు కనిపించని ఆవిరిగా పైకి లేస్తుంది.", "పైన చల్లగా ఉన్నచోట ఆ ఆవిరి చిన్న చిన్న చుక్కలుగా మారుతుంది. ఆ చుక్కలే మేఘం” అన్నారు. మీనా శ్రద్ధగా విన్నది."] },
      { heading: "చిన్న ప్రయోగం", paragraphs: ["మరుసటి రోజు తాతయ్య సాయంతో మీనా ఒక స్టీలు పళ్లెంను ఫ్రీజర్‌లో చల్లబరిచి, ఆవిరి వస్తున్న నీటి పాత్ర పైన పట్టుకుంది.", "పళ్లెంపై చిన్న నీటి చుక్కలు కనిపించాయి. “చూడండి! నా చేతుల్లో ఒక చిన్న మేఘం!” అని అరిచింది."] },
      { heading: "మేఘాలకు సమయం పడుతుంది", paragraphs: ["తాతయ్య తల ఊపి, “వర్షానికి వెచ్చని సముద్రం, పైకి లేచే గాలి, కొంచెం ఓపిక కావాలి. గాలులు మారినప్పుడు మేఘాలు తిరిగి వస్తాయి” అన్నారు.", "మీనా క్యాలెండర్‌లో రోజులు గుర్తుపెట్టింది."] },
      { heading: "మొదటి వాన", paragraphs: ["పది రోజుల తర్వాత గాలి మారింది. పొలాలపై బూడిద రంగు మేఘాలు కమ్ముకున్నాయి, దుమ్ముతో నిండిన నేలపై మొదటి పెద్ద వాన చుక్కలు పడ్డాయి.", "మీనా బయటకు పరుగెత్తి నవ్వింది. వాన ఎలా పుడుతుందో ఇప్పుడు ఆమెకు బాగా తెలుసు."] },
    ],
  },
  "b-maths-magic": {
    en: [
      { heading: "The Magic of Nine", paragraphs: ["Here is a trick for the nine times table. Hold up both hands and fold down the finger for the number you are multiplying by 9.", "For 9 × 4, fold down your fourth finger. Count the fingers on its left (3) and on its right (6). The answer is 36!"] },
      { heading: "Quick Doubles", paragraphs: ["To multiply by 4, double the number twice. For 4 × 6, double 6 to get 12, then double 12 to get 24.", "Try 4 × 15. Double 15 to get 30, then double 30 to get 60."] },
      { heading: "Think of a Number", paragraphs: ["Pick any number. Double it. Add 10. Halve the result. Now subtract the number you started with.", "The answer is always 5! Can you work out why?"] },
      { heading: "Palindrome Numbers", paragraphs: ["A palindrome reads the same forwards and backwards, like 121 or 4554. Take 57 and reverse it to make 75, then add: 57 + 75 = 132.", "Reverse and add again: 132 + 231 = 363. That is a palindrome!"] },
      { heading: "Your Challenge", paragraphs: ["Try the reverse-and-add trick with 68. How many steps does it take to reach a palindrome?", "Answer: three steps, ending at 1111."] },
    ],
  },
};
