import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { Newspaper, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { SanityImage } from "@/components/ui/sanity-image";
import blogData from "@/generated/blog-data.json";

// Written by the client in Sanity Studio; baked into the build by
// scripts/fetch-blog.mjs (a publish webhook triggers a rebuild).
const posts = blogData.posts as Array<{
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  mainImage?: { url: string; lqip?: string; alt?: string };
  author?: { name: string };
}>;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

const Blog = () => {
  return (
    <main>
      {/* ══════ HEADER ══════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8CC3C8] via-[#6AB3B9] to-[#4B959C]">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-48 sm:pt-56 pb-24 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#1a2f45]/75 px-5 py-2 text-xs font-medium tracking-wider text-white backdrop-blur-sm">
              <Newspaper size={13} />
              Deckpro Blog
            </span>
          </m.div>
          <h1 className="text-4xl font-semibold leading-tight text-[#1a2f45] sm:text-5xl md:text-6xl">
            News, Projects
            <br />& Guides
          </h1>
          <m.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-5 max-w-md mx-auto text-sm leading-relaxed text-[#1a2f45]/60 sm:text-base"
          >
            Project stories, flooring care guides, and news from the Deckpro
            workshop in Perth.
          </m.p>
        </div>
      </section>

      {/* ══════ POST GRID ══════ */}
      <section className="py-20 lg:py-24 bg-white min-h-[40vh]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-[#1a2f45] mb-2">First posts coming soon</p>
              <p className="text-sm text-[#1a2f45]/40 max-w-md mx-auto">
                We're preparing project stories and flooring guides. In the
                meantime, check out{" "}
                <Link to="/marine-flooring" className="text-[#3A868F] font-medium hover:text-[#1a2f45]">
                  our marine flooring service
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <m.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    {post.mainImage && (
                      <div className="overflow-hidden rounded-2xl bg-[#e5f0f1] h-52">
                        <SanityImage
                          url={post.mainImage.url}
                          lqip={post.mainImage.lqip}
                          alt={post.mainImage.alt || post.title}
                          width={640}
                          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                          eager={i < 3}
                        />
                      </div>
                    )}
                    <p className="mt-4 text-xs font-medium text-[#3A868F] tracking-wide uppercase">
                      {formatDate(post.publishedAt)}
                      {post.author?.name ? ` · ${post.author.name}` : ""}
                    </p>
                    <h2 className="mt-1.5 text-lg font-semibold text-[#1a2f45] leading-snug group-hover:text-[#3A868F] transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#1a2f45]/40 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#1a2f45]">
                      Read more <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </m.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Blog;
