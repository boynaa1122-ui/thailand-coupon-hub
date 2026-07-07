import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogDetail({ post }: { post: BlogPost }) {
  return (
    <article>
      {post.category && <Badge variant="secondary" className="mb-3">{post.category.name_th}</Badge>}
      <h1 className="font-display text-2xl font-bold leading-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
        {post.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
        <span className="flex items-center gap-1.5">
          <User className="h-4 w-4" /> {post.author}
        </span>
        <span>{formatDate(post.published_at || post.created_at)}</span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> อ่าน {post.reading_time_minutes} นาที
        </span>
      </div>

      {post.featured_image && (
        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-md3lg bg-neutral-100 dark:bg-neutral-800">
          <Image src={post.featured_image} alt={post.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-display prose-a:text-primary-600">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
