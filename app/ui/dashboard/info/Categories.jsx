import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Categories = ({ info }) => {
  const domainNames = (info?.categories || [])
    .map((link) => ({
      url: link,
    }))
    .filter(({ url }) => url);

  const defaultValue = domainNames.length > 0 ? domainNames[0].url : "No Data";

  const handleChange = (value) => {
    const selectedLink = domainNames.find(({ url }) => url === value);
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
          {info?.categories?.map((category, i) => (
            <SelectItem key={i} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Categories;
