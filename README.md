# @bedrockio/router

A simplified browser router for React applications.

- [Install](#install)
- [Dependencies](#dependencies)
- [Overview](#overview)
- [Usage](#usage)
- [Components](#components)
  - [BrowserRouter](#browserrouter)
  - [StaticRouter](#staticrouter)
  - [Routes](#routes)
  - [Route](#route)
  - [Link](#link)
  - [NavLink](#navlink)
  - [Redirect](#redirect)
- [Hooks](#hooks)
  - [useNavigate](#usenavigate)
  - [useLocation](#uselocation)
  - [useParams](#useparams)
  - [useQuery](#usequery)
- [Differences from React Router](#differences-from-react-router)

## Install

```bash
yarn install @bedrockio/router
```

## Dependencies

Peer dependencies must be installed:

```bash
yarn install react react-dom
```

## Overview

This package provides a streamlined routing solution for React applications that
is mostly compatible with `react-router-dom` but with a simpler API and fewer
features. It focuses on essential routing functionality without the complexity
of nested routers or `Outlet` components.

Key features:

- Simple, flat routing structure
- Flexible `render` prop that accepts components or elements
- Built-in hooks for common routing needs
- Convenient `useQuery` hook for query parameters
- Support for both browser and static (SSR/SSG) routing

## Usage

Basic setup with routes:

```jsx
import { BrowserRouter, Routes, Route } from '@bedrockio/router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" render={Home} />
        <Route path="/about" render={About} />
        <Route path="/users/:id" render={UserProfile} />
      </Routes>
    </BrowserRouter>
  );
}
```

The `render` prop accepts any renderable element:

```jsx
// Component reference
<Route path="/" render={Home} />

// Element
<Route path="/" render={<Home />} />

// Inline component
<Route path="/" render={() => <div>Hello</div>} />
```

## Components

### BrowserRouter

Provides routing context using the browser's History API.

```jsx
import { BrowserRouter } from '@bedrockio/router';

function App() {
  return <BrowserRouter>{/* Your app */}</BrowserRouter>;
}
```

Automatically scrolls to top on navigation and listens to history changes.

### StaticRouter

Provides static routing context for server-side rendering (SSR) or static site
generation (SSG).

```jsx
import { StaticRouter } from '@bedrockio/router';

function App({ path }) {
  return <StaticRouter path={path}>{/* Your app */}</StaticRouter>;
}
```

### Routes

Container component that renders the first matching route.

```jsx
import { Routes, Route } from '@bedrockio/router';

<Routes>
  <Route path="/" exact render={Home} />
  <Route path="/about" render={About} />
  <Route path="/users/:id" render={UserProfile} />
  <Route render={NotFound} />
</Routes>;
```

#### Props

- `exact` - When `true`, the route path must match exactly. Useful for the root
  path.
- `subdomain` - Match routes based on subdomain (e.g., `subdomain="admin"`)

### Route

Defines a route with a path and component to render.

```jsx
import { Route } from '@bedrockio/router';

<Route path="/users/:id" render={UserProfile} />;
```

#### Props

- `path` - The path pattern to match. Supports parameters (`:id`) and wildcards.
  If omitted matched everything.
- `render` - The component, element, or function to render when matched
- `exact` - Whether to match the path exactly
- `subdomain` - Subdomain to match

#### Path Patterns

```jsx
// Static paths
<Route path="/about" render={About} />

// Parameters
<Route path="/users/:id" render={UserProfile} />

// Optional parameters
<Route path="/posts/:id?" render={Post} />

// Wildcards (catch-all)
<Route path="*" render={NotFound} />

// Shortcut for path="*"
<Route render={NotFound} />
```

### Link

Client-side navigation link.

```jsx
import { Link } from '@bedrockio/router';

<Link to="/about">About</Link>;
```

Prevents full page reload and uses the History API for navigation.

### NavLink

Navigation link with active state indication.

```jsx
import { NavLink } from '@bedrockio/router';

<NavLink to="/about" exact>
  About
</NavLink>;
```

When active, adds `data-active="true"` and `aria-current="page"` attributes for
styling:

```css
a[data-active] {
  font-weight: bold;
}
```

#### Props

- `exact` - When `true`, only highlights when path matches exactly. When
  `false`, also highlights for sub-paths.

### Redirect

Redirects to a different route.

```jsx
import { Redirect } from '@bedrockio/router';

<Redirect to="/login" />;
```

Can use route parameters:

```jsx
<Routes>
  <Route path="/old/:id" render={<Redirect to="/new/:id" />} />
  <Route path="/new/:id" render={NewPage} />
</Routes>
```

## Hooks

### useNavigate

Returns a function to programmatically navigate.

```jsx
import { useNavigate } from '@bedrockio/router';

function MyComponent() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/about');
  }

  return <button onClick={handleClick}>Go to About</button>;
}
```

#### Navigation Methods

```jsx
const navigate = useNavigate();

// Push new entry
navigate('/about');
navigate('/about', { foo: 'bar' }); // with state

// Replace current entry
navigate.replace('/about');
navigate.replace('/about', { foo: 'bar' }); // with state

// Navigate through history
navigate.back(); // Go back one entry
navigate.forward(); // Go forward one entry
navigate.go(-2); // Go back 2 entries
navigate.go(1); // Go forward 1 entry
navigate.go(); // Reload current page
```

### useLocation

Returns the current location object.

```jsx
import { useLocation } from '@bedrockio/router';

function MyComponent() {
  const location = useLocation();

  console.log(location.pathname); // Current path
  console.log(location.search); // Query string
  console.log(location.hash); // Hash fragment
  console.log(location.state); // History state

  return <div>Current path: {location.pathname}</div>;
}
```

### useParams

Returns route parameters as an object.

```jsx
import { useParams } from '@bedrockio/router';

function UserProfile() {
  const params = useParams();

  return <div>User ID: {params.id}</div>;
}

// Usage: <Route path="/users/:id" render={UserProfile} />
```

### useQuery

Returns an object representing the query parameters of the URL. This object is
like `URLSearchParams` with a few enhancements. First parameters may be accessed
with the `get` method or directly via properties.

```jsx
import { useQuery } from '@bedrockio/router';

function SearchResults() {
  const query = useQuery();

  return (
    <div>
      Page: {query.page}
      Page: {query.get('page')}
    </div>
  );
}

// URL: /search?page=2
```

Additionally the query object will perform navigation with the `set`, `delete`,
and `clear` methods:

```jsx
import { useQuery } from '@bedrockio/router';

function SearchResults() {
  const query = useQuery();

  function onTwoClick() {
    query.set('page', '2');
    // Navigates to /search?page=2
  }

  function onNoPageClick() {
    query.delete('page');
    // Navigates to /search
  }

  function onResetClick() {
    query.clear();
    // Navigates to /search
  }

  return (
    <>
      <div onClick={onTwoClick}>Two</div>
      <div onClick={onNoPageClick}>No Page</div>
      <div onClick={onResetClick}>Reset</div>
    </>
  );
}
```

## Differences from React Router

This router is designed to be simpler and more streamlined:

- **No nested routers** - Routes are flat, no `<Outlet />` component
- **Simpler Route API** - Single `render` prop accepts components, elements, or
  functions
- **Built-in useQuery** - Query parameters as an object without manual parsing
- **Fewer concepts** - No loaders, actions, or data routers
- **Lightweight** - Smaller bundle size with focused feature set
