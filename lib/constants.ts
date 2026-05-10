export const EVENT = {
  name: "Lê Tấn Đạt",
  school: "Đại học Nguyễn Tất Thành",
  faculty: "Khoa CNTT",
  major: "Kỹ thuật Công nghệ Thông tin",
  date: process.env.NEXT_PUBLIC_EVENT_DATE ?? null,
  location: process.env.NEXT_PUBLIC_EVENT_LOCATION ?? "Chưa cập nhật",
  address: process.env.NEXT_PUBLIC_EVENT_ADDRESS ?? "Chưa cập nhật",
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL ?? "",
} as const;
