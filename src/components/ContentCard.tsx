import Image from "next/image";

interface ContentCardProps {
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  tagColors: Record<string, string>;
  status?: string;
  statusColor?: string;
}

export default function ContentCard({
  title,
  description,
  url,
  image,
  tags,
  tagColors,
  status,
  statusColor,
}: ContentCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full min-h-[300px]"
    >
      <Image
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
        width={400}
        height={300}
      />
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-3">
          {status && (
            <span
              className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-semibold ${
                statusColor === "green"
                  ? "bg-green-100 text-green-800"
                  : statusColor === "blue"
                  ? "bg-blue-100 text-blue-800"
                  : statusColor === "gray"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {status}
            </span>
          )}
          
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                tagColors[tag] || "bg-gray-200 text-gray-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}