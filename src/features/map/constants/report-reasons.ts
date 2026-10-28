/** 신고 사유. 와이어프레임 ①-B 신고 창 문구 그대로. 서버에 보낼 때는 id를 쓴다. */
export const reportReasons = [
  { id: 'privacy', label: '얼굴이나 개인정보가 보여요' },
  { id: 'private-space', label: '남의 집·사적인 공간이에요' },
  { id: 'inappropriate', label: '불쾌하거나 부적절한 사진이에요' },
  { id: 'advertising', label: '광고·홍보 같아요' },
  { id: 'other', label: '기타' },
] as const;

export type ReportReasonId = (typeof reportReasons)[number]['id'];
