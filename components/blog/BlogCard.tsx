import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group flex h-full flex-col animate-slideUp">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-300">
            <BookOpen className="h-10 w-10" />
          </div>
        )}
      </Link>
      <CardBody className="flex flex-1 flex-col">
        {post.category && <Badge variant="secondary" className="mb-2 w-fit">{post.category.name_th}</Badge>}
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-neutral-900 hover:text-primary-600 dark:text-neutral-100">
            {post.title}
          </h3>
        </Link>
        {post.excerpt && <p className="line-clamp-2 flex-1 text-xs text-neutral-500">{post.excerpt}</p>}
        <div className="mt-3 flex items-center gap-3 text-xs text-neutral-400">
          <span>{formatDate(post.published_at || post.created_at)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.reading_time_minutes} นาที
          </span>
        </div>
      </CardBody>
    </Card>
  );
}
