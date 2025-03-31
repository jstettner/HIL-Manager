import { common, createStarryNight } from "@wooorm/starry-night";
import { toHtml } from "hast-util-to-html";

async function initializeStarryNight() {
  const starryNight = await createStarryNight(common);
  return starryNight;
}

const starryNightPromise = initializeStarryNight();

export async function highlightPythonCode(code: string) {
  const starryNight = await starryNightPromise;
  const scope = starryNight.flagToScope("python");
  if (!scope) {
    throw new Error("Scope for Python not found");
  }
  const tree = starryNight.highlight(code, scope);
  return toHtml(tree);
}
