declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
}

declare module "next-mdx-remote/rsc" {
  import { ReactElement } from "react";

  interface MDXRemoteProps {
    source: string;
    options?: {
      mdxOptions?: {
        remarkPlugins?: any[];
        rehypePlugins?: any[];
      };
    };
    components?: Record<string, any>;
  }

  export function MDXRemote(props: MDXRemoteProps): Promise<ReactElement>;
}
