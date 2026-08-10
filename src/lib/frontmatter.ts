/**
 * A small, dependency-free frontmatter parser tailored to the simple
 * key: value / list frontmatter used by blog posts in this project.
 * Avoids pulling in gray-matter's Node Buffer dependency into the browser bundle.
 */
export function parseFrontmatter<T extends Record<string, unknown>>(raw: string): {
  data: T;
  content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) {
    return { data: {} as T, content: raw };
  }

  const [, frontmatterBlock, content] = match;
  const lines = frontmatterBlock.split(/\r?\n/);
  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentList: string[] | null = null;

  const commitList = () => {
    if (currentKey && currentList) {
      data[currentKey] = currentList;
    }
    currentKey = null;
    currentList = null;
  };

  for (const line of lines) {
    if (!line.trim()) continue;

    const listItemMatch = /^\s*-\s+(.*)$/.exec(line);
    if (listItemMatch && currentKey) {
      currentList = currentList ?? [];
      currentList.push(unquote(listItemMatch[1].trim()));
      continue;
    }

    commitList();

    const kvMatch = /^([a-zA-Z0-9_]+):\s*(.*)$/.exec(line);
    if (!kvMatch) continue;
    const [, key, rawValue] = kvMatch;
    const value = rawValue.trim();

    if (value === '') {
      // Could be the start of a list on following lines.
      currentKey = key;
      currentList = [];
      continue;
    }

    data[key] = coerce(value);
  }
  commitList();

  return { data: data as T, content: content.trim() };
}

function unquote(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function coerce(value: string): unknown {
  const unquoted = unquote(value);
  if (unquoted === 'true') return true;
  if (unquoted === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(unquoted)) return Number(unquoted);
  return unquoted;
}
