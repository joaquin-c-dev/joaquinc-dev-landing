/**
 * Código que se muestra en el editor estilo IntelliJ del hero (inicio y páginas de curso).
 * Cada snippet se escribe como texto plano y `highlightCode` lo colorea con las reglas del
 * tema oscuro de IntelliJ, así agregar uno nuevo no requiere marcar token por token.
 */

export type CodeTokenKind = "plain" | "keyword" | "annotation" | "method" | "string" | "comment" | "heading";
export type CodeToken = [string, CodeTokenKind];

export interface CodeSnippet {
  project: string;
  fileName: string;
  /** Pestaña secundaria del editor (solo decorativa). */
  secondaryFile?: string;
  language: "java" | "ts" | "md";
  code: string;
  /** Descripción para lectores de pantalla. */
  ariaLabel: string;
}

const KEYWORDS: Record<CodeSnippet["language"], string[]> = {
  java: [
    "public", "private", "final", "class", "record", "static", "void", "return", "new", "throws",
    "double", "int", "import", "package", "extends", "implements",
  ],
  ts: ["const", "let", "export", "async", "await", "function", "return", "for", "of", "import", "from", "new"],
  md: [],
};

const TOKEN_PATTERN =
  /("(?:[^"\\]|\\.)*"|`[^`]*`|'(?:[^'\\]|\\.)*'|\/\/.*$|@\w+|\b[A-Za-z_]\w*(?=\()|\b[A-Za-z_]\w*\b)/g;

function highlightLine(line: string, language: CodeSnippet["language"]): CodeToken[] {
  if (language === "md") {
    if (/^#/.test(line)) return [[line, "heading"]];
    // Markdown: solo se resalta el código entre comillas invertidas.
    return line.split(/(`[^`]*`)/).filter(Boolean).map((part) => [part, part.startsWith("`") ? "string" : "plain"]);
  }
  const keywords = KEYWORDS[language];
  const tokens: CodeToken[] = [];
  let lastIndex = 0;
  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const [text] = match;
    const index = match.index ?? 0;
    if (index > lastIndex) tokens.push([line.slice(lastIndex, index), "plain"]);
    let kind: CodeTokenKind = "plain";
    if (/^["'`]/.test(text)) kind = "string";
    else if (text.startsWith("//")) kind = "comment";
    else if (text.startsWith("@")) kind = "annotation";
    else if (keywords.includes(text)) kind = "keyword";
    else if (line.charAt(index + text.length) === "(" && /^[a-z]/.test(text)) kind = "method";
    tokens.push([text, kind]);
    lastIndex = index + text.length;
  }
  if (lastIndex < line.length) tokens.push([line.slice(lastIndex), "plain"]);
  return tokens.length ? tokens : [["", "plain"]];
}

export function highlightCode(snippet: CodeSnippet): CodeToken[][] {
  return snippet.code.replace(/^\n|\n$/g, "").split("\n").map((line) => highlightLine(line, snippet.language));
}

/** Snippet del inicio y de cualquier curso que no tenga uno propio. */
export const DEFAULT_SNIPPET: CodeSnippet = {
  project: "academy-api",
  fileName: "CourseController.java",
  secondaryFile: "SecurityConfig.java",
  language: "java",
  ariaLabel:
    "Código de ejemplo: un controlador REST de Spring Boot que lista y crea cursos, protegido con Spring Security",
  code: `
@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;

    @GetMapping
    public List<Course> list() {
        return courseService.listActive();
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Course create(@Valid @RequestBody Course course) {
        return courseService.create(course);
    }
}`,
};

/** Un snippet por curso, del tema que se ve en clase. */
const SNIPPETS_BY_SLUG: Record<string, CodeSnippet> = {
  "java-desde-cero": {
    project: "java-basics",
    fileName: "Main.java",
    secondaryFile: "Student.java",
    language: "java",
    ariaLabel: "Código de ejemplo en Java: un record de alumnos y el promedio de calificaciones con streams",
    code: `
public record Student(String name, int grade) {}

public class Main {

    public static void main(String[] args) {
        List<Student> students = List.of(
            new Student("Ana", 95),
            new Student("Luis", 82),
            new Student("Sofia", 90)
        );

        double average = students.stream()
            .mapToInt(Student::grade)
            .average()
            .orElse(0);

        System.out.println("Average: " + average);
    }
}`,
  },
  "java-intermedio": {
    project: "academy-api",
    fileName: "SecurityConfig.java",
    secondaryFile: "JwtAuthFilter.java",
    language: "java",
    ariaLabel:
      "Código de ejemplo: configuración de Spring Security con JWT, sesiones sin estado y rutas públicas de login",
    code: `
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}`,
  },
  "desarrollo-asistido-agentes-ai": {
    project: "course-api",
    fileName: "CLAUDE.md",
    secondaryFile: "settings.json",
    language: "md",
    ariaLabel: "Ejemplo de archivo CLAUDE.md con comandos, reglas y flujo de agentes para Claude Code",
    code: `
# Project: course-api

## Commands
- Build: \`./mvnw verify\`
- Run: \`./mvnw spring-boot:run\`
- E2E: \`npx playwright test\`

## Rules
- Write a test before changing a service
- Never commit to main: open a pull request
- Keep each change small and reviewable

## Agents
- One git worktree per agent: \`git worktree add\`
- Run the E2E suite before closing a task`,
  },
  "arquitectura-agentica-ai": {
    project: "support-agent",
    fileName: "orchestrator.ts",
    secondaryFile: "tools.ts",
    language: "ts",
    ariaLabel:
      "Código de ejemplo en TypeScript: un orquestador que planea con herramientas y reparte pasos a workers para resolver un ticket",
    code: `
const tools = [
  searchTickets,
  readLogs,
  replyToCustomer,
];

export async function resolveTicket(ticket: Ticket) {
  const plan = await orchestrator.plan({
    goal: \`Resolve ticket #\${ticket.id}\`,
    tools,
  });

  for (const step of plan.steps) {
    const worker = workers.get(step.tool);
    await worker.run(step, { context: ticket });
  }

  // The orchestrator checks the result before replying
  return orchestrator.review(plan);
}`,
  },
};

export function getCourseSnippet(slug: string): CodeSnippet {
  return SNIPPETS_BY_SLUG[slug] ?? DEFAULT_SNIPPET;
}
