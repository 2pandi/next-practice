import { connectDB } from "../util/database";

export default async function Home() {
  // ❓connectDB를 미리 await해서 export하면 매번 await 안 써도 되지 않을까?
  // ⭐️ top-level await 기능(next.config.js에서)을 사용하면 그렇게도 사용할 수 있긴 하지만
  // 아직 실험 단계이기 때문에 최신 nodejs를 지원하지 않는 프로그램과 연계할 경우
  // 프로그램이 꼬일 수 있으므로 지금은 그냥 import 해서 await 하는 게 낫다.
  const client = await connectDB;
  // client 변수 선언 하지 않고 아래와 같이 한 줄로도 작성 가능하다.
  // const db = (await connectDB).db("apple-forum");
  const db = client.db("apple-forum");
  // DB의 특정 collection에 있는 모든 document를 출력
  const result = await db.collection("post").find().toArray();
  console.log(result);
  return <div>안녕</div>;
}

/** ⭐️ top-level await
 * 원래의 await는 async 없이 사용이 불가능했으나
 * ES2022부터 모듈의 최상위 레벨에서 await를 사용할 수 있게 되었다.
 * 이는 top-level await를 사용한 모듈이 하나의 거대한 async 함수처럼 동작하기 때문에
 * 해당 인스턴스에 바로 접근했을 때 비동기 처리가 완료됨을 보장받을 수 있다.
 */
