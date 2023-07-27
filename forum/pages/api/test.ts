import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(123);
  // response를 실행하지 않으면 클라이언트는 무한대기상태로 들어갈 수 있음.
  if (req.method === "POST") res.status(200).json("POST 완");
  if (req.method === "GET") res.status(200).json("GET 완");
}

/** 서버가 필요해
 * 유저의 입력을 바로 DB에 저장하면 위험하다.
 *   -> 악성 코드나 유효하지 않은 값이 저장될 수 있음.
 * DB에서 바로 유저에게 deliver하는 것도 위험하다.
 *   -> 민감한 정보들도 출력해버릴 수 있음.
 *
 * 따라서 유저 + DB 입출력이 필요할 때는 그 작업을 안전하게 대리해줄 수 있는 프로그램을 이용
 *   -> 바로 그것이 '서버'
 * 유저의 DB 입출력시에
 */

/** appDir를 이용한 Next.js 앱에서 서버 코드 작성하기
 * 1. api 라우팅을 해야 하는데 app 디렉토리 안에 api 폴더를 만들고 그 안에서 진행하는 방법과
 *   -> /app/api/test.ts
 * 2. app 디렉토리 밖에 pages 디렉토리를 생성하고 그 안에서 api 폴더를 만드는 방법이 있는데
 *   -> /pages/api/test.ts
 *
 * 1번이 비교적 최신 문법이지만 아직 불안정하므로 안되는 기능들이 많음;
 * 안정화 될 때까지는 2번 문법으로 사용하자.
 */
