import React from "react";
import htm from "htm";

// Re-exports
// Components
export { default as Layout } from "./components/layout";
export { default as Page } from "./components/page";

// Data
export { fetchItem, fetchRandomItems } from "./data/index";

// Exports
export const html = htm.bind(React.createElement);

// TODO: Memoize and eager fetch imports

// TODO: Memoize data fetch?
