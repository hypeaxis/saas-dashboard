# Kế hoạch triển khai UI TaskMaster

## 1. Mục tiêu và ràng buộc
- Ưu tiên đặc tả trong `Docs/SRS.md` và `Docs/DESIGN.md` hơn việc clone 100% mockup.
- Giữ đúng cấu trúc state cốt lõi theo SRS: `tasksAtom`, `filterAtom`, `searchAtom`, `filteredTasksAtom`.
- Giữ đúng data model:
  - `Status`: `todo | doing | done`
  - `Priority`: `low | medium | high`
- Có thể thêm modal phụ trợ (edit/delete confirm) nhưng không thay đổi cấu trúc state cốt lõi và model.

## 2. Phạm vi màn hình
- Login
- Dashboard
- Task List
- Analytics
- Create Task Modal (dùng chung)
- Edit Task Modal (thêm mới)
- Delete Confirm Dialog (thêm mới)

Nguồn tham chiếu mockup:
- `Docs/UI_mockup/dashboard_screen/code.html`
- `Docs/UI_mockup/tasklist_screen/code.html`
- `Docs/UI_mockup/analystic_screen/code.html`
- `Docs/UI_mockup/create_task_modal/code.html`

## 3. Kiến trúc điều hướng và app shell
- Dùng App Router với 1 shared layout cho khu vực dashboard.
- Tách route đăng nhập riêng, không dùng sidebar/topbar của dashboard.
- Tách thành các route riêng:
  - Login screen
  - Dashboard screen
  - Task list screen
  - Analytics screen
- Sidebar + Topbar dùng chung, active state theo route.
- Nút `New Task` ở Topbar mở chung 1 modal create task.
- Route guard theo phiên đăng nhập:
  - Chưa đăng nhập -> chỉ vào được trang Login.
  - Đã đăng nhập -> chuyển từ Login vào Dashboard.

## 3.1 Kế hoạch xác thực (NextAuth)
- Provider theo SRS:
  - Google
  - Credentials
- Session strategy dùng JWT cho MVP dashboard.
- Middleware bảo vệ toàn bộ route app nội bộ.
- Cấu hình redirect sau đăng nhập và sau đăng xuất.
- UI đăng nhập cần hiển thị rõ trạng thái lỗi xác thực (sai tài khoản/mật khẩu, từ chối OAuth).

## 4. Data model và state (Jotai)
### 4.1 Core model
- `Task`
- `Activity`
- `Status`
- `Priority`

### 4.2 Core atoms (bắt buộc giữ)
- `tasksAtom`
- `filterAtom`
- `searchAtom`
- `filteredTasksAtom`

### 4.3 UI atoms bổ sung (không phá core)
- `taskModalAtom` (open/close, create/edit mode)
- `selectedTaskIdAtom`
- `deleteConfirmAtom`
- `analyticsRangeAtom`

### 4.4 Derived atoms bổ sung
- KPI dashboard: total/doing/done/overdue
- Recent tasks
- Priority distribution
- Completion rate
- Chuỗi dữ liệu chart theo thời gian

## 5. Kế hoạch theo từng màn
### 5.0 Login
- Màn hình đăng nhập tối giản theo ngôn ngữ thiết kế "The Architectural Minimalist".
- Thành phần chính:
  - Form credentials (email + password)
  - Nút đăng nhập Google
  - Nút submit + trạng thái loading
  - Khu vực lỗi xác thực
- Hành vi:
  - Submit thành công -> chuyển vào Dashboard.
  - Submit thất bại -> giữ tại Login và hiển thị lỗi.
  - Nếu đã có session -> tự động redirect khỏi Login.

### 5.1 Dashboard
- Hiện KPI cards.
- Hiện recent tasks.
- Hiện activity feed.
- CTA:
  - `View all` -> Task List
  - `New Task` -> Create modal

### 5.2 Task List
- Bảng task với cột: Title, Status, Priority, Deadline, Actions.
- Filter theo status + search theo title (dùng atoms core).
- CRUD:
  - Create (modal)
  - Edit (modal)
  - Delete (confirm dialog)

### 5.3 Analytics
- Dùng Highcharts theo SRS:
  - Completion rate
  - Priority distribution
  - Tasks over time
- Dữ liệu chart lấy từ `tasksAtom` (không hardcode tách rời).

### 5.4 Create/Edit modal
- React Hook Form + Zod.
- Validation:
  - Title tối thiểu 3 ký tự
  - Deadline là ngày hợp lệ
- Submit cập nhật `tasksAtom` và ghi `Activity`.

## 6. Style config cần canh chỉnh
- Duy trì token tại:
  - `src/styles/variables.light.css`
  - `src/styles/variables.dark.css`
  - `src/styles/theme.css`
- Tuân thủ no-line rule:
  - Không chia layout bằng border 1px.
  - Tách lớp bằng tonal surfaces.
- Input focus:
  - 2px primary
  - Không glow
- Dùng utility đã có:
  - `src/styles/typography.css`
  - `src/styles/layers.components.css`
  - `src/styles/layers.utilities.css`

## 7. Luồng liên kết dữ liệu giữa các màn
- Tạo task ở modal -> cập nhật ngay Dashboard + Task List + Analytics + Activity.
- Edit/Delete ở Task List -> KPI và chart cập nhật tức thì.
- Từ recent task ở Dashboard -> điều hướng sang Task List (có thể kèm query params).

## 8. Pha triển khai
### Pha 1: Foundation
- Chốt model/atoms/mock seed/shared layout.
- Dựng màn Login và route guard NextAuth.

### Pha 2: Dashboard + Task List
- Dựng xong list, filter/search, create/edit/delete flow.

### Pha 3: Analytics
- Nối Highcharts vào derived data.

### Pha 4: Hardening
- Accessibility, responsive, keyboard flow, empty states, final polish.

## 9. Tiêu chí nghiệm thu (Acceptance criteria)
- 4 màn (gồm Login) liên kết hoàn chỉnh và đồng bộ state.
- CRUD đầy đủ theo SRS.
- Data model không lệch enum SRS.
- Design tuân thủ `The Architectural Minimalist`.
- Chart phân tích đọc dữ liệu thực từ state.
- Form validation đạt yêu cầu SRS.
- Route nội bộ chỉ truy cập được khi đã xác thực.