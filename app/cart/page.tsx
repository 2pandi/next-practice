// "use client"; // -> 이 파일안에 있는 모든 컴포넌트가 client component가 됨.

export default function Cart() {
  return (
    <div>
      <h4 className="title">Cart</h4>
      <div className="cart-item">
        <p>상품명</p>
        <p>$40</p>
        <p>1개</p>
      </div>
      <div className="cart-item">
        <p>상품명</p>
        <p>$40</p>
        <p>1개</p>
      </div>
    </div>
  );
}

/** server / client component
 * next.js의 컴포넌트는 server compenent와 client component로 나뉘는데
 * 파일 맨 위에 'use client'라고 적고 컴포넌트를 정의하면 client component가 되고
 * 그게 아닌 경우는 모두 server component이다.
 * (컴포넌트 선언 중간에 넣는다고 일부만 적용되고 그런거 없음.)
 *
 * Server Component (client component와 비교)
 *   - html에 자바스크립트 기능 넣기 불가능
 *     (onClick 등의 상호작용 같은 것들..)
 *   - useState, useEffect 등 사용 불가
 *   - 로딩 속도가 빠름
 *     (페이지 로드에 필요한 js의 양이 적어지기 때문)
 *   - 검색엔진 노출에 유리(SEO)
 *
 * Client Component
 *   - 로딩 속도가 느림
 *     ( 1. 페이지 로드에 필요한 js의 양이 많음
 *       2. hydration이 필요함
 *         -> hydration: html을 유저에게 보낸 후 js로 html을 다시 읽고 분석하는 것 )
 *
 * 결론 >
 * 1. 큰 페이지는 server component로 만드는 것이 낫다
 * 2. js 기능이 필요한 경우 필요한 부분만 client component로 만들기
 */
