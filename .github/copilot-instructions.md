
You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection


---

# Decision Desk — Product & Design Rules

## Product Identity

This app is called Decision Desk.

Decision Desk is not:
- a stock picker
- a trading bot
- a broker dashboard
- a generic portfolio tracker
- an AI recommendation app
- a generic admin dashboard template

Decision Desk is a disciplined investing workspace.

Its purpose is to help the user make better investment decisions by enforcing a structured process before buying, selling, trimming, holding, or watching an investment.

The product must focus on:
- decision quality
- thesis clarity
- valuation discipline
- risk awareness
- position sizing
- bear case
- what changed
- review history
- lessons learned

The app must never give financial advice or direct recommendations.

Never use wording like:
- Strong Buy
- Buy now
- Sell now
- This will go up
- AI recommends
- Guaranteed profit

Use neutral process language:
- Needs review
- Missing evidence
- Fair value is missing
- Risk limit breached
- Complete valuation first
- Save as Watch if valuation is unknown
- This scenario increases concentration risk
- This decision is incomplete

---

## Approved Visual Direction

The approved Decision Desk UI is a full-screen fintech workspace.

Never implement the app as:
- a narrow centered dashboard
- a single floating card
- a landing-page style panel
- a Dribbble concept screen
- a generic admin template
- a crypto/neon dashboard
- a TradingView/Binance style interface

The app shell must use:
- full viewport layout
- fixed/sticky left sidebar
- wide main content
- multi-section dashboard
- calm fintech design
- dense but breathable spacing

Preferred layout:
- sidebar width around 272px
- main padding around 24px
- content max-width around 1540px to 1580px
- sidebar full height: 100vh
- main content should not be squeezed into a small centered panel
- dashboard should feel like a real product page

The UI should feel inspired by:
- Linear
- Stripe
- Vercel
- Mercury
- Raycast

The UI should not feel like:
- Binance
- CoinMarketCap
- TradingView
- ThemeForest admin template
- generic AI-generated dashboard

Visual rules:
- dark premium fintech UI
- minimal
- serious
- thin borders
- subtle surfaces
- low shadows
- compact but readable cards
- good typography hierarchy
- monospaced numbers where useful
- no excessive gradients
- no glassmorphism
- no random glowing effects
- no meaningless decorative charts

---

## Tailwind Theme Rules

Use Tailwind CSS v4 with semantic theme tokens.

Use semantic theme tokens from `src/styles.css`.

Preferred classes:
- bg-app-bg
- bg-app-surface
- bg-app-surface-2
- bg-app-surface-3
- border-app-border
- border-app-border-soft
- text-app-text
- text-app-muted
- text-app-muted-2
- text-accent
- bg-accent-soft
- text-success
- bg-success-soft
- text-warning
- bg-warning-soft
- text-danger
- bg-danger-soft
- text-info
- bg-info-soft
- text-purple
- bg-purple-soft

Never hardcode random colors in components.

Do not invent new colors unless they are first added as semantic CSS variables in `src/styles.css`.

---

## Decision Desk Architecture Rules

Use the Angular best practices above.

Additionally:

- Page components compose layout and connect state.
- Feature components handle domain-specific UI.
- Shared UI components are dumb visual primitives.
- Components must not fetch data directly.
- Components must not know about unrelated feature state.

Use local signals by default.

Use NgRx SignalStore only for feature-level state shared across multiple pages/components.

Allowed stores:
- PortfolioStore
- DecisionStore
- SandboxStore
- JournalStore

Do not create a global app store unless explicitly requested.

---

## Financial Logic Rules

All financial calculations must live in utils files.

Examples:
- decision-score.ts
- sandbox-calculations.ts
- portfolio-calculations.ts
- risk-calculations.ts

Calculations must be:
- pure
- deterministic
- strongly typed
- unit-testable

Never calculate average cost, allocation, risk score, decision score, or scenario impact inside Angular templates.

---

## Forms Rule for This Project

Prefer Signal Forms for new forms when practical.

If Signal Forms become awkward for a specific screen or Copilot struggles with the API, Reactive Forms are acceptable for that feature.

Do not use template-driven forms.

Forms expected in this app:
- New Decision form
- Sandbox scenario form
- Portfolio transaction form
- Review form

---

## MVP Scope

Build first:
- App Shell
- Dashboard
- New Decision
- Sandbox
- Portfolio
- Position Detail
- Journal

Use mock data or local storage only.

Out of scope for MVP:
- broker sync
- backend
- authentication
- live news
- AI analysis
- automatic valuation
- earnings calendar
- tax reports
- chart libraries