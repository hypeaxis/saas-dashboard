# Đặc tả dự án: TaskMaster - SaaS Task Management Dashboard

## 1. Tổng quan dự án (Overview)
**TaskMaster** là một ứng dụng SaaS quản lý công việc (tương tự Trello, Jira) dành cho doanh nghiệp. Ứng dụng cung cấp giao diện quản trị (Dashboard) chuyên nghiệp giúp người dùng theo dõi tiến độ, quản lý các tác vụ (CRUD) và phân tích hiệu suất làm việc.

**Tầm nhìn thiết kế (Creative North Star):** Tuân thủ triết lý **"The Digital Architect"**. Giao diện được thiết kế như một không gian làm việc vật lý cao cấp, hướng tới sự "Tối giản tinh tế" (Sophisticated Reduction). Ứng dụng sẽ có cảm giác "tĩnh lặng" nhưng "đắt tiền", với không gian trắng (white space) ấn tượng, sự bất đối xứng có chủ ý và phân cấp thông tin qua chiều sâu không gian (tonal depth).

---

## 2. Tech Stack & Thư viện
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **State Management:** Jotai
- **Form & Validation:** React Hook Form + Zod
- **Data Visualization:** Highcharts

---

## 3. Cấu trúc dữ liệu (Data Models)

```typescript
export type Status = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
};

export type Activity = {
  id: string;
  type: "create" | "update" | "delete";
  taskId: string;
  message: string;
  createdAt: string;
};
```

---

## 4. Quản lý State (Jotai)
Sử dụng Jotai để quản lý trạng thái tác vụ và bộ lọc trên toàn ứng dụng.

```typescript
import { atom } from 'jotai';
import { Task } from './types';

// State lưu trữ danh sách tasks
export const tasksAtom = atom<Task[]>([]);

// State lưu trữ trạng thái filter & search
export const filterAtom = atom<string>('all'); // 'all' | 'todo' | 'doing' | 'done'
export const searchAtom = atom<string>('');

// Derived atom để tự động trả về danh sách task đã được filter & search
export const filteredTasksAtom = atom((get) => {
  const tasks = get(tasksAtom);
  const filter = get(filterAtom);
  const search = get(searchAtom).toLowerCase();

  return tasks.filter(task => {
    const matchStatus = filter === 'all' || task.status === filter;
    const matchSearch = task.title.toLowerCase().includes(search);
    return matchStatus && matchSearch;
  });
});
```

---

## 5. Đặc tả tính năng (Features Flow)
1. **Login (NextAuth):** Xác thực người dùng (Google/Credentials) trước khi vào hệ thống.
2. **Dashboard:** Hiển thị tổng quan số lượng Task (Tổng/Đang thực hiện/Hoàn thành/Quá hạn), danh sách task mới nhất và Activity feed.
3. **Task List:** Hiển thị dữ liệu dạng bảng với các cột Title, Status, Priority, Deadline, Actions. Cho phép Filter theo trạng thái và Search theo tiêu đề.
4. **Create / Edit Task:** Modal sử dụng `React Hook Form` kết hợp `Zod` validation (Title tối thiểu 3 ký tự, Deadline là ngày hợp lệ). Cập nhật trực tiếp vào `tasksAtom`.
5. **Delete Task:** Hiển thị Confirm dialog trước khi xóa.
6. **Analytics:** Dùng Highcharts để vẽ biểu đồ thống kê (Completion rate, Priority distribution).

---

## 6. Hệ thống thiết kế chi tiết: The Architectural Minimalist

Giao diện cần tuân thủ nghiêm ngặt file thiết kế `DESIGN.md`.

### 6.1. Màu sắc & Chiều sâu không gian (Colors & Tonal Depth)
- **Palette chính:** `primary` (`#0058be`), `primary_container` (`#2170e4`), `surface` (`#faf8ff`), `tertiary` (`#924700`).
- **Quy tắc "Không viền" (The "No-Line" Rule):** Nghiêm cấm sử dụng viền solid 1px để chia layout. Phân tách không gian bằng sự thay đổi sắc độ nền (background shifts), ví dụ: sidebar nền `surface_container_low` đặt cạnh nội dung chính nền `surface`.
- **Quy tắc Glass & Gradient:** Nút CTA chính dùng linear gradient `primary` → `primary_container`. Các menu nổi dùng Glassmorphism: Nền `surface_container_lowest` + 80% opacity + 12px Backdrop Blur.

### 6.2. Typography (Editorial Voice)
Sử dụng font chữ **Inter** với tính phân cấp mạnh mẽ giống như các ấn bản tạp chí:
- **Display LG:** 3.5rem, Bold (700) (Dành cho Data milestones, text to).
- **Headline MD:** 1.75rem, Semi (600) (Tiêu đề trang).
- **Title SM:** 1rem, Medium (500) (Tiêu đề Card, Danh sách).
- **Body MD:** 0.875rem, Regular (400) (Chữ nội dung bình thường).
- **Label SM:** 0.6875rem, Bold (600), in hoa (All-caps) kèm khoảng cách chữ `0.05em` (Dành cho thẻ tag, meta). Không sử dụng khoảng cách chữ (tracking) mặc định của font.

### 6.3. Đổ bóng & Đổ lớp (Elevation & Depth)
- **Tonal Layering:** Dùng cấu trúc tầng: `surface` (Base) -> `surface_container_low` (Nav) -> `surface_container_lowest` (Cards) -> `surface_container_high` (Active elements).
- **Ambient Shadows:** Không dùng đổ bóng đen đậm. Cấu hình đổ bóng chuẩn: `0px 4px 24px -2px` với màu `on_surface` (chỉ 4%–6% opacity).
- **Ghost Border:** Nếu bắt buộc cần viền cho accessibility, dùng `outline_variant` với độ mờ 15%.

### 6.4. Hướng dẫn UI Components
- **Buttons:** Nút Primary dùng nền màu `primary`, text `on_primary`, không viền, đổ bóng chìm (inner shadow) `2px` ở cạnh trên để tạo cảm giác chạm vật lý. Nút Tertiary dùng style trong suốt (Ghost style).
- **Cards & Lists (Quy tắc không gian trắng):** KHÔNG dùng đường kẻ chia (divider lines) giữa các item trong list. Sử dụng padding dọc từ `16px`–`24px` hoặc đổi màu nền khi hover để phân tách.
- **Inputs:** Trạng thái mặc định dùng nền `surface_container_low`, bo góc `sm` (`0.25rem`). Trạng thái focus: viền liền `2px primary`, tuyệt đối không dùng hiệu ứng phát sáng (no "glow").

### 6.5. Quy chuẩn bo góc (Roundedness Scale)
- **Small (sm):** `0.25rem` (Inputs, tooltips).
- **Default:** `0.5rem` (Cards tiêu chuẩn, nút bấm).
- **Large (lg):** `1rem` (Các container chính lớn, modals).
- **Full:** `9999px` (Pills, badges trạng thái công việc).