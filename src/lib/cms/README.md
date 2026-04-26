# `/lib/cms`

Long-form copy seam. Default `local.ts` reads markdown from `/content/pages/`.
Pages reference these by slug (e.g. `cms.getPage("about")`).

## Adding Sanity later

1. Spin up a Sanity project + dataset.
2. `pnpm add @sanity/client` and write `sanity.ts` exporting `CmsAdapter`.
3. Set `CMS_PROVIDER=sanity`, `SANITY_PROJECT_ID`, `SANITY_DATASET`.
4. The page components don't change — they still call `cms.getPage()`.
