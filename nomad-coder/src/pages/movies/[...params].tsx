import Seo from "@/components/Seo";

type T_movieDetailParams = [string, string] | [];

export default function MovieDetail({
  params,
}: {
  params: T_movieDetailParams;
}) {
  const [title, id] = params;

  // const [title, id] = (router.query.params || []) as T_movieDetailParams;

  return (
    <div>
      <Seo title={title!} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({
  params: { params },
}: {
  params: { params: string[] };
}) {
  return {
    props: { params },
  };
}
