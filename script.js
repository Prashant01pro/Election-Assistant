class ElectionMentor {
    constructor() {
        this.state = {
            level: null, // novice, intermediate, advanced
            mode: null,  // beginner, deep-dive, voter
            currentStageIndex: 0,
            isQuizMode: false,
            progress: 0,
            history: []
        };

        this.nodes = {
            mentorZone: document.getElementById('mentor-zone'),
            actionPanel: document.getElementById('action-panel'),
            modeDisplay: document.getElementById('mode-display'),
            levelDisplay: document.getElementById('level-display'),
            progressDisplay: document.getElementById('progress-display'),
            timelineSteps: document.querySelectorAll('.timeline-step')
        };

        this.init();
    }

    init() {
        this.askLevel();
        this.updateTimeline();
    }

    // --- Core UI Logic ---

    async addMessage(text, type = 'mentor', delay = 1000) {
        if (type === 'mentor') {
            const thinking = this.showThinking();
            await new Promise(r => setTimeout(r, delay));
            thinking.remove();
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${type}-message`;
        
        // Handle structured text (bullet points, headings)
        if (text.includes('\n') || text.includes('👉') || text.includes('###')) {
            msgDiv.innerHTML = this.formatStructuredText(text);
        } else {
            msgDiv.innerText = text;
        }

        this.nodes.mentorZone.appendChild(msgDiv);
        this.nodes.mentorZone.scrollTop = this.nodes.mentorZone.scrollHeight;
        return msgDiv;
    }

    showThinking() {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message mentor-message thinking';
        thinkingDiv.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        this.nodes.mentorZone.appendChild(thinkingDiv);
        this.nodes.mentorZone.scrollTop = this.nodes.mentorZone.scrollHeight;
        return thinkingDiv;
    }

    formatStructuredText(text) {
        // Simple Markdown-like formatter
        return text
            .replace(/### (.*)/g, '<h3 class="heading-accent">$1</h3>')
            .replace(/👉 (.*)/g, '<div class="arrow-flow">→ $1</div>')
            .replace(/\* (.*)/g, '<li>$1</li>')
            .replace(/\n/g, '<br>');
    }

    clearActions() {
        this.nodes.actionPanel.innerHTML = '';
    }

    createAction(label, callback) {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = label;
        btn.onclick = () => {
            this.addMessage(label, 'user');
            this.clearActions();
            callback();
        };
        this.nodes.actionPanel.appendChild(btn);
    }

    // --- State Transitions ---

    askLevel() {
        this.addMessage(UI_STRINGS.askLevel);
        Object.entries(ELECTION_DATA.levels).forEach(([id, info]) => {
            this.createAction(info.label, () => {
                this.state.level = id;
                this.nodes.levelDisplay.querySelector('span').innerText = info.label;
                this.askMode();
            });
        });
    }

    askMode() {
        this.addMessage(UI_STRINGS.askMode);
        Object.entries(ELECTION_DATA.modes).forEach(([id, info]) => {
            this.createAction(info.label, () => {
                this.state.mode = id;
                this.nodes.modeDisplay.querySelector('span').innerText = info.label;
                this.startGuide();
            });
        });
    }

    async startGuide() {
        await this.addMessage(UI_STRINGS.ready);
        this.renderStage();
    }

    async renderStage() {
        const stage = ELECTION_DATA.stages[this.state.currentStageIndex];
        if (!stage) {
            await this.addMessage("### Congratulations! 🎓", 'mentor');
            await this.addMessage("You've completed the full election guide. You're now an empowered citizen!", 'mentor');
            this.createAction("Restart Guide", () => {
                this.state.currentStageIndex = 0;
                this.updateProgress();
                this.updateTimeline();
                this.renderStage();
            });
            return;
        }

        // Adaptive content based on level
        const levelContent = stage.content[this.state.level] || stage.content['novice'];
        
        await this.addMessage(`### Stage ${this.state.currentStageIndex + 1}: ${stage.title}`, 'mentor');
        await this.addMessage(levelContent.intro, 'mentor');
        
        // Chunking the steps
        for (const step of levelContent.steps) {
            await this.addMessage(`👉 ${step}`, 'mentor', 1500);
        }

        await this.addMessage(levelContent.ask || "Ready for more?", 'mentor', 1000);

        this.createAction("Continue", () => this.askQuizOrNext());
        this.createAction("Deep Dive", () => this.switchToDeepDive());
        this.createAction("Timeline View", () => this.showTimelineJump());
    }

    switchToDeepDive() {
        this.state.mode = 'deep-dive';
        this.nodes.modeDisplay.querySelector('span').innerText = "Deep Dive";
        this.addMessage("Switching to Deep Dive Mode. Let's look at the technical details...", 'mentor');
        this.renderStage();
    }

    askQuizOrNext() {
        const stage = ELECTION_DATA.stages[this.state.currentStageIndex];
        if (stage.quiz) {
            this.addMessage(UI_STRINGS.takeQuiz);
            this.createAction("Yes, Quiz me!", () => this.startQuiz(stage.quiz[0]));
            this.createAction("Skip to Next Stage", () => this.nextStage());
        } else {
            this.nextStage();
        }
    }

    startQuiz(quiz) {
        this.addMessage(`### Quiz: ${quiz.question}`);
        quiz.options.forEach((opt, idx) => {
            this.createAction(opt, () => {
                if (idx === quiz.answer) {
                    this.addMessage("✅ Correct! " + quiz.explanation);
                } else {
                    this.addMessage("❌ Not quite. " + quiz.explanation);
                }
                this.createAction("Proceed to Next Stage", () => this.nextStage());
            });
        });
    }

    nextStage() {
        this.state.currentStageIndex++;
        this.updateProgress();
        this.updateTimeline();
        this.renderStage();
    }

    updateProgress() {
        const total = ELECTION_DATA.stages.length;
        const current = this.state.currentStageIndex;
        this.state.progress = Math.round((current / total) * 100);
        this.nodes.progressDisplay.querySelector('span').innerText = `${this.state.progress}%`;
    }

    updateTimeline() {
        this.nodes.timelineSteps.forEach((step, idx) => {
            step.classList.remove('active', 'completed');
            if (idx === this.state.currentStageIndex) {
                step.classList.add('active');
            } else if (idx < this.state.currentStageIndex) {
                step.classList.add('completed');
            }
        });
    }

    showTimelineJump() {
        this.addMessage("Where would you like to jump to?");
        ELECTION_DATA.stages.forEach((s, idx) => {
            this.createAction(s.title, () => {
                this.state.currentStageIndex = idx;
                this.updateProgress();
                this.updateTimeline();
                this.renderStage();
            });
        });
    }
}

// Initialize
window.onload = () => {
    new ElectionMentor();
};
