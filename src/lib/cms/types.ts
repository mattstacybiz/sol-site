/**
 * CMS adapter types — long-form content (About, Kava 101, policies).
 */

export type CmsPage = {
  slug: string;
  title: string;
  /** Plain HTML or Markdown — render as appropriate at the call site. */
  body: string;
  updatedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export type CmsPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
};

export interface CmsAdapter {
  getPage(slug: string): Promise<CmsPage | null>;
  listPages(): Promise<CmsPage[]>;
  listPosts(): Promise<CmsPost[]>;
}
