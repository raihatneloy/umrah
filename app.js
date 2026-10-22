/* Umrah Companion — app logic (bilingual EN / বাংলা). Data from data.js. */
(() => {
"use strict";
const DATA = window.DATA || {};
const TZ = "Asia/Riyadh";
const TRIP_START = "2026-10-23", TRIP_END = "2026-10-31";
const MADINAH = { lat: 24.4672, lng: 39.6111, tzName: "Asia/Riyadh", name: "Madinah", name_bn: "মদীনা" };
const MAKKAH  = { lat: 21.4225, lng: 39.8262, tzName: "Asia/Riyadh", name: "Makkah", name_bn: "মক্কা" };
const JEDDAH  = { lat: 21.4858, lng: 39.1925, tzName: "Asia/Riyadh", name: "Jeddah", name_bn: "জেদ্দা" };
const DUBLIN  = { lat: 53.3498, lng: -6.2603, tzName: "Europe/Dublin", name: "Dublin", name_bn: "ডাবলিন" };
const KAABA   = { lat: 21.4224779, lng: 39.8251832 };
const VERSION = "1.13.0";

/* ---------------------------------------------------------------- language */
let LANG = (() => { try { return localStorage.getItem("umrah-lang") || "en"; } catch (e) { return "en"; } })();
const I18N = {
  en: {
    today: "TODAY", rites: "UMRAH", plan: "PLAN", dua: "DU'A", vault: "VAULT", more: "MORE",
    nextPrayer: "NEXT PRAYER", dayOf: (a, b) => `DAY ${a} OF ${b}`, toGo: "TO GO",
    todaysItems: n => `TODAY · ${n} ITEMS`, jumpTo: "JUMP TO",
    ritesRow: "The rites, in order", ritesRowSub: "13 steps · du'ās · counters · fixes",
    planRow: "The whole itinerary", planRowSub: "All nine days, with the flights",
    itineraryTitle: "The nine days", itinerarySub: n => `${n} days · flights, cities, and what happens each day`,
    todayChip: "TODAY", nothingPlanned: "Nothing planned.",
    duaRow: "Du'ā library", duaRowSub: n => `${n} entries, every one sourced`,
    tickRow: "Tick-list", tickRowSub: n => `${n} essentials — do or buy`,
    essRow: "If something goes wrong", essRowSub: "911 · 937 · embassy · the driver card",
    prayerNote: "Prayer times are computed on this device (Umm al-Qura method). Countdowns use Riyadh time, never your phone's timezone.",
    countingDown: "COUNTING DOWN", daysToDeparture: n => `${n} days to departure`,
    departureNote: "Fri 23 Oct · 14:05 from Dublin, 02:40 into Madinah. Two flights, 2 h 50 in Istanbul.",
    tripComplete: "TRIP COMPLETE", tripCompleteSub: "Your ticks and counters are still here if you want to look back.",
    haramNoteMakkah: "Masjid al-Ḥarām — check the Ḥaram's own board if it differs",
    haramNoteMadinah: "Masjid an-Nabawī — 266 m to the north gate",
    jeddahNote: "Jeddah — city times. The airport is 30 km north of Al-Balad.",
    dublinNote: "Dublin, until you land. Madinah is two hours ahead of Ireland.",
    offlineOk: "Offline copy working — nothing here needs a signal",
    ritesTitle: "The rites, in order",
    ritesSub: n => `${n} steps — the last one is the farewell ṭawāf, not part of Umrah itself`,
    tapStep: "TAP A STEP",
    ritesFoot: "Every ruling and du'ā here is copied from the source-verified guide. Where the schools differ, the difference is printed instead of being decided for you.",
    step: n => `STEP ${n}`, of: n => `OF ${n}`,
    circuits: "CIRCUITS", laps: "LAPS", tapAsYouGo: "TAP AS YOU GO",
    allSteps: "ALL STEPS", nextStep: "NEXT STEP ›", markDone: "MARK DONE",
    rulings: "THE RULINGS", rulingsFoot: (shown, total) => `${shown} of the ${total} entries for this stage — only the ones that bear on this step.`,
    noRulings: "No rulings recorded for this stage.",
    commonMistake: "Common mistake:", ifHappened: "If it happened:", withChild: "With a 6-year-old:",
    duaLibTitle1: "Everything you say,", duaLibTitle2: "when you say it.",
    duaLibSub: n => `${n} entries · every one carries its source`,
    search: "Search a du'ā, a moment, a word…",
    all: "ALL", ihram: "IḤRĀM", tawaf: "ṬAWĀF", sai: "SA'Ī", madinah: "MADINAH", daily: "DAILY",
    duaLibFoot: "Green = sound chain. Amber = the source itself says it is a companion's wording, weak, or disputed.",
    nothingMatches: "Nothing matches that.",
    duadetail: "DU'Ā", whenLabel: "WHEN", gradingLabel: "THE GRADING, IN THE SOURCE'S OWN WORDS",
    sourceLabel: "SOURCE", backToLibrary: "BACK TO THE LIBRARY",
    chainOk: "SOUND", chainCheck: "CHECK THE CHAIN", wordingBadge: "WIDELY USED",
    checklistTitle: "Do or buy", checklistSub: (d, n) => `${d} of ${n} done · from the preparation guide`,
    checklistHint: "Tap a row to read it · tap the box to tick it",
    markDone: "Mark as done", markUndone: "Done — tap to undo",
    backToTick: "Back to the list", nextItem: "Next", backToPlan: "Back to the plan",
    placesTitle: "Where to shop", placesRow: "Where to shop",
    placesSub: "Tap MAP and your phone opens the place in its own map app — no signal needed to launch it",
    placesRowSub: "Malls, markets and the date souq — with maps",
    placesMadinah: "SHOPPING · MADINAH", placesMakkah: "SHOPPING · MAKKAH",
    placesJeddah: "SHOPPING · JEDDAH", placesYours: "THE FIXED POINTS",
    openMap: "MAP", onFoot: "walk", byCar: "taxi", minLabel: "min",
    saveProgress: "Save my progress", saveProgressSub: "Ticks, counters and language — one file",
    restoreProgress: "Restore from a file", restoreProgressSub: "Bring back progress saved on another phone",
    toastExported: "Progress saved to a file", toastImported: "Progress restored",
    confirmImport: "Replace everything marked on this phone with the file's contents?",
    importFailed: "That file could not be read as Umrah progress.",
    familyNote: "WITH A SIX-YEAR-OLD", whyNote: "THE DETAIL",
    essentialsTitle1: "If something goes wrong", essentialsTitle2: "at 2 a.m.",
    emergencySaudi: "EMERGENCY · SAUDI ARABIA", flightsLabel: "THE FOUR FLIGHTS",
    embassyRow: "IRISH EMBASSY · RIYADH",
    dutyOfficer: "Out-of-hours duty officer for Irish citizens", yourHotels: "YOUR HOTELS",
    showDriver: "SHOW THIS TO A DRIVER", worthRemembering: "WORTH REMEMBERING",
    qiblaTitle: "Qibla", qiblaSub: (c, b) => `From ${c} · bearing ${b}° from true north`,
    kaabaIs: "THE KA'BAH IS", eastOfNorth: b => `east of true north — or ${b}° if you turn the other way`,
    qiblaNote: "This is geometry, not a magnetic reading — it works with no signal and no compass. Your phone's magnetometer drifts near the Ḥaram's steel and speakers, so trust the degrees over a spinning needle.",
    moreTitle: "More", tickRowList: "Tick-list", essRowList: "Essentials & emergency",
    qiblaRowList: "Qibla", qiblaRowSub: "Bearing from where you are today",
    ritesRowList: "The rites, in order", ritesRowListSub: "13 steps",
    checkUpdates: "Check for updates", updating: "Fetching the newest build…",
    running: "this phone", server: "on the server", updateAvailable: "update available — tap Check for updates",
    thisInstall: "THIS INSTALL", offlineCopy: "Offline copy",
    offlineActive: "Active — the app runs with no network", offlineNotYet: "Not active yet — open once with a network",
    versionLabel: "Version",
    resetRites: "Reset the rites progress", resetRitesSub: "Back to step 1, with the tawaf and sa'i counters at zero",
    resetTicks: "Clear the itinerary ticks", resetTicksSub: "Unticks every day's plan — the rites and the vault are untouched",
    moreFoot: "Everything on this phone came from the printed guides' own verified data. If the app and the paper ever disagree, the paper wins — tell me and I'll fix the app.",
    vaultTitle: "Your papers, sealed",
    vaultSub: "Passports · e-visa · certificates · bookings. Encrypted on this phone; nothing leaves it.",
    pinEnter: "ENTER YOUR 6-DIGIT PIN", pinChoose: "CHOOSE A 6-DIGIT PIN — IT CANNOT BE RECOVERED",
    pinNote: "AES-256-GCM · PBKDF2 310k · the key is never stored.",
    vaultHead: "Vault", docsN: n => `${n} document${n === 1 ? "" : "s"} · unlocked · locks again in 2 minutes`,
    vaultEmpty: "Nothing in the vault yet.", vaultEmptySub: "Add your passports, e-visa, certificates, bookings and permits below.",
    addDocs: "ADD DOCUMENTS", lock: "LOCK", exportBackup: "EXPORT ENCRYPTED BACKUP",
    vaultFoot: "Import the real files straight from your phone — they are encrypted before they touch storage, and they never go near the repo. Export a backup before you fly: if this phone is lost, this vault is the only copy.",
    open: "OPEN", download: "DOWNLOAD THE FILE", openExternally: "OPEN THIS PDF", wrongPin: "Wrong PIN.", verifying: "CHECKING…", kb: "KB", added: "added",
    toastCreated: "Vault created. Remember that PIN — there is no reset.",
    toastAdded: n => `${n} added, encrypted.`, toastBackup: "Backup downloaded — put it in Drive or iCloud.",
    toastTawaf: "Seven circuits — two rak'ahs at Maqām Ibrāhīm.",
    toastSai: "Seven laps — the ḥalq or taqṣīr ends the Umrah.",
    toastAllSteps: "All steps marked.", toastTicksCleared: "Ticks cleared.",
    confirmDelete: "Delete this document from the vault?",
    confirmReset: "Clear every itinerary tick?",
    confirmResetRites: "Reset the rites to step 1 and zero both counters?",
    toastRitesCleared: "Rites reset — step 1, counters at zero.",
    exportPin: "Re-enter the PIN to export:", createFirst: "Create the vault first.",
    screenOn: "SCREEN STAYS ON WHILE THIS IS OPEN", close: "CLOSE",
    ritualsJump: "13 steps · du'ās · counters · fixes",
  },
  bn: {
    today: "আজ", rites: "উমরাহ", plan: "সূচি", dua: "দুআ", vault: "ভল্ট", more: "আরও",
    nextPrayer: "পরবর্তী নামাজ", dayOf: (a, b) => `দিন ${bnNum(a)} / ${bnNum(b)}`, toGo: "বাকি",
    todaysItems: n => `আজ · ${bnNum(n)}টি`,
    jumpTo: "সরাসরি যান",
    ritesRow: "আমলগুলো ক্রমানুসারে", ritesRowSub: "১৩ ধাপ · দুআ · কাউন্টার · সমাধান",
    planRow: "পুরো ভ্রমণসূচি", planRowSub: "নয় দিন, ফ্লাইটসহ",
    itineraryTitle: "নয় দিন", itinerarySub: n => `${bnNum(n)} দিন · ফ্লাইট, শহর, প্রতিদিনের কাজ`,
    todayChip: "আজ", nothingPlanned: "কিছু পরিকল্পনা নেই।",
    duaRow: "দুআর সংগ্রহ", duaRowSub: n => `${n}টি এন্ট্রি, প্রতিটির সূত্র আছে`,
    tickRow: "চেকলিস্ট", tickRowSub: n => `${n}টি জরুরি — করতে বা কিনতে হবে`,
    essRow: "যদি কিছু ভুল হয়ে যায়", essRowSub: "৯১১ · ৯৩৭ · দূতাবাস · ড্রাইভার কার্ড",
    prayerNote: "নামাজের সময় এই ফোনেই হিসাব করা (উম্মুল কুরা পদ্ধতি)। কাউন্টডাউন রিয়াদের সময়ে, আপনার ফোনের টাইমজোনে নয়।",
    countingDown: "কাউন্টডাউন", daysToDeparture: n => `রওনার ${n} দিন বাকি`,
    departureNote: "শুক্র ২৩ অক্টোবর · ১৪:০৫ ডাবলিন থেকে, ০২:৪০ মদীনায়। দুই ফ্লাইট, ইস্তাম্বুলে ২ ঘণ্টা ৫০ মিনিট।",
    tripComplete: "সফর সম্পন্ন", tripCompleteSub: "আপনার টিক ও কাউন্টার এখানেই আছে, চাইলে দেখে নিতে পারেন।",
    haramNoteMakkah: "মসজিদুল হারাম — হারামের নিজের বোর্ডের সঙ্গে মিলিয়ে নিন",
    haramNoteMadinah: "মাসজিদে নববী — উত্তর গেট ২৬৬ মিটার",
    jeddahNote: "জেদ্দা — শহরের সময়। বিমানবন্দর আল-বালাদ থেকে ৩০ কিমি উত্তরে।",
    dublinNote: "অবতরণের আগ পর্যন্ত ডাবলিন। মদীনা আয়ারল্যান্ডের দুই ঘণ্টা এগিয়ে।",
    offlineOk: "অফলাইন কপি কাজ করছে — এখানে কোনো ইন্টারনেট লাগে না",
    ritesTitle: "আমলগুলো ক্রমানুসারে",
    ritesSub: n => `${bnNum(n)} ধাপ — শেষটি বিদায়ী তাওয়াফ, উমরাহর অংশ নয়`,
    tapStep: "ধাপে চাপ দিন",
    ritesFoot: "এখানকার প্রতিটি বিধান ও দুআ সূত্র-যাচাই করা গাইড থেকে নেওয়া। মাযহাবভেদে পার্থক্য থাকলে সিদ্ধান্ত না নিয়ে পার্থক্যটিই ছাপা হয়েছে।",
    step: n => `ধাপ ${bnNum(n)}`, of: n => `/ ${bnNum(n)}`,
    circuits: "চক্কর", laps: "চক্কর", tapAsYouGo: "চলার সময়েই চাপ দিন",
    allSteps: "সব ধাপ", nextStep: "পরের ধাপ ›", markDone: "শেষ করুন",
    rulings: "বিধানসমূহ", rulingsFoot: (shown, total) => `এই ধাপের ${bnNum(total)}টির মধ্যে ${bnNum(shown)}টি — শুধু যেগুলো এই ধাপের সঙ্গে সরাসরি যুক্ত।`,
    noRulings: "এই ধাপের জন্য কোনো বিধান লেখা নেই।",
    commonMistake: "সাধারণ ভুল:", ifHappened: "হয়ে গেলে:", withChild: "ছয় বছরের শিশুর সঙ্গে:",
    duaLibTitle1: "যা বলবেন,", duaLibTitle2: "কখন বলবেন।",
    duaLibSub: n => `${bnNum(n)}টি এন্ট্রি · প্রতিটির সূত্রসহ`,
    search: "দুআ, সময় বা শব্দ খুঁজুন…",
    all: "সব", ihram: "ইহরাম", tawaf: "তাওয়াফ", sai: "সাঈ", madinah: "মদীনা", daily: "দৈনন্দিন",
    duaLibFoot: "সবুজ = সহিহ সনদ। হলুদ = সূত্র নিজেই বলছে এটি সাহাবির কথা, দুর্বল বা মতভেদপূর্ণ।",
    nothingMatches: "কিছু পাওয়া যায়নি।",
    duadetail: "দুআ", whenLabel: "কখন", gradingLabel: "সূত্রের নিজের ভাষায় গ্রেডিং",
    sourceLabel: "সূত্র", backToLibrary: "সংগ্রহে ফিরে যান",
    chainOk: "সহিহ", chainCheck: "সনদ যাচাই করুন", wordingBadge: "প্রচলিত শব্দ",
    checklistTitle: "করতে বা কিনতে হবে", checklistSub: (d, n) => `${bnNum(n)}টির মধ্যে ${bnNum(d)}টি শেষ · প্রস্তুতি গাইড থেকে`,
    checklistHint: "বিস্তারিত পড়তে লাইনে চাপুন · টিক দিতে বাক্সে চাপুন",
    markDone: "হয়ে গেছে বলে টিক দিন", markUndone: "হয়ে গেছে — ফেরাতে চাপুন",
    backToTick: "তালিকায় ফিরুন", nextItem: "পরেরটি", backToPlan: "সূচিতে ফিরুন",
    placesTitle: "কোথায় কেনাকাটা", placesRow: "কোথায় কেনাকাটা",
    placesSub: "ম্যাপে চাপুন, ফোনের নিজের ম্যাপ অ্যাপে জায়গাটি খুলে যাবে — চালু করতে ইন্টারনেট লাগে না",
    placesRowSub: "মল, বাজার আর খেজুরের বাজার — ম্যাপসহ",
    placesMadinah: "কেনাকাটা · মদীনা", placesMakkah: "কেনাকাটা · মক্কা",
    placesJeddah: "কেনাকাটা · জেদ্দা", placesYours: "নির্দিষ্ট জায়গা",
    openMap: "ম্যাপ", onFoot: "হাঁটা", byCar: "ট্যাক্সি", minLabel: "মিনিট",
    saveProgress: "অগ্রগতি সংরক্ষণ করুন", saveProgressSub: "টিক, কাউন্টার ও ভাষা — একটি ফাইল",
    restoreProgress: "ফাইল থেকে ফিরিয়ে আনুন", restoreProgressSub: "অন্য ফোনে সংরক্ষিত অগ্রগতি ফিরিয়ে আনুন",
    toastExported: "অগ্রগতি একটি ফাইলে সংরক্ষিত হয়েছে", toastImported: "অগ্রগতি ফিরিয়ে আনা হয়েছে",
    confirmImport: "এই ফোনে যা যা টিক করা আছে তা মুছে ফাইলের তথ্য বসিয়ে দেব?",
    importFailed: "ফাইলটি উমরাহর অগ্রগতি হিসেবে পড়া গেল না।",
    familyNote: "ছয় বছরের শিশুর সাথে", whyNote: "বিস্তারিত",
    essentialsTitle1: "রাত ২টায় কিছু", essentialsTitle2: "ভুল হয়ে গেলে",
    emergencySaudi: "জরুরি · সৌদি আরব", flightsLabel: "চারটি ফ্লাইট",
    embassyRow: "আয়ারল্যান্ড দূতাবাস · রিয়াদ",
    dutyOfficer: "আইরিশ নাগরিকদের জন্য অফিস সময়ের বাইরের ডিউটি অফিসার", yourHotels: "আপনার হোটেল",
    showDriver: "ড্রাইভারকে এটি দেখান", worthRemembering: "মনে রাখার মতো",
    qiblaTitle: "কিবলা", qiblaSub: (c, b) => `${c} থেকে · উত্তরের সাপেক্ষে ${b}°`,
    kaabaIs: "কাবা আছে", eastOfNorth: b => `প্রকৃত উত্তরের পূর্বে — অন্যদিকে ঘুরলে ${b}°`,
    qiblaNote: "এটি জ্যামিতি, চুম্বকীয় পাঠ নয় — সিগন্যাল বা কম্পাস ছাড়াই কাজ করে। হারামের লোহা ও স্পিকারের কাছে ফোনের ম্যাগনেটোমিটার সরে যায়, তাই ঘুরন্ত কাঁটার চেয়ে ডিগ্রিতেই ভরসা করুন।",
    moreTitle: "আরও", tickRowList: "চেকলিস্ট", essRowList: "জরুরি ও দূতাবাস",
    qiblaRowList: "কিবলা", qiblaRowSub: "আজ যেখানে আছেন সেখান থেকে দিক",
    ritesRowList: "আমলগুলো ক্রমানুসারে", ritesRowListSub: "১৩ ধাপ",
    checkUpdates: "আপডেট দেখুন", updating: "নতুন সংস্করণ আনা হচ্ছে…",
    running: "এই ফোনে", server: "সার্ভারে", updateAvailable: "আপডেট আছে — \"আপডেট দেখুন\" চাপুন",
    thisInstall: "এই ইনস্টল", offlineCopy: "অফলাইন কপি",
    offlineActive: "সক্রিয় — ইন্টারনেট ছাড়াই চলে", offlineNotYet: "এখনো সক্রিয় নয় — একবার নেটওয়ার্কে খুলুন",
    versionLabel: "সংস্করণ",
    resetRites: "আমলের অগ্রগতি রিসেট করুন", resetRitesSub: "আবার ধাপ ১ থেকে, তাওয়াফ ও সাঈর কাউন্টার শূন্য",
    resetTicks: "ভ্রমণসূচির টিক মুছুন", resetTicksSub: "সব দিনের পরিকল্পনার টিক মুছে যাবে — আমল ও ভল্ট অপরিবর্তিত থাকবে",
    moreFoot: "এই ফোনের সবকিছু ছাপা গাইডের যাচাই করা তথ্য থেকে এসেছে। অ্যাপ ও কাগজে অমিল হলে কাগজই ঠিক — আমাকে বলুন, অ্যাপ ঠিক করে দেব।",
    vaultTitle: "আপনার কাগজপত্র, সিলমোহরকৃত",
    vaultSub: "পাসপোর্ট · ই-ভিসা · সনদ · বুকিং। এই ফোনেই এনক্রিপ্টেড; কিছুই বাইরে যায় না।",
    pinEnter: "আপনার ৬ সংখ্যার পিন দিন", pinChoose: "৬ সংখ্যার পিন ঠিক করুন — এটি রিসেট করা যাবে না",
    pinNote: "AES-256-GCM · PBKDF2 310k · চাবি কোথাও সংরক্ষণ হয় না।",
    vaultHead: "ভল্ট", docsN: n => `${bnNum(n)}টি নথি · খোলা · ২ মিনিট পর আবার লক হবে`,
    vaultEmpty: "ভল্ট এখনো খালি।", vaultEmptySub: "পাসপোর্ট, ই-ভিসা, সনদ, বুকিং ও পারমিট নিচে যোগ করুন।",
    addDocs: "নথি যোগ করুন", lock: "লক", exportBackup: "এনক্রিপ্টেড ব্যাকআপ নামান",
    vaultFoot: "ফাইলগুলো সরাসরি ফোন থেকে নিন — সংরক্ষণের আগেই এনক্রিপ্ট হয়, রিপোতে কিছুই যায় না। উড়ার আগে ব্যাকআপ নামিয়ে রাখুন: ফোন হারালে এটিই একমাত্র কপি।",
    open: "খুলুন", download: "ফাইলটি নামান", openExternally: "এই পিডিএফ খুলুন", wrongPin: "ভুল পিন।", verifying: "যাচাই হচ্ছে…", kb: "কেবি", added: "যোগ হয়েছে",
    toastCreated: "ভল্ট তৈরি হয়েছে। পিনটি মনে রাখুন — রিসেট নেই।",
    toastAdded: n => `${n}টি যোগ হয়েছে, এনক্রিপ্টেড।`, toastBackup: "ব্যাকআপ নামানো হয়েছে — Drive বা iCloud-এ রাখুন।",
    toastTawaf: "সাত চক্কর — মাকামে ইব্রাহিমে দুই রাকআত।",
    toastSai: "সাত চক্কর — হালক বা তাকসিরে উমরাহ শেষ।",
    toastAllSteps: "সব ধাপ চিহ্নিত।", toastTicksCleared: "টিক মুছে ফেলা হয়েছে।",
    confirmDelete: "ভল্ট থেকে এই নথিটি মুছবেন?",
    confirmReset: "সব ভ্রমণসূচির টিক মুছবেন?",
    confirmResetRites: "আমল ধাপ ১-এ ফিরিয়ে দুই কাউন্টারই শূন্য করবেন?",
    toastRitesCleared: "আমল রিসেট হয়েছে — ধাপ ১, কাউন্টার শূন্য।",
    exportPin: "ব্যাকআপের জন্য পিনটি আবার দিন:", createFirst: "আগে ভল্ট তৈরি করুন।",
    screenOn: "এটি খোলা থাকলে স্ক্রিন জ্বলবে", close: "বন্ধ",
    ritualsJump: "১৩ ধাপ · দুআ · কাউন্টার · সমাধান",
  }
};
const t = k => { const v = I18N[LANG][k]; return v !== undefined ? v : (I18N.en[k] !== undefined ? I18N.en[k] : k); };
const L = (o, f) => (LANG === "bn" && o[f + "_bn"]) ? o[f + "_bn"] : (o[f] || "");
const bnNum = x => LANG === "bn" ? String(x).replace(/[0-9]/g, d => "০১২৩৪৫৬৭৮৯"[d]) : String(x);

/* ---------------------------------------------------------------- helpers */
const $  = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const root = $("#root");
let toastT = null;
function toast(msg) {
  let el = $(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg;
  clearTimeout(toastT);
  toastT = setTimeout(() => el.remove(), 2600);
}

/* ---------------------------------------------------------------- time */
function tzParts(tzName, date) {
  const f = new Intl.DateTimeFormat("en-GB", { timeZone: tzName, year: "numeric", month: "2-digit",
    day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const o = {};
  f.formatToParts(date || new Date()).forEach(x => { if (x.type !== "literal") o[x.type] = x.value; });
  return { y: +o.year, m: +o.month, d: +o.day, H: +o.hour % 24, M: +o.minute, S: +o.second };
}
/* the offset of a city on a given day — never assume; Dublin moves twice a year */
function tzOffsetHours(tzName, date) {
  const d = date || new Date();
  const p = tzParts(tzName, d);
  return Math.round(((Date.UTC(p.y, p.m - 1, p.d, p.H, p.M, p.S) - d.getTime()) / 3600000) * 4) / 4;
}
const nowIn = (tzName, date) => tzParts(tzName, date);
const pad2 = n => String(n).padStart(2, "0");
const dayKey = p => `${p.y}-${pad2(p.m)}-${pad2(p.d)}`;
const dayIndex = k => Math.round(Date.UTC(+k.slice(0, 4), +k.slice(5, 7) - 1, +k.slice(8, 10)) / 864e5);
function localDayKey(date) {
  const d = date || new Date();          // the phone's own date is "today" for a traveller
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function hijri(p) {
  try {
    const f = new Intl.DateTimeFormat(LANG === "bn" ? "bn-u-ca-islamic-umalqura" : "en-u-ca-islamic-umalqura",
      { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
    const parts = f.formatToParts(new Date(Date.UTC(p.y, p.m - 1, p.d, 12)));
    const g = k => (parts.find(x => x.type === k) || {}).value || "";
    const base = `${g("day")} ${g("month")} ${g("year")}`.trim();
    return base + (LANG === "bn" ? " হিজরি" : " AH");
  } catch (e) { return ""; }
}
function longDate(p) {
  return new Intl.DateTimeFormat(LANG === "bn" ? "bn" : "en-GB",
    { weekday: "short", day: "numeric", month: "long", year: "numeric" }).format(new Date(Date.UTC(p.y, p.m - 1, p.d, 12)));
}

/* ---------------------------------------------------------------- prayer times (Umm al-Qura, on-device) */
const D2R = Math.PI / 180, R2D = 180 / Math.PI;
const sin = a => Math.sin(a * D2R), cos = a => Math.cos(a * D2R), tan = a => Math.tan(a * D2R);
const asin = x => Math.asin(x) * R2D, atan2 = (y, x) => Math.atan2(y, x) * R2D;
const fixAngle = a => ((a % 360) + 360) % 360;
const fixHour = a => ((a % 24) + 24) % 24;
function julian(y, m, d) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}
function prayerTimes(p, place) {
  const tz = tzOffsetHours(place.tzName, new Date(Date.UTC(p.y, p.m - 1, p.d, 12)));
  const lat = place.lat, lng = place.lng;
  const jd = julian(p.y, p.m, p.d) - lng / 360;
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const Lm = fixAngle(q + 1.915 * sin(g) + 0.020 * sin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = fixAngle(atan2(cos(e) * sin(Lm), cos(Lm)) / 15);
  const eqt = q / 15 - fixHour(RA);
  const decl = asin(sin(e) * sin(Lm));
  const midDay = fixHour(12 - eqt);
  const T = (angle, ccw) => {
    const c = (-sin(angle) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat));
    if (c > 1 || c < -1) return null;
    const H = Math.acos(c) * R2D / 15;
    return midDay + (ccw ? -H : H);
  };
  const asrAngle = -Math.atan(1 / (1 + Math.tan(Math.abs(lat - decl) * D2R))) * R2D;
  const conv = x => x == null ? null : fixHour(x + tz - lng / 15);
  const fajr = conv(T(18.5, true)), rise = conv(T(0.833, true)), dhuhr = conv(midDay),
        asr = conv(T(asrAngle, false)), maghrib = conv(T(0.833, false));
  const isha = maghrib == null ? null : fixHour(maghrib + 1.5);
  return [{ k: "FAJR", t: fajr }, { k: "SUNRISE", t: rise }, { k: "DHUHR", t: dhuhr },
          { k: "ASR", t: asr }, { k: "MAGHRIB", t: maghrib }, { k: "ISHA", t: isha }];
}
const PNAME_EN = { FAJR: "Fajr", SUNRISE: "Sunrise", DHUHR: "Dhuhr", ASR: "Asr", MAGHRIB: "Maghrib", ISHA: "Isha" };
const PNAME_BN = { FAJR: "ফজর", SUNRISE: "সূর্যোদয়", DHUHR: "জোহর", ASR: "আসর", MAGHRIB: "মাগরিব", ISHA: "ইশা" };
const pname = k => (LANG === "bn" ? PNAME_BN[k] : PNAME_EN[k]);
const hm = x => x == null ? "--:--" : `${pad2(Math.floor(x))}:${pad2(Math.round((x % 1) * 60))}`;
const mins = x => x == null ? null : Math.floor(x) * 60 + Math.round((x % 1) * 60);
function cdown(d) {
  if (d == null) return "--";
  const h = Math.floor(d / 60), m = d % 60;
  if (LANG === "bn") return d >= 60 ? `${bnNum(h)}ঘ ${bnNum(pad2(m))}মি` : `${bnNum(m)}মি`;
  return d >= 60 ? h + "h " + pad2(m) + "m" : m + "m";
}

/* ---------------------------------------------------------------- state */
const SKEY = "umrah-state-v1";
const blank = () => ({ v: 1, done: {}, counts: { tawaf: 0, sai: 0 }, rite: 0, checked: {} });
let S = (() => { try { return Object.assign(blank(), JSON.parse(localStorage.getItem(SKEY)) || {}); } catch (e) { return blank(); } })();
const save = () => { try { localStorage.setItem(SKEY, JSON.stringify(S)); } catch (e) {} };
const isDone = id => !!S.done[id];
function toggle(id) { if (S.done[id]) delete S.done[id]; else S.done[id] = Date.now(); save(); render(); }
const todayPlace = key => key <= "2026-10-23" ? DUBLIN          /* you are still in Ireland */
  : key >= "2026-10-30" ? JEDDAH : key >= "2026-10-27" ? MAKKAH : MADINAH;

/* ---------------------------------------------------------------- router */
const routes = { today: vToday, rites: vRites, rite: vRite, plan: vItinerary, dua: vDua, duadetail: vDuaDetail,
                 vault: vVault, more: vMore, checklist: vChecklist, check: vCheck, day: vTripDay, places: vPlaces,
                 essentials: vEssentials, qibla: vQibla };
function parseHash() {
  const h = (location.hash || "#/today").replace(/^#\/?/, "");
  const [name, arg] = h.split("/");
  return { name: name || "today", arg };
}
let lastRoute = null;
let SERVER_BUILD = null;   /* what github pages is serving right now */
function render() {
  const { name, arg } = parseHash();
  const light = (name === "dua" || name === "duadetail" || name === "essentials");
  root.classList.toggle("light", light);
  root.classList.toggle("bn", LANG === "bn");
  $("#brand").textContent = LANG === "bn" ? "উমরাহ ২০২৬" : "UMRAH 2026";
  $("#langbtn").textContent = LANG === "bn" ? "বাংলা" : "EN";
  $$("nav a").forEach(a => { a.querySelector("span").textContent = t(a.dataset.tab); });
  const key = name + "/" + (arg || "");
  const paint = html => {
    $("#view").innerHTML = `<div class="view${key !== lastRoute ? " fade" : ""}">${html}</div>`;
    lastRoute = key;
    $$("nav a").forEach(a => a.classList.toggle("on",
      a.dataset.tab === (name === "rite" ? "rites" : name === "day" ? "plan" : name)));
    window.scrollTo(0, 0);
    bind();
  };
  const out = (routes[name] || vToday)(arg);
  if (out && typeof out.then === "function") out.then(paint).catch(e => paint(`<div class="empty">${esc(e.message)}</div>`));
  else paint(out);
}
window.addEventListener("hashchange", render);
function setLang(l) {
  LANG = l;
  try { localStorage.setItem("umrah-lang", l); } catch (e) {}
  lastRoute = null;
  render();
}

/* ---------------------------------------------------------------- TODAY */
function vToday() {
  const key = localDayKey();
  const place = todayPlace(key);
  const p = nowIn(place.tzName);
  const times = prayerTimes(p, place);
  const nowM = p.H * 60 + p.M;
  let nextIdx = times.findIndex(x => mins(x.t) != null && mins(x.t) > nowM);
  if (nextIdx < 0) nextIdx = 0;
  const next = times[nextIdx];
  const diff = mins(next.t) == null ? null
    : (nextIdx === 0 && mins(next.t) < nowM ? mins(next.t) + 1440 - nowM : mins(next.t) - nowM);
  const day = (DATA.itinerary || []).find(d => d.d === key);
  const dayNo = day ? (DATA.itinerary.findIndex(d => d.d === key) + 1) : null;

  const strip = times.map((x, i) => {
    const cls = i === nextIdx ? "now" : (mins(x.t) != null && mins(x.t) < nowM ? "past" : "");
    return `<div class="${cls}"><div class="n">${LANG === "bn" ? PNAME_BN[x.k] : x.k}</div><div class="v">${hm(x.t)}</div></div>`;
  }).join("");

  const items = day ? day.items : [];
  const list = items.map(it => `
    <div class="item ${isDone(it.id) ? "done" : ""}" data-go="#/day/${encodeURIComponent(it.id)}">
      <div class="chk ${isDone(it.id) ? "on" : ""}" data-toggle="${it.id}" role="checkbox"
           aria-checked="${isDone(it.id) ? "true" : "false"}">${isDone(it.id) ? "✓" : ""}</div>
      <div class="tx"><div class="ti">${esc(L(it, "t"))}</div>${L(it, "s") ? `<div class="ds">${esc(L(it, "s"))}</div>` : ""}</div>
      <div class="chev">›</div>
    </div>`).join("");

  const status = key < TRIP_START
    ? `<div class="card"><div class="eyebrow">${t("countingDown")}</div><div class="big">${t("daysToDeparture")(dayIndex(TRIP_START) - dayIndex(key))}</div>
       <div class="meta">${t("departureNote")}</div></div>`
    : key > TRIP_END
      ? `<div class="card"><div class="eyebrow">${t("tripComplete")}</div><div class="big">Al-ḥamdu lillāh</div>
         <div class="meta">${t("tripCompleteSub")}</div></div>`
      : `<div class="card">
          <div class="eyebrow">${t("nextPrayer")} · ${esc(L(place, "name").toUpperCase())}</div>
          <div class="big">${pname(next.k)} ${hm(next.t)}</div>
          <div class="meta">${place === MAKKAH ? t("haramNoteMakkah") : place === JEDDAH ? t("jeddahNote")
            : place === DUBLIN ? t("dublinNote") : t("haramNoteMadinah")}</div>
          <div class="row"><span class="pill solid">${t("dayOf")(dayNo, DATA.itinerary.length)}</span>
            <span class="pill">${esc(day ? L(day, "city") : L(place, "name"))}</span>
            <div class="count"><div class="n">${cdown(diff)}</div>
            <div class="l">${diff == null ? "" : t("toGo")}</div></div></div>
         </div>`;

  return `
    <div class="date">${longDate(p)} · ${hijri(p)}</div>
    <h1 class="t">${esc(day ? L(day, "city") : L(place, "name"))}</h1>
    ${status}
    <div class="pray">${strip}</div>
    <div class="offlinebanner">✓ ${t("offlineOk")}</div>
    ${day ? `<div class="section"><span class="s">${t("todaysItems")(items.length)}</span><span class="hr"></span></div>
      <div class="list">${list}</div>` : ""}
    <div class="section"><span class="s">${t("jumpTo")}</span><span class="hr"></span></div>
    <div class="list">
      <div class="item" data-go="#/rites"><div class="chk on">☾</div><div class="tx"><div class="ti">${t("ritesRow")}</div><div class="ds">${t("ritesRowSub")}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/plan"><div class="chk on">▤</div><div class="tx"><div class="ti">${t("planRow")}</div><div class="ds">${t("planRowSub")}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/dua"><div class="chk on">۞</div><div class="tx"><div class="ti">${t("duaRow")}</div><div class="ds">${t("duaRowSub")((DATA.duas || []).length)}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/checklist"><div class="chk on">☑</div><div class="tx"><div class="ti">${t("tickRow")}</div><div class="ds">${t("tickRowSub")((DATA.checklist || []).length)}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/places"><div class="chk on">▣</div><div class="tx"><div class="ti">${t("placesRow")}</div><div class="ds">${t("placesRowSub")}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/essentials"><div class="chk on">☎</div><div class="tx"><div class="ti">${t("essRow")}</div><div class="ds">${t("essRowSub")}</div></div><div class="chev">›</div></div>
    </div>
    <div class="muted">${t("prayerNote")}</div>`;
}

/* ---------------------------------------------------------------- RITES */
function vRites() {
  const rows = (DATA.rites || []).map((r, i) => `
    <div class="item ${S.rite > i ? "done" : ""}" data-go="#/rite/${r.id}">
      <div class="chk ${S.rite > i ? "on" : ""}">${S.rite > i ? "✓" : r.n}</div>
      <div class="tx"><div class="ti">${esc(L(r, "t"))}</div><div class="ds">${esc(L(r, "s"))}</div></div>
      <div class="chev">›</div>
    </div>`).join("");
  return `<h1 class="t">${t("ritesTitle")}</h1>
    <div class="sub">${t("ritesSub")((DATA.rites || []).length)}</div>
    <div class="stepbar">${(DATA.rites || []).map((_, i) => `<i class="${i < S.rite ? "on" : i === S.rite ? "cur" : ""}"></i>`).join("")}</div>
    <div class="section"><span class="s">${t("tapStep")}</span><span class="hr"></span></div>
    <div class="list">${rows}</div>
    <div class="muted">${t("ritesFoot")}</div>`;
}
function vRite(id) {
  const idx = (DATA.rites || []).findIndex(r => r.id === id);
  if (idx < 0) return vRites();
  const r = DATA.rites[idx];
  const duas = (r.duas || []).map(k => (DATA.duas || []).find(d => d.id === k)).filter(Boolean);
  const stage = (DATA.rules || {})[r.part] || { label: "", label_bn: "", items: [] };
  const library = Object.keys(DATA.rules || {}).reduce((a, k) => a.concat(DATA.rules[k].items), []);
  const byRef = new Map(library.map(x => [x.ref, x]));
  const ruleSet = { label: stage.label, label_bn: stage.label_bn, total: stage.items.length,
    items: (r.refs || []).map(rf => byRef.get(rf)).filter(Boolean) };
  const counterKey = r.id === "tawaf" ? "tawaf" : r.id === "sai" ? "sai" : null;
  const done = counterKey ? S.counts[counterKey] : 0;
  const counter = counterKey ? `
    <div class="section"><span class="s">${counterKey === "tawaf" ? t("circuits") : t("laps")} · ${t("tapAsYouGo")}</span><span class="hr"></span></div>
    <div class="circuits" data-counter="${counterKey}">
      ${Array.from({ length: 7 }, (_, i) => `<button class="${i < done ? "on" : i === done ? "cur" : ""}" data-c="${i + 1}">${LANG === "bn" ? "১২৩৪৫৬৭"[i] : i + 1}</button>`).join("")}
    </div>` : "";
  const duaCards = duas.map(d => `
    <div class="duacard"><div class="rule"></div>
      <div class="ar">${esc(d.arabic)}</div>
      ${(LANG === "bn" ? (d.translit_bn || d.translit) : d.translit) ? `<div class="tr">${esc(LANG === "bn" ? (d.translit_bn || d.translit) : d.translit)}</div>` : ""}
      ${L(d, "meaning") ? `<div class="mn">${esc(L(d, "meaning"))}</div>` : ""}
      ${L(d, "stage") ? `<div class="whenline"><b>${t("whenLabel")}</b> ${esc(L(d, "stage"))}</div>` : ""}
      <div class="src"><span class="badge ${d.amber ? "amber" : ""}">${d.badge === "wording" ? t("wordingBadge") : d.amber ? t("chainCheck") : t("chainOk")}</span>
        <span class="srct">${esc(LANG === "bn" && d.source_bn ? d.source_bn : d.source)}</span></div>
    </div>`).join("");
  const rules = ruleSet.items.map(x => `
    <div class="rulecard">
      <div class="h"><span class="rf">${esc(x.ref)}</span><span class="tp">${esc(L(x, "topic"))}</span></div>
      ${L(x, "ruling") ? `<div class="tx" style="opacity:.55;font-size:10px;letter-spacing:.1em;margin-top:3px">${esc(L(x, "ruling").toUpperCase())}</div>` : ""}
      ${L(x, "text") ? `<div class="tx">${esc(L(x, "text").length > 340 ? L(x, "text").slice(0, 340) + "…" : L(x, "text"))}</div>` : ""}
      ${L(x, "mistake") ? `<div class="mk"><b>${t("commonMistake")}</b> ${esc(L(x, "mistake"))}</div>` : ""}
      ${L(x, "remedy") ? `<div class="mk rm"><b>${t("ifHappened")}</b> ${esc(L(x, "remedy"))}</div>` : ""}
      ${L(x, "family") ? `<div class="fam">${t("withChild")} ${esc(L(x, "family"))}</div>` : ""}
      <div class="sc">${esc(x.source)}</div>
    </div>`).join("");
  return `
    <div class="rite"><div class="n">${t("step")(r.n)} ${t("of")(DATA.rites.length)}</div>
      <div class="t">${esc(L(r, "t"))}</div><div class="s">${esc(L(r, "s"))}</div></div>
    ${counter}
    ${duaCards}
    <div class="acts">
      <button class="btn ghost" data-go="#/rites">${t("allSteps")}</button>
      <button class="btn gold" data-next="${idx}">${idx === DATA.rites.length - 1 ? t("markDone") : t("nextStep")}</button>
    </div>
    <div class="section"><span class="s">${t("rulings")} · ${esc(LANG === "bn" ? (ruleSet.label_bn || ruleSet.label) : ruleSet.label)}</span><span class="hr"></span></div>
    ${rules || `<div class="empty">${t("noRulings")}</div>`}
    ${ruleSet.items.length ? `<div class="muted">${t("rulingsFoot")(ruleSet.items.length, ruleSet.total)}</div>` : ""}`;
}

/* ---------------------------------------------------------------- ITINERARY */
function shortDate(iso) {
  return new Intl.DateTimeFormat(LANG === "bn" ? "bn" : "en-GB",
    { weekday: "short", day: "numeric", month: "short" })
    .format(new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10), 12)));
}
function vItinerary() {
  const days = DATA.itinerary || [];
  const today = localDayKey();
  return `<h1 class="t">${t("itineraryTitle")}</h1>
    <div class="sub">${t("itinerarySub")(days.length)}</div>
    ${days.map(d => {
      const items = d.items || [];
      const doneN = items.filter(i => isDone(i.id)).length;
      return `
      <div class="section"><span class="s">${esc(shortDate(d.d))} · ${esc(L(d, "city"))}${d.d === today ? " · " + t("todayChip") : ""}</span><span class="hr"></span></div>
      <div class="list">${items.length ? items.map(it => `
        <div class="item ${isDone(it.id) ? "done" : ""}" data-go="#/day/${encodeURIComponent(it.id)}">
          <div class="chk ${isDone(it.id) ? "on" : ""}" data-toggle="${it.id}" role="checkbox"
               aria-checked="${isDone(it.id) ? "true" : "false"}">${isDone(it.id) ? "✓" : ""}</div>
          <div class="tx"><div class="ti">${esc(L(it, "t"))}</div>${L(it, "s") ? `<div class="ds">${esc(L(it, "s"))}</div>` : ""}</div>
          <div class="chev">›</div>
        </div>`).join("") : `<div class="empty">${t("nothingPlanned")}</div>`}</div>
      ${items.length ? `<div class="muted" style="padding-top:2px;text-align:right">${bnNum(doneN)} / ${bnNum(items.length)}</div>` : ""}`;
    }).join("")}`;
}

/* ---------------------------------------------------------------- DU'A */
let duaFilter = "all", duaQ = "";
function vDua() {
  const cats = ["all", "ihram", "tawaf", "sai", "madinah", "daily"];
  const all = DATA.duas || [];
  const catN = c => (c === "all" ? all.length : all.filter(d => d.cat === c).length);
  const list = all.filter(d => duaFilter === "all" || d.cat === duaFilter)
    .filter(d => !duaQ || (L(d, "title") + " " + L(d, "meaning") + " " + L(d, "translit")).toLowerCase().includes(duaQ.toLowerCase()))
    .map(d => `
      <div class="doc" data-go="#/duadetail/${d.id}" style="cursor:pointer">
        <div class="ic" style="font-size:${d.amber ? "12" : "14"}px">${d.amber ? "!" : "۞"}</div>
        <div class="tx"><div class="n2">${esc(L(d, "title"))}</div>
          <div class="m2">${esc(LANG === "bn" && d.source_bn ? d.source_bn : (d.source || ""))}</div></div>
      </div>`).join("");
  return `<h1 class="t">${t("duaLibTitle1")}<br>${t("duaLibTitle2")}</h1>
    <div class="sub">${t("duaLibSub")((DATA.duas || []).length)}</div>
    <div class="search"><span>⌕</span><input id="q" placeholder="${esc(t("search"))}" value="${esc(duaQ)}"></div>
    <div class="chips">${cats.map(c => `<button class="${duaFilter === c ? "on" : ""}" data-chip="${c}">${t(c)} <i>${bnNum(catN(c))}</i></button>`).join("")}</div>
    <div class="list">${list || `<div class="empty">${t("nothingMatches")}</div>`}</div>
    <div class="muted">${t("duaLibFoot")}</div>`;
}
function vDuaDetail(id) {
  const d = (DATA.duas || []).find(x => x.id === id);
  if (!d) return vDua();
  const translit = LANG === "bn" ? (d.translit_bn || d.translit) : d.translit;
  return `<div class="rite"><div class="n">${t("duadetail")}</div><div class="t" style="font-size:22px">${esc(L(d, "title"))}</div></div>
    <div class="duacard"><div class="rule"></div>
      <div class="ar">${esc(d.arabic)}</div>
      ${translit ? `<div class="tr">${esc(translit)}</div>` : ""}
      ${L(d, "meaning") ? `<div class="mn">${esc(L(d, "meaning"))}</div>` : ""}
      <div class="src"><span class="badge ${d.amber ? "amber" : ""}">${d.badge === "wording" ? t("wordingBadge") : d.amber ? t("chainCheck") : t("chainOk")}</span></div>
    </div>
    <div class="section"><span class="s">${t("whenLabel")}</span><span class="hr"></span></div>
    <div class="muted" style="padding:0 18px;font-size:12.5px;opacity:.8">${esc(L(d, "stage"))}</div>
    <div class="section"><span class="s">${t("gradingLabel")}</span><span class="hr"></span></div>
    <div class="muted" style="padding:0 18px;font-size:12px;opacity:.72">${esc(LANG === "bn" && d.grading_bn ? d.grading_bn : d.grading)}</div>
    <div class="section"><span class="s">${t("sourceLabel")}</span><span class="hr"></span></div>
    <div class="muted" style="padding:0 18px;font-size:12px;opacity:.72">${esc(LANG === "bn" && d.source_bn ? d.source_bn : d.source)}${d.url ? `<br><span style="opacity:.6;word-break:break-all">${esc(d.url)}</span>` : ""}</div>
    <div class="acts"><button class="btn ghost" data-go="#/dua">${t("backToLibrary")}</button></div>`;
}

/* ---------------------------------------------------------------- CHECKLIST */
let clFilter = "all";
function vChecklist() {
  const all = DATA.checklist || [];
  const whens = Array.from(new Set(all.map(i => i.when).filter(Boolean)));
  const rows = all.filter(i => clFilter === "all" || i.when === clFilter).map(i => `
    <div class="item ${S.checked[i.id] ? "done" : ""}" data-go="#/check/${encodeURIComponent(i.id)}">
      <div class="chk ${S.checked[i.id] ? "on" : ""}" data-check="${esc(i.id)}" role="checkbox"
           aria-checked="${S.checked[i.id] ? "true" : "false"}">${S.checked[i.id] ? "✓" : ""}</div>
      <div class="tx"><div class="ti">${esc(L(i, "item"))}</div>
        <div class="ds">${esc(L(i, "when") || "")}${i.cost ? ` · ${esc(i.cost)}` : ""}</div></div>
      <div class="chev">›</div>
    </div>`).join("");
  const doneN = all.filter(i => S.checked[i.id]).length;
  const chips = ["all", ...whens.slice(0, 7)];
  return `<h1 class="t">${t("checklistTitle")}</h1>
    <div class="sub">${t("checklistSub")(doneN, all.length)}</div>
    <div class="sub" style="font-size:11px;opacity:.55;margin-top:2px">${t("checklistHint")}</div>
    <div class="chips">${chips.map(w => {
      const lbl = w === "all" ? t("all") : (LANG === "bn" ? (all.find(i => i.when === w) || {}).when_bn || w : w);
      return `<button class="${clFilter === w ? "on" : ""}" data-clchip="${esc(w)}">${esc(lbl).toUpperCase()}</button>`;
    }).join("")}</div>
    <div class="list">${rows}</div>`;
}

/* The guide writes each entry as one long paragraph — 300+ characters of it.
   Break it at sentence ends so it can actually be read on a phone. */
function paras(txt) {
  const t = String(txt || "").trim();
  if (t.length < 300) return [t];
  const bits = t.split(/(?<=[.!?।])\s+(?=[A-Z“(\u0980-\u09FF])/);
  const out = [];
  let cur = "";
  for (const b of bits) {
    if (cur && cur.length + b.length > 290) { out.push(cur); cur = b; }
    else cur = cur ? cur + " " + b : b;
  }
  if (cur) out.push(cur);
  return out;
}
const prose = txt => paras(txt).map(x => `<p class="prose">${esc(x)}</p>`).join("");

function vTripDay(id) {
  const pairs = [];
  (DATA.itinerary || []).forEach(d => (d.items || []).forEach(it => pairs.push({ day: d, it })));
  const i = pairs.findIndex(x => x.it.id === decodeURIComponent(id || ""));
  if (i < 0) return `<h1 class="t">${t("itineraryTitle")}</h1>
    <div class="acts"><button class="btn ghost" data-go="#/plan">${t("backToPlan")}</button></div>`;
  const { day, it } = pairs[i];
  const done = isDone(it.id);
  const next = pairs[i + 1];
  return `<div class="rite"><div class="n">${esc(shortDate(day.d))} · ${esc(L(day, "city"))}</div>
      <div class="t" style="font-size:20px">${esc(L(it, "t"))}</div></div>
    ${L(it, "s") ? `<div class="sub" style="margin:6px 2px 0">${esc(L(it, "s"))}</div>` : ""}
    <div class="section"><span class="s">${t("whyNote")}</span><span class="hr"></span></div>
    <div class="card">${prose(L(it, "detail") || L(it, "s"))}</div>
    <div class="acts" style="margin-top:16px">
      <button class="btn ${done ? "ghost" : "gold"}" data-toggle="${esc(it.id)}">${done ? t("markUndone") : t("markDone")}</button>
    </div>
    <div class="acts" style="margin-top:8px">
      <button class="btn ghost" data-go="#/plan">${t("backToPlan")}</button>
      ${next ? `<button class="btn ghost" data-go="#/day/${encodeURIComponent(next.it.id)}">${t("nextItem")} ›</button>` : ""}
    </div>`;
}

function vCheck(id) {
  const all = DATA.checklist || [];
  const i = all.find(x => x.id === decodeURIComponent(id || ""));
  if (!i) return `<h1 class="t">${t("checklistTitle")}</h1>
    <div class="acts"><button class="btn ghost" data-go="#/checklist">${t("backToTick")}</button></div>`;
  const done = !!S.checked[i.id];
  const idx = all.indexOf(i);
  const next = all[idx + 1];
  const meta = [L(i, "when"), i.cost].filter(Boolean).map(x => esc(x)).join(" · ");
  return `<div class="rite"><div class="n">${t("checklistTitle")}</div>
      <div class="t" style="font-size:20px">${esc(L(i, "item"))}</div></div>
    ${meta ? `<div class="sub" style="margin:6px 2px 0">${meta}</div>` : ""}
    <div class="section"><span class="s">${t("whyNote")}</span><span class="hr"></span></div>
    <div class="card">${prose(L(i, "detail"))}</div>
    ${L(i, "family") ? `<div class="section"><span class="s">${t("familyNote")}</span><span class="hr"></span></div>
    <div class="card">${prose(L(i, "family"))}</div>` : ""}
    <div class="acts" style="margin-top:16px">
      <button class="btn ${done ? "ghost" : "gold"}" data-check="${esc(i.id)}">${done ? t("markUndone") : t("markDone")}</button>
    </div>
    <div class="acts" style="margin-top:8px">
      <button class="btn ghost" data-go="#/checklist">${t("backToTick")}</button>
      ${next ? `<button class="btn ghost" data-go="#/check/${encodeURIComponent(next.id)}">${t("nextItem")} ›</button>` : ""}
    </div>`;
}

/* ---------------------------------------------------------------- PLACES
   The map button has to open the phone's own map app, which means a different scheme per
   platform: Android understands geo:, iOS wants Apple Maps over https, and a desktop
   browser needs a web URL. Launching the app needs no network, so this still works with
   the SIM out — the map itself may not, but the app and the saved pin will. */
function mapHref(p) {
  const q = `${p.lat},${p.lng}`;
  const label = encodeURIComponent(L(p, "name"));
  const ua = navigator.userAgent || "";
  const ios = /iPad|iPhone|iPod/.test(ua)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (ios) return `https://maps.apple.com/?ll=${q}&q=${label}`;
  if (/Android/i.test(ua)) return `geo:${q}?q=${q}(${label})`;
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function vPlaces() {
  const all = DATA.places || [];
  const groups = [["madinah", t("placesMadinah")], ["makkah", t("placesMakkah")],
                  ["jeddah", t("placesJeddah")], ["yours", t("placesYours")]];
  const num = x => LANG === "bn" ? bnNum(x) : String(x);
  return `<h1 class="t">${t("placesTitle")}</h1>
    <div class="sub">${t("placesSub")}</div>
    ${groups.map(([g, label]) => {
      const rows = all.filter(p => p.group === g);
      if (!rows.length) return "";
      return `<div class="section"><span class="s">${label}</span><span class="hr"></span></div>
      ${rows.map(p => `
        <div class="doc" data-place="${esc(p.id)}" data-coords="${p.lat},${p.lng}">
          <div class="ic" style="font-size:12px">${p.group === "yours" ? "◈" : "▣"}</div>
          <div class="tx">
            <div class="n2">${esc(L(p, "name"))}</div>
            <div class="m2">${esc(L(p, "what"))}</div>
            ${p.km ? `<div class="m2" style="opacity:.62;margin-top:4px">${num(p.km)} km · ${p.how === "walk" ? t("onFoot") : t("byCar")} ~${num(p.mins)} ${t("minLabel")}</div>` : ""}
          </div>
          <a href="${mapHref(p)}" data-map="${esc(p.id)}" style="text-decoration:none;align-self:center">
            <span class="pill solid">${t("openMap")}</span></a>
        </div>`).join("")}`;
    }).join("")}`;
}

/* ---------------------------------------------------------------- ESSENTIALS */
function vEssentials() {
  const E = DATA.essentials || {};
  const em = (E.emergency || []).map(x => `
    <div class="doc"><div class="ic">☎</div><div class="tx"><div class="n2">${esc(x.n)}</div>
      <div class="m2">${esc(L(x, "d"))}</div></div>
      <a href="tel:${esc(x.n)}" style="text-decoration:none"><span class="pill solid">${LANG === "bn" ? "কল" : "CALL"}</span></a></div>`).join("");
  const b = E.embassy || {};
  return `<h1 class="t">${t("essentialsTitle1")}<br>${t("essentialsTitle2")}</h1>
    <div class="offlinebanner">✓ ${t("offlineOk")}</div>
    <div class="section"><span class="s">${t("emergencySaudi")}</span><span class="hr"></span></div>
    ${em}
    <div class="section"><span class="s">${t("embassyRow")}</span><span class="hr"></span></div>
    <div class="doc"><div class="ic">IE</div><div class="tx"><div class="n2">${esc(L(b, "name"))}</div>
      <div class="m2">${esc(L(b, "note"))}</div></div></div>
    <div class="doc"><div class="ic">24h</div><div class="tx"><div class="n2">${esc(b.duty || "")}</div>
      <div class="m2">${t("dutyOfficer")}</div></div>
      <a href="tel:${esc((b.duty || "").replace(/\s/g, ""))}" style="text-decoration:none"><span class="pill solid">${LANG === "bn" ? "কল" : "CALL"}</span></a></div>
    <div class="doc"><div class="ic">MAIL</div><div class="tx"><div class="n2">${esc(b.email || "")}</div>
      <div class="m2">${esc(b.addr || "")}</div></div></div>
    <div class="section"><span class="s">${t("flightsLabel")}</span><span class="hr"></span></div>
    ${((E.flights) || []).map(f => `<div class="doc"><div class="ic">${esc(f.code.slice(0, 2))}</div>
      <div class="tx"><div class="n2">${esc(f.code)} · ${esc(f.from)} → ${esc(f.to)}</div>
      <div class="m2">${esc(f.dep)} → ${esc(f.arr)} · ${esc(L(f, "note"))}</div></div></div>`).join("")}
    <div class="section"><span class="s">${t("yourHotels")}</span><span class="hr"></span></div>
    ${(E.hotels || []).map(h => `<div class="doc"><div class="ic">${esc(L(h, "city").slice(0, 4).toUpperCase())}</div>
      <div class="tx"><div class="n2">${esc(h.name)}</div><div class="m2">${esc(L(h, "note"))}</div></div></div>`).join("")}
    <div class="section"><span class="s">${t("showDriver")}</span><span class="hr"></span></div>
    <div class="card"><div class="ar" style="font-size:20px">${esc((E.driver || {}).ar || "")}</div>
      <div class="meta" style="text-align:center">${esc(LANG === "bn" ? (E.driver || {}).bn : (E.driver || {}).en)}</div></div>
    <div class="section"><span class="s">${t("worthRemembering")}</span><span class="hr"></span></div>
    <div class="list">${(E.notes || []).map(n => `<div class="item"><div class="chk on">·</div><div class="tx"><div class="ds" style="font-size:12px">${esc(L(n, "t"))}</div></div></div>`).join("")}</div>`;
}

/* ---------------------------------------------------------------- QIBLA */
function qiblaBearing(from) {
  const p1 = from.lat * D2R, p2 = KAABA.lat * D2R, dl = (KAABA.lng - from.lng) * D2R;
  const y = Math.sin(dl), x = Math.cos(p1) * Math.tan(p2) - Math.sin(p1) * Math.cos(dl);
  return (Math.atan2(y, x) * R2D + 360) % 360;
}
function vQibla() {
  const place = todayPlace(localDayKey());
  const b = qiblaBearing(place);
  return `<h1 class="t">${t("qiblaTitle")}</h1>
    <div class="sub">${t("qiblaSub")(esc(L(place, "name")), b.toFixed(1))}</div>
    <div class="card" style="text-align:center;padding:26px 15px">
      <div style="font-size:12px;opacity:.6">${t("kaabaIs")}</div>
      <div style="font-size:44px;font-weight:600;color:var(--gold-lt);margin:6px 0">${b.toFixed(0)}°</div>
      <div style="font-size:12px;opacity:.6">${t("eastOfNorth")(((360 - b) % 360).toFixed(0))}</div>
    </div>
    <div class="muted">${t("qiblaNote")}</div>`;
}

/* ---------------------------------------------------------------- MORE */
function vMore() {
  const sw = navigator.serviceWorker && navigator.serviceWorker.controller;
  return `<h1 class="t">${t("moreTitle")}</h1>
    <div class="list">
      <div class="item" data-go="#/checklist"><div class="chk on">☑</div><div class="tx"><div class="ti">${t("tickRowList")}</div><div class="ds">${(DATA.checklist || []).length}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/essentials"><div class="chk on">☎</div><div class="tx"><div class="ti">${t("essRowList")}</div><div class="ds">911 · 937 · ${LANG === "bn" ? "দূতাবাস" : "embassy"}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/places"><div class="chk on">▣</div><div class="tx"><div class="ti">${t("placesRow")}</div><div class="ds">${t("placesRowSub")}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/qibla"><div class="chk on">◈</div><div class="tx"><div class="ti">${t("qiblaRowList")}</div><div class="ds">${t("qiblaRowSub")}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/rites"><div class="chk on">☾</div><div class="tx"><div class="ti">${t("ritesRowList")}</div><div class="ds">${t("ritesRowListSub")}</div></div><div class="chev">›</div></div>
      <div class="item" data-go="#/plan"><div class="chk on">▤</div><div class="tx"><div class="ti">${t("planRow")}</div><div class="ds">${t("planRowSub")}</div></div><div class="chev">›</div></div>
    </div>
    <div class="section"><span class="s">${t("thisInstall")}</span><span class="hr"></span></div>
    <div class="list">
      <div class="item"><div class="chk ${sw ? "on" : ""}">✓</div>
        <div class="tx"><div class="ti">${t("offlineCopy")}</div><div class="ds" id="persist">${sw ? t("offlineActive") : t("offlineNotYet")}</div></div></div>
      <div class="item"><div class="chk on">i</div><div class="tx"><div class="ti">${t("versionLabel")} ${VERSION}</div>
        <div class="ds">${t("running")} ${VERSION}${SERVER_BUILD ? ` · ${t("server")} ${esc(String(SERVER_BUILD.version))}` : ""}${SERVER_BUILD && SERVER_BUILD.version && SERVER_BUILD.version !== VERSION ? ` · <b>${t("updateAvailable")}</b>` : ""}</div></div></div>
      <div class="item" data-progress-export="1"><div class="chk on">↓</div><div class="tx"><div class="ti">${t("saveProgress")}</div><div class="ds">${t("saveProgressSub")}</div></div></div>
      <div class="item" data-progress-import="1"><div class="chk on">↑</div><div class="tx"><div class="ti">${t("restoreProgress")}</div><div class="ds">${t("restoreProgressSub")}</div></div></div>
      <input type="file" id="progressfile" accept="application/json,.json" style="display:none">
      <div class="item" data-update="1"><div class="chk on">&#8635;</div><div class="tx"><div class="ti">${t("checkUpdates")}</div><div class="ds">${t("versionLabel")} ${VERSION}</div></div></div>
      <div class="item" data-reset="rites"><div class="chk on">↻</div><div class="tx"><div class="ti">${t("resetRites")}</div><div class="ds">${t("resetRitesSub")}</div></div></div>
      <div class="item" data-reset="ticks"><div class="chk on">↻</div><div class="tx"><div class="ti">${t("resetTicks")}</div><div class="ds">${t("resetTicksSub")}</div></div></div>
    </div>
    <div class="muted">${t("moreFoot")}</div>`;
}

/* ---------------------------------------------------------------- VAULT */
const VDB = "umrah-vault", VSTORE = "docs", VMETA = "umrah-vault-meta-v1";
const enc = new TextEncoder(), dec = new TextDecoder();
const b64 = u8 => btoa(String.fromCharCode(...u8));
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const V = { unlocked: false, key: null, hasPin: !!localStorage.getItem(VMETA) };
let pinBuf = "", pinBusy = false;

function idb() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(VDB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(VSTORE, { keyPath: "id" });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}
async function idbAll() {
  const db = await idb();
  return new Promise((res, rej) => {
    const g = db.transaction(VSTORE).objectStore(VSTORE).getAll();
    g.onsuccess = () => { db.close(); res(g.result || []); };
    g.onerror = () => rej(g.error);
  });
}
async function idbPut(rec) {
  const db = await idb();
  return new Promise((res, rej) => {
    const t2 = db.transaction(VSTORE, "readwrite");
    t2.objectStore(VSTORE).put(rec);
    t2.oncomplete = () => { db.close(); res(true); };
    t2.onerror = () => rej(t2.error);
  });
}
async function idbDel(id) {
  const db = await idb();
  return new Promise((res, rej) => {
    const t2 = db.transaction(VSTORE, "readwrite");
    t2.objectStore(VSTORE).delete(id);
    t2.oncomplete = () => { db.close(); res(true); };
    t2.onerror = () => rej(t2.error);
  });
}
async function deriveKey(pin, salt) {
  const base = await crypto.subtle.importKey("raw", enc.encode(pin), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 310000, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}
async function sealJSON(obj, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(JSON.stringify(obj))));
  return { iv: b64(iv), ct: b64(ct) };
}
async function openJSON(rec, key) {
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(rec.iv) }, key, unb64(rec.ct));
  return JSON.parse(dec.decode(pt));
}

function vaultGate() {
  return `<h1 class="t">${t("vaultTitle")}</h1>
    <div class="sub">${t("vaultSub")}</div>
    <div class="pin">
      <div class="dots">${Array.from({ length: 6 }, (_, i) => `<i class="${i < pinBuf.length ? "on" : ""}"></i>`).join("")}</div>
      <div class="pinhint" style="font-size:11px;opacity:.55;margin-top:8px">${pinBusy ? t("verifying") : (V.hasPin ? t("pinEnter") : t("pinChoose"))}</div>
    </div>
    <div class="pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => `<button data-k="${d}">${d}</button>`).join("")}
      <button class="wide" data-k="clear">${LANG === "bn" ? "মুছুন" : "CLEAR"}</button><button data-k="0">0</button><button class="wide" data-k="del">⌫</button></div>
    <div class="muted" style="text-align:center">${t("pinNote")}</div>`;
}
function vaultBody(docs) {
  return `<h1 class="t">${t("vaultHead")}</h1>
    <div class="sub">${t("docsN")(docs.length)}</div>
    <div class="list">
      ${docs.length ? docs.map(d => `
        <div class="doc"><div class="ic">${esc((d.type || "").includes("pdf") ? "PDF" : "IMG")}</div>
          <div class="tx"><div class="n2">${esc(d.name)}</div><div class="m2">${(d.size / 1024).toFixed(0)} ${t("kb")} · ${t("added")} ${new Date(d.added).toLocaleDateString(LANG === "bn" ? "bn" : "en-GB")}</div></div>
          <button class="x" data-vopen="${esc(d.id)}">${t("open")}</button>
          <button class="x" data-vdel="${esc(d.id)}">✕</button></div>`).join("")
        : `<div class="empty">${t("vaultEmpty")}<br>${t("vaultEmptySub")}</div>`}
    </div>
    <div class="acts">
      <label class="btn gold" style="display:block;cursor:pointer">${t("addDocs")}
        <input type="file" id="vfile" multiple accept="image/*,application/pdf" style="display:none"></label>
      <button class="btn ghost" data-vlock="1">${t("lock")}</button>
    </div>
    <div class="acts"><button class="btn ghost" data-vexport="1">${t("exportBackup")}</button></div>
    <div class="muted">${t("vaultFoot")}</div>`;
}
async function vVault() {
  if (!V.unlocked) return vaultGate();
  let docs = [];
  try { docs = await idbAll(); } catch (e) { docs = []; }
  return vaultBody(docs.sort((a, b) => a.added - b.added));
}
async function vaultRefresh() { const html = await vVault(); $("#view").innerHTML = `<div class="view">${html}</div>`; bind(); }

/* in-place repaint of the PIN dots — no full re-render, so no flicker */
function paintPin() {
  const dots = $(".pin .dots");
  if (dots) dots.innerHTML = Array.from({ length: 6 }, (_, i) => `<i class="${i < pinBuf.length ? "on" : ""}"></i>`).join("");
  const hint = $(".pin .pinhint");
  if (hint) hint.textContent = pinBusy ? t("verifying") : (V.hasPin ? t("pinEnter") : t("pinChoose"));
}

async function unlock(pin) {
  const meta = JSON.parse(localStorage.getItem(VMETA) || "null");
  if (!meta) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveKey(pin, salt);
    localStorage.setItem(VMETA, JSON.stringify({ salt: b64(salt), check: await sealJSON({ ok: 1 }, key) }));
    V.key = key; V.unlocked = true; V.hasPin = true; pinBuf = ""; pinBusy = false;
    toast(t("toastCreated"));
    return vaultRefresh();
  }
  const key = await deriveKey(pin, unb64(meta.salt));
  try { await openJSON(meta.check, key); }
  catch (e) { pinBuf = ""; pinBusy = false; toast(t("wrongPin")); paintPin(); return; }
  V.key = key; V.unlocked = true; pinBuf = ""; pinBusy = false;
  clearTimeout(unlock._t);
  unlock._t = setTimeout(() => { V.unlocked = false; V.key = null; if (parseHash().name === "vault") vaultRefresh(); }, 120000);
  return vaultRefresh();
}

async function addFiles(files) {
  for (const f of files) {
    const buf = new Uint8Array(await f.arrayBuffer());
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, V.key, buf));
    await idbPut({ id: "d" + Date.now() + Math.random().toString(36).slice(2, 6),
      name: f.name, type: f.type, size: f.size, added: Date.now(), iv: Array.from(iv), ct });
  }
  toast(t("toastAdded")(files.length));
  vaultRefresh();
}
async function renderPdf(bytes, host) {
  const lib = window.pdfjsLib;
  const fallback = () => {
    const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
    host.innerHTML = `<a class="btn gold" href="${url}" target="_blank" rel="noopener" style="display:block;text-decoration:none">${t("openExternally")}</a>`;
  };
  if (!lib) return fallback();
  lib.GlobalWorkerOptions.workerSrc = "./vendor/pdf.worker.min.js";
  let pdf;
  try { pdf = await lib.getDocument({ data: bytes }).promise; } catch (e) { return fallback(); }
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  const maxW = Math.min(window.innerWidth - 28, 560);
  for (let n = 1; n <= pdf.numPages; n++) {
    const page = await pdf.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale: (maxW / base.width) * dpr });
    const cv = document.createElement("canvas");
    cv.width = Math.floor(vp.width);
    cv.height = Math.floor(vp.height);
    cv.style.width = Math.floor(vp.width / dpr) + "px";
    cv.style.height = Math.floor(vp.height / dpr) + "px";
    host.appendChild(cv);
    await page.render({ canvasContext: cv.getContext("2d"), viewport: vp }).promise;
  }
}
async function openDoc(id) {
  const docs = await idbAll();
  const d = docs.find(x => x.id === id);
  if (!d) return;
  const bytes = new Uint8Array(await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(d.iv) }, V.key, new Uint8Array(d.ct)));
  const type = d.type || "";
  const isImg = type.startsWith("image");
  const isPdf = type === "application/pdf" || /\.pdf$/i.test(d.name);
  const wrap = document.createElement("div");
  wrap.className = "present";
  wrap.innerHTML = `<button class="close">${t("close")}</button>
    <div class="hdr"><div class="k">VAULT</div><div class="n">${esc(d.name)}</div></div>
    <div class="pdfpages"></div>
    <div class="pvnote">${t("screenOn")}</div>`;
  document.body.appendChild(wrap);
  let wl = null;
  try { wl = await navigator.wakeLock.request("screen"); } catch (e) {}
  const host = wrap.querySelector(".pdfpages");
  let objUrl = null;
  if (isImg) {
    objUrl = URL.createObjectURL(new Blob([bytes], { type }));
    const img = document.createElement("img");
    img.src = objUrl;
    host.appendChild(img);
  } else if (isPdf) {
    await renderPdf(bytes, host);
  } else {
    objUrl = URL.createObjectURL(new Blob([bytes], { type: type || "application/octet-stream" }));
    host.innerHTML = `<a class="btn gold" href="${objUrl}" download="${esc(d.name)}" style="display:block;text-decoration:none">${t("download")}</a>`;
  }
  const close = () => { wrap.remove(); if (wl) wl.release().catch(() => {}); if (objUrl) URL.revokeObjectURL(objUrl); };
  wrap.querySelector(".close").onclick = close;
}
async function exportVault() {
  const meta = JSON.parse(localStorage.getItem(VMETA) || "null");
  if (!meta) return toast(t("createFirst"));
  const pin = prompt(t("exportPin"));
  if (!pin) return;
  const key = await deriveKey(pin, unb64(meta.salt));
  try { await openJSON(meta.check, key); } catch (e) { return toast(t("wrongPin")); }
  const docs = await idbAll();
  const blob = new Blob([JSON.stringify({ fmt: "umrah-vault", v: 1, salt: meta.salt, check: meta.check, docs })],
    { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "umrah-vault-backup.json";
  a.click();
  toast(t("toastBackup"));
}

/* ---------------------------------------------------------------- progress file
   Ticks and counters live in localStorage, which is scoped to this exact origin — so
   reinstalling, clearing site data, or moving the app to another host silently loses
   them. A plain JSON file carries them across, and it never leaves the phone unless
   the user taps save. */
function exportProgress() {
  const payload = { app: "umrah-companion", version: VERSION, origin: location.origin,
                    exported: new Date().toISOString(), state: S };
  const blob = new Blob([JSON.stringify(payload, null, 1)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `umrah-progress-${localDayKey()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast(t("toastExported"));
}

function importProgress(file) {
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const d = JSON.parse(String(rd.result));
      const incoming = d && d.state ? d.state : d;
      if (!incoming || typeof incoming !== "object"
          || (!("done" in incoming) && !("rite" in incoming) && !("checked" in incoming))) {
        toast(t("importFailed")); return;
      }
      if (!confirm(t("confirmImport"))) return;
      S = Object.assign(blank(), incoming);
      save(); render(); toast(t("toastImported"));
    } catch (e) { toast(t("importFailed")); }
  };
  rd.onerror = () => toast(t("importFailed"));
  rd.readAsText(file);
}

/* ---------------------------------------------------------------- events */
function bind() {
  $$("[data-go]").forEach(el => el.onclick = () => { location.hash = el.dataset.go; });
  $$("[data-toggle]").forEach(el => el.onclick = ev => { ev.stopPropagation(); toggle(el.dataset.toggle); });
  $$("[data-check]").forEach(el => el.onclick = ev => {
    ev.stopPropagation();                 // the row navigates; the box only ticks
    const id = el.dataset.check;
    if (S.checked[id]) delete S.checked[id]; else S.checked[id] = Date.now();
    save(); render();
  });
  $$("[data-chip]").forEach(el => el.onclick = () => { duaFilter = el.dataset.chip; render(); });
  $$("[data-clchip]").forEach(el => el.onclick = () => { clFilter = el.dataset.clchip; render(); });
  const q = $("#q");
  if (q) q.oninput = () => {
    duaQ = q.value; const pos = q.selectionStart;
    render(); const nq = $("#q"); if (nq) { nq.focus(); nq.setSelectionRange(pos, pos); }
  };
  $$("[data-c]").forEach(el => el.onclick = () => {
    const k = el.closest("[data-counter]").dataset.counter;
    S.counts[k] = +el.dataset.c;
    if (S.counts[k] === 7) toast(k === "tawaf" ? t("toastTawaf") : t("toastSai"));
    save(); render();
  });
  $$("[data-next]").forEach(el => el.onclick = () => {
    const i = +el.dataset.next;
    S.rite = Math.max(S.rite, i + 1); save();
    const nx = (DATA.rites || [])[i + 1];
    if (nx) location.hash = "#/rite/" + nx.id; else { toast(t("toastAllSteps")); location.hash = "#/rites"; }
  });
  $$("[data-update]").forEach(el => el.onclick = async () => {
    toast(t("updating"));
    try { const reg = await navigator.serviceWorker.getRegistration(); if (reg) await reg.update(); } catch (e) {}
    setTimeout(() => location.reload(), 1700);
  });
  $$("[data-reset]").forEach(el => el.onclick = () => {
    if (el.dataset.reset === "rites") {
      if (!confirm(t("confirmResetRites"))) return;
      S.rite = 0;
      S.counts = { tawaf: 0, sai: 0 };
      save(); render(); toast(t("toastRitesCleared"));
    } else {
      if (!confirm(t("confirmReset"))) return;
      S.done = {};
      save(); render(); toast(t("toastTicksCleared"));
    }
  });
  /* vault keypad — updates only the dots, so the page does not flicker */
  $$("[data-k]").forEach(el => el.onclick = () => {
    if (pinBusy) return;
    const k = el.dataset.k;
    if (k === "del") pinBuf = pinBuf.slice(0, -1);
    else if (k === "clear") pinBuf = "";
    else if (pinBuf.length < 6) pinBuf += k;
    paintPin();
    if (pinBuf.length === 6) { pinBusy = true; paintPin(); const p = pinBuf; unlock(p); }
  });
  const vf = $("#vfile");
  if (vf) vf.onchange = e => { if (e.target.files.length) addFiles(Array.from(e.target.files)); };
  $$("[data-vopen]").forEach(el => el.onclick = () => openDoc(el.dataset.vopen));
  $$("[data-vdel]").forEach(el => el.onclick = async () => {
    if (!confirm(t("confirmDelete"))) return;
    await idbDel(el.dataset.vdel); vaultRefresh();
  });
  $$("[data-vlock]").forEach(el => el.onclick = () => { V.unlocked = false; V.key = null; pinBuf = ""; pinBusy = false; vaultRefresh(); });
  $$("[data-vexport]").forEach(el => el.onclick = exportVault);
  $$("[data-progress-export]").forEach(el => el.onclick = exportProgress);
  const pf = $("#progressfile");
  if (pf) pf.onchange = () => { if (pf.files && pf.files[0]) importProgress(pf.files[0]); pf.value = ""; };
  $$("[data-progress-import]").forEach(el => el.onclick = () => { const i = $("#progressfile"); if (i) i.click(); });
}

/* ---------------------------------------------------------------- boot */
function boot() {
  $("#langbtn").onclick = () => setLang(LANG === "en" ? "bn" : "en");
  let sawController = "serviceWorker" in navigator && !!navigator.serviceWorker.controller;
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).then(reg => {
      reg.update().catch(() => {});
      setInterval(() => reg.update().catch(() => {}), 3600000);
    }).catch(() => {});
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      /* the FIRST claim of a fresh install must not reload; a later takeover must.
         So track the flag live instead of snapshotting it at boot. */
      if (!sawController) { sawController = true; return; }
      if (!boot._reloaded) { boot._reloaded = true; location.reload(); }
    });
  }
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then(granted => {
      const el = $("#persist");
      if (el && granted) el.textContent = t("offlineActive");
    }).catch(() => {});
  }
  fetch("./version.json", { cache: "no-store" })
    .then(r => r.json())
    .then(v => { SERVER_BUILD = v; if (parseHash().name === "more") render(); })
    .catch(() => {});
  if (!location.hash) location.hash = "#/today";
  render();
  setInterval(() => { if (parseHash().name === "today") render(); }, 60000);
}
document.addEventListener("DOMContentLoaded", boot);
})();
