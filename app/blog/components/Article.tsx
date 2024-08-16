import '../article.css'; // Adjust path as necessary

type ArticleProps = {
  content: string;
};

const Article = ({ content }: ArticleProps) => {
  return (
    <div className="markdown-content text-justify" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default Article;
