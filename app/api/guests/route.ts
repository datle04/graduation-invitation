import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 giờ
const ipLog = new Map<string, { count: number; resetAt: number }>();

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipLog.get(ip);
  if (!entry || now > entry.resetAt) {
    ipLog.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

const PHONE_REGEX = /^(\+84|0)[0-9]{9,10}$/;
const RSVP_VALUES = ["attending", "not_attending", "maybe"] as const;

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Bạn đã gửi quá nhiều lần. Vui lòng thử lại sau 1 giờ." },
      { status: 429 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ success: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  const rsvpStatus = body.rsvpStatus;
  const message = typeof body.message === "string" ? body.message.trim() : undefined;
  const phone = typeof body.phone === "string" ? body.phone.trim() : undefined;

  if (fullName.length < 2 || fullName.length > 50) {
    return NextResponse.json({ success: false, error: "Tên phải từ 2 đến 50 ký tự." }, { status: 400 });
  }

  if (!RSVP_VALUES.includes(rsvpStatus)) {
    return NextResponse.json({ success: false, error: "Trạng thái tham dự không hợp lệ." }, { status: 400 });
  }

  if (message && message.length > 200) {
    return NextResponse.json({ success: false, error: "Lời chúc tối đa 200 ký tự." }, { status: 400 });
  }

  if (phone && !PHONE_REGEX.test(phone)) {
    return NextResponse.json({ success: false, error: "Số điện thoại không hợp lệ." }, { status: 400 });
  }

  const guest = await prisma.guest.create({
    data: {
      fullName,
      rsvpStatus,
      message: message || null,
      phone: phone || null,
      ipAddress: ip,
    },
    select: { id: true, fullName: true, rsvpStatus: true },
  });

  return NextResponse.json({ success: true, data: guest }, { status: 201 });
}
