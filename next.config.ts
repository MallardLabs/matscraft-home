import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    mdxRs: true,
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-gfm"), require("remark-frontmatter")],
    rehypePlugins: [require("rehype-slug"), require("rehype-highlight")],
  },
});

export default withMDX(nextConfig);
