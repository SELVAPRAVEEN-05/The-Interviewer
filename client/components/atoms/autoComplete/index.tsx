"use client";

import Autocomplete from "@mui/joy/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";

type UserCardProps = {
  label: string;
  placeholder: string;
  value: { title: string }[];
  width: number;
  limit?: number;
};

export default function AutoComplet({
  label,
  placeholder,
  value,
  width = 400,
  limit = 2,
}: UserCardProps) {
  return (
    <FormControl id="multiple-limit-tags">
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        multiple
        placeholder={placeholder}
        limitTags={limit}
        options={value}
        getOptionLabel={(option) => option.title}
        sx={{
          width: width,
        }}
      />
    </FormControl>
  );
}
