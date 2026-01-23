export const agents = [
  {
    id: 1,
    name: "Writing Assistant",
    desc: "Write, rewrite, and fix texts quickly.",
    image: require("./../assets/agent_1.png"),
    initialText: "Write an email requesting leave from my manager for two days.",
    prompt:
      "Hey! 👋 I’m your Writing Assistant. You can ask me to write, rewrite, improve, or fix any kind of text like emails, messages, or documents. I’ll keep everything clear, professional, and easy to understand.",
    type: "chat",
    featured: true,
  },
  {
    id: 2,
    name: "Image Generator",
    desc: "Create images from text prompts.",
    image: require("./../assets/agent_2.png"),
    initialText: "A futuristic city skyline at sunset in cyberpunk style.",
    prompt:
      "Hey! 🎨 I’m your Image Generator. Describe anything you imagine, and I’ll turn your words into a creative and detailed image concept.",
    type: "image",
    featured: true,
  },
  {
    id: 3,
    name: "Translations",
    desc: "Translate text accurately between languages.",
    image: require("./../assets/agent_3.png"),
    initialText: 'Translate "Good morning, how are you?" into French.',
    prompt:
      "Hello! 🌍 I’m your Translation Assistant. You can ask me to translate text between languages while keeping the meaning and tone accurate.",
    type: "translation",
    featured: true,
  },
  {
    id: 4,
    name: "Fitness Coach",
    desc: "Get workouts and diet tips.",
    image: require("./../assets/agent_4.png"),
    initialText: "Create a 4-day workout plan for weight loss.",
    prompt:
      "Hey there! 💪 I’m your Fitness Coach. Ask me about workouts, weight loss, muscle gain, or diet plans, and I’ll guide you step by step.",
    type: "chat",
    featured: true,
  },
  {
    id: 5,
    name: "Math Solver",
    desc: "Solve and explain math problems.",
    image: require("./../assets/mathSolver.png"),
    initialText: "Solve: 2x + 5 = 15.",
    prompt:
      "Hi! ➗ I’m your Math Solver. Send me any math problem, and I’ll solve it clearly with step-by-step explanations.",
    type: "image+text",
    featured: false,
  },
  {
    id: 6,
    name: "Caption Generator",
    desc: "Create captions for social media.",
    image: require("./../assets/caption_generator.png"),
    initialText: "A picture of a puppy playing in the park.",
    prompt:
      "Hey! 📸 I’m your Caption Generator. Share a photo idea or description, and I’ll create catchy captions with hashtags for social media.",
    type: "image+text",
    featured: false,
  },
  {
    id: 7,
    name: "Grammar Fixer",
    desc: "Fix grammar and spelling errors.",
    image: require("./../assets/grammer_fixer.png"),
    initialText: "I going to office yesterday.",
    prompt:
      "Hello! ✍️ I’m your Grammar Fixer. Send me any sentence or paragraph, and I’ll correct grammar and spelling without changing the meaning.",
    type: "chat",
    featured: false,
  },
  {
    id: 8,
    name: "Resume & Interview Assistant",
    desc: "Improve resumes and prepare for interviews.",
    image: require("./../assets/agent_resume.png"),
    initialText: "Review my resume and suggest improvements for a frontend developer role.",
    prompt:
      "Hi! 💼 I’m your Resume & Interview Assistant. I can help improve your resume, suggest strong bullet points, and prepare you for interviews.",
    type: "chat",
    featured: false,
  },
  {
    id: 9,
    name: "Code Assistant",
    desc: "Write and debug code.",
    image: require("./../assets/code_assistant.png"),
    initialText: "Write a Python function to check if a number is prime.",
    prompt:
      "Hey! 👨‍💻 I’m your Code Assistant. You can ask me to write, debug, or explain code in a simple and beginner-friendly way.",
    type: "chat",
    featured: false,
  },
  {
    id: 10,
    name: "Research Assistant",
    desc: "Summarize and organize information.",
    image: require("./../assets/research_assistant.png"),
    initialText: "Summarize key points from an article about climate change.",
    prompt:
      "Hello! 📚 I’m your Research Assistant. Share any topic or article, and I’ll summarize and explain the key points clearly.",
    type: "chat",
    featured: false,
  },
  {
    id: 11,
    name: "Storyteller",
    desc: "Create stories or poems.",
    image: require("./../assets/storyteller.png"),
    initialText: "Tell a short bedtime story about a dragon and a princess.",
    prompt:
      "Hey! 🧚 I’m your Storyteller. Ask me to create stories or poems filled with imagination and creativity.",
    type: "chat",
    featured: false,
  },
  {
    id: 12,
    name: "Email Generator",
    desc: "Draft professional emails.",
    image: require("./../assets/email_generator.png"),
    initialText: "Write a professional email to a client about project updates.",
    prompt:
      "Hi! 📧 I’m your Email Generator. Tell me the purpose of the email, and I’ll write a professional and well-structured message for you.",
    type: "chat",
    featured: false,
  },
];
