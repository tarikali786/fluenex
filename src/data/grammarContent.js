export const GRAMMAR_CATEGORIES = [
  { id: 'present', label: 'Present Tenses', color: '#7c3aed' },
  { id: 'past', label: 'Past Tenses', color: '#f59e0b' },
  { id: 'future', label: 'Future Tenses', color: '#10b981' },
]

export const TENSES = [
  // ─── PRESENT ───────────────────────────────────────────────
  {
    id: 'present-simple',
    category: 'present',
    title: 'Simple Present',
    icon: '🔵',
    definition: 'Used for habits, routines, facts, and general truths.',
    formula: {
      positive: 'Subject + V1 (s/es for he/she/it)',
      negative: 'Subject + do/does + not + V1',
      question: 'Do/Does + Subject + V1?',
    },
    rules: [
      'Daily habits and routines — I wake up at 7 every day.',
      'General truths and facts — Water boils at 100°C.',
      'Permanent situations — She lives in Mumbai.',
      'Schedules and timetables — The train leaves at 9 AM.',
    ],
    examples: [
      { sentence: 'I drink coffee every morning.', highlight: 'drink' },
      { sentence: 'She does not like spicy food.', highlight: 'does not like' },
      { sentence: 'Do you speak English?', highlight: 'Do you speak' },
      { sentence: 'The sun rises in the east.', highlight: 'rises' },
      { sentence: 'They play cricket on Sundays.', highlight: 'play' },
    ],
    signalWords: ['always', 'usually', 'often', 'sometimes', 'never', 'every day', 'every week'],
    mistakes: [
      { wrong: 'He go to office daily.', correct: 'He goes to office daily.' },
      { wrong: 'She don\'t like tea.', correct: 'She doesn\'t like tea.' },
      { wrong: 'I am go to school.', correct: 'I go to school.' },
    ],
    passage: {
      title: 'My Simple Morning',
      content: `I wake up at six every morning. The alarm rings and I open my eyes slowly. I sit on my bed for a minute and then I stand up. I walk to the bathroom and brush my teeth. The water feels cold on my face but it helps me feel fresh.

My mother makes tea for everyone. She always adds a little sugar. I sit at the table and drink my tea slowly. My father reads the newspaper. He does not talk much in the morning. My younger sister eats her breakfast quickly because she never wants to be late for school.

I leave the house at eight. I walk to the bus stop near my home. The bus comes at the same time every day. I see the same people at the stop. Some of them smile and say good morning. The ride takes about thirty minutes. I listen to English podcasts on my phone during the ride. It helps me learn new words.

I reach my office by nine. My work starts with checking emails. I usually drink two cups of tea before lunch. My colleagues are friendly. We sometimes talk about movies and food. The day goes by quickly when I stay busy. I finish work at six and take the bus home. Every evening I read for thirty minutes before I sleep. This routine keeps my life simple and organized.`,
    },
  },
  {
    id: 'present-continuous',
    category: 'present',
    title: 'Present Continuous',
    icon: '🟢',
    definition: 'Used for actions happening right now or around now.',
    formula: {
      positive: 'Subject + am/is/are + V1+ing',
      negative: 'Subject + am/is/are + not + V1+ing',
      question: 'Am/Is/Are + Subject + V1+ing?',
    },
    rules: [
      'Actions happening right now — I am reading a book.',
      'Temporary situations — She is staying with her friend this week.',
      'Future plans already arranged — We are meeting tomorrow.',
      'Changing or developing situations — The weather is getting colder.',
    ],
    examples: [
      { sentence: 'I am learning English right now.', highlight: 'am learning' },
      { sentence: 'She is cooking dinner at the moment.', highlight: 'is cooking' },
      { sentence: 'They are not watching TV.', highlight: 'are not watching' },
      { sentence: 'Are you listening to me?', highlight: 'Are you listening' },
      { sentence: 'The children are playing outside.', highlight: 'are playing' },
    ],
    signalWords: ['now', 'right now', 'at the moment', 'currently', 'today', 'this week', 'look!', 'listen!'],
    mistakes: [
      { wrong: 'I am know the answer.', correct: 'I know the answer. (know is a state verb)' },
      { wrong: 'She is liking this movie.', correct: 'She likes this movie. (like is a state verb)' },
      { wrong: 'He working now.', correct: 'He is working now.' },
    ],
    passage: {
      title: 'A Busy Evening at Home',
      content: `It is seven in the evening and everyone in my family is doing something different. I am sitting in my room and I am writing in my notebook. My pen is moving slowly across the page. I am trying to finish my English homework before dinner.

My mother is cooking in the kitchen. I can hear the sound of oil sizzling in the pan. She is making my favorite dish tonight. The whole house is smelling wonderful right now. My father is watching the news on TV. He is sitting in his favorite chair and he is drinking tea. He is not paying attention to anything else.

My sister is talking on the phone with her friend. She is laughing loudly every few minutes. I am getting a little distracted because of her voice. But I am not complaining. She is having a good time and that is nice.

Outside, the sky is getting darker. The birds are flying back to their nests. A cool breeze is coming through my window. The weather is changing slowly these days. Winter is coming and the nights are becoming longer. I am looking forward to the weekend because my cousins are visiting us. We are planning to go to the park together. Right now though, I am focusing on my studies. Life is moving fast but I am enjoying every moment.`,
    },
  },
  {
    id: 'present-perfect',
    category: 'present',
    title: 'Present Perfect',
    icon: '🟣',
    definition: 'Used for actions that started in the past and connect to the present.',
    formula: {
      positive: 'Subject + have/has + V3 (past participle)',
      negative: 'Subject + have/has + not + V3',
      question: 'Have/Has + Subject + V3?',
    },
    rules: [
      'Experience in life (no specific time) — I have visited Paris.',
      'Actions that started in the past and continue now — She has lived here for 5 years.',
      'Recently completed actions — I have just finished my work.',
      'Actions with result in the present — He has lost his keys (so he can\'t enter).',
    ],
    examples: [
      { sentence: 'I have finished my homework.', highlight: 'have finished' },
      { sentence: 'She has never been to London.', highlight: 'has never been' },
      { sentence: 'Have you ever eaten sushi?', highlight: 'Have you ever eaten' },
      { sentence: 'We have known each other for ten years.', highlight: 'have known' },
      { sentence: 'He has already left the office.', highlight: 'has already left' },
    ],
    signalWords: ['already', 'just', 'yet', 'ever', 'never', 'since', 'for', 'recently', 'so far'],
    mistakes: [
      { wrong: 'I have went to the market.', correct: 'I have gone to the market.' },
      { wrong: 'She has eat lunch already.', correct: 'She has eaten lunch already.' },
      { wrong: 'I have seen him yesterday.', correct: 'I saw him yesterday. (use past simple with specific time)' },
    ],
    passage: {
      title: 'Things I Have Done',
      content: `I have always wanted to share my story with someone. So here it is. I have lived in three different cities since I was born. Each city has taught me something new about life. I have learned that change is not always scary. Sometimes it is the best thing that can happen to you.

I have studied English for about four years now. It has not been easy. There have been many days when I have felt like giving up. But I have never stopped trying. I have read more than fifty books in English so far. Each book has helped me understand the language a little better. I have also watched hundreds of English movies. They have improved my listening skills a lot.

I have made many friends from different countries through the internet. We have shared stories, ideas, and even recipes. I have never met most of them in person, but I have felt a real connection with them. Technology has made the world smaller in many ways.

Recently, I have started writing a journal in English. I have written about twenty entries so far. It has helped me organize my thoughts. I have noticed that my vocabulary has grown and my confidence has increased. I have come a long way from where I started. And I have realized that the journey has been just as important as the result.`,
    },
  },
  {
    id: 'present-perfect-continuous',
    category: 'present',
    title: 'Present Perfect Continuous',
    icon: '💜',
    definition: 'Used for actions that started in the past and are still continuing.',
    formula: {
      positive: 'Subject + have/has + been + V1+ing',
      negative: 'Subject + have/has + not + been + V1+ing',
      question: 'Have/Has + Subject + been + V1+ing?',
    },
    rules: [
      'Actions that started in the past and are still going — I have been waiting for an hour.',
      'Focus on duration of an ongoing activity — She has been studying since morning.',
      'Explains why something is happening now — He is tired because he has been running.',
      'Repeated actions over a period — They have been arguing all day.',
    ],
    examples: [
      { sentence: 'I have been learning English for two years.', highlight: 'have been learning' },
      { sentence: 'She has been working here since 2020.', highlight: 'has been working' },
      { sentence: 'It has been raining all morning.', highlight: 'has been raining' },
      { sentence: 'Have you been waiting long?', highlight: 'Have you been waiting' },
      { sentence: 'They have not been sleeping well lately.', highlight: 'have not been sleeping' },
    ],
    signalWords: ['for', 'since', 'all day', 'all morning', 'lately', 'recently', 'how long'],
    mistakes: [
      { wrong: 'I have been knowing him for years.', correct: 'I have known him for years. (know is a state verb)' },
      { wrong: 'She have been cooking.', correct: 'She has been cooking.' },
      { wrong: 'I been working all day.', correct: 'I have been working all day.' },
    ],
    passage: {
      title: 'A Long Day of Effort',
      content: `I am exhausted right now. I have been working on a project since eight in the morning and it is already six in the evening. My eyes have been staring at the screen for too long. My back has been hurting because I have been sitting in the same chair all day.

My colleague Priya has been helping me with the design part. She has been creating graphics since noon. We have been communicating through messages because she has been working from home today. Our manager has been checking on us every hour. He has been asking for updates because the deadline is tomorrow.

Outside my window, it has been raining since afternoon. The sky has been looking grey all day. The sound of rain has been making me feel sleepy. I have been drinking coffee to stay awake. I think I have been having too much coffee lately. My hands have been shaking a little.

Despite everything, I have been enjoying this project. I have been learning new skills throughout this week. My team has been supporting each other and that has been making the work easier. We have been pushing ourselves hard but we have also been growing together. I have been thinking about taking a short vacation after this project ends. I have been dreaming about the mountains for a while now.`,
    },
  },

  // ─── PAST ──────────────────────────────────────────────────
  {
    id: 'past-simple',
    category: 'past',
    title: 'Simple Past',
    icon: '🟠',
    definition: 'Used for completed actions in the past at a specific time.',
    formula: {
      positive: 'Subject + V2 (past form)',
      negative: 'Subject + did + not + V1',
      question: 'Did + Subject + V1?',
    },
    rules: [
      'Completed actions at a specific time — I visited Delhi last year.',
      'A series of completed actions — She woke up, brushed her teeth, and left.',
      'Past habits (without used to) — When I was young, I played outside daily.',
      'Past facts or generalizations — People traveled by horse long ago.',
    ],
    examples: [
      { sentence: 'I went to the market yesterday.', highlight: 'went' },
      { sentence: 'She did not call me last night.', highlight: 'did not call' },
      { sentence: 'Did you finish your homework?', highlight: 'Did you finish' },
      { sentence: 'We watched a movie on Saturday.', highlight: 'watched' },
      { sentence: 'He lived in London for two years.', highlight: 'lived' },
    ],
    signalWords: ['yesterday', 'last week', 'last year', 'ago', 'in 2020', 'when I was young', 'that day'],
    mistakes: [
      { wrong: 'I goed to school yesterday.', correct: 'I went to school yesterday.' },
      { wrong: 'She didn\'t went home.', correct: 'She didn\'t go home.' },
      { wrong: 'Did you watched the match?', correct: 'Did you watch the match?' },
    ],
    passage: {
      title: 'A Day I Remember',
      content: `Last summer, something wonderful happened. I traveled to a small hill station with my best friend. We planned the trip for weeks and finally we left on a Friday morning. The bus ride took about six hours. We talked, laughed, and shared snacks the whole way.

We arrived in the evening. The air felt cool and fresh. We checked into a small hotel near the main market. The room was simple but clean. We dropped our bags and walked outside immediately. The streets looked beautiful with old shops and colorful lights.

We ate dinner at a local restaurant. I ordered a bowl of hot soup and some bread. My friend tried the local noodles. The food tasted amazing. After dinner, we sat on a bench near the road and looked at the stars. The sky looked so clear that night. I counted at least twenty stars before I lost track.

The next morning, we woke up early and hiked to a nearby waterfall. The path went through a forest. Birds sang in the trees and the sunlight filtered through the leaves. When we reached the waterfall, I stood there and stared in silence. The water fell from a great height and the sound filled the whole valley. I took many photos that day. We returned home on Sunday. I felt sad to leave but I carried beautiful memories with me. That trip changed something inside me. It reminded me to slow down and enjoy life.`,
    },
  },
  {
    id: 'past-continuous',
    category: 'past',
    title: 'Past Continuous',
    icon: '🟡',
    definition: 'Used for actions that were in progress at a specific time in the past.',
    formula: {
      positive: 'Subject + was/were + V1+ing',
      negative: 'Subject + was/were + not + V1+ing',
      question: 'Was/Were + Subject + V1+ing?',
    },
    rules: [
      'An action in progress at a specific past time — I was sleeping at 10 PM.',
      'Two actions happening at the same time — She was cooking while he was cleaning.',
      'Background action interrupted by another — I was reading when the phone rang.',
      'Setting a scene in a story — The sun was shining and birds were singing.',
    ],
    examples: [
      { sentence: 'I was studying when you called me.', highlight: 'was studying' },
      { sentence: 'They were playing football at 5 PM.', highlight: 'were playing' },
      { sentence: 'She was not listening to the teacher.', highlight: 'was not listening' },
      { sentence: 'Were you sleeping when I arrived?', highlight: 'Were you sleeping' },
      { sentence: 'We were walking home when it started raining.', highlight: 'were walking' },
    ],
    signalWords: ['while', 'when', 'at that time', 'all day yesterday', 'as'],
    mistakes: [
      { wrong: 'I was watch TV when he came.', correct: 'I was watching TV when he came.' },
      { wrong: 'She were sleeping at 9 PM.', correct: 'She was sleeping at 9 PM.' },
      { wrong: 'They was talking loudly.', correct: 'They were talking loudly.' },
    ],
    passage: {
      title: 'That Evening at the Park',
      content: `It was a warm evening last September. I was walking through the park near my house. The sun was setting behind the trees and the sky was turning orange and pink. Many people were enjoying the weather outside.

Some children were running around the playground. They were laughing and shouting happily. Their parents were sitting on benches nearby. A few of them were talking to each other while others were scrolling through their phones. An old man was feeding the birds. The pigeons were gathering around his feet.

I was listening to music on my earphones when I noticed something interesting. A young woman was painting on a canvas near the fountain. She was using bright colors. I was watching her from a distance. She was concentrating so hard that she was not noticing anything around her. The painting was looking beautiful even from far away.

While I was standing there, my friend Rahul called me. He was asking me about our college project. I was explaining the details to him when a dog ran past me. It was chasing a ball that some kids were throwing. Everyone around was smiling. The whole park was feeling alive that evening. I was enjoying the moment so much that I did not want to leave. The sky was getting darker but people were still sitting and talking. It was one of those evenings when everything was feeling just right.`,
    },
  },
  {
    id: 'past-perfect',
    category: 'past',
    title: 'Past Perfect',
    icon: '🔶',
    definition: 'Used for an action that was completed before another past action.',
    formula: {
      positive: 'Subject + had + V3 (past participle)',
      negative: 'Subject + had + not + V3',
      question: 'Had + Subject + V3?',
    },
    rules: [
      'An action completed before another past action — I had eaten before she arrived.',
      'Experience before a past time — He had never seen snow before that trip.',
      'Cause of a past situation — She was sad because she had failed the exam.',
      'Reported speech in past — He said he had already finished.',
    ],
    examples: [
      { sentence: 'I had finished my work before he came.', highlight: 'had finished' },
      { sentence: 'She had never traveled abroad before 2019.', highlight: 'had never traveled' },
      { sentence: 'Had you eaten before the meeting started?', highlight: 'Had you eaten' },
      { sentence: 'They had left the party by the time we arrived.', highlight: 'had left' },
      { sentence: 'He was tired because he had not slept well.', highlight: 'had not slept' },
    ],
    signalWords: ['before', 'after', 'by the time', 'already', 'just', 'never (before that)', 'until then'],
    mistakes: [
      { wrong: 'I had ate before she came.', correct: 'I had eaten before she came.' },
      { wrong: 'After I had went home, I slept.', correct: 'After I had gone home, I slept.' },
      { wrong: 'She had already leave.', correct: 'She had already left.' },
    ],
    passage: {
      title: 'Before That Moment',
      content: `By the time I turned twenty-five, my life had already changed in many ways. I had moved to a new city for work. I had left behind the small town where I had grown up. Everything felt different because I had never lived alone before.

Before I got my first job, I had studied hard for years. I had completed my degree and I had passed several interviews. My parents had supported me through everything. They had saved money for my education even when times had been difficult. I had always promised myself that I would make them proud.

When I arrived at the new city, I realized that I had not prepared enough for the challenges. I had never cooked a meal on my own before. I had never paid bills or managed my own money. My mother had always taken care of those things at home. But I had decided to learn everything step by step.

The first week was hard. By Friday, I had burned two meals, I had locked myself out of my apartment once, and I had gotten lost on the way to my office twice. But I had not given up. By the end of the first month, things had improved a lot. I had made a few friends at work. I had figured out the bus routes. I had even cooked a decent dinner for myself. Looking back, I realized that every struggle had taught me something important. I had grown more in that one month than I had in the previous five years.`,
    },
  },
  {
    id: 'past-perfect-continuous',
    category: 'past',
    title: 'Past Perfect Continuous',
    icon: '🧡',
    definition: 'Used for actions that had been ongoing before another past action.',
    formula: {
      positive: 'Subject + had + been + V1+ing',
      negative: 'Subject + had + not + been + V1+ing',
      question: 'Had + Subject + been + V1+ing?',
    },
    rules: [
      'Duration of an activity before another past event — I had been waiting for an hour when the bus arrived.',
      'Cause of a past result — She was tired because she had been running.',
      'Ongoing action interrupted in the past — They had been talking for hours before the power went out.',
      'Emphasizes how long something had been happening — He had been working there for 10 years before he quit.',
    ],
    examples: [
      { sentence: 'I had been studying for three hours when he called.', highlight: 'had been studying' },
      { sentence: 'She had been living in Delhi before she moved to Pune.', highlight: 'had been living' },
      { sentence: 'Had they been waiting long before the show started?', highlight: 'Had they been waiting' },
      { sentence: 'He had not been feeling well for days.', highlight: 'had not been feeling' },
      { sentence: 'We had been driving for six hours when we finally stopped.', highlight: 'had been driving' },
    ],
    signalWords: ['for', 'since', 'before', 'by the time', 'how long', 'all day', 'when'],
    mistakes: [
      { wrong: 'She had been know him for years.', correct: 'She had known him for years. (know is a state verb)' },
      { wrong: 'I had been waited for an hour.', correct: 'I had been waiting for an hour.' },
      { wrong: 'They had being working all day.', correct: 'They had been working all day.' },
    ],
    passage: {
      title: 'The Long Road Before Success',
      content: `When I finally got the good news, I could not believe it. I had been trying for this opportunity for almost two years. I had been applying to different companies every month. I had been preparing for interviews every weekend. My family had been supporting me throughout this entire journey.

Before I received the call, I had been sitting at my desk and had been staring at my laptop. I had been refreshing my email every few minutes. My heart had been beating fast all morning because I had been expecting a response. When the phone rang, my hands had been shaking from the nervousness.

Looking back, the journey had not been easy. I had been struggling with self-doubt for months. Some nights, I had been lying awake wondering if things would ever work out. My friends had been encouraging me to stay patient. They had been telling me that the right opportunity would come at the right time.

Before this interview, I had been practicing my English speaking skills for over a year. I had been reading books and articles every day. I had been listening to podcasts during my morning walks. I had been writing short paragraphs to improve my expression. All that practice had been slowly building my confidence. By the time I walked into that interview room, I had been preparing for months. Every hour I had been spending on practice had been worth it. The hard work had been paying off little by little, and finally, it all came together.`,
    },
  },

  // ─── FUTURE ────────────────────────────────────────────────
  {
    id: 'future-simple',
    category: 'future',
    title: 'Simple Future',
    icon: '🔷',
    definition: 'Used for decisions, predictions, and promises about the future.',
    formula: {
      positive: 'Subject + will + V1',
      negative: 'Subject + will + not (won\'t) + V1',
      question: 'Will + Subject + V1?',
    },
    rules: [
      'Spontaneous decisions — I will help you with that.',
      'Predictions based on opinion — I think it will rain tomorrow.',
      'Promises — I will always support you.',
      'Offers and requests — Will you open the door?',
    ],
    examples: [
      { sentence: 'I will call you tonight.', highlight: 'will call' },
      { sentence: 'She will not come to the party.', highlight: 'will not come' },
      { sentence: 'Will they finish the project on time?', highlight: 'Will they finish' },
      { sentence: 'It will be sunny tomorrow.', highlight: 'will be' },
      { sentence: 'We will meet again soon.', highlight: 'will meet' },
    ],
    signalWords: ['tomorrow', 'next week', 'next year', 'soon', 'in the future', 'I think', 'probably', 'perhaps'],
    mistakes: [
      { wrong: 'I will going to school tomorrow.', correct: 'I will go to school tomorrow.' },
      { wrong: 'She will comes later.', correct: 'She will come later.' },
      { wrong: 'Will you to help me?', correct: 'Will you help me?' },
    ],
    passage: {
      title: 'My Plans for the Future',
      content: `I often think about my future. I believe it will be bright if I keep working hard. In the next few years, I will focus on building my career and improving my skills. I will learn new things every day because I know that knowledge will open many doors for me.

Next month, I will start a new online course. It will teach me about web development. I think it will be challenging but I will not give up easily. My friend told me he will join the course too. We will study together and help each other. I believe we will finish it within three months.

I will also travel more in the coming years. I will visit at least two new places every year. Next summer, I will probably go to the mountains. I think the fresh air and the beautiful views will refresh my mind. My sister said she will come with me. We will explore small villages and try local food.

I will not forget about my health either. I will start exercising regularly from next week. I will wake up early and go for a walk every morning. I think it will make a big difference in my energy levels. My doctor told me that small changes will lead to big improvements over time. I will also eat healthier food. Life will not always be easy, but I will face every challenge with a positive attitude. I will keep moving forward no matter what happens. The future will reward those who work hard and never stop believing.`,
    },
  },
  {
    id: 'future-continuous',
    category: 'future',
    title: 'Future Continuous',
    icon: '🩵',
    definition: 'Used for actions that will be in progress at a specific time in the future.',
    formula: {
      positive: 'Subject + will + be + V1+ing',
      negative: 'Subject + will + not + be + V1+ing',
      question: 'Will + Subject + be + V1+ing?',
    },
    rules: [
      'Action in progress at a future time — I will be sleeping at midnight.',
      'Planned future activities — She will be attending the conference next week.',
      'Parallel future actions — While I will be cooking, he will be cleaning.',
      'Polite inquiries about plans — Will you be using the car tonight?',
    ],
    examples: [
      { sentence: 'I will be working at 8 PM tonight.', highlight: 'will be working' },
      { sentence: 'She will be traveling to Goa next week.', highlight: 'will be traveling' },
      { sentence: 'Will you be joining us for dinner?', highlight: 'Will you be joining' },
      { sentence: 'They will not be attending the meeting.', highlight: 'will not be attending' },
      { sentence: 'This time tomorrow, I will be sitting on the beach.', highlight: 'will be sitting' },
    ],
    signalWords: ['at this time tomorrow', 'this time next week', 'at 8 PM', 'all day tomorrow', 'while'],
    mistakes: [
      { wrong: 'I will be go to work at 9 AM.', correct: 'I will be going to work at 9 AM.' },
      { wrong: 'She will being working tomorrow.', correct: 'She will be working tomorrow.' },
      { wrong: 'Will you be cook dinner?', correct: 'Will you be cooking dinner?' },
    ],
    passage: {
      title: 'This Time Next Month',
      content: `This time next month, my life will be looking very different. I will be living in a new apartment in a bigger city. I will be starting my new job and I will be meeting new people every day. The thought of it makes me both excited and nervous.

On my first day, I will be arriving at the office early. I will be wearing my best clothes and I will be carrying my new bag. My manager will be showing me around the office. Other employees will be working at their desks. Some of them will be looking at me curiously. I will be trying my best to make a good first impression.

During the first week, I will be learning many new things. I will be attending training sessions every morning. In the afternoons, I will be practicing the new skills with my team. My colleagues will be helping me understand the company culture. I will be asking a lot of questions because I will be wanting to learn everything quickly.

In the evenings, I will be exploring my new neighborhood. I will be walking through the streets and finding shops and restaurants. I will be looking for a good gym near my apartment. On weekends, I will be unpacking my boxes and decorating my new room. My parents will be calling me every night to check on me. I will be missing home, but I will also be enjoying the freedom. While I will be adjusting to the new life, I will be growing as a person. Every challenge I will be facing will be making me stronger.`,
    },
  },
  {
    id: 'future-perfect',
    category: 'future',
    title: 'Future Perfect',
    icon: '💎',
    definition: 'Used for actions that will be completed before a specific future time.',
    formula: {
      positive: 'Subject + will + have + V3 (past participle)',
      negative: 'Subject + will + not + have + V3',
      question: 'Will + Subject + have + V3?',
    },
    rules: [
      'Action completed before a future time — I will have finished by 5 PM.',
      'Achievement by a deadline — She will have graduated by June.',
      'Experience accumulated by a future point — By next year, I will have visited 10 countries.',
      'Duration completed by a future time — They will have been married for 20 years next month.',
    ],
    examples: [
      { sentence: 'I will have completed the project by Friday.', highlight: 'will have completed' },
      { sentence: 'She will have left by the time you arrive.', highlight: 'will have left' },
      { sentence: 'Will you have finished your meal by then?', highlight: 'Will you have finished' },
      { sentence: 'They will not have reached home before dark.', highlight: 'will not have reached' },
      { sentence: 'By December, I will have saved enough money.', highlight: 'will have saved' },
    ],
    signalWords: ['by tomorrow', 'by next week', 'by the time', 'before', 'by then', 'by the end of'],
    mistakes: [
      { wrong: 'I will have finish by Monday.', correct: 'I will have finished by Monday.' },
      { wrong: 'She will has completed the work.', correct: 'She will have completed the work.' },
      { wrong: 'By Friday, I will completed it.', correct: 'By Friday, I will have completed it.' },
    ],
    passage: {
      title: 'By the End of This Year',
      content: `By the end of this year, I will have achieved many things that I planned in January. I will have completed my English speaking course. I will have read at least twenty books. I will have learned the basics of web development. Looking at my goals now, I feel confident that I will have accomplished most of them.

By March, I will have finished the first level of my course. By June, I will have moved to the intermediate level. My teacher told me that by December, I will have reached a point where I can speak fluently without thinking too much about grammar. That thought motivates me every day.

By next month, my sister will have graduated from college. My parents will have planned a small celebration for her. By the time the party starts, my mother will have cooked at least ten different dishes. My father will have invited all our relatives. It will be a beautiful evening.

At work, things will have changed a lot by the end of the year too. Our team will have launched two new products. We will have hired five new members. I will have gained experience in project management. My manager said that by December, I will have handled at least three major projects on my own.

Some of my friends will have gotten married by then. Others will have moved to different cities. Life will have moved forward for all of us. But I believe we will not have forgotten each other. By the time this year ends, I will have grown both personally and professionally. I will have become a better version of myself.`,
    },
  },
  {
    id: 'future-perfect-continuous',
    category: 'future',
    title: 'Future Perfect Continuous',
    icon: '💠',
    definition: 'Used for actions that will have been ongoing up to a specific future time.',
    formula: {
      positive: 'Subject + will + have + been + V1+ing',
      negative: 'Subject + will + not + have + been + V1+ing',
      question: 'Will + Subject + have + been + V1+ing?',
    },
    rules: [
      'Duration of an activity up to a future point — By June, I will have been working here for 5 years.',
      'Ongoing action that explains a future result — She will be tired because she will have been traveling all day.',
      'Emphasize continuous effort — By next month, I will have been studying English for 2 years.',
      'How long something will have continued — By 10 PM, they will have been playing for 3 hours.',
    ],
    examples: [
      { sentence: 'By next year, I will have been living here for a decade.', highlight: 'will have been living' },
      { sentence: 'She will have been teaching for 20 years by 2025.', highlight: 'will have been teaching' },
      { sentence: 'Will you have been waiting long by the time I arrive?', highlight: 'Will you have been waiting' },
      { sentence: 'By evening, we will have been driving for 8 hours.', highlight: 'will have been driving' },
      { sentence: 'He will not have been sleeping long when the alarm rings.', highlight: 'will not have been sleeping' },
    ],
    signalWords: ['by', 'by the time', 'for', 'since', 'by next year', 'how long', 'before'],
    mistakes: [
      { wrong: 'I will have been work here for 5 years.', correct: 'I will have been working here for 5 years.' },
      { wrong: 'She will been waiting for an hour.', correct: 'She will have been waiting for an hour.' },
      { wrong: 'By June, he will has been studying for 3 years.', correct: 'By June, he will have been studying for 3 years.' },
    ],
    passage: {
      title: 'Looking Back from the Future',
      content: `Next March will mark a special milestone for me. By then, I will have been learning English for exactly three years. When I think about it, I feel proud of how far I will have come. I will have been reading, speaking, and writing in English every single day for over a thousand days.

By the time I celebrate my next birthday, I will have been working at my company for two years. I will have been growing in my role and taking on more responsibilities. My manager will have been mentoring me throughout this period. I will have been building relationships with my team members and learning from their experience.

My best friend is getting married next December. By the wedding day, she will have been planning the event for almost a year. Her family will have been preparing for months. By the time the guests arrive, the decorators will have been working since early morning. It will be a wonderful celebration.

By the end of next year, my father will have been running his small business for thirty years. He will have been waking up early and working hard every single day for three decades. He will not have been taking many vacations during that time. His dedication inspires me deeply.

As for my English journey, by the time I finish this reading challenge, I will have been practicing consistently for a long time. I will have been pushing myself beyond my comfort zone. Every minute I will have been spending on practice will have been shaping my future. And when I look back, I will know that the effort will have been worth every second.`,
    },
  },
]

export function getTenseById(id) {
  return TENSES.find(t => t.id === id)
}

export function getTensesByCategory(categoryId) {
  return TENSES.filter(t => t.category === categoryId)
}
