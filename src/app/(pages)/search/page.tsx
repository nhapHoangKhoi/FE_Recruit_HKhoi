import { Section1 } from "@/app/components/section1/Section1";
import { SearchContainer } from "./SearchContainer";

export default function SearchPage() {
  return (
    <>
      {/* Section 1 */}
      <Section1 />
      {/* End Section 1 */}

      {/* Search results */}
      <SearchContainer />
      {/* End Search results */}
    </>
  )
}