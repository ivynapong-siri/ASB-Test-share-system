import { Search, SendIcon } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { ButtonWithIcons } from "./buttons/button-with-icon";
import { InputWithIcon } from "./input-with-icon";
import Spinner from "./spinner";

interface UniversalSearchProps {
  isHovered?: boolean;
  isWhite?: boolean;
  showTextSearch?: boolean;
  setIsHovered?: (isHovered: boolean) => void;
  buttonClassName?: string;
  onCloseSheet?: () => void;
}

const SearchItems = ({
  badge,
  description,
  href,
  title,
  onClick,
}: {
  badge: string;
  title: string;
  description?: string;
  href: string;
  onClick: () => void;
}) => {
  const link = href.startsWith("/") ? href : `/${href}`;
  return (
    <Link className="relative flex flex-col gap-4" href={link} onClick={onClick}>
      <div className="flex flex-col gap-4 pr-12">
        <div className="bg-secondary-200 w-fit rounded-full px-3 py-2 font-mono text-[0.75rem] font-medium tracking-widest text-white uppercase">
          {badge}
        </div>
        <p className="text-primary-300 text-[1.25rem]/[1.625rem] font-semibold">{title}</p>
        {description && <p className="text-primary-300 line-clamp-2 font-mono text-base/[1.625rem]">{description}</p>}
      </div>
      <div className="block md:hidden">
        <div
          className="text-primary-400 border-primary-400 rounded-full border bg-transparent px-4 py-2 text-center font-medium tracking-widest"
          onClick={onClick}
        >
          Read more
        </div>
      </div>
    </Link>
  );
};

const UniversalSearch: React.FC<UniversalSearchProps> = ({
  isHovered = false,
  setIsHovered,
  isWhite = false,
  showTextSearch = false,
  buttonClassName,
  onCloseSheet,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const buttonClass = cn(
    "hover:bg-primary group/search rounded-full uppercase transition duration-300 hover:text-white max-md:justify-start",
    isWhite ? "text-primary border-gray-300 bg-white" : isHovered && "text-primary border-gray-300 bg-white",
    buttonClassName
  );

  const iconClass = cn(
    "size-5",
    isWhite ? (isHovered ? "hover:text-white" : "!text-primary") : isHovered ? "hover:text-white" : "text-white"
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setShowResults(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/universal-search?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = () => {
    setDialogOpen(true);
    setIsHovered?.(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setIsHovered?.(false);
  };

  return (
    <div>
      <Button variant="outline" size={showTextSearch ? "sm" : "icon"} className={buttonClass} onClick={openDialog}>
        <Search className={iconClass} />
        {showTextSearch && <span className="pl-0.5 font-mono text-xs">Search</span>}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="h-full border-0 bg-transparent shadow-none sm:max-w-full"
          closeClassNames="text-black font-semibold bg-white/100 p-2 rounded-full top-20 right-10 lg:right-20"
          iconClassNames="!w-6 !h-6"
        >
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="relative top-1/6 flex flex-col items-center">
            <div className="flex w-full items-center justify-center gap-1 md:gap-4">
              <InputWithIcon
                startIcon={Search}
                type="text"
                className="w-full rounded-full bg-white md:min-w-lg lg:min-w-3xl"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search..."
              />
              <ButtonWithIcons
                variant="default"
                endIcon={SendIcon}
                showIcon
                iconClass="border border-dashed p-2 rounded-full transition-all transform size-8 group-hover/button:rotate-45"
                onClick={handleSearch}
                className="h-12 rounded-full py-4 text-sm font-normal uppercase transition duration-300 hover:text-white"
                type="submit"
              >
                Search
              </ButtonWithIcons>
            </div>

            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mt-10 flex w-full items-center justify-center rounded-2xl bg-white p-5 md:min-w-lg lg:max-w-5xl lg:min-w-2xl"
              >
                <Spinner className="text-primary h-8 w-8" />
              </motion.div>
            ) : (
              showResults && (
                <motion.div
                  key="search-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="scrollbar-hidden !z-[9999] mt-10 flex max-h-[400px] w-full flex-col gap-8 overflow-y-scroll rounded-2xl bg-white p-5 md:min-w-lg lg:max-h-[550px] lg:max-w-5xl lg:min-w-2xl"
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((item, index) => (
                      <React.Fragment key={index}>
                        <SearchItems
                          badge={item.badge}
                          title={item.title}
                          description={item.description}
                          href={item.slug || "#"}
                          onClick={() => {
                            closeDialog();
                            onCloseSheet?.();
                          }}
                        />
                        {index < searchResults.length - 1 && (
                          <div className="h-full w-full rounded-full bg-[#0000001A] py-[1px]" />
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <p className="text-center font-mono text-sm text-neutral-400">No results found.</p>
                  )}
                </motion.div>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UniversalSearch;
