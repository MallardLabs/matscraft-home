import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Container from "#/components/container";
import { mdxComponents, useMDXComponents } from "#/app/mdx-components";
import WikiSidebar from "#/components/wiki/sidebar";

interface WikiPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Fungsi untuk mendapatkan semua wiki items untuk sidebar
async function getAllWikiItems() {
  const contentDir = path.join(process.cwd(), "src", "content");

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const items: any[] = [];

  const getAllItems = (dir: string, basePath: string[] = []) => {
    const dirItems = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of dirItems) {
      if (item.isDirectory()) {
        const currentPath = [...basePath, item.name];
        const indexPath = path.join(dir, item.name, "index.mdx");

        if (fs.existsSync(indexPath)) {
          try {
            const fileContent = fs.readFileSync(indexPath, "utf8");
            const { data: frontMatter } = matter(fileContent);

            items.push({
              slug: currentPath.join("/"),
              title: frontMatter.title || item.name,
              description: frontMatter.description,
              date: frontMatter.date,
            });
          } catch (error) {
            console.error(`Error reading ${indexPath}:`, error);
          }
        }

        getAllItems(path.join(dir, item.name), currentPath);
      }
    }
  };

  getAllItems(contentDir);

  return items.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });
}

// Fungsi untuk mendapatkan konten MDX
async function getMDXContent(slug: string[]) {
  const contentPath = path.join(
    process.cwd(),
    "src",
    "content",
    ...slug,
    "index.mdx"
  );

  try {
    const fileContent = fs.readFileSync(contentPath, "utf8");
    const { data: frontMatter, content } = matter(fileContent);

    return {
      content,
      frontMatter,
    };
  } catch (error) {
    return null;
  }
}

// Generate static params untuk build time
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src", "content");

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const getAllSlugs = (dir: string, basePath: string[] = []): string[][] => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const slugs: string[][] = [];

    for (const item of items) {
      if (item.isDirectory()) {
        const currentPath = [...basePath, item.name];
        const indexPath = path.join(dir, item.name, "index.mdx");

        // Jika ada index.mdx di folder ini, tambahkan sebagai slug
        if (fs.existsSync(indexPath)) {
          slugs.push(currentPath);
        }

        // Rekursif untuk subfolder
        slugs.push(...getAllSlugs(path.join(dir, item.name), currentPath));
      }
    }

    return slugs;
  };

  const slugs = getAllSlugs(contentDir);

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function WikiPage({ params }: WikiPageProps) {
  // Await the params since it's now a Promise
  const resolvedParams = await params;

  const [mdxData, wikiItems] = await Promise.all([
    getMDXContent(resolvedParams.slug),
    getAllWikiItems(),
  ]);

  if (!mdxData) {
    notFound();
  }

  const { content, frontMatter } = mdxData;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr]">
        <aside className="border-r-[3px] border-border-primary">
          <div className="sticky top-0">
            <h3 className="text-2xl font-ten p-3">Wiki Links</h3>
            <WikiSidebar wikiItems={wikiItems} />
          </div>
        </aside>
        <main className="flex-1 shadow-sm">
          <article>
            <div className="mdx-content prose prose-lg max-w-none">
              <MDXRemote
                source={content}
                components={useMDXComponents({})}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeHighlight, rehypeSlug],
                  },
                }}
              />
            </div>
          </article>
        </main>
      </div>
    </>
  );
}
