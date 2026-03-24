// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "12345678-1234-1234-1234-123456789012",
  token: process.env.TINA_TOKEN || "abcd1234abcd1234",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return "/";
            }
            return `/${document._sys.filename}`;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "hero",
                label: "Hero Section",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "string", name: "subheading", label: "Subheading", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Background Image" }
                ]
              },
              {
                name: "text",
                label: "Text Content",
                fields: [
                  { type: "string", name: "heading", label: "Heading" },
                  { type: "rich-text", name: "content", label: "Content" }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date" },
          { type: "image", name: "coverImage", label: "Cover Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      {
        name: "global",
        label: "Global Settings",
        path: "content/global",
        format: "json",
        ui: {
          global: true
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "nav",
            label: "Navigation Menu",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "link", label: "URL" }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "copyright", label: "Copyright Text" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
