# Đặc tả dự án: TaskMaster - SaaS Task Management Dashboard

## 1. Tổng quan dự án
TaskMaster là ứng dụng quản lý công việc nội bộ với 4 màn hình chính: Login, Dashboard, Task List, Analytics.

Mục tiêu hiện tại là ổn định luồng CRUD task, đồng bộ số liệu realtime giữa các màn và giữ ngôn ngữ thiết kế theo hệ token The Architectural Minimalist đã triển khai trong mã nguồn.

## 2. Tech stack đang dùng
- Framework: Next.js App Router
- Styling: Tailwind CSS + CSS variables theo token surface
- Authentication: NextAuth (Credentials, tùy chọn Google qua env)
- State management: Jotai
- Form: React Hook Form + Zod
- Chart: Highcharts
- Icon: lucide-react

## 3. Data model chuẩn
```typescript
export type Status = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";
export type ActivityType = "create" | "update" | "delete";

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
  type: ActivityType;
  taskId: string;
  message: string;
  createdAt: string;
};
```

## 4. State management (Jotai)

### 4.1 Atoms cốt lõi
- tasksAtom
- activitiesAtom
- filterAtom
- searchAtom
- filteredTasksAtom

### 4.2 Atoms UI
- taskModalAtom
- taskDetailAtom
- deleteConfirmAtom

### 4.3 Atoms analytics
- priorityCountsAtom
- statusCountsAtom
- completionRateAtom

Ghi chú: dữ liệu chart luôn đọc từ tasksAtom, không tách nguồn dữ liệu riêng.

## 5. Luồng chức năng hiện tại

### 5.1 Authentication
- Route root chuyển hướng theo session:
  - Có session -> /dashboard
  - Không có session -> /login
- Middleware bảo vệ các route:
  - /dashboard
  - /tasks
  - /analytics
- Credentials mặc định cho demo:
  - demo@taskmaster.dev
  - taskmaster123
- Google sign-in chỉ bật khi có GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET.

### 5.2 Dashboard
- KPI: Total, In Progress, Completed, Overdue
- Bảng Recent Tasks (4 task mới nhất)
- Activity feed từ activitiesAtom
- Link View All sang Task List

### 5.3 Task List
- Bảng task gồm cột: Title, Status, Priority, Deadline, Actions
- Search theo title
- Filter theo trạng thái all | todo | doing | done
- Action hiện có:
  - View chi tiết task
  - Delete task
- Create task mở từ nút Create Task
- Edit task thực hiện trong Task Detail modal

### 5.4 Modal và CRUD
- TaskModal hỗ trợ create/edit
- Validate bằng Zod:
  - title tối thiểu 3 ký tự
  - status và priority theo enum hằng
- DeleteConfirmModal xác nhận trước khi xóa
- Mỗi thao tác create/update/delete đều ghi activity mới

### 5.5 Analytics
- KPI cards: Total, Completion Rate, In Progress
- Chart 1: Priority distribution (donut)
- Chart 2: Task status (column)
- Empty-state cho Analytics đang để ở dạng comment, chưa bật ở UI runtime

## 6. Hệ thiết kế as-built

### 6.1 Token màu và surface
- Bộ token chính nằm ở variables.light.css và variables.dark.css
- Surface layering đang dùng:
  - surface
  - surface-container-low
  - surface-container-lowest
  - surface-container-high

### 6.2 Utilities thành phần
- surface-card: card nền sáng + ambient shadow
- surface-panel: panel nền thấp hơn + bo góc lớn
- cta-gradient: gradient primary -> primary-container
- glass-panel: hỗ trợ nền kính (đã có utility, chưa dùng rộng)
- ghost-border: outline variant nhẹ

### 6.3 Typography
- Dùng Inter và hệ class:
  - display-lg
  - headline-md
  - title-sm
  - body-md
  - label-sm

### 6.4 Quy ước viền hiện tại
- Ưu tiên phân lớp bằng surface và shadow thay vì viền đậm
- Tuy nhiên một số khu vực vẫn dùng border nhẹ để tăng khả năng đọc:
  - header table
  - footer table
  - modal section split
  - analytics card

## 7. Tiêu chí nghiệm thu hiện tại
- 4 màn Login/Dashboard/Tasks/Analytics chạy xuyên suốt với guard auth
- CRUD task hoạt động và đồng bộ số liệu trên Dashboard + Tasks + Analytics
- Enum status/priority dùng chữ thường thống nhất toàn codebase
- Theme light/dark hoạt động với cùng hệ token

## 8. Phần chưa hoàn thiện
- Chưa có lịch sử đầy đủ cho nút View Full History ở Dashboard
- Chưa có phân trang thật cho Task List (nút Previous/Next đang disabled)
- Analytics chưa có biểu đồ theo timeline