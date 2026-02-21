# 컴포넌트 상태 매트릭스

작성일: 2026-02-21

## Input
- default: 기본 테두리/본문 컬러
- focused: primary 보더 강조
- error: error 보더 + error helper 텍스트
- filled: 값이 있을 때 기본 보더 유지(비어있음과 구분)
- disabled: 비활성 배경 + disabled 텍스트

우선순위: `disabled > error > focused > filled > default`

## Button
- default: variant(primary/secondary/ghost) 기본 표현
- pressed: 눌림 시 opacity 감소
- loading: 스피너 노출 + 버튼 비활성
- disabled: opacity 감소 + 상호작용 차단

공통 정책: 최소 터치 높이 44px(`min-h-11`)

## Chip
- default: 기본 카드형 칩
- selected: 선택 상태(배경/보더/텍스트 강조)
- pressed: 눌림 시 opacity 감소
- disabled: 비활성 텍스트 + opacity + 상호작용 차단

## 접근성 기본 정책
- Button/Chip: `accessibilityRole="button"`
- Button: 라벨 기본값 = title, loading 시 busy 상태 노출
- Chip: 라벨 기본값 = label, disabled 시 상태 노출
- Input: `label`이 있으면 기본 접근성 라벨로 사용
