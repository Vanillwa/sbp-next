import { Suspense } from "react";
import Username from "../component/username";

export default function User() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Username />
      </Suspense>
    </div>
  );
}
