import React from "react";
import htm from "htm";

// Re-exports
export { fetchItem, fetchRandomItems } from "./data/index";

// Exports
export const html = htm.bind(React.createElement);

// TODO: Memoize imports

// TODO: Memoize data fetch?
