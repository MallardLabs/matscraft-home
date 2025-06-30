import type { MDXComponents } from "mdx/types";
import Container from "#/components/container"; // Import komponen kamu
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl font-ten mb-5">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed">{children}</p>
    ),
    code: ({ children }) => (
      <code className="bg-[rgb(49,50,51)] px-2 py-1 text-xs font-seven">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    ul: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4">{children}</ol>
    ),
    li: ({ children }) => <li className="mb-1 text-sm">{children}</li>,
    img: ({ src, alt }) => (
      <Image
        src={src}
        alt={alt}
        width={1000}
        height={500}
        className="my-4 border-[3px] border-border-primary w-full"
      />
    ),
    Container: ({ children }) => (
      <Container className="p-3 md:p-8">{children}</Container>
    ),
    ...components,
  };
}
export const mdxComponents = {
  Container,
};
