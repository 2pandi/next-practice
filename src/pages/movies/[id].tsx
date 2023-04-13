import { useRouter } from "next/router";

export default function MovieId() {
  const router = useRouter();
  console.log(router);
  return "movie id";
}
