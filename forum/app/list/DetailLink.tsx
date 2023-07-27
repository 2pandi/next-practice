"use client";

// 여기에서 import 경로는 "next/router"가 아니라 "next/navigation"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function DetailLink({ postId }: { postId: string }) {
  // client component 안에서만 사용 가능
  const router = useRouter();
  console.log("usePathname: ", usePathname()); // 현재 url 출력
  console.log("useSearchParams: ", useSearchParams()); // 현재 queryString 출력
  console.log("useParams: ", useParams()); // 유저가 입력한 dynamic route 출력

  return (
    <button onClick={() => router.push(`/detail/${postId}`)}>디테일</button>
  );
}

/** router(useRouter) 기능
 * router.push(url) -> url로 이동
 * router.back() -> 뒤로가기
 * router.forward() -> 앞으로가기
 * router.refresh() -> 새로고침(soft refresh)
 *    - 브라우저 새로고침이 아니라 변동사항이 있는 부분만 바꿔준다
 * router.prefetch(url) -> 미리 url에 필요한 파일을 로드함(속도 최적화)
 *    - Link 태그만 사용해도 해당 태그가 화면에 나타났을 때 prefetch가 자동으로 동작함
 *    - 게시판 같이 모든 게시글을 방문하지 않을 것 같은 페이지에서 Link 태그를 사용하는 경우
 *      prefetch 기능 때문에 오히려 부담이 될 수 있음 -> <Link prefetch={false} ... /> 로 해결
 *    - 개발환경에서는 prefetch 확인 불가 -> 배포해야 확인 가능
 */
