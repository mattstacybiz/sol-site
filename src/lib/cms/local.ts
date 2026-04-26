/**
 * Local-file CMS adapter. Reads markdown files from /content/.
 *
 * Intentionally simple — no MDX compiler, no remark plugins. The page
 * components do their own layout; this just supplies copy bodies.
 *
 * For richer content (image galleries, embeds, structured FAQ blocks),
 * swap to Sanity or Contentful — interface is identical.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

import type { CmsAdapter, CmsPage, CmsPost } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

const parseFrontmatter = (raw: string): { meta: Record<string, string>; body: string } => {
  if (!raw.startsWith("---")) return { meta: {}, body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: raw };
  const head = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  const meta: Record<string, string> = {};
  for (const line of head.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return { meta, body };
};

async function readPage(slug: string): Promise<CmsPage | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, "pages", `${slug}.md`), "utf8");
    const { meta, body } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title ?? slug,
      metaTitle: meta.metaTitle,
      metaDescription: meta.metaDescription,
      body,
    };
  } catch {
    return null;
  }
}

export const localCms: CmsAdapter = {
  async getPage(slug) {
    return readPage(slug);
  },
  async listPages() {
    try {
      const dir = path.join(CONTENT_DIR, "pages");
      const files = await fs.readdir(dir);
      const out: CmsPage[] = [];
      for (const f of files) {
        if (!f.endsWith(".md")) continue;
        const page = await readPage(f.replace(/\.md$/, ""));
        if (page) out.push(page);
      }
      return out;
    } catch {
      return [];
    }
  },
  async listPosts() {
    // No blog in v1.
    return [] as CmsPost[];
  },
};
