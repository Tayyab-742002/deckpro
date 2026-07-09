import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The post headline — also used as the page title in Google.",
      validation: (rule) => rule.required().max(70).warning("Keep under 70 characters so it isn't cut off in Google results"),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description: "The post's web address. Click 'Generate' after writing the title.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Summary",
      type: "text",
      rows: 3,
      description:
        "1–2 sentences shown in the blog list and in Google results. Aim for 120–160 characters.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      description: "Shown at the top of the post and when shared on social media.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe this image",
          type: "string",
          description: "What's in the photo? E.g. 'New EVA foam deck on a Quintrex 610'. Helps Google find your images.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Post content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Describe this image",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "mainImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : "", media };
    },
  },
});
