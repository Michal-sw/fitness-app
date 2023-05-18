import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

const languages = ["en", "pl"];

function LanguageSelect() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      variant="standard"
      onChange={handleLanguageChange}
      disableUnderline
      IconComponent={() => null}
      inputProps={{
        MenuProps: {
          MenuListProps: {
            sx: {
              backgroundColor: "#333",
            },
          },
        },
      }}
      id="language-select"
      defaultValue="en"
      renderValue={(value) => {
        return (
          <Box sx={{ display: "flex" }}>
            <img
              className="flag-icon"
              src={require(`../../assets/flagIcon-${value}.svg`)}
            />
          </Box>
        );
      }}
    >
      {languages.map((lang) => (
        <MenuItem className="language-select-option" key={lang} value={lang}>
          <img
            className="flag-icon"
            src={require(`../../assets/flagIcon-${lang}.svg`)}
          />
        </MenuItem>
      ))}
    </Select>
  );
}

export default LanguageSelect;
