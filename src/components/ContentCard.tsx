import Image from "next/image"

interface ContentCardProps {
    title: string
    description: string
    url: string
    image: string
    tags: string[]
    tagColors: Record<string, string>
}

export default function ContentCard({ title, description, url, image, tags, tagColors }: ContentCardProps) {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                <a href={url} target="_blank" rel="noopener noreferrer" className="relative w-full pt-[56.25%]">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </a>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.map((tag: string, index: number) => (
                        <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${tagColors[tag] || "bg-gray-200 text-gray-700"}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}