import { FiPhone, FiMessageSquare } from "react-icons/fi";
import { useEnquiry } from "./EnquiryProvider";
import { company } from "@/data/company";

// Sticky call / enquire bar for phones. The spacer keeps the footer from being covered.
const MobileActionBar = () => {
  const { openEnquiry } = useEnquiry();
  return (
    <>
      <div className="h-14 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-background lg:hidden pb-[env(safe-area-inset-bottom)]">
        <a
          href={company.phoneHref}
          className="flex h-14 items-center justify-center gap-2 text-sm font-semibold text-foreground"
        >
          <FiPhone /> Call us
        </a>
        <button
          onClick={openEnquiry}
          className="flex h-14 items-center justify-center gap-2 bg-primary text-sm font-semibold text-primary-foreground"
        >
          <FiMessageSquare /> Enquire now
        </button>
      </div>
    </>
  );
};

export default MobileActionBar;
