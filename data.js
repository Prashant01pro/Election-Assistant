const ELECTION_DATA = {
    stages: [
        {
            id: "announcement",
            title: "Election Announcement",
            content: {
                novice: {
                    intro: "Think of this like the official start of a massive nationwide festival! 🏟️ It's when the dates are fixed and the 'Fair Play' rules begin.",
                    steps: [
                        "The Election Commission sets the calendar.",
                        "Rules (Model Code of Conduct) start immediately.",
                        "Parties begin preparing their teams."
                    ],
                    ask: "Want to see why the 'Model Code of Conduct' is so important for fairness?"
                },
                intermediate: {
                    intro: "The Election Commission of India (ECI) issues the notification. This triggers the 'Model Code of Conduct' (MCC).",
                    steps: [
                        "ECI announces phases based on security and logistics.",
                        "MCC prevents the government from announcing new projects to influence voters.",
                        "The administrative machinery comes under ECI control."
                    ],
                    ask: "Shall we dive into how the ECI stays neutral?"
                },
                advanced: {
                    intro: "Article 324 of the Constitution empowers the ECI to conduct free and fair elections. The announcement is a legal milestone.",
                    steps: [
                        "Notification under Section 14/15 of the RP Act, 1951.",
                        "Enforcement of MCC to ensure a level playing field.",
                        "Deployment of Central Armed Police Forces (CAPF) begins."
                    ],
                    ask: "Interested in the specific legal powers of the MCC?"
                }
            },
            quiz: [
                {
                    question: "What starts immediately after the election is announced?",
                    options: ["Counting", "Model Code of Conduct", "Voting"],
                    answer: 1,
                    explanation: "The Model Code of Conduct ensures no party gets an unfair advantage once the race starts!"
                }
            ]
        },
        {
            id: "registration",
            title: "Voter Registration",
            content: {
                novice: {
                    intro: "Before you can join the democracy party, you need to be on the guest list! 📝 This is the 'Electoral Roll'.",
                    steps: [
                        "You must be 18+ to join.",
                        "You register online or via a local official (BLO).",
                        "Your name appears on the final voter list."
                    ],
                    ask: "Do you know what ID you need to vote?"
                },
                intermediate: {
                    intro: "The Electoral Roll is a dynamic list. Registration involves Form 6 for new voters.",
                    steps: [
                        "EPIC (Voter ID) card is issued.",
                        "Verification is done by Booth Level Officers.",
                        "The final list is frozen shortly before voting."
                    ],
                    ask: "Want to know how to check your name on the list?"
                }
            },
            quiz: [
                {
                    question: "What is the minimum age to register as a voter in India?",
                    options: ["16", "18", "21"],
                    answer: 1,
                    explanation: "You become eligible to vote as soon as you turn 18!"
                }
            ]
        },
        {
            id: "nomination",
            title: "Candidate Nomination",
            content: {
                novice: {
                    intro: "Now, the players (candidates) step forward to join the race! 🏃‍♂️",
                    steps: [
                        "Candidates file papers with a deposit.",
                        "They must disclose their background (education, assets).",
                        "The Election Commission checks if they are eligible."
                    ],
                    ask: "Did you know candidates have to reveal their criminal records if any?"
                }
            }
        },
        {
            id: "campaign",
            title: "Campaigning",
            content: {
                novice: {
                    intro: "This is when parties try to win your heart and mind! 📢",
                    steps: [
                        "Parties release 'Manifestos' (their promises).",
                        "Public rallies, ads, and debates happen.",
                        "Strict rules apply on how much money they can spend."
                    ],
                    ask: "Ready to learn about the 'Silence Period'?"
                }
            }
        },
        {
            id: "silence",
            title: "Silence Period",
            content: {
                novice: {
                    intro: "Shhh! 🤫 48 hours before voting, all the noise must stop.",
                    steps: [
                        "No rallies or campaign ads are allowed.",
                        "This gives voters a peaceful time to think.",
                        "It's a cooling-off period before the big day."
                    ],
                    ask: "Shall we see what happens at the polling booth next?"
                }
            }
        },
        {
            id: "voting",
            title: "Voting Process (EVM & VVPAT)",
            content: {
                novice: {
                    intro: "The Big Day! 🗳️ Here is how you cast your secret vote.",
                    steps: [
                        "Identify yourself at the booth.",
                        "Press the button next to your candidate on the EVM.",
                        "Check the VVPAT slip (it shows your vote for 7 seconds)."
                    ],
                    ask: "Want a deep dive into how EVMs store votes securely?"
                },
                voter: {
                    intro: "Welcome, First-Time Voter! 🌟 Here is your step-by-step booth guide.",
                    steps: [
                        "Step 1: Get your finger inked (the mark of a voter).",
                        "Step 2: Sign the register.",
                        "Step 3: Enter the private voting cabin.",
                        "Step 4: Press the button and hear the 'Beep'!"
                    ],
                    ask: "Want to know why that ink is so hard to wash off?"
                }
            },
            quiz: [
                {
                    question: "How long is the VVPAT slip visible for you to verify?",
                    options: ["2 seconds", "7 seconds", "30 seconds"],
                    answer: 1,
                    explanation: "The VVPAT slip stays visible for 7 seconds so you can verify your vote before it falls into a sealed box."
                }
            ]
        },
        {
            id: "security",
            title: "Vote Storage & Security",
            content: {
                novice: {
                    intro: "Once voting ends, the machines are locked up tighter than a bank vault! 🔒",
                    steps: [
                        "EVMs are sealed with unique numbers.",
                        "They are stored in 'Strong Rooms' with 24/7 guards.",
                        "CCTV cameras monitor the rooms constantly."
                    ],
                    ask: "Want to know who keeps the keys to these rooms?"
                },
                deep_dive: {
                    intro: "Security is multi-layered. Machines are randomized before deployment.",
                    steps: [
                        "Double-locking system involves officials and party observers.",
                        "Strong rooms are protected by 3 layers of security.",
                        "Machine IDs are tracked from factory to counting hall."
                    ],
                    ask: "Shall we move to the Counting Day?"
                }
            }
        },
        {
            id: "counting",
            title: "Counting of Votes",
            content: {
                novice: {
                    intro: "The moment of truth! 📊 Every machine is opened and votes are tallied.",
                    steps: [
                        "Counting happens in front of all party agents.",
                        "EVM totals are recorded round by round.",
                        "Random VVPAT slips are also counted to cross-check!"
                    ],
                    ask: "Do you know why counting takes several hours?"
                }
            }
        },
        {
            id: "result",
            title: "Result Declaration",
            content: {
                novice: {
                    intro: "The winners are announced and democracy has spoken! 🏆",
                    steps: [
                        "The Returning Officer declares the winner.",
                        "A certificate is handed to the elected member.",
                        "The government formation process begins."
                    ],
                    ask: "Want to start over or take a final mega-quiz?"
                }
            }
        }
    ],
    modes: {
        "beginner": { label: "Beginner", description: "Simple language & analogies" },
        "deep-dive": { label: "Deep Dive", description: "Technical & Behind-the-scenes" },
        "voter": { label: "First-Time Voter", description: "Practical polling booth guide" }
    },
    levels: {
        "novice": { label: "Beginner", description: "New to elections" },
        "intermediate": { label: "Intermediate", description: "Knows the basics" },
        "advanced": { label: "Advanced", description: "Wants legal/technical depth" }
    }
};

const UI_STRINGS = {
    welcome: "Welcome to Election Guide Assistant Pro!",
    askLevel: "First, let me know your current knowledge level:",
    askMode: "Great! Now, what kind of guidance are you looking for?",
    ready: "Excellent choice. Let's begin our journey through the election lifecycle.",
    nextStage: "Ready for the next stage?",
    takeQuiz: "Shall we take a quick quiz to test your knowledge?"
};
