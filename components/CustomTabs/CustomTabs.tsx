"use client";

import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

interface TabDataProps {
  readonly label: string;
  readonly value: string;
  readonly content?: React.ReactNode;
}

interface CustomTabsProps {
  readonly tabsData: TabDataProps[];
  readonly value: string;
  readonly setValue: (value: string) => void;
}

const CustomTabs = ({
  tabsData,
  value,
  setValue,
}: CustomTabsProps) => {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
          >
            {tabsData.map(({ label, value: tabValue }) => (
              <Tab
                key={tabValue}
                value={tabValue}
                label={label}
                disableRipple
                disableFocusRipple
              />
            ))}
          </TabList>
        </Box>

        {tabsData.map(({ value: tabValue, content }) => (
          <TabPanel
            key={tabValue}
            value={tabValue}
            sx={{ padding: 0, height: "100%" }}
          >
            {content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default CustomTabs;