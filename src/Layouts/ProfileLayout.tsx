import { Outlet } from "react-router-dom";

export function ProfileLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
