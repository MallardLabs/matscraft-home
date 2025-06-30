import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface WikiItem {
  slug: string;
  title: string;
  description?: string;
  date?: string;
}

export async function getWikiItems(): Promise<WikiItem[]> {
  const contentDir = path.join(process.cwd(), "src", "content");
  const items: WikiItem[] = [];

  if (!fs.existsSync(contentDir)) return [];

  const walk = (dir: string, basePath: string[] = []) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const slugParts = [...basePath, entry.name];
        const indexPath = path.join(dir, entry.name, "index.mdx");

        if (fs.existsSync(indexPath)) {
          try {
            const file = fs.readFileSync(indexPath, "utf8");
            const { data, content } = matter(file);

            // Auto-generate description from content if not provided
            const plainText = stripMarkdown(content);
            const fallbackDescription = getFirstWords(plainText, 100);

            items.push({
              slug: slugParts.join("/"),
              title: data.title || entry.name,
              description: data.description || fallbackDescription,
              date: data.date,
            });
          } catch (err) {
            console.warn(`Failed to parse frontmatter for ${indexPath}`, err);
          }
        }

        walk(path.join(dir, entry.name), slugParts);
      }
    }
  };

  walk(contentDir);

  return items.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });
}

function getFirstWords(text: string, count: number): string {
  return text.split(/\s+/).slice(0, count).join(" ") + "...";
}

function stripMarkdown(md: string): string {
  return md
    .replace(/`{3}[\s\S]+?`{3}/g, "") // remove code blocks
    .replace(/`[^`]+`/g, "") // remove inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // remove images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // remove links but keep text
    .replace(/^#+\s+/gm, "") // remove headings
    .replace(/>\s+/g, "") // remove blockquotes
    .replace(/[*_~\-#>]/g, "") // remove formatting characters
    .replace(/\n+/g, " ") // collapse newlines
    .trim();
}
