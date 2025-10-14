import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/0xmuka",
      "Linkedin": "https://linkedin.com/in/0xmuka",
      "Discord Community": "https://discord.gg/5rb9UkX4MM",
      "Twitter | X": "https://x.com/muka0x00",  
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),

  Component.Explorer({
    title: "",
    filterFn: undefined,
    folderClickBehavior: "link", 
    mapFn: (tree) => {
      const openAll = (node: Record<string, any>) => {
        for (const child of Object.values(node)) {
          child.collapsed = false
          if (child.children) openAll(child.children)
        }
      }
      openAll(tree)
      return tree
    },
  }),


  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
      }),
      
  Component.Explorer({
    title: "",
    filterFn: undefined,
    folderClickBehavior: "link", 
    mapFn: (tree) => {
      const openAll = (node: Record<string, any>) => {
        for (const child of Object.values(node)) {
          child.collapsed = false
          if (child.children) openAll(child.children)
        }
      }
      openAll(tree)
      return tree
    },
  }),

  ],
  right: [],
}
