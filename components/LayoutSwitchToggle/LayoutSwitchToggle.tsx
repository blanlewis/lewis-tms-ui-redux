"use client";

import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import { PageLayoutEnum } from "@/app/utils/types";
import { useCustomHook } from "@/app/utils/hook";
import CustomToggleButton from "../CustomToggleButton";

const toggleData = [
  {
    label: "2 Panel Layout",
    value: PageLayoutEnum.TWO_PANEL_LAYOUT,
    icon: <ViewAgendaIcon sx={{ transform: "rotate(90deg)" }} />,
  },
  {
    label: "3 Panel Layout",
    value: PageLayoutEnum.THREE_PANEL_LAYOUT,
    icon: <AutoAwesomeMosaicIcon sx={{ transform: "rotate(180deg)" }} />,
  },
  {
    label: "Classic",
    value: PageLayoutEnum.CLASSIC,
    icon: <AutoAwesomeMosaicIcon sx={{ transform: "rotate(270deg)" }} />,
  },
];

const LayoutSwitchToggle = () => {
  const { pageLayout, setPageLayout } = useCustomHook();

  const handleToggleChange = (value: string | null) => {
    if (value !== null) {
      const newLayout = value as PageLayoutEnum;
      setPageLayout({
        layout: newLayout,
      });
    }
  };

  return (
    <CustomToggleButton
      toggleData={toggleData}
      selectedToggle={pageLayout.layout}
      setSelectedToggle={handleToggleChange}
      orientation="vertical"
    />
  );
};

export default LayoutSwitchToggle;