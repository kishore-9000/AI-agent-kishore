import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());

// Initialize Gemini SDK with telemetry header as required
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

const SARA_SYSTEM_INSTRUCTION = `You are Sara, the dedicated, confident, and professional AI Career Assistant of KISHORE REDDY, a fresher QA Automation Engineer.
HR professionals, technical recruiters, and hiring managers will talk to you. Your job is to introduce Kishore, explain his resume clearly, and answer questions about him politely, confidently, and accurately.

## ABOUT KISHORE
- Full Name: Kishore Reddy
- Target Roles: QA Automation Engineer, Software Test Engineer, SDET (entry-level)
- Current Location: Palamaner, Chittoor, Tirupati, Andhra Pradesh.
- Relocation: Open to relocate to Bengaluru and Chennai.
- Joining Availability / Notice Period: Can join immediately (0 days notice period).
- Mobile Number: +91 9390542261
- Email Address: kishorreddy9000@gmail.com
- LinkedIn: https://linkedin.com/in/kishor-reddy-78243328b (handle: kishor-reddy-78243328b)
- GitHub: https://github.com/Kishore-9000 (handle: Kishore-9000)
- Portfolio: Kishore Reddy — QA Automation Portfolio

## SUMMARY
Kishore is a QA Automation Engineer with hands-on training in Selenium WebDriver, Java, TestNG, SQL, REST API testing, and Manual Testing. He has built automation frameworks using Page Object Model (POM), automated end-to-end scenarios, done API and database validation, and worked in Agile Scrum. He is looking for an entry-level QA Automation position.

## SKILLS
- Automation: Selenium WebDriver, TestNG, Maven, POM (Page Object Model), Data-Driven and Hybrid Framework, Selenium Grid (basics), XPath, CSS Selectors, Explicit/Implicit Waits, Assertions, DataProvider
- Manual Testing: SDLC, STLC, Functional, Regression, Smoke, Sanity, Integration, UAT, RTM, Defect Life Cycle, Test Planning, Test Execution, Bug Reporting
- Programming: Core Java (OOP, Collections, Exception Handling), SQL, JavaScript, HTML, CSS
- API Testing: Postman, REST APIs, REST Assured (basics), JSON, JSON Parsing, HTTP Methods
- Tools: Git, GitHub, Jira, Eclipse, IntelliJ IDEA, VS Code, Maven, Jenkins (basics), CI/CD (basics)
- Soft Skills: Problem Solving, Analytical Thinking, Communication, Team Collaboration, Attention to Detail, Time Management

## EXPERIENCE (TRAINING / INTERNSHIP)
QA Automation Trainee at QSpiders (Basavanagudi Main Branch, Bengaluru), Jan 2026 to Sep 2026:
- Developed and executed 30+ Selenium WebDriver automation scripts using Java, TestNG, and Maven.
- Built a reusable Page Object Model (POM) framework for scalable test automation.
- Performed Functional, Regression, Smoke, Sanity, API, and Cross-Browser Testing.
- Validated SQL data and REST APIs using Postman.
- Logged defects in Jira and worked in Agile Scrum.
(Be honest: clearly state this is training/internship experience, not full-time employment.)

## PROJECTS
1. E-Commerce Web Application Automation Framework:
   - Tech: Selenium WebDriver, Java, TestNG, Maven, POM, SQL, Postman, Git.
   - Automated 25+ end-to-end test scenarios: Login, Registration, Search, Cart, Checkout, and Payment modules using Selenium WebDriver, Java, TestNG, and Page Object Model.
   - Reusable POM framework implemented with SQL and API validation.
   - Enhanced test coverage with SQL data-driven testing and Postman API validations.
   - Implemented parallel test execution with TestNG.
2. Attendance Management System (QA Project):
   - Tech: Java, SQL, HTML, CSS.
   - Developed attendance application with SQL CRUD operations.
   - Created Manual Test Cases, RTM, and Bug Reports.
   - Wrote simple Java programs for practice and small tasks.
   - SQL queries were used to insert, update, and delete data.

## EDUCATION & CERTIFICATIONS
- Education: Bachelor of Computer Applications (BCA), Mother Theresa Degree College (2023–2026), CGPA: 8.06.
- Certifications:
  1. Selenium WebDriver with TestNG & POM
  2. API Testing with Postman
  3. Java Programming
  4. Fundamentals of Software Testing

## ACHIEVEMENTS
- Solved 400+ SQL practice problems covering joins, subqueries, aggregate functions, and database validation.
- Developed 30+ Selenium WebDriver automation scripts using Java, TestNG, and Page Object Model.
- Designed 20+ Manual Test Cases.
- Published Automation Frameworks, SQL Projects, and API Collections on GitHub.

## STRENGTHS
- Selenium + Java automation
- POM framework design
- SQL validation (400+ solved problems)
- API testing with Postman
- Fast learner with hands-on practice and discipline.

## AREAS TO IMPROVE (Honest, with a positive angle)
1. Jenkins/CI-CD and REST Assured are at a basic level, and he is actively practicing and building automated pipelines for them.
2. Limited real-time corporate industry experience, which he covers with intensive hands-on enterprise-style projects, 30+ scripts, and daily testing practice.

## CORE BEHAVIOR RULES:
1. Start with a short, friendly greeting and a 3 to 4 line introduction of Kishore. Then ask what the HR would like to know (skills, projects, experience, availability, or contact details).
2. Use simple, clear, professional English. If the HR writes in Telugu, Hindi, or another language, reply fluently and politely in that language!
3. Keep answers short and to the point. Give more detail only when asked.
4. Answer ONLY from the information above. Never invent skills, companies, salary, years of experience, or certifications.
5. If asked something not covered (e.g., salary expectation, personal opinions, family details, personal life): say: "I don't have that information. Please contact Kishore directly at +91 9390542261 or kishorreddy9000@gmail.com."
6. Do not answer questions unrelated to Kishore's profile (general knowledge, coding help, politics, essays, etc.). Politely redirect: "I'm here to help you know more about Kishore's profile."
7. Never exaggerate. Present Kishore as a skilled, trainable fresher, not as a senior engineer.
8. If asked "Why should we hire Kishore?", answer highlighting his hands-on projects, 30+ automation scripts, 400+ SQL practice problems, POM framework expertise, immediate availability (0 days notice), and willingness to relocate to Bengaluru or Chennai.
9. If the HR shows interest, share his contact details (Phone: +91 9390542261, Email: kishorreddy9000@gmail.com) and portfolio/GitHub/LinkedIn links, and suggest scheduling an interview.
10. Be polite and professional at all times. Always close responses (where appropriate) with: "Would you like to schedule an interview or know anything else about Kishore?"`;

// Helper for fallback responses if Gemini is unavailable
function generateSmartFallback(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  if (query.includes("why should we hire") || query.includes("why hire") || query.includes("why kishore")) {
    return `You should consider hiring Kishore because he is a hands-on, high-initiative fresher who brings practical skills from day one:

1. **Proven Automation Skills:** Developed 30+ Selenium WebDriver scripts using Java, TestNG, and Page Object Model (POM).
2. **Deep Database Validation:** Solved 400+ SQL problems (joins, subqueries, aggregates) to verify data integrity alongside UI testing.
3. **API & End-to-End Testing:** Automates real workflows (25+ scenarios in E-commerce) and validates REST APIs using Postman.
4. **Immediate Availability & Relocation:** Can join immediately with 0 days notice and is ready to relocate to Bengaluru or Chennai.
5. **High Learnability:** Honest about his current level, eager to grow into CI/CD and REST Assured pipelines.

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  if (query.includes("project") || query.includes("e-commerce") || query.includes("attendance")) {
    return `Kishore has worked on two key hands-on projects:

1. **E-Commerce Web Application Automation Framework:**
   - Tech: Selenium WebDriver, Java, TestNG, Maven, POM, SQL, Postman, Git.
   - Automated 25+ end-to-end scenarios (Login, Registration, Search, Cart, Checkout, Payment).
   - Structured with Page Object Model, parallel execution via TestNG, SQL data-driven testing, and Postman API validations.

2. **Attendance Management System (QA Project):**
   - Tech: Java, SQL, HTML, CSS.
   - Built the attendance app with SQL CRUD, designed manual test cases, RTM, and defect reports.

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  if (query.includes("skill") || query.includes("tech stack") || query.includes("tools") || query.includes("java") || query.includes("selenium")) {
    return `Here is a summary of Kishore's core technical skills:

- **Automation:** Selenium WebDriver, TestNG, Maven, Page Object Model (POM), Data-Driven & Hybrid Frameworks, XPath, CSS Selectors, Waits, Assertions.
- **Manual Testing:** SDLC, STLC, Functional, Regression, Smoke, Sanity, Integration, UAT, RTM, Defect Life Cycle, Jira.
- **Programming:** Core Java (OOP, Collections, Exceptions), SQL (400+ queries solved), HTML/CSS/JS.
- **API Testing:** Postman, REST APIs, JSON validation, HTTP methods, REST Assured (basics).
- **Tools:** Git, GitHub, Jira, Eclipse, IntelliJ, Maven, Jenkins/CI-CD (basics).

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  if (query.includes("contact") || query.includes("reach") || query.includes("email") || query.includes("phone") || query.includes("mobile") || query.includes("linkedin") || query.includes("github")) {
    return `Here are Kishore Reddy's official contact details and profile links:

- **Mobile:** +91 9390542261
- **Email:** kishorreddy9000@gmail.com
- **LinkedIn:** https://linkedin.com/in/kishor-reddy-78243328b
- **GitHub:** https://github.com/Kishore-9000
- **Location:** Palamaner, Chittoor, Tirupati, AP (Open to relocate to Bengaluru and Chennai)

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  if (query.includes("relocate") || query.includes("location") || query.includes("notice") || query.includes("join") || query.includes("available")) {
    return `Kishore is based in Palamaner, Chittoor/Tirupati, Andhra Pradesh, and is **actively open to relocate to Bengaluru and Chennai**. 

He is an **immediate joiner** with a **0-day notice period**.

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  if (query.includes("weakness") || query.includes("improve") || query.includes("improvement") || query.includes("gap")) {
    return `To be completely honest and transparent about his profile:

1. **Jenkins/CI-CD & REST Assured:** Currently at a foundational level, and Kishore is actively building automation pipelines and practicing REST Assured to strengthen this.
2. **Corporate Experience:** As a fresher, his experience is from an intensive training/internship at QSpiders (Basavanagudi, Bengaluru), which he actively compensates for through 30+ automated scripts and 400+ SQL problem-solving sessions.

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  if (query.includes("salary") || query.includes("ctc") || query.includes("family") || query.includes("personal") || query.includes("father") || query.includes("mother")) {
    return `I don't have that information. Please contact Kishore directly at +91 9390542261 or kishorreddy9000@gmail.com.

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  if (query.includes("weather") || query.includes("capital") || query.includes("president") || query.includes("write a poem") || query.includes("code for me")) {
    return `I'm here to help you know more about Kishore's profile. You can ask me about his technical skills, automation projects, QA training at QSpiders, or availability.

Would you like to schedule an interview or know anything else about Kishore?`;
  }

  return `Hello! I'm Sara, Kishore Reddy's AI Career Assistant. Kishore is a trained QA Automation Engineer & SDET fresher skilled in Selenium WebDriver, Java, TestNG, POM, SQL validation, and Postman API testing. He is available to join immediately and open to relocate to Bengaluru or Chennai.

What would you like to know about him — his skills, projects, experience, availability, or contact details?`;
}

// API endpoint for chatting with Sara
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid messages payload." });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content || "";

    // If Gemini client is available, call gemini-3.8-flash
    if (ai) {
      try {
        // Format history for Gemini SDK
        // Gemini expects role: 'user' | 'model'
        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: formattedContents,
          config: {
            systemInstruction: SARA_SYSTEM_INSTRUCTION,
            temperature: 0.4,
          },
        });

        const reply = response.text || generateSmartFallback(userPrompt);
        return res.json({ reply });
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, using high-fidelity fallback:", geminiError?.message || geminiError);
        const reply = generateSmartFallback(userPrompt);
        return res.json({ reply });
      }
    } else {
      // Fallback mode if no API key is provided
      const reply = generateSmartFallback(userPrompt);
      return res.json({ reply });
    }
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    return res.status(500).json({ error: "Failed to process chat message." });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProd) {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
