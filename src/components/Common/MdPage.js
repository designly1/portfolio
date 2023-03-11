import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import imageResizerConfig from '@/constants/imageResizerConfig';
import PopImage from './PopImage';
import CodeCopyBtn from './CodeCopyBtn';

export default function MdPage({ markdown, appendClass, justify }) {
  const Pre = ({ children }) =>
    <pre>
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  const Img = ({ src, ...props }) =>
    <div className="image-container">
      <PopImage
        src={src}
        quality={imageResizerConfig.blogThumbQuality}
        className=""
        loading="lazy"
        {...props}
      />
    </div>

  const P = ({ children }) => <p className={`${justify ? 'text-justify' : ''}`}>{children}</p>

  const NextLink = ({ href, content }) => <Link href={href}>{content}</Link>;

  let className = "post-markdown";
  if (appendClass) className += " " + appendClass;


  return (
    <ReactMarkdown
      className={className}
      linkTarget='_blank'
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        link: NextLink,
        pre: Pre,
        img: Img,
        p: P,
        code({ node, inline, className = "blog-code", children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              style={a11yDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}