// import HomePage from "./HomePage/page";

// export default function Home() {

//   return (
//   <>
//   <HomePage/>

//    </>
//   );
// }

import { Suspense } from "react";
import ClientWrapper from "./common/ClientWrapper";
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientWrapper />
    </Suspense>
  );
}
