# next.js-practice

## Pre-rendering

pages 폴더 안에 기재된 파일 이름 대로(또는 index.ts를 포함한 디렉토리 이름 대로) </br>
자동으로 routing 기능이 적용됨.

</br>
예) src/pages/about.ts </br>
localhost:3000/about 에서 해당 파일내의 컴포넌트를 출력해줌. </br>
컴포넌트의 이름은 상관이 없다. Home이든 Potato든 ... </br>
컴포넌트는 default로 export 되어야 한다. </br>

만약에 user가 존재하지 않는 url로 요청한다면 </br>
next.js가 자체적으로 404 페이지를 보여줌. (CRA는 404페이지 따로 만들어야됨...) </br>

### exception

1. src/pages/index.ts는 localhost:3000/ 에서 나타난다. </br>
   -> localhost:3000/index 아님. 404 뜸 </br>
2. tsx 확장자가 아니더라도 tsx가 적용 가능함. + react를 import하지 않아도 됨. </br>
   -> 안되는데..?? 흠.. </br>
3. CRA는 CSR용 라이브러리로 html 파일을 열어봤을 때 빈 div 객체만 있지만 </br>
   next.js는 pre-rendering 기능이 있어서 미리 내용을 담아서 html을 만들어준다. (hydration) </br>
   SEO에 매우 좋은 기능임. </br>

## Routing

이전에는 Link 컴포넌트 안에 a태그를 넣어도 실행이 가능했고 </br>
Link 컴포넌트에 직접 style이나 className 설정이 불가능했으나(a 태그에 적용해야 함) </br>
next.js 13버전 업데이트 이후 이 모든 것이 가능해졌다. 😎 </br>
해당 버전 이후에는 Link 안에 a 태그 사용하면 에러남. </br>

## CSS Module

`[파일명].module.css`의 형식으로 CSS Module을 만들 수 있다. </br>
파일명은 반드시 컴포넌트의 이름이나 endpoint와 동일해야할 필요는 없다.(module만 붙으면 됨) </br>
이를 컴포넌트에 적용하기 위해서는 className을 붙여주면 되는데 </br>
일반 CSS가 아닌 CSS 모듈이므로 아래와 같이 사용해야 한다. </br>

```jsx
import styles from "./NavBar.module.scss

export default function NavBar() {
   return (
      ...
      <nav className={styles.nav}>
      ...
   )
}
```

</br>

만약 하나의 태그에 여러개의 class를 적용하고 싶다면 `${}`를 사용하거나 </br>
배열에 `.join(' ')`을 사용하는 방법을 사용해야 한다. </br>
</br>
별로 깔끔하지는 않은 방법이다. </br>

## Styles JSX

컴포넌트 내부에서 `<style>` 태그를 추가하여 js 파일 내부에서 css를 적용할 수 있다. </br>
만약 컴포넌트를 포함한 상위 컴포넌트에서 `<style>` 태그로 css를 적용하려고 한다면 </br>
제대로 적용되지 않을 수 있다. (해당 style은 해당 컴포넌트 내부로만 범위가 한정됨.) </br>

```js
<style jsx>{`
  nav {
    background-color: pink;
  }
`}</style>
```

## Global style(Custom App)

위에서 언급했듯 JSX로 스타일링하는 것은 한정된 스코프단위로 적용되어 </br>
부모 컴포넌트에서 스타일을 적용했을 때 자식컴포넌트에 스타일이 적용되지 않는다.</br>
이를 해결하기 위해서는 `<style>` 태그에 `global`옵션을 추가하는 것이다. </br>

```js
<style jsx global>{`
  nav {
    background-color: pink;
  }
`}</style>
```

하지만 동일한 자식 컴포넌트를 여러 페이지에서 사용하게 된다면</br>
페이지별로 이를 적용해주어야 하는 문제점이 있다. (페이지 단위로 스타일링)</br>
</br>

모든 페이지에서 global style을 적용하기 위해서는 </br>
우선적으로 `pages/_app.tsx` 파일을 생성해야 한다. (이름은 반드시 `_app`이어야 함)</br>
next.js는 다른 페이지들(index포함)을 렌더링하기 전에 가장 먼저 `_app`을 보기 때문이다.</br>
TS에서 기본적인 `_app.tsx`의 모습은 다음과 같다.</br>

```jsx
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

위에서 `Component`는 pages 디렉토리에 있는 각 페이지 컴포넌트를 의미한다.</br>
next.js로 생성한 앱에서 모든 페이지의 구조가 `_app.tsx`와 같이 나타나는 것이다.</br>
예를 들어 모든 페이지에서 `NavBar`라는 컴포넌트를 출력하고 싶다면 아래와 같이 `_app.tsx`에 작성하면 된다.</br>

```jsx
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}
```

그리고 `_app.tsx`에서 위의 예제처럼 `global` 옵션을 적용한다면</br>
진정한 의미의 global style을 적용할 수 있게 된다.</br>
또한 `styles/globals.css` 파일을 `_app.tsx`에서 import 하여 사용할 수도 있다.</br>
`_app.tsx`이외의 컴포넌트나 페이지에서는 `globals.css`를 import할 수 없고 </br>
오로지 module만 import할 수 있다.</br>

## Redirect and Rewrite

next.js 앱에서 사용자가 특정 end-point로 접근하려고 할 때</br>
사용자를 redirect 시켜주기 위해서는 `redirects` 기능을 사용할 수 있다.</br>
</br>
이를 설정하기 위해서는 `next.config.js`에서 redirects 설정을 해주면 된다.</br>
예를 들어 `/old`라는 end-point로 접속했을 때 `/new`라는 end-point로 redirect 시키려고 한다면</br>
`nextConfig` 객체 안에 아래와 같이 작성해주면 된다.</br>

```js
const nextConfig = {
  reactStrictMode: true, // 기본설정 값
  async redirects() {
    return [
      {
        source: "/old", // "/old"로 접속을 하면 (incoming request)
        destination: "/new", // "/new"으로 리다이렉트 (redirect to)
        permanent: false, // 주소가 영원히 바뀐거라면 true, 임시적으로 바뀐거라면 false로 설정해준다.
      },
    ];
  },
};
```

end-point는 변경되고 그 뒤에 path는 동일하게 유지해야 하는 경우에는 아래와 같이 작성하면 된다.</br>

```js
const nextConfig = {
  reactStrictMode: true, // 기본설정 값
  async redirects() {
    return [
      {
        source: "/old/:path*", // path가 아니라 다른 임의의 문구를 넣어도 됨.
        destination: "/new/:path*", // 뒤에 있는 *(와일드카드)는 nested path인 경우에 넣어주면 된다.
        permanent: false,
      },
    ];
  },
};
```

만약 redirect 조건을 두개 이상 추가하고 싶다면 배열 내에 새로운 객체로 작성해주면 된다.</br>

api 요청 등을 보낼 때 요청 주소에 api key가 포함되어 있는 등의 보안이 필요한 사항이 있다면</br>
next.js의 `rewrites` 기능을 사용하면 된다.</br>
</br>
redirects 기능을 사용하면 사용자가 바뀐 url을 확인할 수 있지만</br>
rewrites 기능을 사용하면 바뀐 url을 사용자에게 알리지 않고 redirect 시킬 수 있다.</br>

```js
... nextConfig 상세내용 생략

async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`,
      },
    ];
  },
```

이렇게 하면 network 탭에서도 masking된 주소가 나타나므로</br>
중요한 key 등의 정보를 숨길 수 있다.</br>

## Server Side Rendering(SSR)

API fetching 데이터를 포함한 전체 페이지를 SSR 방식으로 구현하고자 한다면</br>
`getServerSideProps` 함수를 사용하면 된다.</br>

```js
export async function getServerSideProps() {
  const { results } = await (
    await fetch("http://localhost:3000/api/movies")
  ).json();
  return {
    props: { results },
  };
}
```

이 함수를 사용하기 위해서는 반드시 export 해야 하고</br>
함수의 이름도 `getServerSideProps`로 반드시 작성해야 한다.</br>
이 함수는 client가 아니라 server환경에서 실행되므로</br>
API key 등을 숨기는데도 유용하게 사용할 수 있다.</br>
(요청 url을 클라이언트에서 확인할 수 없으므로 `rewrites`를 사용할 필요 없음)</br>
함수에서 해야할 일을 정의하고 props 키를 가진 객체를 리턴하면 된다.</br>
async는 해도 되고 안해도 됨.</br>
리턴되는 객체의 props키의 값은 해당 페이지 컴포넌트의 props로 전달된다.</br>
해당 함수는 server 환경에서 실행되므로 client와 다르게 fetch 등의 비동기 요청시 주소를 생략없이 기재해야 한다.</br>

## Dynamic Routes

pages 디렉토리에서 `index`라는 이름으로 컴포넌트를 생성하면 기본 url(/)로 라우팅되고</br>
특정 endpoint로 라우팅하고 싶다면 endpoint를 파일명으로 설정하면 된다.</br>
특정 endpoint에서 특정 path를 적용하고 싶다면 endpoint명으로 디렉토리를 만들고</br>
그 안에 index나 특정 path 이름 또는 `[id].tsx`와 같이 동적 라우팅이 가능하다.</br>
반드시 id라고 적을필요는 없고 다른 변수명으로도 사용할 수 있다.</br>
해당 페이지에서 `useRouter`훅을 이용하여 router를 출력했을때</br>
query안에서 설정한 변수명으로 path를 확인할 수 있다.</br>
ex) [id]로 설정한 경우 query: {id: '1'}</br>
`[...id].tsx`처럼 `...`을 대괄호 안에 넣은 형식으로 만들면</br>
모든 경로를 포착하는 동적 라우팅을 설정할 수 있다.(catch-all-URL)</br>
</br>
`Link` 컴포넌트말고 `router.push`를 사용해서도 페이지를 이동시킬 수 있다. </br>
`Link`는 사용자가 반드시 클릭을 해야지 페이지가 이동되지만</br>
`router.push`는 코드만으로도 사용자의 상호작용을 기다리지 않고 페이지 이동이 가능하다.</br>
또한 아래와 같이 작성하면 url 마스킹도 적용할 수 있다.(이 기능은 Link로도 가능)</br>

```js
const onClick = (id: number) => {
  router.push(
    {
      pathname: `/movies/${id}`,
      query: {
        title: "potato",
      },
    },
    `/movies/${id}`
  );
};

<Link href={{
  pathname: `/movies/${id}`,
  query: {
  title: "potato",
  }}
  as={`/movies/${id}`}
  }>

```

두번째 파라미터 값은 `as`로 전달되는 것인데 마스킹될 주소를 적어주면 된다.</br>
이렇게 하면 페이지 간에 쿼리로 데이터를 전달하지만 사용자에게는 노출시키지 않을 수 있다.</br>
페이지로 전달된 데이터는 `router`를 통해 확인할 수 있다.</br>
위의 경우 `query: {title: 'potato', id: {해당아이디}}`로 나타난다.</br>
</br>
주의할 점은 이는 저 router를 통해서 해당 url에 접속했을 때 적용이 가능하며</br>
해당 url을 직접 브라우저에 입력하여 접속했을 때는 query가 전달되지 않기 때문에</br>
적용할 수 없다는 것이다.</br>
