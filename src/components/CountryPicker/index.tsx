import { FC, useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { getCountries } from "../../api";

interface CountryPickerProps {
  selectedCountry?: string;
  setSelectedCountry?: (selectedCountry: string) => void;
}

const CountryPicker: FC<CountryPickerProps> = (props?) => {
  const [countries, setCountries] = useState<string[]>([]);
  const { selectedCountry = "", setSelectedCountry = () => {} } = props;

  useEffect(() => {
    const fetchData = async () => {
      const [data, error]: any = await getCountries();

      if (error) {
        setCountries([]);
      } else {
        setCountries(data);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = (e: SelectChangeEvent) => {
    setSelectedCountry(e?.target?.value);
  };

  return (
    <FormControl fullWidth sx={{ pt: 2 }}>
      <Select
        displayEmpty
        value={selectedCountry}
        onChange={handleCountryChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 256 } } }}
      >
        <MenuItem disabled value="">
          <em>Country</em>
        </MenuItem>
        {countries?.map((row: string) => (
          <MenuItem key={row} value={row}>
            {row}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryPicker;
