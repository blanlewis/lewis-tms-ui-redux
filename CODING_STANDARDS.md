# Lewis TMS UI - Architecture & Coding Standards

This document details the architectural conventions, file structure, component design patterns, state management, and GraphQL integration guidelines followed in the **Lewis TMS UI** codebase.

---

## 📁 1. Project & File Structure

The project follows Next.js App Router conventions with a modular component architecture.

```text
lewis-tms-ui/
├── app/
│   ├── api/
│   │   └── graphql/            # Next.js API GraphQL endpoint route
│   ├── login/
│   │   └── page.tsx            # Login Page
│   ├── utils/
│   │   ├── context.tsx         # React Context & Provider
│   │   ├── graphqlQueries.ts   # GraphQL query & mutation string builders
│   │   ├── hook.ts             # Custom hook consuming context & async logic
│   │   ├── reducer.ts          # State reducer
│   │   ├── service.ts          # Async API fetch services
│   │   └── types.ts            # Centralized TypeScript types & enums
│   ├── globals.css             # Global CSS styles
│   ├── layout.tsx              # Root Layout wrapping CustomHookProvider & AppWrapper
│   └── page.tsx                # Main Home Page
├── components/
│   ├── AppWrapper/             # App-level wrapper component
│   ├── CommonMiniDrawerLayout/ # MUI Mini Drawer Layout component
│   ├── CustomButton/           # Reusable Custom Button component
│   ├── CustomModal/            # Reusable Custom Modal component
│   ├── CustomSnackbar/         # Global Custom Notification Toast component
│   ├── CustomTextField/        # Reusable Custom Text Field component
│   ├── LayoutSwitchToggle/     # Layout switcher toggle control component
│   ├── MyReactConceptLayout/   # Dynamic layout manager (2-Panel, 3-Panel, Classic)
│   └── ReflexDragger/          # Reusable split-pane resizable layout component
```

---

## 🧩 2. Component Design & Export Conventions

### 2.1 Component Directory Structure
Every component is placed inside its own directory under `components/` with a barrel export:
```text
components/CustomButton/
├── CustomButton.tsx
└── index.ts
```

### 2.2 Barrel Export (`index.ts`)
Components are exported using default barrel exports for clean imports:
```typescript
export { default } from "./CustomButton";
```

### 2.3 `"use client"` Directive
Client-side interactive components or components utilizing React hooks (`useState`, `useEffect`, `useContext`) **must** include `"use client";` at the very first line of the file.

### 2.4 Component Props & Immutability
- Define a dedicated interface named `<ComponentName>Props`.
- Mark all interface properties as `readonly`.
- For React components passed as children/nodes, type them explicitly using `React.ReactNode`.

```typescript
interface CustomButtonProps {
  readonly buttonText: string;
  readonly isButtonDisabled: boolean;
  readonly onButtonClicked: (event: React.MouseEvent<HTMLElement>) => void;
  readonly icon?: React.ReactNode;
}
```

---

## 🏷️ 3. Type Definitions & Enums

All shared state interfaces, action types, initial state objects, and enums reside in **`app/utils/types.ts`**.

### 3.1 String Enums
Use TypeScript `enum`s with string values for domain options:
```typescript
enum PageLayoutEnum {
    TWO_PANEL_LAYOUT = "2 panel layout",
    THREE_PANEL_LAYOUT = "3 panel layout",
    CLASSIC = "classic",
}

enum SnackbarSeverityEnum {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}
```

### 3.2 State Interface & Initial State
Keep state structure flat and predictable with default values:
```typescript
interface CustomHookState {
    loginId: string;
    isLoading: boolean;
    isSessionChecked: boolean;
    snackbar: {
        open: boolean;
        message: string;
        severity: SnackbarSeverityEnum;
    };
    pageLayout: PageLayoutEnum;
}

const customHookInitialState: CustomHookState = {
    loginId: "",
    isLoading: false,
    isSessionChecked: false,
    snackbar: {
        open: false,
        message: "",
        severity: SnackbarSeverityEnum.INFO,
    },
    pageLayout: PageLayoutEnum.TWO_PANEL_LAYOUT,
};
```

---

## ⚡ 4. Global State Management (Context + Reducer)

Global application state uses React Context (`CustomHookContext`) backed by `useReducer`.

1. **Reducer (`app/utils/reducer.ts`)**: Generic payload merge strategy using `CustomHookActionEnum.SET_CUSTOM_HOOK_DATA`.
2. **Provider (`app/utils/context.tsx`)**: Wraps state and dispatch in `useMemo` to prevent unneeded re-renders.
3. **Custom Hook (`app/utils/hook.ts`)**: Consumes `CustomHookContext` and exposes actions/helpers:
   - `setCustomHookState(payload)`
   - `loginState(loginId, password)`
   - `getCurrentUser()`
   - `setSnackbarState(open, message, severity)`
   - `setPageLayoutState(pageLayout)`

```typescript
// Usage in any client component:
const { pageLayout, setPageLayoutState, setSnackbarState } = useCustomHook();
```

---

## 📡 5. GraphQL & Async API Layer

### 5.1 Query Builders (`app/utils/graphqlQueries.ts`)
GraphQL queries and mutations are isolated as parameterized template literals:
```typescript
const getLoginUserMutationQuery = (loginId: string, password: string) => `
    mutation {
        isLogin(loginId: "${loginId}", password: "${password}") {
            success
            loginId
        }
    }
`;
```

### 5.2 API Services (`app/utils/service.ts`)
Async requests handle HTTP transport via `fetch`:
- Read endpoint configuration from environment variables (`process.env.NEXT_PUBLIC_GRAPHQL_URL`).
- Include credentials (`credentials: "include"`) for cookie-based session management.
- Check `result.ok` and throw descriptive errors on HTTP failures.

```typescript
const getLoginUserMutationApi = async (
    loginId: string,
    password: string
): Promise<LoginResponse> => {
    const usersRequest = {
        query: getLoginUserMutationQuery(loginId, password),
    };

    const result = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(usersRequest),
    });

    if (!result.ok) {
        throw new Error(`HTTP Error: ${result.status}`);
    }

    const jsonResult = await result.json();
    return jsonResult.data.isLogin;
};
```

---

## 🎨 6. UI Component & Styling Guidelines

- **Material-UI (MUI)**: Styled using the `sx` prop for clean component-level inline customization.
- **Dynamic Imports**: Use `next/dynamic` with `{ ssr: false }` when importing client-only components into wrapper/layout components to prevent SSR hydration mismatches.
- **Root Notifications**: `CustomSnackbar` is mounted once in `RootLayout` (`app/layout.tsx`) inside `CustomHookProvider` so toast notifications persist across route changes.
- **Responsive Layouts**: Layout switching (e.g., 2-panel, 3-panel, classic) uses recursive component composition (`ReflexDragger`) controlled via `PageLayoutEnum`.
