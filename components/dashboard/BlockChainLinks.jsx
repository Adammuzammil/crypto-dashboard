"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const getTextBetweenDots = (url) => {
  let cleanUrl = url.replace(/https?:\/\//, "").replace(/\/$/, "");
  let parts = cleanUrl.split(".");
  if (parts.length > 1) {
    return parts[parts.length - 2];
  }
  return "";
};

const BlockChainLinks = ({ info }) => {
  const router = useRouter();
  const domainNames = (info?.links?.blockchain_site || [])
    .map((link) => ({
      domain: getTextBetweenDots(link),
      url: link,
    }))
    .filter(({ domain }) => domain);

  // Set default value to the first domain name if available
  const defaultValue =
    domainNames.length > 0 ? domainNames[0].domain : "No Data";

  const handleChange = (value) => {
    const selectedLink = domainNames.find(({ domain }) => domain === value);
    if (selectedLink && selectedLink.url) {
      window.open(selectedLink.url, "_blank");
    }
  };

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-fit">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {domainNames.length > 0 ? (
            domainNames.map(({ domain, url }, i) => (
              <SelectItem key={i} value={domain}>
                {domain}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="No Data">No Data</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BlockChainLinks;
