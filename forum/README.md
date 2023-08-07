## Build

- build
  - Next.js로 만든 서버를 배포하기 위해서는 빌드 작업을 먼저 수행해야 한다. <br/>
    -> 리액트 문법, TypeScript 코드를 브라우저 친화적인 html, js, css 파일로 변환하는 작업 <br/>
    -> yarn build (또는 npm run build) 명령어 사용 <br/>
    <br/>
  - 빌드를 수행한 후에 빌드 파일을 실행하면 실제 유저 요청을 처리할 수 있는 Next.js 서버 완성 <br/>
    -> 실제로 운영할거면 AWS 등의 클라우드에 올려서 start 해놓으면 됨. <br/>
    -> yarn start (또는 npm run start) 명령어 사용 <br/>

### static / dynamic rendering

터미널에서 빌드 수행시 아래와 같은 빌드 결과가 나타난다.

```sh
yarn run v1.22.19
$ next build

                    ...

info  - Generating static pages (8/8)
info  - Finalizing page optimization

Route (app)                                Size     First Load JS
┌ ○ /                                      150 B          74.3 kB
├ ○ /api/hello                             0 B                0 B
├ λ /detail/[id]                           152 B          74.3 kB
├ λ /edit/[id]                             150 B          74.3 kB
├ ○ /favicon.ico                           0 B                0 B
├ ○ /list                                  1.1 kB         80.7 kB
├ ○ /signIn                                150 B          74.3 kB
└ ○ /write                                 151 B          74.3 kB
+ First Load JS shared by all              74.1 kB
  ├ chunks/2443530c-cdafa828f3e7cc6d.js    50.2 kB
  ├ chunks/961-c842447005b6b281.js         22 kB
  ├ chunks/main-app-3b4752e954a0869b.js    215 B
  └ chunks/webpack-92e22b575a99b115.js     1.68 kB

Route (pages)                              Size     First Load JS
┌ ○ /404                                   178 B            86 kB
├ λ /api/list                              0 B            85.8 kB
├ λ /api/list/[id]                         0 B            85.8 kB
├ λ /api/now                               0 B            85.8 kB
├ λ /api/signin                            0 B            85.8 kB
└ λ /api/test                              0 B            85.8 kB
+ First Load JS shared by all              85.8 kB
  ├ chunks/main-ec4cbd2930c0099f.js        84 kB
  ├ chunks/pages/_app-c544d6df833bfd4a.js  192 B
  └ chunks/webpack-92e22b575a99b115.js     1.68 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)

```

Next.js 구 버전에서 SSG, ISR 등으로 설명되던 기능들이 버전 업데이트 되면서 바뀜

1. Next.js에서 페이지를 만들면 기본적으로 `static rendering`으로 페이지 보여줌 <br/>
   -> 페이지에 `fetch` 등의 함수가 없으면 static rendering <br/>
   -> build시 생성되는 html 페이지를 유저 접속시마다 그대로 보내준다. <br/>
   -> 매번 새 html 파일이 생성되는 것이 아니라 하나로 계속 사용 <br/>
2. 페이지에서 아래의 사항이 사용되면 `dynamic rendering`으로 페이지 보여줌 <br/>
   -> fetch('/URL', { cache: 'no-store' }) <br/>
   -> `useSearchParams()`, `cookies()`, `headers()` <br/>
   -> [dynamic route] <br/>
   <br/>
   -> build시에 html이 생성되지만 유저가 페이지 접속시 변동사항이 반영되어야 하기 때문에 <br/>
   접속시마다 html 페이지를 서버에서 다시 생성해줌

위의 빌드 결과에서 λ(람다) 표시와 ○ 표시로 각각의 페이지들이 나타나는데 <br/>
각각의 의미는 다음과 같다. <br/>
`λ`: dynamic rendering <br/>
`○`: static rendering <br/>
(참고) 최상위 layout.js에서 `getServerSession()`을 쓰면 모든 페이지가 `λ`로 작동할 수 있음.

/list 같은 페이지는 글의 리스트가 매번 바뀔 수 있기 때문에 `○`이 아니라 `λ`로 작동해야 함 <br/>
이를 방지하기 위해 `dynamic rendering`을 적용하고 싶은 페이지에서 아래 코드를 추가하면 <br/>
`dynamic rendering` 페이지로 빌드할 수 있다. <br/>

```js
export const dynamic = "force-dynamic";
```

`dynamic` 변수의 기본 값은 "auto"이며 <br/>
"force-static"으로 작성하면 static rendering되는 페이지로 빌드됨. <br/>

### caching

`dynamic rendering`으로 작동하는 페이지가 많아지면 <br/>
유저 방문시마다 다시 페이지를 그려야 하므로 서버의 부담이 심해질 수 있다. <br/>
-> 캐싱 기능 이용하면 됨. <br/>

- caching

  - 데이터를 잠깐 저장해두고 재사용하는 것
    -> 비용 절약, 속도 향상에 도움이 될 수 있음.
  - 1초마다 변하는 실시간 데이터가 중요한 페이지의 경우 캐싱 사용 x
  - 일반 게시판처럼 몇 초 단위의 실시간 데이터의 중요도가 낮은 경우 캐싱 사용 o

- GET 요청 결과 캐싱

  - 아래와 같이 컴포넌트 안에서 데이터 페칭시
    { cache: 'force-cache' } 옵션을 주면 캐싱 기능을 사용할 수 있다.
    ```js
    export default async function Page() {
      let result = await fetch("/api/어쩌구", { cache: "force-cache" });
    }
    ```
  - 서버 API는 DB 응답을 기다릴 필요 없이 빠르게 저장된(캐싱된) 데이터를 가져올 수 있음.
  - 사이트를 다시 build 하기 전까지 캐싱된 데이터를 계속 보여준다. <br/>
    (참고) 저 옵션은 적지 않아도 default가 cache: 'force-cache'임 <br/>
    <br/>
  - revalidate 옵션을 적용하면 해당 초만큼 캐싱 결과를 보관/사용한다. <br/>
    해당 시간이 지나면 다시 요청해서 새로운 결과를 가져오고 캐싱한다. <br/>
    ```js
    fetch("/URL", { next: { revalidate: 60 } });
    ```
  - 캐싱 기능을 사용하지 않으려면 다음과 같이 사용하면 된다.
    ```js
    fetch("/URL", { cache: "no-store" });
    ```
  - 이러한 옵션들은 Next.js에서 바닐라 자바스크립트의 `fetch()` 함수를 업그레이드해서 사용 가능한 문법임. <br/>
    -> server component 안에서만 캐싱기능 사용이 가능하다

- 페이지 단위 캐싱은 `revalidate` 변수 사용

  - forum 프로젝트에서 처럼 DB를 직접 접근하는 프로젝트의 경우는 `fetch()`를 사용하지 않는데 <br/>
    이럴때는 두가지 방법으로 캐싱을 적용할 수 있다. <br/>

    1. GET 요청시 DB 데이터를 가져오는 서버 API를 만들어서 `fetch()`사용
    2. revalidate 옵션을 설정하여 페이지단위 캐싱 적용(구버전의 ISR) <br/>
       validate 옵션 예시

    ```js
    export const revalidate = 60;

    export default function Page() {
      ~ DB 입출력 코드 ~
      return (
        <div>내용<div>
      )
    }
    ```

    (참고) 60초 지나기 전에 페이지를 새로 만들라는 명령을 줄 수도 있다. <br/>
    -> on-demand revalidation 참고 <br/>
    -> /list 페이지에 60초 캐싱을 주면 새 글을 작성해도 60초 지나기 전에는 새 글이 안보이는데 <br/>
    on-demand revalidation을 사용하면 /list의 캐시를 새로 생성할 수 있다. <br/>

    (참고) 서버 API 기능을 만들 때도 revalidation 옵션이 사용 가능하다.

    (참고) 여러 컴포넌트에서 같은 /url로 fetch 요청을 보내도 자동으로 중복 제거 됨. <br/>
    -> 비효율 문제는 크게 발생하지 않는다. <br/>
    -> 변수, state 공유 문제 해결
