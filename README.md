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
