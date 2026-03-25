// NavBar — Server Component shell.
// All interactivity (scroll detection, mobile drawer) lives in NavBarClient.
// This file exists so importing NavBar stays clean across the app.

import { NavBarClient } from './NavBarClient';

export function NavBar() {
  return <NavBarClient />;
}
