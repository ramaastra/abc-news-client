function News({ data }) {
  return (
    <div className="w-fit mb-5">
      <div className="mb-1">
        <span className="border-[1px] py-1 px-2 text-xs font-semibold">
          {data.category.name}
        </span>
        <span className="ml-1 text-xs">
          {new Date(data.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
      <a
        href={`/news/${data.slug}`}
        target="_blank"
        className="text-2xl font-semibold tracking-tighter transition-opacity hover:opacity-75"
      >
        <h2>{data.headline}</h2>
      </a>
      <p className="opacity-75 my-1">{data.content.slice(0, 40) + '...'}</p>
      <a
        href={`/news/${data.slug}`}
        target="_blank"
        className="text-indigo-600 underline"
      >
        Continue Reading
      </a>
    </div>
  );
}

export default News;
