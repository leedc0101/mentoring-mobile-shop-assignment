# Assignment Guide

프론트엔드 멘토링 선택형 과제 starter입니다. 데스크탑 쇼핑몰처럼 크게 만들지 않고, 모바일 화면에서 상품 목록 -> 장바구니 -> 주문 생성 흐름만 다룹니다.

UI와 MSW mock API는 준비되어 있습니다. 과제의 핵심은 화면을 새로 예쁘게 만드는 것이 아니라, 제공된 UI를 실제 API 흐름에 연결하고 상태/비동기/에러 경계를 설계하는 것입니다.

## 화면 구조

- / : 상품 목록
- /products/:productId : 상품 상세
- /cart : 장바구니
- /orders/latest : 주문 완료

## 과제

현재 화면은 라우트 4개로 나뉘어 있고, 대부분 정적인 JSX와 하드코딩 데이터로만 구성되어 있습니다. 배열/map/reduce 같은 렌더링 로직도 최대한 빼두었으니, API를 붙이면서 필요한 상태, 로딩/에러 처리, 장바구니 변경 흐름을 직접 설계하세요.

구현할 흐름:

- 상품 목록을 GET /api/products 로 불러오기
- 장바구니를 GET /api/cart 로 불러오기
- 상품 담기: POST /api/cart/items
- 수량 변경: PATCH /api/cart/items/:productId
- 상품 제거: DELETE /api/cart/items/:productId
- 주문 생성: POST /api/orders

함께 처리하면 좋은 것:

- 첫 로딩, 부분 로딩, 에러 상태
- 장바구니가 비어 있을 때
- 같은 상품을 빠르게 여러 번 담는 경우
- 재고보다 많이 담으려는 경우
- 주문 중 중복 클릭 방지
- API 응답 타입과 UI 타입의 경계 분리

## 제약

- src/App.tsx 는 라우터 선언만 담당합니다. 라우트 구조를 유지한 채 기능을 붙이세요.
- src/pages, src/layout, src/api 의 책임을 분리해서 작업하세요.
- src/App.css 는 큰 수정 없이 사용하세요.
- 디자인 완성도보다 데이터 흐름과 사용자 상태 처리를 우선합니다.
- starter의 하드코딩 JSX를 유지할 필요는 없습니다. API 연결 과정에서 데이터 구조, map 렌더링, 상태 관리를 직접 도입하세요.
- React Query, SWR, Zustand 등 도구를 써도 됩니다. 단, 선택 이유를 README에 짧게 남기세요.
- 정답은 하나가 아닙니다. 리뷰에서는 trade-off를 같이 봅니다.

## 리뷰 관점

- 컴포넌트 책임이 적절히 나뉘었는가
- 라우트별 페이지와 공통 레이아웃의 책임이 분리되어 있는가
- API 호출, 캐시/상태, UI 표시가 뒤섞이지 않았는가
- loading/error/empty 상태가 사용자 흐름을 깨지 않는가
- 중복 요청과 stock conflict를 방어하는가
- 타입과 함수 이름이 읽기 쉬운가
