export function splitVlogBody(body) {
  const parts = [];
  const pattern = /```([^\n]*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(body)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: body.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", language: match[1].trim(), value: match[2].replace(/\n$/, "") });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < body.length) {
    parts.push({ type: "text", value: body.slice(lastIndex) });
  }

  return parts;
}
