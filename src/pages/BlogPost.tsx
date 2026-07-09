import { useParams, Link, Navigate } from "react-router-dom";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { SanityImage } from "@/components/ui/sanity-image";
import blogData from "@/generated/blog-data.json";

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage?: { url: string; lqip?: string; alt?: string; width?: number; height?: number };
  author?: { name: string; role?: string; bio?: string; imageUrl?: string };
  body: unknown[];
}

const posts = blogData.posts as Post[];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

/** Custom renderers for Portable Text — images were pre-resolved to CDN URLs at build time. */
const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { url?: string; lqip?: string; alt?: string } }) =>
      value.url ? (
        <SanityImage
          url={value.url}
          lqip={value.lqip}
          alt={value.alt || ""}
          width={960}
          className="my-8 h-80 sm:h-96 rounded-2xl"
        />
      ) : null,
  },
};

const BlogPostSchema = ({ post }: { post: Post }) => {
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: post.mainImage ? [`${post.mainImage.url}?w=1200&auto=format`] : undefined,
    author: post.author
      ? { "@type": "Person", name: post.author.name, description: post.author.bio }
      : undefined,
    publisher: { "@id": "https://www.deckpromarine.com.au/#organization" },
    mainEntityOfPage: `https://www.deckpromarine.com.au/blog/${post.slug}/`,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <main>
      <BlogPostSchema post={post} />

      {/* ══════ HEADER ══════ */}
      <section className="bg-gradient-to-b from-[#8CC3C8]/30 to-white pt-36 pb-10">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3A868F] hover:text-[#1a2f45] transition-colors mb-6"
          >
            <ArrowLeft size={14} /> All posts
          </Link>
          <p className="text-xs font-medium text-[#3A868F] tracking-wide uppercase mb-3">
            {formatDate(post.publishedAt)}
            {post.author?.name ? ` · ${post.author.name}` : ""}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-[#1a2f45] sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#1a2f45]/50">{post.excerpt}</p>
        </div>
      </section>

      {/* ══════ MAIN IMAGE ══════ */}
      {post.mainImage && (
        <div className="mx-auto max-w-4xl px-6">
          <SanityImage
            url={post.mainImage.url}
            lqip={post.mainImage.lqip}
            alt={post.mainImage.alt || post.title}
            width={1280}
            eager
            className="h-72 sm:h-96 lg:h-[480px] rounded-2xl"
          />
        </div>
      )}

      {/* ══════ BODY ══════ */}
      <article className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-[#1a2f45] prose-p:text-[#1a2f45]/70 prose-li:text-[#1a2f45]/70 prose-a:text-[#3A868F]">
          <PortableText value={post.body as never} components={ptComponents} />
        </div>

        {/* Author card */}
        {post.author?.bio && (
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-gray-100 bg-[#fafbfc] p-6">
            {post.author.imageUrl && (
              <img
                src={`${post.author.imageUrl}?w=112&h=112&fit=crop&auto=format`}
                alt={post.author.name}
                width={56}
                height={56}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-[#1a2f45]">{post.author.name}</p>
              {post.author.role && <p className="text-xs text-[#3A868F]">{post.author.role}</p>}
              <p className="mt-1.5 text-sm leading-relaxed text-[#1a2f45]/50">{post.author.bio}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#1a2f45] p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Thinking about new flooring?</h2>
          <p className="text-sm text-white/50 mb-6 max-w-md mx-auto">
            Send us photos and dimensions of your boat, camper, or 4x4 and
            we'll return an accurate quote within 48 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-medium text-[#1a2f45] transition-all duration-300 hover:shadow-xl"
          >
            Get a Free Quote <ArrowRight size={14} />
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default BlogPost;
