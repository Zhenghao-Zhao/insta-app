"use client";
import ProfileImage from "@/app/(pages)/[username]/_components/ProfileImage";
import { PostOptions } from "@/app/_components/posts/PostView";
import Comments from "@/app/_components/posts/components/Comments";
import { SpacedCarousel } from "@/app/_components/ui/carousel";
import Separator from "@/app/_components/ui/separator";
import { getPost } from "@/app/_libs/api/queries";
import { useIsServer } from "@/app/_libs/hooks/useIsServer";
import { Post } from "@/app/_libs/types";
import { formatDate } from "@/app/_libs/utils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Content({ initData }: { initData: Post }) {
  const isServer = useIsServer();
  const { data: post } = useQuery({
    queryKey: ["posts", initData.postUid],
    queryFn: () => getPost(initData.postUid),
    initialData: initData,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return (
    <main className="w-full flex flex-col max-w-grid-maxWidth">
      <section className="w-full flex items-center px-carousel-arrow-width">
        <div className="flex flex-col gap-2 justify-center pb-4 px-4">
          <div className="flex items-center gap-4">
            <Link href={post.owner.username}>
              <ProfileImage
                imageURL={post.owner.profileImageUrl}
                className="size-12"
              />
            </Link>
            <Link href={post.owner.username}>
              <p className="whitespace-nowrap text-ellipsis">
                {post.owner.name}
              </p>
            </Link>
            {!post.isOwner && !post.owner.isFollowing && (
              <button className="p-2 bg-blue-500 rounded-md text-white text-sm">
                Follow
              </button>
            )}
          </div>
          {post.content && <p className="flex items-center">{post.content}</p>}
          {!isServer && (
            <p className="text-xs text-text-secondary">
              {formatDate(post.createdAt)}
            </p>
          )}
        </div>
      </section>
      <section className="w-full h-carousel-image-size">
        <SpacedCarousel dataURLs={post.imageUrls} />
      </section>
      <section className="px-carousel-arrow-width">
        <Separator className="mt-6" />
        <div className="w-full">
          <PostOptions post={post} />
        </div>
        <Separator />
      </section>
      <section className="w-full grow px-carousel-arrow-width flex flex-col min-h-[200px]">
        <header className="font-bold text-xl mt-4">
          {`${post.commentCount?.toLocaleString()} ${
            post.commentCount === 1 ? "Comment" : "Comments"
          } `}
        </header>
        <Comments post_uid={post.postUid} className="px-0" />
      </section>
    </main>
  );
}
