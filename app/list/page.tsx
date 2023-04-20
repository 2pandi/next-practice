import Image from "next/image";
import 도마도 from "@/public/food0.png";
import 빠스따 from "@/public/food1.png";
import 꼬꼬넛 from "@/public/food2.png";

const List = () => {
  let 상품 = ["Tomato", "Pasta", "Coconut"];
  return (
    <div>
      <h4 className="title">상품목록</h4>
      {상품.map((item, idx) => (
        <div className="food" key={idx}>
          {/**
          public 폴더에 있는 파일은 애플리케이션 배포시
          root 경로로 자동으로 이동하기 때문에
          src에서 슬래시(/)로 시작하도록 적어주면 잘 렌더링 된다.
          */}
          <Image
            className="food-img"
            // src={require(`/public/food${idx}.png`)}
            src={`/food${idx}.png`}
            // src={도마도}
            alt={item}
            width={500}
            height={500}
          />
          <h4>{item} $40</h4>
        </div>
      ))}
    </div>
  );
};

export default List;

/**
 * 이미지 최적화하기
 *   1. lazy loading
 *   2. 사이즈 최적화
 *   3. layout shift 방지 -> 로딩전/후에 레이아웃이 밀리는 현상
 *
 * Next.js에서 이미지 최적화 하려면 <Image /> (from 'next/image') 사용하면 됨
 * src에 들어갈 이미지는 경로를 적으면 안되고 반드시 import 해야 한다.
 *    -이미지의 사이즈를 import된 파일을 기준으로 판단하기 때문에
 *     경로로 적으면 빌드시 최적화가 안될 수 있음
 *
 * <Image/>의 단점)
 *   1. 지금 상황처럼 반복문으로 이미지를 불러오는 경우에 좀 귀찮아질 수 있음.
 *      - src안에 require('이미지경로') 이런거 써야 함
 *   2. 로컬에 있는 파일이 아니라 인터넷에 있는 파일인 경우 귀찮아질 수 있음.
 *      - width, height 무조건 넣어줘야 함
 *      - next.config.js 셋팅도 필요함 (해당 파일 내에 예제 있음)
 */
